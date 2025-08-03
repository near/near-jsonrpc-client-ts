// No-validation convenience functions for version v1.1.1
import type { NearRpcClient } from '../../client.js';
import { query } from '../generated-functions.js';
import type {
  AccessKeyView,
  AccountView,
  CallResult,
} from '@near-js/jsonrpc-types';

// Re-export JSON parsing utilities
export { parseCallResultToJson, viewFunctionAsJson } from '../convenience.js';

// Convenience function wrappers WITHOUT validation
export async function viewAccount(
  client: NearRpcClient,
  params: {
    accountId: string;
    finality?: 'final' | 'near-final' | 'optimistic';
    blockId?: string | number;
  }
): Promise<AccountView> {
  // Use the query function directly (no validation)
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
  // Use the query function directly (no validation)
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
  // Use the query function directly (no validation)
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
