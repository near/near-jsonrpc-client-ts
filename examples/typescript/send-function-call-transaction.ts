/**
 * This example demonstrates how to send a function call transaction to a testnet contract
 * using our RPC client for all blockchain interactions and near-api-js only for signing.
 *
 * Prerequisites:
 * 1. You need a testnet account with some NEAR tokens
 * 2. Set your account ID and private key as environment variables:
 *    export NEAR_ACCOUNT_ID="your-account.testnet"
 *    export NEAR_PRIVATE_KEY="ed25519:..."
 *
 * To run:
 * 1. Make sure you have the latest packages installed: `pnpm install`
 * 2. Build the packages: `pnpm build`
 * 3. Set your environment variables
 * 4. Run `pnpm tsx examples/typescript/send-function-call-transaction.ts` from the root of the repository.
 */

import {
  NearRpcClient,
  viewAccessKey,
  broadcastTxCommit,
  viewFunction,
  parseCallResultToJson,
  block,
  gasPrice,
} from '@near-js/jsonrpc-client';
import { KeyPair, transactions, utils } from 'near-api-js';

// Initialize our RPC client
const client = new NearRpcClient({
  endpoint: 'https://rpc.testnet.fastnear.com',
});

// Get credentials from environment variables
const accountId = process.env.NEAR_ACCOUNT_ID;
const privateKey = process.env.NEAR_PRIVATE_KEY;

if (!accountId || !privateKey) {
  console.error(
    '❌ Error: Please set NEAR_ACCOUNT_ID and NEAR_PRIVATE_KEY environment variables'
  );
  console.error('   Example:');
  console.error('   export NEAR_ACCOUNT_ID="your-account.testnet"');
  console.error('   export NEAR_PRIVATE_KEY="ed25519:..."');
  process.exit(1);
}

console.log('🚀 Sending Function Call Transaction Example\n');
console.log(`📍 Account: ${accountId}`);
console.log(`🌐 Network: testnet`);

try {
  // Step 1: Get account's current nonce using our RPC client
  console.log('\n1️⃣ Getting account information...');

  const keyPair = KeyPair.fromString(privateKey as any);
  const publicKey = keyPair.getPublicKey().toString();

  // Use viewAccessKey convenience function
  const accessKeyResult = await viewAccessKey(client, {
    accountId: accountId,
    publicKey: publicKey,
    finality: 'final',
  });

  const nonce = accessKeyResult.nonce + 1;
  // Get block hash from a recent block query
  const blockResult = await block(client, { finality: 'final' });
  const blockHash = blockResult.header.hash;

  console.log(`   ✅ Current nonce: ${accessKeyResult.nonce}`);
  console.log(`   ✅ Using nonce: ${nonce}`);
  console.log(`   ✅ Block hash: ${blockHash}`);

  // Step 2: Create the transaction
  console.log('\n2️⃣ Creating transaction...');

  // Guest book contract on testnet that anyone can call
  const contractId = 'guest-book.testnet';
  const methodName = 'addMessage';
  const args = {
    text: `Hello from @near-js/jsonrpc-client at ${new Date().toISOString()}`,
  };

  console.log(`   📄 Contract: ${contractId}`);
  console.log(`   📞 Method: ${methodName}`);
  console.log(`   📝 Arguments: ${JSON.stringify(args)}`);

  const actions = [
    transactions.functionCall(
      methodName,
      args,
      BigInt(100000000000000), // 100 TGas
      BigInt(0) // No deposit required for guest book
    ),
  ];

  const transaction = transactions.createTransaction(
    accountId,
    keyPair.getPublicKey(),
    contractId,
    nonce,
    actions,
    utils.serialize.base_decode(blockHash)
  );

  // Step 3: Sign the transaction
  console.log('\n3️⃣ Signing transaction...');

  // Use utils.serialize to properly serialize and sign
  const serializedTx = utils.serialize.serialize(
    transactions.SCHEMA.Transaction,
    transaction
  );

  // Hash the serialized transaction using Web Crypto API
  const hashBuffer = await crypto.subtle.digest('SHA-256', serializedTx);
  const txHash = new Uint8Array(hashBuffer);

  const signature = keyPair.sign(txHash);

  // Create the signed transaction with proper borsh serialization
  const signedTx = new transactions.SignedTransaction({
    transaction: transaction,
    signature: new transactions.Signature({
      keyType: transaction.publicKey.keyType,
      data: signature.signature,
    }),
  });

  // Serialize using borsh
  const signedTxBytes = signedTx.encode();
  const signedTxBase64 = Buffer.from(signedTxBytes).toString('base64');
  console.log(`   ✅ Transaction signed`);
  console.log(`   📦 Size: ${signedTxBytes.length} bytes`);

  // Step 4: Send the transaction using our RPC client
  console.log('\n4️⃣ Broadcasting transaction...');

  const result = await broadcastTxCommit(client, {
    signedTxBase64: signedTxBase64,
    waitUntil: 'EXECUTED', // Wait until the transaction is executed
  });

  console.log(`   ✅ Transaction sent!`);
  console.log(`   🔗 Transaction hash: ${result.transaction?.hash}`);

  // Step 5: Check the result
  console.log('\n5️⃣ Transaction result:');

  if (
    result.status &&
    typeof result.status === 'object' &&
    'SuccessValue' in result.status
  ) {
    console.log('   ✅ Transaction succeeded!');

    if (result.status.SuccessValue) {
      // The transaction result doesn't return a CallResult, just decode directly
      const decodedResult = Buffer.from(
        result.status.SuccessValue,
        'base64'
      ).toString();
      console.log(`   📤 Return value: ${decodedResult || '(empty)'}`);
    }
  } else if (
    result.status &&
    typeof result.status === 'object' &&
    'Failure' in result.status
  ) {
    console.log('   ❌ Transaction failed:', result.status.Failure);
  }

  // Show gas usage
  // Get gas price from a separate call
  const gasPriceResult = await gasPrice(client, {
    blockId: result.transactionOutcome?.blockHash,
  });
  if (gasPriceResult && result.transactionOutcome?.outcome) {
    const gasUsed = BigInt(result.transactionOutcome.outcome.gasBurnt);
    const gasPriceBigInt = BigInt(gasPriceResult.gasPrice);
    const costInYocto = gasUsed * gasPriceBigInt;
    const costInNear = Number(costInYocto) / 1e24;

    console.log('\n💰 Gas usage:');
    console.log(`   ⛽ Gas used: ${gasUsed.toLocaleString()} units`);
    console.log(`   💵 Cost: ${costInNear.toFixed(6)} NEAR`);
  }

  // Show how to check transaction status later
  console.log('\n📋 To check this transaction later, use:');
  console.log(`   const status = await tx(client, {`);
  console.log(`     txHash: '${result.transaction?.hash}',`);
  console.log(`     senderAccountId: '${accountId}'`);
  console.log(`   });`);

  // View the message we just added (optional)
  console.log('\n6️⃣ Viewing the message we added...');

  // Use viewFunction convenience function instead of query
  const viewResult = await viewFunction(client, {
    accountId: contractId,
    methodName: 'getMessages',
    argsBase64: Buffer.from(JSON.stringify({})).toString('base64'),
    finality: 'final',
  });

  // viewFunction returns a CallResult, parse it to get the actual data
  const messages = parseCallResultToJson<any[]>(viewResult);

  if (messages && messages.length > 0) {
    // Get the latest message (last in the array)
    const latestMessage = messages[messages.length - 1];
    console.log(`   📖 Latest message in guest book:`);
    console.log(`      Sender: ${latestMessage.sender}`);
    console.log(`      Text: ${latestMessage.text}`);
  }

  console.log('\n✅ Example completed successfully!');
} catch (error) {
  console.error('\n❌ Error:', error);
  process.exit(1);
}

// Exit successfully
process.exit(0);
