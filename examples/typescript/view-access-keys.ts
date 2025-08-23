/**
 * This example demonstrates how to view access keys for a NEAR account.
 * It shows how to use the query method with proper TypeScript types,
 * including the newly added blockHash and blockHeight properties.
 *
 * To run this example:
 * 1. Make sure you have pnpm installed (https://pnpm.io/installation).
 * 2. Run `pnpm install` from the root of the repository.
 * 3. Run `pnpm tsx examples/typescript/view-access-keys.ts` from the root of the repository.
 */

import { NearRpcClient, query } from '@near-js/jsonrpc-client';
import type {
  RpcQueryResponse,
  AccessKeyList,
  AccessKeyView,
} from '@near-js/jsonrpc-types';

// Create RPC client - using FastNEAR endpoint to avoid rate limits
const client = new NearRpcClient({
  endpoint: 'https://rpc.mainnet.fastnear.com',
});

// View all access keys for treasury-factory.near
console.log('Fetching access keys for account: treasury-factory.near');
console.log('='.repeat(60));

const response = (await query(client, {
  requestType: 'view_access_key_list',
  accountId: 'treasury-factory.near',
  finality: 'final',
})) as RpcQueryResponse;

// The response is an intersection type with the access key list and block info
const accessKeyList = response as AccessKeyList;

// Display block information (these properties are now properly typed thanks to our fix!)
console.log('\nBlock Information:');
console.log(`  Block Hash: ${response.blockHash}`);
console.log(`  Block Height: ${response.blockHeight}`);

// Display access keys
console.log(`\nAccess Keys (${accessKeyList.keys.length} total):`);
console.log('-'.repeat(60));

accessKeyList.keys.forEach((keyInfo, index) => {
  console.log(`\nKey #${index + 1}:`);
  console.log(`  Public Key: ${keyInfo.publicKey}`);
  console.log(`  Nonce: ${keyInfo.accessKey.nonce}`);

  const permission = keyInfo.accessKey.permission;
  if (permission === 'FullAccess') {
    console.log(`  Permission: Full Access`);
  } else if (
    permission &&
    typeof permission === 'object' &&
    'FunctionCall' in permission
  ) {
    const funcCall = permission.FunctionCall;
    console.log(`  Permission: Function Call`);
    console.log(`    Allowance: ${funcCall.allowance || 'unlimited'}`);
    console.log(`    Receiver: ${funcCall.receiverId}`);
    if (funcCall.methodNames && funcCall.methodNames.length > 0) {
      console.log(`    Methods: ${funcCall.methodNames.join(', ')}`);
    } else {
      console.log(`    Methods: all methods`);
    }
  }
});

// View a single access key example (if the first key exists)
if (accessKeyList.keys.length > 0) {
  const firstKey = accessKeyList.keys[0];
  console.log('\n' + '='.repeat(60));
  console.log('Fetching details for a specific access key:');
  console.log(`Account: treasury-factory.near`);
  console.log(`Public Key: ${firstKey.publicKey}`);
  console.log('-'.repeat(60));

  const singleKeyResponse = (await query(client, {
    requestType: 'view_access_key',
    accountId: 'treasury-factory.near',
    publicKey: firstKey.publicKey,
    finality: 'final',
  })) as RpcQueryResponse;

  // Display block information for single key query
  console.log('\nBlock Information:');
  console.log(`  Block Hash: ${singleKeyResponse.blockHash}`);
  console.log(`  Block Height: ${singleKeyResponse.blockHeight}`);

  // The response for a single key is AccessKeyView
  const accessKey = singleKeyResponse as AccessKeyView;
  console.log('\nAccess Key Details:');
  console.log(`  Nonce: ${accessKey.nonce}`);

  const singlePermission = accessKey.permission;
  if (singlePermission === 'FullAccess') {
    console.log(`  Permission: Full Access`);
  } else if (
    singlePermission &&
    typeof singlePermission === 'object' &&
    'FunctionCall' in singlePermission
  ) {
    const funcCall = singlePermission.FunctionCall;
    console.log(`  Permission: Function Call`);
    console.log(`    Allowance: ${funcCall.allowance || 'unlimited'}`);
    console.log(`    Receiver: ${funcCall.receiverId}`);
    if (funcCall.methodNames && funcCall.methodNames.length > 0) {
      console.log(`    Methods: ${funcCall.methodNames.join(', ')}`);
    } else {
      console.log(`    Methods: all methods`);
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log('Example complete!');
