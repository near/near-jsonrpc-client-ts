import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Import everything from the package to test
import {
  // Types
  type AccountView,
  type AccessKeyView,
  type RpcQueryRequest,
  // Schemas
  AccountViewSchema,
  AccessKeyViewSchema,
  RpcQueryRequestSchema,
} from '../index';

describe('README code examples', () => {
  const readmePath = path.join(__dirname, '../../README.md');
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');

  // Extract TypeScript code blocks from README
  const extractCodeBlocks = (content: string): string[] => {
    const codeBlockRegex = /```typescript\n([\s\S]*?)```/g;
    const blocks: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = codeBlockRegex.exec(content)) !== null) {
      blocks.push(match[1]);
    }
    return blocks;
  };

  const codeBlocks = extractCodeBlocks(readmeContent);

  it('should have extracted code blocks from README', () => {
    expect(codeBlocks.length).toBeGreaterThan(0);
    console.log(`Found ${codeBlocks.length} TypeScript code blocks in README`);
  });

  describe('Validate README examples data structures', () => {
    it('should have valid AccountView example', () => {
      // This matches the example in the README
      const account: AccountView = {
        amount: '1000000000000000000000000',
        locked: '0',
        codeHash: '11111111111111111111111111111111',
        storageUsage: 182,
        storagePaidAt: 0,
      };

      const result = AccountViewSchema().safeParse(account);
      expect(result.success).toBe(true);
    });

    it('should have valid AccessKeyView example', () => {
      // This matches the example in the README
      const accessKey: AccessKeyView = {
        nonce: 1,
        permission: 'FullAccess',
      };

      const result = AccessKeyViewSchema().safeParse(accessKey);
      expect(result.success).toBe(true);
    });

    it('should validate AccountView with Zod schema', () => {
      // This matches the validation example in the README
      const accountData = {
        amount: '1000000000000000000000000',
        locked: '0',
        codeHash: '11111111111111111111111111111111',
        storageUsage: 182,
        storagePaidAt: 0,
      };

      const result = AccountViewSchema().safeParse(accountData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(accountData);
      }
    });

    it('should have valid RpcQueryRequest example', () => {
      // This matches the example in the README
      const queryRequest: RpcQueryRequest = {
        requestType: 'view_account',
        finality: 'final',
        accountId: 'example.near',
      };

      const result = RpcQueryRequestSchema().safeParse(queryRequest);
      expect(result.success).toBe(true);

      // Also test with parse (which throws on error)
      expect(() => {
        RpcQueryRequestSchema().parse(queryRequest);
      }).not.toThrow();
    });

    it('should fail validation for invalid AccountView data', () => {
      const invalidData = {
        amount: 123, // Should be string
        locked: '0',
        codeHash: '11111111111111111111111111111111',
        storageUsage: 182,
        storagePaidAt: 0,
      };

      const result = AccountViewSchema().safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should fail validation for invalid RPC query request', () => {
      const invalidRequest = {
        requestType: 'invalid_type',
        finality: 'final',
        // Missing accountId for view_account request
      };

      const result = RpcQueryRequestSchema().safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });

  describe('Check README code snippets syntax', () => {
    it('should have proper import statements', () => {
      const importsBlock = codeBlocks.find(
        block => block.includes('import type') && block.includes('AccountView')
      );

      expect(importsBlock).toBeDefined();
      expect(importsBlock).toContain('@near-js/jsonrpc-types');
    });

    it('should have proper schema imports', () => {
      const schemaImports = codeBlocks.find(
        block =>
          block.includes('import {') && block.includes('AccountViewSchema')
      );

      expect(schemaImports).toBeDefined();
      expect(schemaImports).toContain('@near-js/jsonrpc-types');
    });

    it('should use correct property names (camelCase)', () => {
      // Check that examples use camelCase for properties
      const accountExample = codeBlocks.find(block =>
        block.includes('const account: AccountView')
      );

      expect(accountExample).toBeDefined();
      if (accountExample) {
        // Should use camelCase
        expect(accountExample).toContain('codeHash');
        expect(accountExample).toContain('storageUsage');
        expect(accountExample).toContain('storagePaidAt');

        // Should NOT use snake_case
        expect(accountExample).not.toContain('code_hash');
        expect(accountExample).not.toContain('storage_usage');
        expect(accountExample).not.toContain('storage_paid_at');
      }

      const queryExample = codeBlocks.find(block =>
        block.includes('const queryRequest: RpcQueryRequest')
      );

      expect(queryExample).toBeDefined();
      if (queryExample) {
        // Should use camelCase
        expect(queryExample).toContain('requestType');
        expect(queryExample).toContain('accountId');

        // Should NOT use snake_case
        expect(queryExample).not.toContain('request_type');
        expect(queryExample).not.toContain('account_id');
      }
    });
  });
});
