import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NearRpcClient, JsonRpcClientError } from '../client.js';
import { viewFunction, viewAccount, viewAccessKey } from '../convenience.js';

// Mock fetch for testing
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

describe('Error Handling', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('viewFunction error handling', () => {
    it('should throw error when RPC returns error in result (without validation)', async () => {
      const client = new NearRpcClient('https://rpc.test.near.org');

      // Mock RPC error response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          jsonrpc: '2.0',
          id: 'dontcare',
          result: {
            block_hash: 'test-hash',
            block_height: 123456,
            error:
              'wasm execution failed with error: MethodResolveError(MethodNotFound)',
            logs: [],
          },
        }),
      });

      await expect(
        viewFunction(client, {
          accountId: 'test.near',
          methodName: 'non_existent_method',
        })
      ).rejects.toThrow(JsonRpcClientError);

      // Need to mock again as the previous call consumed the mock
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          jsonrpc: '2.0',
          id: 'dontcare',
          result: {
            block_hash: 'test-hash',
            block_height: 123456,
            error:
              'wasm execution failed with error: MethodResolveError(MethodNotFound)',
            logs: [],
          },
        }),
      });

      await expect(
        viewFunction(client, {
          accountId: 'test.near',
          methodName: 'non_existent_method',
        })
      ).rejects.toThrow(
        'RPC Error: wasm execution failed with error: MethodResolveError(MethodNotFound)'
      );
    });

    it('should throw error with server message when validation is enabled', async () => {
      const client = new NearRpcClient({
        endpoint: 'https://rpc.test.near.org',
      });

      // Mock RPC error response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          jsonrpc: '2.0',
          id: 'dontcare',
          result: {
            block_hash: 'test-hash',
            block_height: 123456,
            error:
              'wasm execution failed with error: MethodResolveError(MethodNotFound)',
            logs: [],
          },
        }),
      });

      await expect(
        viewFunction(client, {
          accountId: 'test.near',
          methodName: 'non_existent_method',
        })
      ).rejects.toThrow(
        'RPC Error: wasm execution failed with error: MethodResolveError(MethodNotFound)'
      );
    });
  });

  describe('viewAccount error handling', () => {
    it('should throw error when account does not exist', async () => {
      const client = new NearRpcClient('https://rpc.test.near.org');

      // Mock RPC error response for non-existent account
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          jsonrpc: '2.0',
          id: 'dontcare',
          result: {
            error: 'Server error',
            block_hash: 'test-hash',
            block_height: 123456,
          },
        }),
      });

      await expect(
        viewAccount(client, {
          accountId: 'non-existent-account.near',
        })
      ).rejects.toThrow('RPC Error: Server error');
    });
  });

  describe('viewAccessKey error handling', () => {
    it('should throw error when access key does not exist', async () => {
      const client = new NearRpcClient('https://rpc.test.near.org');

      // Mock RPC error response for non-existent access key
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          jsonrpc: '2.0',
          id: 'dontcare',
          result: {
            error: 'access key ed25519:ABC123 does not exist while viewing',
            block_hash: 'test-hash',
            block_height: 123456,
          },
        }),
      });

      await expect(
        viewAccessKey(client, {
          accountId: 'test.near',
          publicKey: 'ed25519:ABC123',
        })
      ).rejects.toThrow(
        'RPC Error: access key ed25519:ABC123 does not exist while viewing'
      );
    });
  });

  describe('standard JSON-RPC error handling', () => {
    it('should handle standard JSON-RPC errors', async () => {
      const client = new NearRpcClient('https://rpc.test.near.org');

      // Mock standard JSON-RPC error response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          jsonrpc: '2.0',
          id: 'dontcare',
          error: {
            code: -32601,
            message: 'Method not found',
            data: null,
          },
        }),
      });

      await expect(
        viewFunction(client, {
          accountId: 'test.near',
          methodName: 'test_method',
        })
      ).rejects.toThrow('Method not found');
    });
  });
});
