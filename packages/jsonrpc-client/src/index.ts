// @near-js/jsonrpc-client
// TypeScript client for NEAR Protocol JSON-RPC API

export * from './client';
export * from './types';

// Export the client class and default client instance
export { NearRpcClient, defaultClient } from './client';

// Export interfaces from generated types (but not the functions to avoid conflicts)
export type {
  DynamicRpcMethods,
  ConvenienceMethods,
  CompleteClientInterface,
} from './generated-types';

// Re-export commonly used types from the types package
export {
  JsonRpcRequestSchema,
  JsonRpcResponseSchema,
} from '@near-js/jsonrpc-types';

// Re-export RPC methods
export { RPC_METHODS } from '@near-js/jsonrpc-types';

// Export individual tree-shakable functions WITH validation
export * from './validated/index.js';

// Default export for convenience
export { NearRpcClient as default } from './client';
