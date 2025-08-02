/**
 * Example: Using version-specific exports
 *
 * This example demonstrates how to use specific versions of the NEAR RPC client
 * to ensure compatibility with different NEAR node versions.
 *
 * Run this example:
 *
 *   cd examples/typescript
 *   npx tsx version-specific-usage.ts
 */

// Import from specific versions with aliases
import {
  NearRpcClient,
  status as statusV110,
  changes,
} from '@near-js/jsonrpc-client/v1.1.0';

import {
  status as statusV111,
  genesisConfig,
  maintenanceWindows,
} from '@near-js/jsonrpc-client/v1.1.1';

import { status as statusLatest } from '@near-js/jsonrpc-client/latest';

import {
  NearRpcClient as NearRpcClientNoVal,
  status as statusNoVal,
} from '@near-js/jsonrpc-client/v1.1.0/no-validation';

import type { RpcQueryRequest } from '@near-js/jsonrpc-types/v1.1.0';

console.log('=== Using NEAR RPC Client v1.1.0 ===\n');

// Create client instance
const client = new NearRpcClient({
  endpoint: 'https://rpc.testnet.fastnear.com',
});

// Example 1: Get node status - available in all versions
console.log('1. Getting node status...');
const nodeStatus = await statusV110(client);
console.log(`   Node version: ${nodeStatus.version.version}`);
console.log(`   Chain ID: ${nodeStatus.chainId}`);
console.log(
  `   Latest block height: ${nodeStatus.syncInfo.latestBlockHeight}\n`
);

// Example 2: Use changes method - available in v1.1.0
console.log('2. Getting recent changes...');
try {
  const changesResult = await changes(client, {
    blockId: 'final',
    changesType: 'all_access_key_changes',
    accountIds: ['near'],
  });
  console.log(`   Found ${changesResult.changes.length} access key changes\n`);
} catch (error) {
  console.log('   No changes found (this is normal)\n');
}

// Example 3: Demonstrate type-safe request building
console.log('3. Building type-safe query request...');
const queryRequest: RpcQueryRequest = {
  finality: 'final',
  requestType: 'view_account',
  accountId: 'near',
};
console.log('   Query request:', queryRequest);
console.log();

console.log('=== Version Comparison Example ===\n');

console.log('Testing status method across versions:');

// All versions should work for common methods
const results = await Promise.all([
  statusV110(client).then(() => '✓ v1.1.0 works'),
  statusV111(client).then(() => '✓ v1.1.1 works'),
  statusLatest(client).then(() => '✓ latest works'),
]);

results.forEach(result => console.log(`   ${result}`));
console.log();

console.log('=== Using No-Validation Version ===\n');

// Use no-validation client
const clientNoValidation = new NearRpcClientNoVal({
  endpoint: 'https://rpc.testnet.fastnear.com',
});

console.log(
  'Using no-validation import (smaller bundle, no runtime validation)'
);
const resultNoValidation = await statusNoVal(clientNoValidation);
console.log(`   Chain ID: ${resultNoValidation.chainId}`);
console.log('   Note: Response is not validated against schema\n');

console.log('=== Version-Specific Methods Example ===\n');

// Show how different versions have different methods
console.log('Using v1.1.1 stabilized methods:');

// These methods were stabilized in v1.1.1 (were EXPERIMENTAL in earlier versions)
try {
  const genesis = await genesisConfig(client, null);
  console.log(`   ✓ genesis_config works - Chain ID: ${genesis.chainId}`);

  const maintenance = await maintenanceWindows(client, { accountId: 'near' });
  if ('result' in maintenance && Array.isArray(maintenance.result)) {
    console.log(
      `   ✓ maintenance_windows works - Found ${maintenance.result.length} windows`
    );
  } else {
    console.log('   ✓ maintenance_windows works - No windows found');
  }
} catch (error) {
  console.log('   Note: Some methods may not be available on all networks');
}

console.log('\n✨ Examples completed successfully!');
