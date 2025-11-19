/**
 * Demo showing status, block, health, and account viewing methods.
 *
 * To run this example:
 * 1. Make sure you have pnpm installed (https://pnpm.io/installation).
 * 2. Run `pnpm install` from the root of the repository.
 * 3. Run `node examples/javascript-cjs/status-and-account-demo.js` from the root of the repository.
 */

const {
  NearRpcClient,
  status,
  block,
  gasPrice,
  health,
  viewAccount,
} = require('@near-js/jsonrpc-client');

async function testClient() {
  console.log('🚀 Testing NEAR RPC Client...\n');

  // Create client instance
  const client = new NearRpcClient({
    endpoint: 'https://rpc.testnet.fastnear.com',
  });
  console.log('✅ Client created for testnet');

  // Test 1: Get node status
  console.log('\n📊 Testing status() method...');
  const statusResult = await status(client);
  console.log(
    `✅ Node status: ${statusResult.chainId} (${statusResult.version?.version || 'unknown'})`
  );
  console.log(
    `   Block height: ${statusResult.syncInfo?.latestBlockHeight || 'unknown'}`
  );

  // Test 2: Get latest block
  console.log('\n🧱 Testing block() method...');
  const blockResult = await block(client, { finality: 'final' });
  console.log(`✅ Latest block: ${blockResult.header?.height || 'unknown'}`);
  console.log(
    `   Hash: ${blockResult.header?.hash?.substring(0, 16) || 'unknown'}...`
  );

  // Test 3: Test gas price
  console.log('\n⛽ Testing gasPrice() method...');
  const gasPriceResult = await gasPrice(client, [null]);
  console.log(`✅ Gas price: ${gasPriceResult.gasPrice} yoctoNEAR`);

  // Test 4: Test health endpoint
  console.log('\n🏥 Testing health() method...');
  const healthResult = await health(client);
  console.log(
    `✅ Health check: ${healthResult === null ? 'OK' : 'Issues detected'}`
  );

  // Test 5: Test a view account call
  console.log('\n👤 Testing viewAccount() method...');
  const account = await viewAccount(client, {
    accountId: 'testnet',
    finality: 'final',
  });
  console.log(`✅ Account balance: ${account.amount} yoctoNEAR`);
  console.log(`   Storage used: ${account.storageUsage} bytes`);

  console.log('\n🎉 All tests passed! Client is working correctly.');
}

// Run the test
testClient();
