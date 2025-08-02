/**
 * Example: Version Compatibility
 *
 * Shows how to use specific versions for compatibility with different RPC providers
 *
 * Run this example:
 *
 *   cd examples/typescript
 *   npx tsx version-compatibility.ts
 */

import { NearRpcClient, status } from '@near-js/jsonrpc-client';

// Import v1.1.0 methods with aliases
import { changes as changesV110 } from '@near-js/jsonrpc-client/v1.1.0';

// Import v1.1.1 methods with aliases
import {
  genesisConfig,
  maintenanceWindows,
} from '@near-js/jsonrpc-client/v1.1.1';

// Import no-validation variant
import { status as statusNoVal } from '@near-js/jsonrpc-client/latest/no-validation';

// Import types from specific version
import type { BlockReference } from '@near-js/jsonrpc-types/v1.1.0';

console.log('=== Version Compatibility Examples ===\n');

// Create a client for all examples
const client = new NearRpcClient({
  endpoint: 'https://rpc.testnet.fastnear.com',
});

// Example 1: Check provider version and choose appropriate imports
console.log('1. Checking RPC provider version...');
const nodeStatus = await status(client);
const nodeVersion = nodeStatus.version.version;
console.log(`   Provider is running: ${nodeVersion}`);
console.log(`   Chain ID: ${nodeStatus.chainId}\n`);

// Example 2: Use version-specific features
console.log('2. Using version-specific features...');

try {
  // These methods were stabilized in v1.1.1
  const genesis = await genesisConfig(client, null);
  console.log(
    `   Genesis time: ${new Date(genesis.genesisTime).toISOString()}`
  );
  console.log(`   Chain ID from genesis: ${genesis.chainId}`);

  // Check maintenance windows
  const maintenance = await maintenanceWindows(client, { accountId: 'near' });
  if ('result' in maintenance && Array.isArray(maintenance.result)) {
    console.log(`   Maintenance windows: ${maintenance.result.length}`);
  } else {
    console.log('   No maintenance windows found');
  }
} catch (error) {
  console.log('   Note: Some methods may not be available on all networks');
}

console.log();

// Example 3: Import based on feature needs
console.log('3. Feature-based version selection...');

// If you need the changes method (available since v1.1.0)
if (nodeVersion >= '1.1.0') {
  console.log('   ✓ Can use changes method (v1.1.0+)');

  try {
    const result = await changesV110(client, {
      blockId: 'final',
      changesType: 'all_access_key_changes',
      accountIds: ['near'],
    });
    console.log(`   Found ${result.changes.length} changes`);
  } catch {
    console.log('   No changes found');
  }
} else {
  console.log('   ✗ changes method not available (need v1.1.0+)');
}

console.log();

// Example 4: No-validation for performance
console.log('4. Using no-validation for better performance...');

const start = Date.now();
await statusNoVal(client);
const noValTime = Date.now() - start;

console.log(`   No-validation request took: ${noValTime}ms`);
console.log('   Benefits: Smaller bundle, faster execution');
console.log('   Trade-off: No runtime type checking\n');

// Example 5: Type imports from specific versions
console.log('5. Using version-specific types...');

// This ensures type compatibility with v1.1.0
const blockRef: BlockReference = {
  finality: 'final',
};
console.log('   Created type-safe block reference:', blockRef);

console.log('\n✨ All examples completed successfully!');
console.log('\n📚 Key takeaways:');
console.log('   - Use specific versions for RPC provider compatibility');
console.log('   - Import types from the same version as your client');
console.log('   - Use no-validation variants for performance');
console.log('   - Check node version before using newer methods');
