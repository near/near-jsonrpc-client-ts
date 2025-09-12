// Generate TypeScript interface for NEAR RPC client with proper types
// Part of the codegen toolchain

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Types for the generation process
interface MethodMapping {
  rpcMethod: string;
  clientMethodName: string;
  requestType: string;
  responseType: string;
  paramsRequired: boolean;
}

interface GeneratedInterface {
  content: string;
  methodCount: number;
  timestamp: string;
}

// Check if a request schema is nullable (params are optional)
function isRequestNullable(
  rpcMethod: string,
  openApiSpec: any,
  pathToMethodMap: Record<string, string>
): boolean {
  // Find the path for this method
  const path = Object.entries(pathToMethodMap).find(
    ([_, method]) => method === rpcMethod
  )?.[0];
  
  if (!path) return false;
  
  try {
    // Get the request body schema
    const requestBodySchema = openApiSpec.paths?.[path]?.post?.requestBody?.content?.['application/json']?.schema;
    if (!requestBodySchema?.$ref) return false;
    
    // Get the JsonRpcRequest schema
    const schemaName = requestBodySchema.$ref.split('/').pop();
    const jsonRpcSchema = openApiSpec.components?.schemas?.[schemaName];
    
    if (!jsonRpcSchema?.properties?.params) return false;
    
    // Get the params schema reference
    const paramsRef = jsonRpcSchema.properties.params.$ref;
    if (!paramsRef) return false;
    
    // Get the actual params schema
    const paramsSchemaName = paramsRef.split('/').pop();
    const paramsSchema = openApiSpec.components?.schemas?.[paramsSchemaName];
    
    // Check if the schema is nullable
    return paramsSchema?.nullable === true || 
           (paramsSchema?.enum?.length === 1 && paramsSchema?.enum[0] === null);
  } catch (error) {
    console.warn(`Could not check nullability for ${rpcMethod}:`, error);
    return false;
  }
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

// Get all available types by reading the built TypeScript definitions
async function getAvailableTypes(): Promise<Set<string>> {
  try {
    // Import from the built TypeScript definitions which contain all type exports
    const { execSync } = await import('child_process');

    // First, ensure the types package is built
    console.log('🔧 Building jsonrpc-types to get latest type definitions...');
    execSync('pnpm build', {
      cwd: join(
        dirname(fileURLToPath(import.meta.url)),
        '../../packages/jsonrpc-types'
      ),
      stdio: 'inherit',
    });

    // Read the TypeScript definition file
    const dtsPath = join(
      dirname(fileURLToPath(import.meta.url)),
      '../../packages/jsonrpc-types/dist/index.d.ts'
    );
    const dtsContent = await fs.readFile(dtsPath, 'utf8');

    // Extract all type declarations from the .d.ts file
    const typeExportRegex = /^type (\w+)/gm;
    const availableTypes = new Set<string>();

    let match: RegExpExecArray | null;
    while ((match = typeExportRegex.exec(dtsContent)) !== null) {
      availableTypes.add(match[1]);
    }

    console.log(
      `📦 Found ${availableTypes.size} TypeScript types from built definitions`
    );
    console.log(
      `📋 Sample types: ${Array.from(availableTypes).slice(0, 10).join(', ')}`
    );

    return availableTypes;
  } catch (error) {
    console.warn('⚠️  Could not read types from built definitions:', error);
    return new Set<string>();
  }
}

// Extract parameter types by parsing schema definitions directly
async function extractParameterTypesFromSchemas(
  pathToMethodMap: Record<string, string>,
  openApiSpec?: any,
  availableTypes?: Set<string>
): Promise<Record<string, string>> {
  const methodToParamType: Record<string, string> = {};

  if (openApiSpec) {
    console.log('🔍 Analyzing OpenAPI schema to extract parameter types...');

    // Parse each method's schema to find the actual params type
    for (const [path, method] of Object.entries(pathToMethodMap)) {
      const paramType = await extractParamsTypeFromSchema(
        path,
        method,
        openApiSpec,
        availableTypes
      );
      if (paramType) {
        methodToParamType[method] = paramType;
        console.log(`  ${method} -> ${paramType} (from schema)`);
      } else {
        console.warn(
          `  ⚠️  Could not extract parameter type for ${method} from schema`
        );
      }
    }
  } else {
    console.warn(
      '⚠️  No OpenAPI spec provided - cannot extract parameter types'
    );
  }

  return methodToParamType;
}

// Extract response types by parsing schema definitions directly
async function extractResponseTypesFromSchemas(
  pathToMethodMap: Record<string, string>,
  openApiSpec?: any,
  availableTypes?: Set<string>
): Promise<Record<string, string>> {
  const methodToResponseType: Record<string, string> = {};

  if (openApiSpec) {
    console.log('🔍 Analyzing OpenAPI schema to extract response types...');

    // Parse each method's schema to find the actual result type
    for (const [path, method] of Object.entries(pathToMethodMap)) {
      const responseType = await extractResultTypeFromSchema(
        path,
        method,
        openApiSpec,
        availableTypes
      );
      if (responseType) {
        methodToResponseType[method] = responseType;
        console.log(`  ${method} -> ${responseType} (from schema)`);
      } else {
        console.warn(
          `  ⚠️  Could not extract response type for ${method} from schema`
        );
      }
    }
  } else {
    console.warn(
      '⚠️  No OpenAPI spec provided - cannot extract response types'
    );
  }

  return methodToResponseType;
}

// Extract the actual params type from OpenAPI schema
async function extractParamsTypeFromSchema(
  path: string,
  method: string,
  openApiSpec: any,
  availableTypes?: Set<string>
): Promise<string | null> {
  try {
    const pathSpec = openApiSpec.paths[path];
    const postSpec = pathSpec?.post;

    if (!postSpec) return null;

    // Look for the params schema in the request body
    const requestBodySchema =
      postSpec.requestBody?.content?.['application/json']?.schema;
    if (!requestBodySchema) return null;

    // If it's a reference, extract the schema name
    if (requestBodySchema.$ref) {
      const refPath = requestBodySchema.$ref; // e.g., "#/components/schemas/JsonRpcRequestForBlock"
      const schemaName = refPath.split('/').pop();

      // Get the actual schema definition
      const actualSchema = openApiSpec.components?.schemas?.[schemaName];
      if (actualSchema?.properties?.params) {
        const paramsSchema = actualSchema.properties.params;

        // Extract the params type from the schema reference
        if (paramsSchema.$ref) {
          const paramsRefPath = paramsSchema.$ref;
          const paramsSchemaName = paramsRefPath.split('/').pop();

          // Convert schema name to TypeScript type name
          const paramTypeName = await schemaNameToTypeName(
            paramsSchemaName,
            availableTypes
          );
          return paramTypeName;
        }

        // Handle lazy references
        if (paramsSchema.properties?.lazy?.anyOf) {
          for (const option of paramsSchema.properties.lazy.anyOf) {
            if (option.$ref) {
              const paramsRefPath = option.$ref;
              const paramsSchemaName = paramsRefPath.split('/').pop();
              const paramTypeName = await schemaNameToTypeName(
                paramsSchemaName,
                availableTypes
              );
              return paramTypeName;
            }
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.warn(`  ⚠️  Could not extract params type for ${method}:`, error);
    return null;
  }
}

// Extract the actual result type from OpenAPI response schema
async function extractResultTypeFromSchema(
  path: string,
  method: string,
  openApiSpec: any,
  availableTypes?: Set<string>
): Promise<string | null> {
  try {
    const pathSpec = openApiSpec.paths[path];
    const postSpec = pathSpec?.post;

    if (!postSpec) return null;

    // Look for the response schema
    const responseSchema =
      postSpec.responses?.['200']?.content?.['application/json']?.schema;
    if (!responseSchema) return null;

    // If it's a reference, extract the schema name
    if (responseSchema.$ref) {
      const refPath = responseSchema.$ref; // e.g., "#/components/schemas/JsonRpcResponseFor_RpcBlockResponseAnd_RpcError"
      const schemaName = refPath.split('/').pop();

      // Get the actual schema definition
      const actualSchema = openApiSpec.components?.schemas?.[schemaName];

      // JSON-RPC responses are typically unions of success (result) and error
      if (
        actualSchema?.oneOf ||
        actualSchema?.anyOf ||
        (Array.isArray(actualSchema) && actualSchema.length > 0)
      ) {
        const schemas =
          actualSchema.oneOf || actualSchema.anyOf || actualSchema;

        // Find the success case (the one with 'result' property)
        for (const option of schemas) {
          if (option.properties?.result) {
            const resultSchema = option.properties.result;

            // Extract the result type from the schema reference
            if (resultSchema.$ref) {
              const resultRefPath = resultSchema.$ref;
              const resultSchemaName = resultRefPath.split('/').pop();

              // Convert schema name to TypeScript type name
              const resultTypeName = await schemaNameToTypeName(
                resultSchemaName,
                availableTypes
              );
              return resultTypeName;
            }

            // Handle anyOf (like health endpoint where result can be RpcHealthResponse | null)
            if (resultSchema.anyOf) {
              for (const option of resultSchema.anyOf) {
                if (option.$ref) {
                  const resultRefPath = option.$ref;
                  const resultSchemaName = resultRefPath.split('/').pop();
                  const resultTypeName = await schemaNameToTypeName(
                    resultSchemaName,
                    availableTypes
                  );
                  return resultTypeName;
                }
              }
            }

            // Handle lazy references
            if (resultSchema.properties?.lazy?.anyOf) {
              for (const lazyOption of resultSchema.properties.lazy.anyOf) {
                if (lazyOption.$ref) {
                  const resultRefPath = lazyOption.$ref;
                  const resultSchemaName = resultRefPath.split('/').pop();
                  const resultTypeName = await schemaNameToTypeName(
                    resultSchemaName,
                    availableTypes
                  );
                  return resultTypeName;
                }
              }
            }
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.warn(`  ⚠️  Could not extract result type for ${method}:`, error);
    return null;
  }
}

// Convert schema name to TypeScript type name with validation
async function schemaNameToTypeName(
  schemaName: string,
  availableTypes?: Set<string>
): Promise<string> {
  // Remove Schema suffix if present
  let typeName = schemaName.endsWith('Schema')
    ? schemaName.replace(/Schema$/, '')
    : schemaName;

  // If we have the available types, check what actually exists
  if (availableTypes) {
    // Try the exact name first
    if (availableTypes.has(typeName)) {
      return typeName;
    }

    // Try without Rpc prefix
    const withoutRpc = typeName.replace(/^Rpc/, '');
    if (availableTypes.has(withoutRpc)) {
      return withoutRpc;
    }

    // Try with Rpc prefix
    const withRpc = `Rpc${typeName}`;
    if (availableTypes.has(withRpc)) {
      return withRpc;
    }
  }

  // Use heuristic naming when type not found in introspection

  if (typeName.startsWith('Rpc')) {
    return typeName;
  }

  // Don't add Rpc prefix to EXPERIMENTAL types
  if (typeName.startsWith('EXPERIMENTAL')) {
    return typeName;
  }

  // Default: try with Rpc prefix
  return `Rpc${typeName}`;
}

// Note: Inference logic removed - now relies entirely on schema extraction

// Convert snake_case to PascalCase
function pascalCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Format JSDoc comment
function formatComment(description: string): string {
  if (!description) return '';

  // Clean up the description
  const cleanDescription = description
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleanDescription.length <= 80) {
    return `/** ${cleanDescription} */\n`;
  }

  // Multi-line comment
  const words = cleanDescription.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).length <= 75) {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return `/**\n${lines.map(line => ` * ${line}`).join('\n')}\n */\n`;
}

// Generate fallback request type name (the old approach)
function generateFallbackRequestType(method: string): string {
  if (method.startsWith('EXPERIMENTAL_')) {
    const baseName = method.substring(13);
    return `EXPERIMENTAL${pascalCase(baseName)}Request`;
  } else {
    return `${pascalCase(method)}Request`;
  }
}

// Generate fallback response type name (the old approach)
function generateFallbackResponseType(method: string): string {
  if (method.startsWith('EXPERIMENTAL_')) {
    const baseName = method.substring(13);
    return `EXPERIMENTAL${pascalCase(baseName)}Response`;
  } else {
    return `${pascalCase(method)}Response`;
  }
}

// Note: Basic mapping removed - generator now requires OpenAPI spec for proper type extraction

// Convert RPC method name to TypeScript type name using dynamic mapping
function createTypeNameResolver(
  methodToParamType: Record<string, string>,
  methodToResponseType: Record<string, string>
) {
  return function (method: string, suffix: 'Request' | 'Response'): string {
    if (suffix === 'Request') {
      // Use the dynamically discovered parameter type
      return methodToParamType[method] || generateFallbackRequestType(method);
    } else {
      // Use the dynamically discovered response type
      return (
        methodToResponseType[method] || generateFallbackResponseType(method)
      );
    }
  };
}

// Generate method mappings from RPC_METHODS array
async function generateMethodMappings(
  rpcMethods: readonly string[],
  pathToMethodMap?: Record<string, string>,
  openApiSpec?: any
): Promise<MethodMapping[]> {
  // Get parameter and response type mappings from OpenAPI schema
  if (!pathToMethodMap || !openApiSpec) {
    throw new Error(
      'OpenAPI spec and path mappings are required for type generation'
    );
  }

  // Load available types from the jsonrpc-types package
  const availableTypes = await getAvailableTypes();

  const methodToParamType = await extractParameterTypesFromSchemas(
    pathToMethodMap,
    openApiSpec,
    availableTypes
  );
  const methodToResponseType = await extractResponseTypesFromSchemas(
    pathToMethodMap,
    openApiSpec,
    availableTypes
  );

  // Create type name resolver with discovered mappings
  const rpcMethodToTypeName = createTypeNameResolver(
    methodToParamType,
    methodToResponseType
  );

  return rpcMethods.map(rpcMethod => ({
    rpcMethod,
    clientMethodName: rpcMethodToCamelCase(rpcMethod),
    requestType: rpcMethodToTypeName(rpcMethod, 'Request'),
    responseType: rpcMethodToTypeName(rpcMethod, 'Response'),
    paramsRequired: !isRequestNullable(rpcMethod, openApiSpec, pathToMethodMap),
  }));
}

// Generate the TypeScript interface with proper types
function generateInterfaceContent(
  mappings: MethodMapping[]
): GeneratedInterface {
  const timestamp = new Date().toISOString();

  // Generate method signatures with proper types
  const methodSignatures = mappings.map(mapping => {
    return `  ${mapping.clientMethodName}(params?: ${mapping.requestType}): Promise<${mapping.responseType}>;`;
  });

  // Generate type imports
  const requestTypes = [...new Set(mappings.map(m => m.requestType))].sort();
  const responseTypes = [...new Set(mappings.map(m => m.responseType))].sort();
  // Add specific result types for convenience methods (use Set to avoid duplicates)
  const allTypes = [
    ...new Set([
      ...requestTypes,
      ...responseTypes,
      'AccountView',
      'CallResult',
      'AccessKeyView',
    ]),
  ].sort();

  const importStatement = `import type {\n  ${allTypes.join(',\n  ')}\n} from '@near-js/jsonrpc-types';`;

  const content = `// Auto-generated TypeScript interface for NEAR RPC client
// Generated at: ${timestamp}
// Total methods: ${mappings.length}
// 
// This file is automatically generated by tools/codegen/generate-client-interface.ts
// Do not edit manually - changes will be overwritten

${importStatement}

// Dynamic RPC methods interface with proper typing
export interface DynamicRpcMethods {
${methodSignatures.join('\n')}
}

// Convenience methods interface
export interface ConvenienceMethods {
  viewAccount(params: {
    accountId: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }): Promise<AccountView>;
  
  viewFunction(params: {
    accountId: string;
    methodName: string;
    argsBase64?: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }): Promise<CallResult>;
  
  viewAccessKey(params: {
    accountId: string;
    publicKey: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }): Promise<AccessKeyView>;
}

// Combined interface for the complete client
export interface CompleteClientInterface extends DynamicRpcMethods, ConvenienceMethods {
  // Generic call method for ultimate flexibility
  call<TParams = unknown, TResult = unknown>(
    method: string, 
    params?: TParams
  ): Promise<TResult>;
}
`;

  return {
    content,
    methodCount: mappings.length,
    timestamp,
  };
}

// Generate individual static functions for tree-shaking (mini version)
function generateStaticFunctions(
  mappings: MethodMapping[],
  methodDescriptions?: Record<string, string>
): string {
  const timestamp = new Date().toISOString();

  // Generate individual function exports for each RPC method
  const staticFunctions = mappings.map(mapping => {
    const description = methodDescriptions?.[mapping.rpcMethod] || '';
    const jsDoc = description ? formatComment(description) : '';

    // Use optional params only when the schema is nullable
    const paramsSignature = mapping.paramsRequired 
      ? `params: ${mapping.requestType}`
      : `params?: ${mapping.requestType}`;

    return `${jsDoc}export async function ${mapping.clientMethodName}(
  client: NearRpcClient,
  ${paramsSignature}
): Promise<${mapping.responseType}> {
  return client.makeRequest('${mapping.rpcMethod}', params);
}`;
  });

  // Generate type imports for the mini version
  const requestTypes = [...new Set(mappings.map(m => m.requestType))].sort();
  const responseTypes = [...new Set(mappings.map(m => m.responseType))].sort();
  const allTypes = [
    ...new Set([
      ...requestTypes,
      ...responseTypes,
      'AccountView',
      'CallResult',
      'AccessKeyView',
    ]),
  ].sort();

  const importStatement = `import type {\n  ${allTypes.join(',\n  ')}\n} from '@near-js/jsonrpc-types';
import type { NearRpcClient } from './client';`;

  const interfaces = `
// Dynamic RPC methods interface with proper typing
export interface DynamicRpcMethods {
${mappings
  .map(mapping => {
    const description = methodDescriptions?.[mapping.rpcMethod] || '';
    const jsDoc = description
      ? formatComment(description)
          .split('\n')
          .map(line => '  ' + line)
          .join('\n')
      : '';
    const paramsSignature = mapping.paramsRequired 
      ? `params: ${mapping.requestType}`
      : `params?: ${mapping.requestType}`;
    return `${jsDoc}  ${mapping.clientMethodName}(${paramsSignature}): Promise<${mapping.responseType}>;`;
  })
  .join('\n')}
}

// Convenience methods interface
export interface ConvenienceMethods {
  viewAccount(params: {
    accountId: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }): Promise<AccountView>;
  
  viewFunction(params: {
    accountId: string;
    methodName: string;
    argsBase64?: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }): Promise<CallResult>;
  
  viewAccessKey(params: {
    accountId: string;
    publicKey: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }): Promise<AccessKeyView>;
}

// Combined interface for the complete client
export interface CompleteClientInterface extends DynamicRpcMethods, ConvenienceMethods {
  // Generic call method for ultimate flexibility
  call<TParams = unknown, TResult = unknown>(
    method: string, 
    params?: TParams
  ): Promise<TResult>;
}`;

  return `// Auto-generated static RPC functions for tree-shaking
// Generated at: ${timestamp}
// Total functions: ${mappings.length}
// 
// This file is automatically generated by tools/codegen/generate-client-interface.ts
// Do not edit manually - changes will be overwritten

${importStatement}

${interfaces}

${staticFunctions.join('\n\n')}
`;
}

// Main generator function
export async function generateClientInterface(
  rpcMethods: readonly string[],
  outputPath: string,
  pathToMethodMap?: Record<string, string>,
  openApiSpec?: any
): Promise<GeneratedInterface> {
  console.log('🔧 Generating TypeScript client interface...');

  // Generate method mappings
  const mappings = await generateMethodMappings(
    rpcMethods,
    pathToMethodMap,
    openApiSpec
  );
  console.log(`   Found ${mappings.length} RPC methods to generate`);

  // Extract method descriptions from OpenAPI spec
  const methodDescriptions: Record<string, string> = {};
  if (openApiSpec && pathToMethodMap) {
    Object.entries(pathToMethodMap).forEach(([path, method]) => {
      const pathSpec = openApiSpec.paths?.[path];
      const description = pathSpec?.post?.description;
      if (description) {
        methodDescriptions[method] = description;
      }
    });
  }

  // Generate static functions (mini is now the default and only version)
  const staticFunctionsContent = generateStaticFunctions(
    mappings,
    methodDescriptions
  );

  // Ensure output directory exists
  await fs.mkdir(dirname(outputPath), { recursive: true });

  // Write static functions as the main and only file
  await fs.writeFile(outputPath, staticFunctionsContent, 'utf8');

  // Generate a separate export file for functions
  const functionExports = mappings.map(m => m.clientMethodName).join(',\n  ');
  const functionsExportContent = `// Auto-generated exports for tree-shakable functions
// Generated at: ${new Date().toISOString()}
// Do not edit manually - changes will be overwritten

export {
  ${functionExports}
} from './generated-types';

// Re-export convenience functions
export { viewAccount, viewFunction, viewAccessKey } from './convenience';
`;

  const functionsExportPath = join(
    dirname(outputPath),
    'generated-functions.ts'
  );
  await fs.writeFile(functionsExportPath, functionsExportContent, 'utf8');

  console.log(`✅ Generated static functions at ${outputPath}`);
  console.log(`✅ Generated function exports at ${functionsExportPath}`);
  console.log(
    `✅ All ${mappings.length} functions in single file for optimal tree-shaking`
  );
  console.log(`   Methods: ${mappings.length}`);
  console.log(`   Timestamp: ${new Date().toISOString()}`);

  return {
    content: staticFunctionsContent,
    methodCount: mappings.length,
    timestamp: new Date().toISOString(),
  };
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  async function main() {
    try {
      // Import RPC_METHODS from the types package
      const { RPC_METHODS } = await import(
        '../../packages/jsonrpc-types/dist/index.mjs'
      );

      // Output path - resolve relative to the project root, not codegen directory
      const projectRoot = join(
        dirname(fileURLToPath(import.meta.url)),
        '../..'
      );
      const outputPath = join(
        projectRoot,
        'packages/jsonrpc-client/src/generated-types.ts'
      );

      await generateClientInterface(RPC_METHODS, outputPath);

      console.log('🎉 Client interface generation complete!');
    } catch (error) {
      console.error('❌ Failed to generate client interface:', error);
      process.exit(1);
    }
  }

  main();
}
