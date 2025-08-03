// Test suite for client types
import { describe, it, expect } from 'vitest';
import type { ClientConfig } from '../client';
import type { RpcRequest, RpcResponse, RpcError } from '../types';
import { NearRpcError } from '../types';

describe('Client Types', () => {
  describe('ClientConfig', () => {
    it('should allow minimal configuration', () => {
      const config: ClientConfig = {
        endpoint: 'https://rpc.testnet.fastnear.com',
      };

      expect(config.endpoint).toBe('https://rpc.testnet.fastnear.com');
    });

    it('should allow full configuration', () => {
      const config: ClientConfig = {
        endpoint: 'https://rpc.testnet.fastnear.com',
        headers: {
          Authorization: 'Bearer token',
          'Custom-Header': 'value',
        },
        timeout: 10000,
        retries: 5,
      };

      expect(config.endpoint).toBe('https://rpc.testnet.fastnear.com');
      expect(config.headers).toEqual({
        Authorization: 'Bearer token',
        'Custom-Header': 'value',
      });
      expect(config.timeout).toBe(10000);
      expect(config.retries).toBe(5);
    });

    it('should allow optional fields to be undefined', () => {
      const config: ClientConfig = {
        endpoint: 'https://rpc.testnet.fastnear.com',
        headers: undefined,
        timeout: undefined,
        retries: undefined,
      };

      expect(config.endpoint).toBe('https://rpc.testnet.fastnear.com');
      expect(config.headers).toBeUndefined();
      expect(config.timeout).toBeUndefined();
      expect(config.retries).toBeUndefined();
    });
  });

  describe('RpcRequest', () => {
    it('should allow valid RPC request structure', () => {
      const request: RpcRequest = {
        jsonrpc: '2.0',
        id: 'test-id',
        method: 'status',
        params: { finality: 'final' },
      };

      expect(request.jsonrpc).toBe('2.0');
      expect(request.id).toBe('test-id');
      expect(request.method).toBe('status');
      expect(request.params).toEqual({ finality: 'final' });
    });

    it('should allow numeric IDs', () => {
      const request: RpcRequest = {
        jsonrpc: '2.0',
        id: 12345,
        method: 'block',
        params: null,
      };

      expect(request.id).toBe(12345);
    });
  });

  describe('RpcResponse', () => {
    it('should allow success response', () => {
      const response: RpcResponse<{ height: number }> = {
        jsonrpc: '2.0',
        id: 'test-id',
        result: { height: 12345 },
      };

      expect(response.result?.height).toBe(12345);
      expect(response.error).toBeUndefined();
    });

    it('should allow error response', () => {
      const response: RpcResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
        error: {
          code: -32601,
          message: 'Method not found',
        },
      };

      expect(response.error?.code).toBe(-32601);
      expect(response.result).toBeUndefined();
    });
  });

  describe('RpcError', () => {
    it('should allow basic error structure', () => {
      const error: RpcError = {
        code: -32602,
        message: 'Invalid params',
      };

      expect(error.code).toBe(-32602);
      expect(error.message).toBe('Invalid params');
    });

    it('should allow error with data', () => {
      const error: RpcError = {
        code: -32602,
        message: 'Invalid params',
        data: { details: 'Missing required field' },
      };

      expect(error.data).toEqual({ details: 'Missing required field' });
    });
  });

  describe('NearRpcError', () => {
    it('should create error with code and message', () => {
      const error = new NearRpcError(-32601, 'Method not found');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(NearRpcError);
      expect(error.code).toBe(-32601);
      expect(error.message).toBe('Method not found');
      expect(error.name).toBe('NearRpcError');
    });

    it('should create error with data', () => {
      const error = new NearRpcError(-32602, 'Invalid params', {
        field: 'accountId',
        issue: 'required',
      });

      expect(error.code).toBe(-32602);
      expect(error.message).toBe('Invalid params');
      expect(error.data).toEqual({ field: 'accountId', issue: 'required' });
    });
  });

  describe('Type Compilation', () => {
    it('should compile without TypeScript errors', () => {
      // This test ensures that all exported types can be imported and used
      // without TypeScript compilation errors
      const testVar:
        | ClientConfig
        | RpcRequest
        | RpcResponse
        | RpcError
        | NearRpcError
        | undefined = undefined;
      expect(testVar).toBeUndefined();
    });
  });
});
