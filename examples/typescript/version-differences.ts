/**
 * Example: Concrete Version Differences
 *
 * This example shows the actual differences between NEAR RPC versions
 *
 * Run this example:
 *
 *   cd examples/typescript
 *   npx tsx version-differences.ts
 */

import { NearRpcClient } from '@near-js/jsonrpc-client';

// Import v1.1.0 - has EXPERIMENTAL versions only
import {
  experimentalGenesisConfig as genesisConfigExp110,
  experimentalMaintenanceWindows as maintenanceWindowsExp110,
} from '@near-js/jsonrpc-client/v1.1.0';

// Import v1.1.1 - has stabilized versions
import {
  genesisConfig,
  maintenanceWindows,
  blockEffects, // New method in v1.1.1
} from '@near-js/jsonrpc-client/v1.1.1';

// Create client
const client = new NearRpcClient({
  endpoint: 'https://rpc.testnet.fastnear.com',
});

console.log('=== Concrete Version Differences ===\n');

console.log('1. Methods stabilized in v1.1.1 (were EXPERIMENTAL in v1.1.0):\n');

// In v1.1.0, you had to use EXPERIMENTAL_ prefix
console.log(
  '   v1.1.0: experimentalGenesisConfig, experimentalMaintenanceWindows'
);
console.log('   v1.1.1: genesisConfig, maintenanceWindows (stabilized)\n');

// Example: Using genesis_config
console.log('2. Using genesis_config method:');
try {
  // v1.1.0 way (EXPERIMENTAL)
  console.log('   v1.1.0: Using experimentalGenesisConfig...');
  const genesisExp = await genesisConfigExp110(client, null);
  console.log(`   ✓ Chain ID: ${genesisExp.chainId}`);

  // v1.1.1 way (stabilized)
  console.log('   v1.1.1: Using genesis_config (stabilized)...');
  const genesis = await genesisConfig(client, null);
  console.log(`   ✓ Chain ID: ${genesis.chainId}\n`);
} catch (error) {
  console.log('   Note: Some methods may not work on all networks\n');
}

console.log('3. New methods added in v1.1.1:\n');
console.log('   • block_effects - Get state changes in a block');
console.log('   • genesis_config - Get genesis configuration (stabilized)');
console.log(
  '   • maintenance_windows - Get maintenance windows (stabilized)\n'
);

// Example: Using block_effects (new in v1.1.1)
console.log('4. Using block_effects (new in v1.1.1):');
try {
  const effects = await blockEffects(client, { finality: 'final' });
  console.log(`   ✓ Got state changes for block ${effects.blockHash}`);
  console.log(`   ✓ Changes count: ${effects.changes.length}\n`);
} catch (error) {
  console.log('   ✗ block_effects not available (v1.1.1+ only)\n');
}

console.log('5. Version Summary:\n');
console.log('   v1.0.0: 28 methods (16 stable + 12 experimental)');
console.log('   v1.1.0: 28 methods (16 stable + 12 experimental)');
console.log('   v1.1.1: 31 methods (19 stable + 12 experimental)');
console.log('           → Added: block_effects');
console.log('           → Stabilized: genesis_config, maintenance_windows\n');

console.log('📚 Key Takeaway:');
console.log(
  '   If your RPC provider runs v1.1.0 or older, use EXPERIMENTAL_ methods'
);
console.log(
  '   If your RPC provider runs v1.1.1+, use the stabilized versions'
);
