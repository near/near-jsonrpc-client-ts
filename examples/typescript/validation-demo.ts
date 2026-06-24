/**
 * This example demonstrates the built-in validation in NEAR RPC client functions.
 * It shows how validation catches errors and ensures type safety.
 *
 * To run this example:
 * 1. Make sure you have pnpm installed (https://pnpm.io/installation).
 * 2. Run `pnpm install` from the root of the repository.
 * 3. Run `pnpm tsx examples/typescript/validation-demo.ts` from the root of the repository.
 */

import {
  NearRpcClient,
  status,
  health,
  block,
  validators,
  viewAccount,
} from '@near-js/jsonrpc-client';

// Import no-validation versions for comparison
import { block as blockNoValidation } from '@near-js/jsonrpc-client/no-validation';

// Create client (functions have built-in validation by default)
const client = new NearRpcClient({
  endpoint: 'https://rpc.testnet.fastnear.com',
});

console.log('=== NEAR RPC Client Validation Demo ===\n');

// Example 1: Methods with no parameters (testing undefined to null conversion)
console.log('1. Testing methods with no parameters:');
try {
  const statusResult = await status(client);
  console.log('✅ Status call successful:', {
    chainId: statusResult.chainId,
    latestBlockHeight: statusResult.syncInfo.latestBlockHeight,
  });

  const healthResult = await health(client);
  console.log('✅ Health call successful:', healthResult);

  // Note: networkInfo has a known schema mismatch - addr field expects string but API returns null
  // This is documented and will be fixed in the schema
  console.log('⚠️  Skipping networkInfo due to known schema mismatch');
} catch (error) {
  console.error('❌ Error in no-parameter methods:', error);
}

// Example 2: Methods with parameters
console.log('\n2. Testing methods with parameters:');
try {
  const blockResult = await block(client, { finality: 'final' });
  console.log('✅ Block call successful:', {
    height: blockResult.header.height,
    hash: blockResult.header.hash,
  });

  const validatorsResult = await validators(client, { latest: null });
  console.log('✅ Validators call successful:', {
    validatorCount: validatorsResult.currentValidators.length,
    epochHeight: validatorsResult.epochHeight,
  });

  const accountResult = await viewAccount(client, {
    accountId: 'example.testnet',
    finality: 'final',
  });
  console.log('✅ View account call successful:', {
    amount: accountResult.amount,
    storageUsage: accountResult.storageUsage,
  });
} catch (error) {
  console.error('❌ Error in parameterized methods:', error);
}

// Example 3: Demonstrate validation catching invalid parameters
console.log('\n3. Testing validation with invalid parameters:');

try {
  // @ts-expect-error - Intentionally passing invalid parameter to test validation
  await block(client, { finality: 'not-a-valid-finality' });
  console.log('❌ Should not reach here - validation should have failed');
} catch (error) {
  console.log(
    '✅ Validation correctly caught invalid parameter:',
    error instanceof Error ? error.message : String(error)
  );
}

// Example 4: Compare with no-validation import
console.log('\n4. Comparing validated vs no-validation imports:');

console.log('Using default import (with validation):');
try {
  // @ts-expect-error - Intentionally passing invalid parameter
  await block(client, { finality: 'not-a-valid-finality' });
} catch (error) {
  console.log(
    '✅ Validated function caught error before network call:',
    error instanceof Error
      ? error.message.substring(0, 50) + '...'
      : String(error)
  );
}

console.log('\nUsing no-validation import:');
try {
  // @ts-expect-error - Intentionally passing invalid parameter
  await blockNoValidation(client, { finality: 'not-a-valid-finality' });
} catch (error) {
  console.log(
    '✅ No-validation function error from server:',
    error instanceof Error ? error.message : String(error)
  );
}

console.log('\n=== Demo complete! ===');
console.log('Built-in validation ensures:');
console.log('- Type safety for requests and responses');
console.log('- Early error detection before network calls');
console.log('- Better developer experience with clear error messages');
console.log('- Optimal bundle size through per-function validation');
