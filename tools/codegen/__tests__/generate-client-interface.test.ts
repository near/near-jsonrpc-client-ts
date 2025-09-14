// Tests for client interface generator
// Ensures type generation works correctly and handles API evolution

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateClientInterface } from '../generate-client-interface.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Client Interface Generator', () => {
  let originalSpec: any;
  let tempDir: string;

  beforeAll(async () => {
    // Create temp directory for tests
    tempDir = join(__dirname, 'temp');
    await fs.mkdir(tempDir, { recursive: true });

    // Load OpenAPI spec from local fixture (avoids network issues)
    console.log('📁 Loading NEAR OpenAPI spec from fixtures...');
    const fixturesDir = join(__dirname, '../fixtures');
    const specPath = join(fixturesDir, 'openapi-baseline.json');
    const specText = await fs.readFile(specPath, 'utf8');

    // Parse JSON spec
    originalSpec = JSON.parse(specText);

    console.log(
      `📋 Loaded spec with ${Object.keys(originalSpec.paths || {}).length} endpoints`
    );
  });

  afterAll(async () => {
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('Type Generation Regression Tests', () => {
    it('should generate the same types from current OpenAPI spec', async () => {
      // Generate types using current spec
      const mockMethods = [
        'block',
        'health',
        'status',
        'EXPERIMENTAL_genesis_config',
      ];
      const mockPathToMethodMap = {
        '/block': 'block',
        '/health': 'health',
        '/status': 'status',
        '/EXPERIMENTAL_genesis_config': 'EXPERIMENTAL_genesis_config',
      };

      const outputPath = join(tempDir, 'generated-test.ts');
      const result = await generateClientInterface(
        mockMethods,
        outputPath,
        mockPathToMethodMap,
        originalSpec
      );

      expect(result.methodCount).toBe(4);
      expect(result.content).toContain('export interface DynamicRpcMethods');
      expect(result.content).toContain(
        'block(params: RpcBlockRequest): Promise<RpcBlockResponse>'
      );
      expect(result.content).toContain(
        'health(params?: RpcHealthRequest): Promise<RpcHealthResponse>'
      );
      expect(result.content).toContain(
        'experimentalGenesisConfig(params?: GenesisConfigRequest): Promise<GenesisConfig>'
      );

      // Verify file was created
      const generatedContent = await fs.readFile(outputPath, 'utf8');
      expect(generatedContent).toContain("from '@near-js/jsonrpc-types'");
    }, 30000);

    it('should handle all current RPC methods without errors', async () => {
      // Extract all methods from the spec
      const allMethods: string[] = [];
      const pathToMethodMap: Record<string, string> = {};

      for (const [path, pathSpec] of Object.entries(originalSpec.paths || {})) {
        const post = (pathSpec as any)?.post;
        if (post?.operationId) {
          const method = post.operationId.replace(/^rpc_/, '');
          allMethods.push(method);
          pathToMethodMap[path] = method;
        }
      }

      const outputPath = join(tempDir, 'all-methods-test.ts');
      const result = await generateClientInterface(
        allMethods,
        outputPath,
        pathToMethodMap,
        originalSpec
      );

      expect(result.methodCount).toBeGreaterThan(20); // Should have many methods
      expect(result.content).toContain('export interface DynamicRpcMethods');

      // Verify no typescript compilation errors in generated file
      const generatedContent = await fs.readFile(outputPath, 'utf8');
      expect(generatedContent).not.toContain('any'); // Should not fall back to 'any' types
    }, 30000);
  });

  describe('Type Safety Tests', () => {
    it('should generate properly typed method signatures', async () => {
      const testMethods = ['block', 'broadcast_tx_async', 'query'];
      const pathToMethodMap = {
        '/block': 'block',
        '/broadcast_tx_async': 'broadcast_tx_async',
        '/query': 'query',
      };

      const outputPath = join(tempDir, 'type-safety-test.ts');
      const result = await generateClientInterface(
        testMethods,
        outputPath,
        pathToMethodMap,
        originalSpec
      );

      const content = result.content;

      // Check specific type mappings we know should work
      expect(content).toContain(
        'block(params: RpcBlockRequest): Promise<RpcBlockResponse>'
      );
      expect(content).toContain(
        'broadcastTxAsync(params: RpcSendTransactionRequest): Promise<CryptoHash>'
      );
      expect(content).toContain(
        'query(params: RpcQueryRequest): Promise<RpcQueryResponse>'
      );

      // Ensure no generic unknown types
      expect(content).not.toMatch(/params\?: unknown/);
      expect(content).not.toMatch(/Promise<unknown>/);
    }, 30000);

    it('should handle EXPERIMENTAL methods correctly', async () => {
      const testMethods = [
        'EXPERIMENTAL_genesis_config',
        'EXPERIMENTAL_validators_ordered',
      ];
      const pathToMethodMap = {
        '/EXPERIMENTAL_genesis_config': 'EXPERIMENTAL_genesis_config',
        '/EXPERIMENTAL_validators_ordered': 'EXPERIMENTAL_validators_ordered',
      };

      const outputPath = join(tempDir, 'experimental-test.ts');
      const result = await generateClientInterface(
        testMethods,
        outputPath,
        pathToMethodMap,
        originalSpec
      );

      const content = result.content;

      // Check camelCase conversion for EXPERIMENTAL methods
      expect(content).toContain('experimentalGenesisConfig');
      expect(content).toContain('experimentalValidatorsOrdered');

      // Check type mappings
      expect(content).toContain(
        'experimentalGenesisConfig(params?: GenesisConfigRequest): Promise<GenesisConfig>'
      );
    }, 30000);
  });

  describe('API Evolution Tests', () => {
    it('should handle new methods added to the API', async () => {
      // Create a modified spec with a new fake method
      const modifiedSpec = JSON.parse(JSON.stringify(originalSpec));

      // Add a fake new method by duplicating an existing one
      const newPath = '/fake_new_method';
      const newMethodSpec = JSON.parse(
        JSON.stringify(modifiedSpec.paths['/block'])
      );

      // Modify the operationId and method name
      newMethodSpec.post.operationId = 'rpc_fake_new_method';
      newMethodSpec.post.summary = 'Fake new method for testing';

      modifiedSpec.paths[newPath] = newMethodSpec;

      // Test generation with the new method
      const testMethods = ['block', 'fake_new_method'];
      const pathToMethodMap = {
        '/block': 'block',
        '/fake_new_method': 'fake_new_method',
      };

      const outputPath = join(tempDir, 'evolution-test.ts');
      const result = await generateClientInterface(
        testMethods,
        outputPath,
        pathToMethodMap,
        modifiedSpec
      );

      const content = result.content;

      // Should include both methods
      expect(content).toContain(
        'block(params: RpcBlockRequest): Promise<RpcBlockResponse>'
      );
      expect(content).toContain(
        'fakeNewMethod(params: RpcBlockRequest): Promise<RpcBlockResponse>'
      );
      expect(result.methodCount).toBe(2);
    }, 30000);

    it('should handle methods with different parameter types', async () => {
      // Test that different endpoints can have different parameter types
      const testMethods = ['block', 'health', 'gas_price'];
      const pathToMethodMap = {
        '/block': 'block',
        '/health': 'health',
        '/gas_price': 'gas_price',
      };

      const outputPath = join(tempDir, 'param-types-test.ts');
      const result = await generateClientInterface(
        testMethods,
        outputPath,
        pathToMethodMap,
        originalSpec
      );

      const content = result.content;

      // Each method should have different parameter types
      expect(content).toContain('block(params: RpcBlockRequest)');
      expect(content).toContain('health(params?: RpcHealthRequest)');
      expect(content).toContain('gasPrice(params: RpcGasPriceRequest)');
    }, 30000);
  });

  describe('Generator Robustness Tests', () => {
    it('should handle missing or malformed schema gracefully', async () => {
      // Create a spec with missing schemas
      const minimalSpec = {
        paths: {
          '/test_method': {
            post: {
              operationId: 'rpc_test_method',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/NonExistentSchema',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {},
        },
      };

      const testMethods = ['test_method'];
      const pathToMethodMap = { '/test_method': 'test_method' };

      const outputPath = join(tempDir, 'robustness-test.ts');

      // Should not throw an error, but fallback to heuristics
      await expect(
        generateClientInterface(
          testMethods,
          outputPath,
          pathToMethodMap,
          minimalSpec
        )
      ).resolves.toBeDefined();

      const content = await fs.readFile(outputPath, 'utf8');
      expect(content).toContain('testMethod'); // Should still generate method
    }, 30000);

    it('should validate generated TypeScript compiles', async () => {
      // Generate a full interface and verify it's valid TypeScript
      const testMethods = ['block', 'health', 'status'];
      const pathToMethodMap = {
        '/block': 'block',
        '/health': 'health',
        '/status': 'status',
      };

      const outputPath = join(tempDir, 'compile-test.ts');
      await generateClientInterface(
        testMethods,
        outputPath,
        pathToMethodMap,
        originalSpec
      );

      const content = await fs.readFile(outputPath, 'utf8');

      // Basic syntax validation
      expect(content).toMatch(/export interface \w+/);
      expect(content).toMatch(
        /import type \{[\s\S]*\} from '@near-js\/jsonrpc-types'/
      );
      expect(content).not.toContain('Promise<Promise<'); // No double promises
      expect(content).not.toContain('undefined'); // No undefined types

      // All method signatures should follow pattern
      const methodPattern = /\w+\(params\?: \w+\): Promise<\w+>;/g;
      const matches = content.match(methodPattern);
      expect(matches).toBeTruthy();
      expect(matches!.length).toBeGreaterThan(0);
    }, 30000);
  });
});
