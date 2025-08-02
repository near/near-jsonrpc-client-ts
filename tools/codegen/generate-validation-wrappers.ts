// Generate validation wrapper functions for all RPC methods
// This creates per-function validation that only imports needed schemas

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

interface MethodInfo {
  rpcMethod: string;
  clientMethodName: string;
  requestType: string;
  responseType: string;
  requestSchema?: string;
  responseSchema?: string;
}

// Convert RPC method name to camelCase TypeScript method name
function rpcMethodToCamelCase(method: string): string {
  if (method.startsWith('EXPERIMENTAL_')) {
    const suffix = method.substring(13); // Remove 'EXPERIMENTAL_'
    return (
      'experimental' +
      suffix
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')
    );
  } else {
    return method
      .split('_')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }
}

// Convert method name to PascalCase for schema names
function pascalCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Extract validation info from OpenAPI spec
function extractValidationInfo(
  pathToMethodMap: Record<string, string>,
  openApiSpec: any
): MethodInfo[] {
  const methods: MethodInfo[] = [];

  Object.entries(pathToMethodMap).forEach(([path, rpcMethod]) => {
    const pathSpec = openApiSpec.paths[path];
    const post = pathSpec?.post;
    if (!post) return;

    const methodNamePascal = pascalCase(rpcMethod);
    const clientMethodName = rpcMethodToCamelCase(rpcMethod);

    // Default type names for methods without explicit mappings
    let defaultRequestType = `${methodNamePascal}Request`;
    let defaultResponseType = `${methodNamePascal}Response`;

    // Handle special case response types
    if (rpcMethod === 'EXPERIMENTAL_maintenance_windows') {
      defaultResponseType = 'EXPERIMENTALMaintenanceWindowsResponse';
    } else if (rpcMethod === 'EXPERIMENTAL_validators_ordered') {
      defaultResponseType = 'EXPERIMENTALValidatorsOrderedResponse';
    } else if (rpcMethod === 'maintenance_windows') {
      defaultResponseType = 'MaintenanceWindowsResponse';
    }

    const methodInfo: MethodInfo = {
      rpcMethod,
      clientMethodName,
      requestType: defaultRequestType,
      responseType: defaultResponseType,
    };

    // Check if request schema exists
    if (post.requestBody?.content?.['application/json']?.schema) {
      const requestSchema = post.requestBody.content['application/json'].schema;
      if (requestSchema.$ref) {
        const schemaName = requestSchema.$ref.split('/').pop();
        // Extract the params schema from the JSON-RPC wrapper
        const actualSchema = openApiSpec.components?.schemas?.[schemaName];
        if (actualSchema?.properties?.params) {
          const paramsSchema = actualSchema.properties.params;
          if (paramsSchema.$ref) {
            const paramsSchemaName = paramsSchema.$ref.split('/').pop();
            // Convert to TypeScript type name
            methodInfo.requestSchema = paramsSchemaName.replace(/Schema$/, '');
            methodInfo.requestType = methodInfo.requestSchema;
          } else if (paramsSchema.properties?.lazy?.anyOf) {
            // Handle lazy references
            for (const option of paramsSchema.properties.lazy.anyOf) {
              if (option.$ref) {
                const paramsSchemaName = option.$ref.split('/').pop();
                methodInfo.requestSchema = paramsSchemaName.replace(
                  /Schema$/,
                  ''
                );
                methodInfo.requestType = methodInfo.requestSchema;
                break;
              }
            }
          }
        }
      }
    }

    // Check if response schema exists
    if (post.responses?.['200']?.content?.['application/json']?.schema) {
      const responseSchema =
        post.responses['200'].content['application/json'].schema;
      if (responseSchema.$ref) {
        const schemaName = responseSchema.$ref.split('/').pop();
        // Extract the result schema from the JSON-RPC wrapper
        const actualSchema = openApiSpec.components?.schemas?.[schemaName];
        if (actualSchema?.oneOf || actualSchema?.anyOf) {
          const schemas = actualSchema.oneOf || actualSchema.anyOf;
          // Find the success case (the one with 'result' property)
          for (const option of schemas) {
            if (option.properties?.result) {
              const resultSchema = option.properties.result;
              if (resultSchema.$ref) {
                const resultSchemaName = resultSchema.$ref.split('/').pop();
                methodInfo.responseSchema = resultSchemaName.replace(
                  /Schema$/,
                  ''
                );
                methodInfo.responseType = methodInfo.responseSchema;
              } else if (resultSchema.anyOf) {
                // Handle anyOf (like health endpoint)
                for (const anyOption of resultSchema.anyOf) {
                  if (anyOption.$ref) {
                    const resultSchemaName = anyOption.$ref.split('/').pop();
                    methodInfo.responseSchema = resultSchemaName.replace(
                      /Schema$/,
                      ''
                    );
                    methodInfo.responseType = methodInfo.responseSchema;
                    break;
                  }
                }
              } else if (resultSchema.properties?.lazy?.anyOf) {
                // Handle lazy references
                for (const lazyOption of resultSchema.properties.lazy.anyOf) {
                  if (lazyOption.$ref) {
                    const resultSchemaName = lazyOption.$ref.split('/').pop();
                    methodInfo.responseSchema = resultSchemaName.replace(
                      /Schema$/,
                      ''
                    );
                    methodInfo.responseType = methodInfo.responseSchema;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    methods.push(methodInfo);
  });

  return methods;
}

// Generate a single validation wrapper function
function generateValidationWrapper(method: MethodInfo): string {
  const hasParams = method.requestSchema !== undefined;
  const paramsType = hasParams ? method.requestType : 'undefined';
  const paramsArg = hasParams
    ? 'params?: ' + method.requestType
    : 'params?: undefined';

  let validationCode = '';

  // Add request validation
  if (method.requestSchema) {
    validationCode += `
  // Validate request parameters
  const requestSchema = ${method.requestSchema}Schema();
  if (params !== undefined) {
    try {
      requestSchema.parse(params);
    } catch (error) {
      throw new Error(\`Request validation failed: \${error}\`);
    }
  }`;
  }

  // Add response validation
  if (method.responseSchema) {
    validationCode += `
  
  // Call the base function
  const result = await baseFunctions.${method.clientMethodName}(client, params);
  
  // Validate response
  const responseSchema = ${method.responseSchema}Schema();
  try {
    // Wrap in JSON-RPC response format for validation
    responseSchema.parse(result);
  } catch (error) {
    throw new Error(\`Response validation failed: \${error}\`);
  }
  
  return result;`;
  } else {
    validationCode += `
  
  // Call the base function (no response validation needed)
  return baseFunctions.${method.clientMethodName}(client, params);`;
  }

  return `export async function ${method.clientMethodName}(
  client: NearRpcClient,
  ${paramsArg}
): Promise<${method.responseType}> {${validationCode}
}`;
}

// Generate the complete validated functions module
export async function generateValidationWrappers(
  pathToMethodMap: Record<string, string>,
  openApiSpec: any,
  outputPath: string
): Promise<void> {
  console.log('🔧 Generating validation wrapper functions...');

  // Extract validation info for all methods
  const methods = extractValidationInfo(pathToMethodMap, openApiSpec);
  console.log(`   Found ${methods.length} RPC methods to wrap`);

  // Group imports to avoid duplicates
  const allSchemaImports = new Set<string>();
  methods.forEach(method => {
    if (method.requestSchema) {
      allSchemaImports.add(`${method.requestSchema}Schema`);
    }
    if (method.responseSchema) {
      allSchemaImports.add(`${method.responseSchema}Schema`);
    }
  });

  // Add query schemas for convenience functions
  allSchemaImports.add('RpcQueryRequestSchema');
  allSchemaImports.add('RpcQueryResponseSchema');

  // Generate individual wrapper functions
  const wrapperFunctions = methods.map(method =>
    generateValidationWrapper(method)
  );

  // Collect all unique type imports (both request and response)
  const allTypeImports = new Set<string>();
  methods.forEach(method => {
    if (method.requestType) {
      allTypeImports.add(method.requestType);
    }
    if (method.responseType) {
      allTypeImports.add(method.responseType);
    }
  });

  // Add convenience function types
  allTypeImports.add('AccountView');
  allTypeImports.add('CallResult');
  allTypeImports.add('AccessKeyView');
  allTypeImports.add('RpcQueryRequest');
  allTypeImports.add('RpcQueryResponse');

  // Determine if we're generating for a version-specific directory or root
  const isVersionSpecific = outputPath.includes('/v1.') || outputPath.includes('/latest/');
  const clientImportPath = isVersionSpecific ? '../../client.js' : '../client.js';
  
  // Generate the complete file content
  const content = `// Auto-generated validation wrapper functions
// Generated at: ${new Date().toISOString()}
// Total functions: ${methods.length}
// 
// This file is automatically generated by tools/codegen/generate-validation-wrappers.ts
// Do not edit manually - changes will be overwritten

import type { NearRpcClient } from '${clientImportPath}';
import * as baseFunctions from '../generated-functions.js';
import type {
${Array.from(allTypeImports).sort().join(',\n  ')}
} from '@near-js/jsonrpc-types';
${
  Array.from(allSchemaImports).length > 0
    ? `import {
${Array.from(allSchemaImports)
  .sort()
  .map(s => `  ${s}`)
  .join(',\n')}
} from '@near-js/jsonrpc-types';`
    : ''
}

// Re-export non-validation convenience functions
export { parseCallResultToJson, viewFunctionAsJson } from '../convenience.js';

// Empty enableValidation function (validation is always enabled in these exports)
export function enableValidation(): void {
  // Intentionally empty - validation is always enabled for these exports
}

// Convenience function wrappers with validation
export async function viewAccount(
  client: NearRpcClient,
  params: {
    accountId: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }
): Promise<AccountView> {
  // Use the validated query function
  const queryParams = params.blockId
    ? {
        requestType: 'view_account' as const,
        accountId: params.accountId,
        blockId: params.blockId,
      }
    : {
        requestType: 'view_account' as const,
        accountId: params.accountId,
        finality: params.finality || ('final' as const),
      };
  
  return query(client, queryParams) as Promise<AccountView>;
}

export async function viewFunction(
  client: NearRpcClient,
  params: {
    accountId: string;
    methodName: string;
    argsBase64?: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }
): Promise<CallResult> {
  // Use the validated query function
  const baseParams = {
    requestType: 'call_function' as const,
    accountId: params.accountId,
    methodName: params.methodName,
    argsBase64: params.argsBase64 ?? '',
  };

  const queryParams = params.blockId
    ? { ...baseParams, blockId: params.blockId }
    : { ...baseParams, finality: params.finality || ('final' as const) };

  return query(client, queryParams) as Promise<CallResult>;
}

export async function viewAccessKey(
  client: NearRpcClient,
  params: {
    accountId: string;
    publicKey: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }
): Promise<AccessKeyView> {
  // Use the validated query function
  const queryParams = params.blockId
    ? {
        requestType: 'view_access_key' as const,
        accountId: params.accountId,
        publicKey: params.publicKey,
        blockId: params.blockId,
      }
    : {
        requestType: 'view_access_key' as const,
        accountId: params.accountId,
        publicKey: params.publicKey,
        finality: params.finality || ('final' as const),
      };

  return query(client, queryParams) as Promise<AccessKeyView>;
}

// Validation wrapper functions
${wrapperFunctions.join('\n\n')}
`;

  // Ensure output directory exists
  await fs.mkdir(dirname(outputPath), { recursive: true });

  // Write the generated file
  await fs.writeFile(outputPath, content, 'utf8');

  console.log(`✅ Generated validation wrappers at ${outputPath}`);
  console.log(`   Total functions: ${methods.length}`);
  console.log(
    `   Functions with request validation: ${methods.filter(m => m.requestSchema).length}`
  );
  console.log(
    `   Functions with response validation: ${methods.filter(m => m.responseSchema).length}`
  );
}

// CLI entry point for testing
if (import.meta.url === `file://${process.argv[1]}`) {
  async function main() {
    try {
      // Fetch the OpenAPI spec
      const response = await fetch(
        'https://raw.githubusercontent.com/near/nearcore/master/chain/jsonrpc/openapi/openapi.json'
      );
      const spec = await response.json();

      // Extract path to method mapping
      const pathToMethodMap: Record<string, string> = {};
      Object.entries(spec.paths).forEach(([path, pathSpec]: [string, any]) => {
        const operationId = pathSpec.post?.operationId;
        if (operationId) {
          pathToMethodMap[path] = operationId;
        }
      });

      // Generate validation wrappers
      const currentDir = dirname(fileURLToPath(import.meta.url));
      const outputPath = join(
        currentDir,
        '../../packages/jsonrpc-client/src/validated/index.ts'
      );

      await generateValidationWrappers(pathToMethodMap, spec, outputPath);

      console.log('🎉 Validation wrapper generation complete!');
    } catch (error) {
      console.error('❌ Failed to generate validation wrappers:', error);
      process.exit(1);
    }
  }

  main();
}
