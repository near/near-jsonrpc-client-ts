/**
 * This example demonstrates how to get validator information from the NEAR network.
 *
 * To run:
 * 1. Make sure you have the latest packages installed: `pnpm install`
 * 2. Build the packages: `pnpm build`
 * 3. Run `pnpm tsx examples/typescript/get-validators.ts` from the root of the repository.
 */

import { NearRpcClient, validators } from '@near-js/jsonrpc-client';
import type { RpcValidatorResponse } from '@near-js/jsonrpc-types';

// Initialize client
const client = new NearRpcClient({
  endpoint: 'https://rpc.mainnet.fastnear.com',
});

// Example 1: Get current validators
console.log('👥 Getting current epoch validators...');

const currentValidators: RpcValidatorResponse = await validators(client, {
  latest: null,
});

console.log(
  `✅ Found ${currentValidators.currentValidators?.length || 0} current validators`
);
console.log(`   Epoch height: ${currentValidators.epochHeight}`);
console.log(`   Epoch start height: ${currentValidators.epochStartHeight}`);

// Show top 5 validators by stake
if (
  currentValidators.currentValidators &&
  currentValidators.currentValidators.length > 0
) {
  console.log('\n📊 Top 5 validators by stake:');
  const topValidators = [...currentValidators.currentValidators]
    .sort((a, b) => Number(BigInt(b.stake) - BigInt(a.stake)))
    .slice(0, 5);

  topValidators.forEach((validator, index) => {
    const stakeInNEAR = BigInt(validator.stake) / BigInt(10 ** 24);
    console.log(
      `   ${index + 1}. ${validator.accountId}: ${stakeInNEAR.toLocaleString()} NEAR`
    );
  });
}

// Example 2: Get validators for a specific block
console.log('\n🔍 Getting validators for a specific block...');

const blockValidators = await validators(client, { latest: null });

console.log(`✅ Validators at final block:`);
console.log(
  `   Current validators: ${blockValidators.currentValidators?.length || 0}`
);
console.log(
  `   Next validators: ${blockValidators.nextValidators?.length || 0}`
);
console.log(
  `   Current proposals: ${blockValidators.currentProposals?.length || 0}`
);

// Show validator changes
if (blockValidators.nextValidators && blockValidators.currentValidators) {
  const currentSet = new Set(
    blockValidators.currentValidators.map(v => v.accountId)
  );
  const nextSet = new Set(blockValidators.nextValidators.map(v => v.accountId));

  const joining = [...nextSet].filter(v => !currentSet.has(v));
  const leaving = [...currentSet].filter(v => !nextSet.has(v));

  if (joining.length > 0) {
    console.log(
      `\n➕ Validators joining next epoch: ${joining.slice(0, 3).join(', ')}${joining.length > 3 ? '...' : ''}`
    );
  }
  if (leaving.length > 0) {
    console.log(
      `➖ Validators leaving next epoch: ${leaving.slice(0, 3).join(', ')}${leaving.length > 3 ? '...' : ''}`
    );
  }
}

// Example 3: Check current proposals
if (
  blockValidators.currentProposals &&
  blockValidators.currentProposals.length > 0
) {
  console.log('\n📋 Current staking proposals:');
  blockValidators.currentProposals.slice(0, 5).forEach(proposal => {
    const stakeInNEAR = BigInt(proposal.stake) / BigInt(10 ** 24);
    console.log(
      `   ${proposal.accountId}: ${stakeInNEAR.toLocaleString()} NEAR`
    );
  });
}
