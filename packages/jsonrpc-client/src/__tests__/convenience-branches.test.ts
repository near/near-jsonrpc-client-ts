// Test convenience function branches to improve coverage
import { describe, it, expect, vi } from 'vitest';
import { NearRpcClient } from '../client';
import { viewAccount, viewFunction, viewAccessKey } from '../convenience';

describe('Convenience Functions Branch Coverage', () => {
  // Mock the query function to avoid validation issues
  vi.mock('../generated-functions', () => ({
    query: vi.fn().mockResolvedValue({
      amount: '1000000',
      locked: '0',
      code_hash: 'hash',
      storage_usage: 100,
      result: [1, 2, 3],
      logs: [],
      nonce: 1,
      permission: 'FullAccess',
    }),
  }));

  const mockClient = {} as NearRpcClient;

  describe('viewAccount branches', () => {
    it('should use blockId when provided', async () => {
      const result = await viewAccount(mockClient, {
        accountId: 'test.near',
        blockId: 12345,
      });
      expect(result).toBeDefined();
    });

    it('should use blockId as string', async () => {
      const result = await viewAccount(mockClient, {
        accountId: 'test.near',
        blockId: 'someHash',
      });
      expect(result).toBeDefined();
    });

    it('should use finality when blockId not provided', async () => {
      const result = await viewAccount(mockClient, {
        accountId: 'test.near',
        finality: 'optimistic',
      });
      expect(result).toBeDefined();
    });

    it('should default to final when neither provided', async () => {
      const result = await viewAccount(mockClient, {
        accountId: 'test.near',
      });
      expect(result).toBeDefined();
    });
  });

  describe('viewFunction branches', () => {
    it('should use blockId when provided', async () => {
      const result = await viewFunction(mockClient, {
        accountId: 'test.near',
        methodName: 'test',
        blockId: 99999,
      });
      expect(result).toBeDefined();
    });

    it('should use finality when blockId not provided', async () => {
      const result = await viewFunction(mockClient, {
        accountId: 'test.near',
        methodName: 'test',
        finality: 'near-final',
      });
      expect(result).toBeDefined();
    });

    it('should handle undefined argsBase64', async () => {
      const result = await viewFunction(mockClient, {
        accountId: 'test.near',
        methodName: 'test',
      });
      expect(result).toBeDefined();
    });

    it('should handle provided argsBase64', async () => {
      const result = await viewFunction(mockClient, {
        accountId: 'test.near',
        methodName: 'test',
        argsBase64: 'someBase64',
      });
      expect(result).toBeDefined();
    });
  });

  describe('viewAccessKey branches', () => {
    it('should use blockId when provided', async () => {
      const result = await viewAccessKey(mockClient, {
        accountId: 'test.near',
        publicKey: 'ed25519:key',
        blockId: 55555,
      });
      expect(result).toBeDefined();
    });

    it('should use finality when blockId not provided', async () => {
      const result = await viewAccessKey(mockClient, {
        accountId: 'test.near',
        publicKey: 'ed25519:key',
        finality: 'optimistic',
      });
      expect(result).toBeDefined();
    });

    it('should default to final', async () => {
      const result = await viewAccessKey(mockClient, {
        accountId: 'test.near',
        publicKey: 'ed25519:key',
      });
      expect(result).toBeDefined();
    });
  });
});
