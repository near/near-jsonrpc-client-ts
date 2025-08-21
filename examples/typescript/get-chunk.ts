/**
 * This example demonstrates how to get chunk information from the NEAR network.
 *
 * To run:
 * 1. Make sure you have the latest packages installed: `pnpm install`
 * 2. Build the packages: `pnpm build`
 * 3. Run `pnpm tsx examples/typescript/get-chunk.ts` from the root of the repository.
 */

import { NearRpcClient, chunk, block } from '@near-js/jsonrpc-client';
import type { RpcChunkResponse } from '@near-js/jsonrpc-types';

// Initialize client
const client = new NearRpcClient({
  endpoint: 'https://rpc.mainnet.fastnear.com',
});

// First, get a recent block to find chunk hashes
console.log('🔍 Getting a recent block to find chunks...');

const recentBlock = await block(client, { finality: 'final' });
console.log(`✅ Got block at height ${recentBlock.header.height}`);

// Get chunks from the block
if (recentBlock.chunks && recentBlock.chunks.length > 0) {
  console.log(`   Found ${recentBlock.chunks.length} chunks in this block`);

  // Example 1: Get chunk by chunk hash
  const firstChunkHash = recentBlock.chunks[0].chunkHash;
  console.log(`\n📦 Getting chunk by hash: ${firstChunkHash}`);

  const chunkByHash: RpcChunkResponse = await chunk(client, {
    chunkId: firstChunkHash,
  });

  console.log('✅ Chunk retrieved!');
  console.log(`   Shard ID: ${chunkByHash.header?.shardId}`);
  console.log(`   Gas used: ${chunkByHash.header?.gasUsed}`);
  console.log(`   Gas limit: ${chunkByHash.header?.gasLimit}`);
  console.log(
    `   Number of transactions: ${chunkByHash.transactions?.length || 0}`
  );
  console.log(`   Number of receipts: ${chunkByHash.receipts?.length || 0}`);

  // Show transaction details if any
  if (chunkByHash.transactions && chunkByHash.transactions.length > 0) {
    console.log('\n💸 Transactions in chunk:');
    chunkByHash.transactions.slice(0, 3).forEach((tx, index) => {
      console.log(
        `   ${index + 1}. From: ${tx.signerId} → To: ${tx.receiverId}`
      );
      if (tx.actions && tx.actions.length > 0) {
        console.log(`      Actions: ${tx.actions.length}`);
      }
    });
  }

  // Example 2: Get chunk by block ID and shard ID
  // Use the actual shard ID from the first chunk
  const shardId = recentBlock.chunks[0].shardId;
  console.log(
    `\n📦 Getting chunk for shard ${shardId} at block height ${recentBlock.header.height}...`
  );

  const chunkByShard = await chunk(client, {
    blockId: recentBlock.header.height,
    shardId: shardId,
  });

  console.log('✅ Chunk retrieved by shard ID!');
  console.log(`   Chunk hash: ${chunkByShard.header?.chunkHash}`);
  console.log(
    `   Validator proposals: ${chunkByShard.header?.validatorProposals?.length || 0}`
  );
} else {
  console.log('❌ No chunks found in the block');
}
