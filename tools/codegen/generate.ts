// Main code generation script
// This will fetch the NEAR OpenAPI spec and generate TypeScript types and Zod schemas

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateClientInterface } from './generate-client-interface.js';
import { generateValidationWrappers } from './generate-validation-wrappers.js';

// OpenAPI spec types
interface OpenAPISpec {
  openapi: string;
  info: any;
  servers: any[];
  paths: Record<string, any>;
  components: {
    schemas: Record<string, any>;
  };
}

interface Schema {
  type?: string;
  properties?: Record<string, Schema>;
  items?: Schema;
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
  $ref?: string;
  description?: string;
  enum?: string[];
  required?: string[];
  additionalProperties?: boolean | Schema;
  format?: string;
  nullable?: boolean;
}

// Extract path to method mapping dynamically from OpenAPI spec
function extractPathToMethodMap(spec: OpenAPISpec): Record<string, string> {
  const map: Record<string, string> = {};

  Object.entries(spec.paths).forEach(([path, pathSpec]) => {
    // The operationId is the JSON-RPC method name
    const operationId = pathSpec.post?.operationId;
    if (operationId) {
      map[path] = operationId;
    } else {
      console.warn(`⚠️  Path ${path} has no operationId, skipping...`);
    }
  });

  return map;
}

// Case conversion utilities
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function pascalCase(str: string): string {
  const camel = snakeToCamel(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

// Fetch OpenAPI spec
async function fetchOpenAPISpec(): Promise<OpenAPISpec> {
  const response = await fetch(
    'https://raw.githubusercontent.com/near/nearcore/master/chain/jsonrpc/openapi/openapi.json'
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.status}`);
  }
  return response.json();
}

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

function generateZodSchema(
  schema: Schema,
  schemas: Record<string, Schema>,
  depth = 0
): string {
  if (depth > 10) return 'z.unknown()'; // Prevent infinite recursion

  if (schema.$ref) {
    const refName = schema.$ref.replace('#/components/schemas/', '');
    return `z.lazy(() => ${pascalCase(refName)}Schema())`;
  }

  if (schema.oneOf) {
    const options = schema.oneOf.map(s =>
      generateZodSchema(s, schemas, depth + 1)
    );
    let unionSchema: string;
    if (options.length === 1) {
      unionSchema = options[0];
    } else {
      // Replace z.enum(["null"]) with z.null() in unions
      const processedOptions = options.map(opt =>
        opt === 'z.enum(["null"])' ? 'z.null()' : opt
      );
      unionSchema = `z.union([${processedOptions.join(', ')}])`;
    }

    // Check if there are additional properties at the root level
    if (schema.properties && Object.keys(schema.properties).length > 0) {
      // Generate the properties object
      const properties = Object.entries(schema.properties).map(
        ([key, prop]) => {
          const isOptional = !schema.required?.includes(key);
          const camelKey = snakeToCamel(key);
          let zodSchema = generateZodSchema(prop, schemas, depth + 1);

          // Handle nullable fields
          if (prop.nullable) {
            zodSchema = `z.union([${zodSchema}, z.null()])`;
          }

          // Handle optional fields
          if (isOptional) {
            return `  ${camelKey}: z.optional(${zodSchema})`;
          }
          return `  ${camelKey}: ${zodSchema}`;
        }
      );
      const propertiesSchema = `z.object({\n${properties.join(',\n')}\n})`;

      // Merge the union schema with the properties
      return `z.intersection(${unionSchema}, ${propertiesSchema})`;
    }

    return unionSchema;
  }

  if (schema.anyOf) {
    const options = schema.anyOf.map(s =>
      generateZodSchema(s, schemas, depth + 1)
    );
    let unionSchema: string;
    if (options.length === 1) {
      unionSchema = options[0];
    } else {
      // Replace z.enum(["null"]) with z.null() in unions
      const processedOptions = options.map(opt =>
        opt === 'z.enum(["null"])' ? 'z.null()' : opt
      );
      unionSchema = `z.union([${processedOptions.join(', ')}])`;
    }

    // Check if there are additional properties at the root level
    if (schema.properties && Object.keys(schema.properties).length > 0) {
      // Generate the properties object
      const properties = Object.entries(schema.properties).map(
        ([key, prop]) => {
          const isOptional = !schema.required?.includes(key);
          const camelKey = snakeToCamel(key);
          let zodSchema = generateZodSchema(prop, schemas, depth + 1);

          // Handle nullable fields
          if (prop.nullable) {
            zodSchema = `z.union([${zodSchema}, z.null()])`;
          }

          // Handle optional fields
          if (isOptional) {
            return `  ${camelKey}: z.optional(${zodSchema})`;
          }
          return `  ${camelKey}: ${zodSchema}`;
        }
      );
      const propertiesSchema = `z.object({\n${properties.join(',\n')}\n})`;

      // Merge the union schema with the properties
      return `z.intersection(${unionSchema}, ${propertiesSchema})`;
    }

    return unionSchema;
  }

  if (schema.allOf) {
    const allSchemas = schema.allOf.map(s =>
      generateZodSchema(s, schemas, depth + 1)
    );
    if (allSchemas.length === 1) {
      return allSchemas[0];
    }
    return `z.intersection(${allSchemas.join(', ')})`;
  }

  if (schema.enum) {
    // Special handling for null values in enums
    const enumValues = schema.enum.map(val => {
      if (val === null || val === 'null') {
        return 'null';
      }
      return `"${val}"`;
    });
    // If enum only contains null, just return z.null()
    if (enumValues.length === 1 && enumValues[0] === 'null') {
      return 'z.null()';
    }
    return `z.enum([${enumValues.join(', ')}])`;
  }

  // Handle nullable at the root level for primitive types
  let baseSchema: string;

  switch (schema.type) {
    case 'string':
      baseSchema = 'z.string()';
      break;
    case 'number':
    case 'integer':
      baseSchema = 'z.number()';
      break;
    case 'boolean':
      baseSchema = 'z.boolean()';
      break;
    case 'array':
      const itemSchema = schema.items
        ? generateZodSchema(schema.items, schemas, depth + 1)
        : 'z.unknown()';
      baseSchema = `z.array(${itemSchema})`;
      break;
    case 'object':
      if (!schema.properties) {
        if (schema.additionalProperties === true) {
          baseSchema = 'z.record(z.string(), z.unknown())';
        } else if (
          schema.additionalProperties &&
          typeof schema.additionalProperties === 'object'
        ) {
          const valueSchema = generateZodSchema(
            schema.additionalProperties,
            schemas,
            depth + 1
          );
          baseSchema = `z.record(z.string(), ${valueSchema})`;
        } else {
          baseSchema = 'z.record(z.string(), z.unknown())';
        }
        break;
      }

      const properties = Object.entries(schema.properties).map(
        ([key, prop]) => {
          const isOptional = !schema.required?.includes(key);
          const camelKey = snakeToCamel(key);
          let zodSchema = generateZodSchema(prop, schemas, depth + 1);

          // Handle nullable fields
          if (prop.nullable) {
            zodSchema = `z.union([${zodSchema}, z.null()])`;
          }

          // Handle optional fields
          if (isOptional) {
            return `  ${camelKey}: z.optional(${zodSchema})`;
          }
          return `  ${camelKey}: ${zodSchema}`;
        }
      );

      baseSchema = `z.object({\n${properties.join(',\n')}\n})`;
      break;
    default:
      baseSchema = 'z.unknown()';
  }

  // Apply nullable at the root level if needed
  if (schema.nullable) {
    return `z.union([${baseSchema}, z.null()])`;
  }

  return baseSchema;
}

export async function generateTypes() {
  console.log('🔄 Starting OpenAPI spec analysis and type generation...');

  try {
    // Fetch the OpenAPI spec
    console.log('📥 Fetching NEAR OpenAPI specification...');
    const spec = await fetchOpenAPISpec();
    console.log(
      `✅ Fetched spec with ${Object.keys(spec.paths).length} endpoints and ${Object.keys(spec.components.schemas).length} schemas`
    );

    const outputDir = join(process.cwd(), '../../packages/jsonrpc-types/src');
    const { schemas } = spec.components;

    // Extract path to method mapping from the OpenAPI spec
    const PATH_TO_METHOD_MAP = extractPathToMethodMap(spec);
    console.log(
      `📋 Extracted ${Object.keys(PATH_TO_METHOD_MAP).length} method mappings from OpenAPI spec`
    );

    // Generate TypeScript types using z.infer (mini only)
    console.log('🔧 Generating TypeScript types using z.infer...');
    const typeExports: string[] = [];
    const miniTypeDefinitions: string[] = [];

    // Generate types for each schema using z.infer
    Object.entries(schemas).forEach(([schemaName, schema]) => {
      const typeName = pascalCase(schemaName);
      const schemaTypeName = `${typeName}Schema`;

      // Add description as JSDoc if available
      const description = formatComment(schema.description || '');

      // Generate z.infer type (mini - using ReturnType since schemas are functions)
      miniTypeDefinitions.push(
        `${description}export type ${typeName} = z.infer<ReturnType<typeof schemas.${schemaTypeName}>>;`
      );

      typeExports.push(typeName);
    });

    // Generate method parameter and response types using z.infer
    const miniMethodTypes: string[] = [];
    // Track already exported type names to avoid duplicates
    const exportedTypeNames = new Set(typeExports);

    Object.entries(spec.paths).forEach(([path, pathSpec]) => {
      const methodName = PATH_TO_METHOD_MAP[path];
      if (!methodName) return;

      const post = pathSpec.post;
      if (!post) return;

      const methodNamePascal = pascalCase(methodName);

      // Extract method description from OpenAPI spec
      const methodDescription = post.description || '';

      // Generate request type using z.infer
      if (post.requestBody?.content?.['application/json']?.schema) {
        const typeName = `${methodNamePascal}Request`;
        // Check if this type already exists in the main types
        if (!exportedTypeNames.has(typeName)) {
          // Add JSDoc comment if description exists
          const requestDescription = methodDescription
            ? formatComment(
                `Request parameters for ${methodName}: ${methodDescription}`
              )
            : '';
          miniMethodTypes.push(
            `${requestDescription}export type ${typeName} = z.infer<ReturnType<typeof schemas.${methodNamePascal}RequestSchema>>;`
          );
          exportedTypeNames.add(typeName);
        }
      }

      // Generate response type using z.infer
      if (post.responses?.['200']?.content?.['application/json']?.schema) {
        const typeName = `${methodNamePascal}Response`;
        // Check if this type already exists in the main types
        if (!exportedTypeNames.has(typeName)) {
          // Add JSDoc comment if description exists
          const responseDescription = methodDescription
            ? formatComment(
                `Response type for ${methodName}: ${methodDescription}`
              )
            : '';
          miniMethodTypes.push(
            `${responseDescription}export type ${typeName} = z.infer<ReturnType<typeof schemas.${methodNamePascal}ResponseSchema>>;`
          );
          exportedTypeNames.add(typeName);
        }
      }
    });

    // Create types content (zod/mini only)
    const typesContent = `// Auto-generated TypeScript types from NEAR OpenAPI spec using z.infer (zod/mini version)
// Generated on: ${new Date().toISOString()}
// Do not edit manually - run 'pnpm generate' to regenerate

import { z } from 'zod/mini';
import * as schemas from './schemas';

${miniTypeDefinitions.join('\n\n')}

// Method-specific types
${miniMethodTypes.join('\n\n')}

// Re-exports for convenience
export * from './schemas';
`;

    // Generate Zod schemas (mini versions only)
    console.log('🔧 Generating Zod schemas...');
    const schemaExports: string[] = [];
    const miniSchemaDefinitions: string[] = [];

    Object.entries(schemas).forEach(([schemaName, schema]) => {
      const schemaTypeName = `${pascalCase(schemaName)}Schema`;

      // Generate schema normally - no special handling needed since spec is fixed
      const zodMiniSchema = generateZodSchema(schema, schemas, 0);

      // Add description as comment if available
      const description = schema.description
        ? formatComment(schema.description)
            .replace(/\/\*\*/g, '//')
            .replace(/\*\//g, '')
            .replace(/\* /g, '// ')
        : '';

      miniSchemaDefinitions.push(
        `${description}export const ${schemaTypeName} = () => ${zodMiniSchema};`
      );
      schemaExports.push(schemaTypeName);
    });

    // Generate method schemas and validation mapping
    const miniMethodSchemas: string[] = [];
    const validationMapping: Record<
      string,
      { requestSchema?: string; responseSchema?: string }
    > = {};

    // Track already exported schema names to avoid duplicates
    const exportedSchemaNames = new Set(schemaExports);

    Object.entries(spec.paths).forEach(([path, pathSpec]) => {
      const methodName = PATH_TO_METHOD_MAP[path];
      if (!methodName) return;

      const post = pathSpec.post;
      if (!post) return;

      const methodNamePascal = pascalCase(methodName);
      const methodEntry: { requestSchema?: string; responseSchema?: string } =
        {};
      validationMapping[methodName] = methodEntry;

      // Extract method description from OpenAPI spec
      const methodDescription = post.description || '';

      // Generate request schema
      if (post.requestBody?.content?.['application/json']?.schema) {
        const requestSchema =
          post.requestBody.content['application/json'].schema;
        const schemaName = `${methodNamePascal}RequestSchema`;

        // Check if this schema already exists in the main schemas
        if (!exportedSchemaNames.has(schemaName)) {
          const zodMiniSchema = generateZodSchema(requestSchema, schemas, 0);
          // Add JSDoc comment if description exists
          const requestDescription = methodDescription
            ? formatComment(
                `Request schema for ${methodName}: ${methodDescription}`
              )
                .replace(/\/\*\*/g, '//')
                .replace(/\*\//g, '')
                .replace(/\* /g, '// ')
            : '';
          miniMethodSchemas.push(
            `${requestDescription}export const ${schemaName} = () => ${zodMiniSchema};`
          );
          exportedSchemaNames.add(schemaName);
        }
        methodEntry.requestSchema = schemaName;
      }

      // Generate response schema
      if (post.responses?.['200']?.content?.['application/json']?.schema) {
        const responseSchema =
          post.responses['200'].content['application/json'].schema;
        const schemaName = `${methodNamePascal}ResponseSchema`;

        // Check if this schema already exists in the main schemas
        if (!exportedSchemaNames.has(schemaName)) {
          const zodMiniSchema = generateZodSchema(responseSchema, schemas, 0);
          // Add JSDoc comment if description exists
          const responseDescription = methodDescription
            ? formatComment(
                `Response schema for ${methodName}: ${methodDescription}`
              )
                .replace(/\/\*\*/g, '//')
                .replace(/\*\//g, '')
                .replace(/\* /g, '// ')
            : '';
          miniMethodSchemas.push(
            `${responseDescription}export const ${schemaName} = () => ${zodMiniSchema};`
          );
          exportedSchemaNames.add(schemaName);
        }
        methodEntry.responseSchema = schemaName;
      }
    });

    // Generate validation mapping for use by validation system
    const validationMappingCode = `
// Auto-generated validation schema mapping
// Maps RPC method names to their request/response schema functions
export const VALIDATION_SCHEMA_MAP: Record<string, {
  requestSchema?: () => any;
  responseSchema?: () => any;
}> = {
${Object.entries(validationMapping)
  .map(([methodName, schemas]) => {
    const requestPart = schemas.requestSchema
      ? `requestSchema: ${schemas.requestSchema}`
      : '';
    const responsePart = schemas.responseSchema
      ? `responseSchema: ${schemas.responseSchema}`
      : '';
    const parts = [requestPart, responsePart].filter(Boolean).join(', ');
    return `  '${methodName}': { ${parts} }`;
  })
  .join(',\n')}
};`;

    miniMethodSchemas.push(validationMappingCode);

    // Generate method mapping
    const methodMappingContent = `// Auto-generated method mapping from NEAR OpenAPI spec
// Generated on: ${new Date().toISOString()}
// Do not edit manually - run 'pnpm generate' to regenerate

// Maps OpenAPI paths to actual JSON-RPC method names
export const PATH_TO_METHOD_MAP = ${JSON.stringify(PATH_TO_METHOD_MAP, null, 2)};

// Reverse mapping for convenience
export const METHOD_TO_PATH_MAP: Record<string, string> = {};
Object.entries(PATH_TO_METHOD_MAP).forEach(([path, method]) => {
  METHOD_TO_PATH_MAP[method] = path;
});

// Available RPC methods
export const RPC_METHODS = Object.values(PATH_TO_METHOD_MAP);
export type RpcMethod = typeof RPC_METHODS[number];
`;

    // Create schemas content (zod/mini only)
    const schemasContent = `// Auto-generated Zod schemas from NEAR OpenAPI spec (zod/mini version)
// Generated on: ${new Date().toISOString()}
// Do not edit manually - run 'pnpm generate' to regenerate

import { z } from 'zod/mini';

// Custom validation wrapper for JSON-RPC 2.0 response
// zod/mini doesn't support .refine() or .passthrough() so we validate before parsing
function createJsonRpcResponseValidator(baseSchema: any) {
  return {
    parse: (data: unknown) => {
      // Validate JSON-RPC 2.0 spec BEFORE parsing: exactly one of result or error must be present
      if (typeof data === 'object' && data !== null) {
        const hasResult = 'result' in data;
        const hasError = 'error' in data;
        if (hasResult && hasError) {
          throw new Error('JSON-RPC 2.0 violation: response cannot have both result and error');
        }
        if (!hasResult && !hasError) {
          throw new Error('JSON-RPC 2.0 violation: response must have either result or error');
        }
      }
      return baseSchema.parse(data);
    },
    safeParse: (data: unknown) => {
      // Validate JSON-RPC 2.0 spec BEFORE parsing: exactly one of result or error must be present
      if (typeof data === 'object' && data !== null) {
        const hasResult = 'result' in data;
        const hasError = 'error' in data;
        if (hasResult && hasError) {
          return {
            success: false as const,
            error: {
              issues: [{
                code: 'custom',
                message: 'JSON-RPC 2.0 violation: response cannot have both result and error',
                path: [],
              }],
            },
          };
        }
        if (!hasResult && !hasError) {
          return {
            success: false as const,
            error: {
              issues: [{
                code: 'custom',
                message: 'JSON-RPC 2.0 violation: response must have either result or error',
                path: [],
              }],
            },
          };
        }
      }
      return baseSchema.safeParse(data);
    },
  };
}

${miniSchemaDefinitions.join('\n\n')}

// Method-specific schemas
${miniMethodSchemas.join('\n\n')}

// Base JSON-RPC utility schemas
// These schemas are static utilities for the JSON-RPC 2.0 specification
// They are not derived from the OpenAPI spec but are standard JSON-RPC primitives

export const JsonRpcRequestSchema = () => z.object({
  jsonrpc: z.literal('2.0'),
  id: z.string(),
  method: z.string(),
  params: z.optional(z.unknown()),
});

export const JsonRpcErrorSchema = () => z.object({
  code: z.number(),
  message: z.string(),
  data: z.optional(z.unknown()),
});

// JSON-RPC 2.0 compliant response schema
// Enforces that exactly one of 'result' or 'error' must be present (via custom validation)
// Note: Uses custom wrapper because zod/mini doesn't support .refine()
const _baseJsonRpcResponseSchema = z.union([
  z.object({
    jsonrpc: z.literal('2.0'),
    id: z.string(),
    result: z.unknown(),
  }),
  z.object({
    jsonrpc: z.literal('2.0'),
    id: z.string(),
    error: JsonRpcErrorSchema(),
  }),
]);
export const JsonRpcResponseSchema = () => createJsonRpcResponseValidator(_baseJsonRpcResponseSchema);
`;

    // Write generated files (zod/mini only)
    await fs.writeFile(join(outputDir, 'types.ts'), typesContent);
    await fs.writeFile(join(outputDir, 'schemas.ts'), schemasContent);
    await fs.writeFile(join(outputDir, 'methods.ts'), methodMappingContent);

    console.log('✅ Type generation complete!');
    console.log('📁 Generated files:');
    console.log(
      `  - packages/jsonrpc-types/src/types.ts (${typeExports.length} types - zod/mini)`
    );
    console.log(
      `  - packages/jsonrpc-types/src/schemas.ts (${schemaExports.length} schemas - zod/mini)`
    );
    console.log(
      `  - packages/jsonrpc-types/src/methods.ts (${Object.keys(PATH_TO_METHOD_MAP).length} methods)`
    );

    // Generate client interface with proper types
    console.log('\n🔧 Generating client interface...');
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const projectRoot = join(currentDir, '../..');
    const clientInterfacePath = join(
      projectRoot,
      'packages/jsonrpc-client/src/generated-types.ts'
    );
    await generateClientInterface(
      Object.values(PATH_TO_METHOD_MAP),
      clientInterfacePath,
      PATH_TO_METHOD_MAP,
      spec
    );
    console.log(
      '  - packages/jsonrpc-client/src/generated-types.ts (client interface)'
    );

    // Generate validation wrappers
    console.log('\n🔧 Generating validation wrappers...');
    const validatedOutputPath = join(
      projectRoot,
      'packages/jsonrpc-client/src/validated/index.ts'
    );
    await generateValidationWrappers(
      PATH_TO_METHOD_MAP,
      spec,
      validatedOutputPath
    );
    console.log(
      '  - packages/jsonrpc-client/src/validated/index.ts (validation wrappers)'
    );
  } catch (error) {
    console.error('❌ Generation failed:', error);
    throw error;
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  generateTypes().catch(console.error);
}
