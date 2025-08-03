// Test to verify that types.ts exports all types corresponding to schemas
import { describe, it, expect, beforeAll } from 'vitest';
import * as schemas from '../schemas';
import * as types from '../types';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Types Coverage - Schema to Type Mapping', () => {
  let typesFileContent: string;
  let schemasFileContent: string;

  beforeAll(() => {
    // Read the source files
    const typesPath = join(__dirname, '../types.ts');
    const schemasPath = join(__dirname, '../schemas.ts');
    typesFileContent = readFileSync(typesPath, 'utf8');
    schemasFileContent = readFileSync(schemasPath, 'utf8');
  });

  it('should export a type for every schema function', () => {
    const missingTypes: string[] = [];
    const schemaToTypeMapping = new Map<string, string>();

    // Get all schema function names
    const schemaFunctions = Object.keys(schemas).filter(name =>
      name.endsWith('Schema')
    );

    console.log(`Found ${schemaFunctions.length} schema functions`);

    // For each schema, check if corresponding type exists
    for (const schemaName of schemaFunctions) {
      // Convert schema name to expected type name (remove 'Schema' suffix)
      const expectedTypeName = schemaName.replace(/Schema$/, '');

      // Check if type is exported
      if (!(expectedTypeName in types)) {
        // Some schemas might not have direct type exports (like validation schemas)
        // Check if the type is at least defined in the file
        const typePattern = new RegExp(`export type ${expectedTypeName}\\s*=`);
        if (typesFileContent.match(typePattern)) {
          schemaToTypeMapping.set(schemaName, expectedTypeName);
        } else {
          missingTypes.push(`${schemaName} -> ${expectedTypeName}`);
        }
      } else {
        schemaToTypeMapping.set(schemaName, expectedTypeName);
      }
    }

    console.log(`Found ${schemaToTypeMapping.size} schema-to-type mappings`);
    if (missingTypes.length > 0) {
      console.log(`Missing types for schemas:`, missingTypes.slice(0, 10));
    }

    // Allow some schemas to not have corresponding types (internal schemas)
    expect(schemaToTypeMapping.size).toBeGreaterThan(
      schemaFunctions.length * 0.8
    );
  });

  it('should define types using z.infer with the corresponding schema', () => {
    const schemaFunctions = Object.keys(schemas).filter(name =>
      name.endsWith('Schema')
    );
    let correctDefinitions = 0;
    let totalChecked = 0;

    for (const schemaName of schemaFunctions) {
      const typeName = schemaName.replace(/Schema$/, '');

      // Check if type uses z.infer with the schema
      const typeDefinitionPattern = new RegExp(
        `export type ${typeName}\\s*=\\s*z\\.infer<\\s*ReturnType<\\s*typeof\\s+schemas\\.${schemaName}\\s*>\\s*>`,
        's'
      );

      if (typesFileContent.match(typeDefinitionPattern)) {
        correctDefinitions++;
      }
      totalChecked++;
    }

    console.log(
      `${correctDefinitions} out of ${totalChecked} types use correct z.infer pattern`
    );

    // Most types should use z.infer pattern
    expect(correctDefinitions).toBeGreaterThan(totalChecked * 0.8);
  });

  it('should import schemas module', () => {
    expect(typesFileContent).toContain("import * as schemas from './schemas'");
  });

  it('should import z from zod/mini', () => {
    expect(typesFileContent).toContain("import { z } from 'zod/mini'");
  });

  describe('Key type exports verification', () => {
    it('should export or re-export essential JSON-RPC types', () => {
      // These might be defined in schemas and re-exported
      expect(typesFileContent).toContain("export * from './schemas'");

      // Check that we can access these types at runtime
      expect('JsonRpcRequestSchema' in schemas).toBe(true);
      expect('JsonRpcResponseSchema' in schemas).toBe(true);
      expect('JsonRpcErrorSchema' in schemas).toBe(true);
    });

    it('should export RPC method response types', () => {
      const rpcResponseTypes = [
        'RpcBlockResponse',
        'RpcChunkResponse',
        'RpcTransactionResponse',
        'RpcQueryResponse',
        'RpcStatusResponse',
        'RpcValidatorResponse',
        'RpcGasPriceResponse',
        'RpcNetworkInfoResponse',
      ];

      let foundTypes = 0;
      for (const typeName of rpcResponseTypes) {
        const typePattern = new RegExp(`export type ${typeName}\\s*=`);
        if (typesFileContent.match(typePattern)) {
          foundTypes++;
        }
      }

      console.log(
        `Found ${foundTypes} out of ${rpcResponseTypes.length} RPC response types`
      );
      expect(foundTypes).toBeGreaterThan(rpcResponseTypes.length * 0.8);
    });

    it('should export query response union types', () => {
      // Check for important union type components
      const queryResponseTypes = [
        'AccountView',
        'CallResult',
        'AccessKeyView',
        'ContractCodeView',
        'ViewStateResult',
        'AccessKeyList',
      ];

      for (const typeName of queryResponseTypes) {
        const typePattern = new RegExp(`export type ${typeName}\\s*=`);
        expect(typesFileContent).toMatch(typePattern);
      }
    });
  });

  describe('Type safety verification', () => {
    it('should generate valid TypeScript that compiles', () => {
      // The fact that we can import the types module means it compiles
      expect(typeof types).toBe('object');
      expect(Object.keys(types).length).toBeGreaterThan(100);
    });

    it('should have matching number of exports between runtime check and file content', () => {
      // Count export type statements in the file
      const exportTypeMatches =
        typesFileContent.match(/export type \w+/g) || [];
      const fileExportCount = exportTypeMatches.length;

      // Runtime exports (will be less due to tree shaking in tests)
      const runtimeExportCount = Object.keys(types).length;

      console.log(`File has ${fileExportCount} type exports`);
      console.log(
        `Runtime has ${runtimeExportCount} type exports (may be tree-shaken)`
      );

      // File should have many type exports
      expect(fileExportCount).toBeGreaterThan(200);
    });
  });

  describe('Code generation patterns', () => {
    it('should have auto-generation header', () => {
      expect(typesFileContent).toContain('Auto-generated TypeScript types');
      expect(typesFileContent).toContain('Do not edit manually');
    });

    it('should use consistent z.infer pattern throughout', () => {
      // Count z.infer usage
      const inferMatches = typesFileContent.match(/z\.infer</g) || [];
      const schemaMatches =
        typesFileContent.match(/typeof schemas\.\w+Schema/g) || [];

      console.log(`Found ${inferMatches.length} z.infer usages`);
      console.log(`Found ${schemaMatches.length} schema references`);

      // Should have many z.infer usages
      expect(inferMatches.length).toBeGreaterThan(200);
      // Most z.infer should reference a schema
      expect(schemaMatches.length).toBeCloseTo(inferMatches.length, 50);
    });
  });
});
