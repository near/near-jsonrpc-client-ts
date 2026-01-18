// Auto-generated Zod schemas from NEAR OpenAPI spec (zod/mini version)
// Generated on: 2026-01-18T06:05:21.184Z
// Do not edit manually - run 'pnpm generate' to regenerate

import { z } from 'zod/mini';

//
// Access key provides limited access to an account. Each access key belongs
// to some account and is identified by a unique (within the account) public
// key. One account may have large number of access keys. Access keys allow to
// act on behalf of the account by restricting transactions that can be
// issued. `account_id,public_key` is a key in the state

export const AccessKeySchema = () =>
  z.object({
    nonce: z.number(),
    permission: z.lazy(() => AccessKeyPermissionSchema()),
  });

// Describes the cost of creating an access key.
export const AccessKeyCreationConfigViewSchema = () =>
  z.object({
    fullAccessCost: z.lazy(() => FeeSchema()),
    functionCallCost: z.lazy(() => FeeSchema()),
    functionCallCostPerByte: z.lazy(() => FeeSchema()),
  });

// Describes information about an access key including the public key.
export const AccessKeyInfoViewSchema = () =>
  z.object({
    accessKey: z.lazy(() => AccessKeyViewSchema()),
    publicKey: z.lazy(() => PublicKeySchema()),
  });

// Lists access keys
export const AccessKeyListSchema = () =>
  z.object({
    keys: z.array(z.lazy(() => AccessKeyInfoViewSchema())),
  });

// Defines permissions for AccessKey
export const AccessKeyPermissionSchema = () =>
  z.union([
    z.object({
      FunctionCall: z.lazy(() => FunctionCallPermissionSchema()),
    }),
    z.enum(['FullAccess']),
  ]);

//
// Describes the permission scope for an access key. Whether it is a function
// call or a full access key.

export const AccessKeyPermissionViewSchema = () =>
  z.union([
    z.enum(['FullAccess']),
    z.object({
      FunctionCall: z.object({
        allowance: z.optional(
          z.union([z.lazy(() => NearTokenSchema()), z.null()])
        ),
        methodNames: z.array(z.string()),
        receiverId: z.string(),
      }),
    }),
  ]);

// Describes access key permission scope and nonce.
export const AccessKeyViewSchema = () =>
  z.object({
    nonce: z.number(),
    permission: z.lazy(() => AccessKeyPermissionViewSchema()),
  });

// The structure describes configuration for creation of new accounts.
export const AccountCreationConfigViewSchema = () =>
  z.object({
    minAllowedTopLevelAccountLength: z.optional(z.number()),
    registrarAccountId: z.optional(z.lazy(() => AccountIdSchema())),
  });

//
// AccountData is a piece of global state that a validator signs and
// broadcasts to the network. It is essentially the data that a validator
// wants to share with the network. All the nodes in the network are
// collecting the account data broadcasted by the validators. Since the number
// of the validators is bounded and their identity is known (and the maximal
// size of allowed AccountData is bounded) the global state that is
// distributed in the form of AccountData is bounded as well. Find more
// information in the docs
// [here](https://github.com/near/nearcore/blob/560f7fc8f4b3106e0d5d46050688610b1f104ac6/chain/client/src/client.rs#L2232)

export const AccountDataViewSchema = () =>
  z.object({
    accountKey: z.lazy(() => PublicKeySchema()),
    peerId: z.lazy(() => PublicKeySchema()),
    proxies: z.array(z.lazy(() => Tier1ProxyViewSchema())),
    timestamp: z.string(),
  });

//
// NEAR Account Identifier. This is a unique, syntactically valid,
// human-readable account identifier on the NEAR network. [See the crate-level
// docs for information about validation.](index.html#account-id-rules) Also
// see [Error kind precedence](AccountId#error-kind-precedence). ## Examples
// ``` use near_account_id::AccountId; let alice: AccountId =
// "alice.near".parse().unwrap();
// assert!("ƒelicia.near".parse::<AccountId>().is_err()); // (ƒ is not f) ```

export const AccountIdSchema = () => z.string();

export const AccountIdValidityRulesVersionSchema = () => z.number();

// Account info for validators
export const AccountInfoSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    amount: z.lazy(() => NearTokenSchema()),
    publicKey: z.lazy(() => PublicKeySchema()),
  });

// A view of the account
export const AccountViewSchema = () =>
  z.object({
    amount: z.lazy(() => NearTokenSchema()),
    codeHash: z.lazy(() => CryptoHashSchema()),
    globalContractAccountId: z.optional(
      z.union([z.lazy(() => AccountIdSchema()), z.null()])
    ),
    globalContractHash: z.optional(
      z.union([z.lazy(() => CryptoHashSchema()), z.null()])
    ),
    locked: z.lazy(() => NearTokenSchema()),
    storagePaidAt: z.optional(z.number()),
    storageUsage: z.number(),
  });

// Account ID with its public key.
export const AccountWithPublicKeySchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    publicKey: z.lazy(() => PublicKeySchema()),
  });

//
// Describes the cost of creating a specific action, `Action`. Includes all
// variants.

export const ActionCreationConfigViewSchema = () =>
  z.object({
    addKeyCost: z.optional(z.lazy(() => AccessKeyCreationConfigViewSchema())),
    createAccountCost: z.optional(z.lazy(() => FeeSchema())),
    delegateCost: z.optional(z.lazy(() => FeeSchema())),
    deleteAccountCost: z.optional(z.lazy(() => FeeSchema())),
    deleteKeyCost: z.optional(z.lazy(() => FeeSchema())),
    deployContractCost: z.optional(z.lazy(() => FeeSchema())),
    deployContractCostPerByte: z.optional(z.lazy(() => FeeSchema())),
    functionCallCost: z.optional(z.lazy(() => FeeSchema())),
    functionCallCostPerByte: z.optional(z.lazy(() => FeeSchema())),
    stakeCost: z.optional(z.lazy(() => FeeSchema())),
    transferCost: z.optional(z.lazy(() => FeeSchema())),
  });

// An error happened during Action execution
export const ActionErrorSchema = () =>
  z.object({
    index: z.optional(z.union([z.union([z.number(), z.null()]), z.null()])),
    kind: z.lazy(() => ActionErrorKindSchema()),
  });

export const ActionErrorKindSchema = () =>
  z.union([
    z.object({
      AccountAlreadyExists: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      AccountDoesNotExist: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      CreateAccountOnlyByRegistrar: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        predecessorId: z.lazy(() => AccountIdSchema()),
        registrarAccountId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      CreateAccountNotAllowed: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        predecessorId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      ActorNoPermission: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        actorId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      DeleteKeyDoesNotExist: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
    }),
    z.object({
      AddKeyAlreadyExists: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
    }),
    z.object({
      DeleteAccountStaking: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      LackBalanceForState: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        amount: z.lazy(() => NearTokenSchema()),
      }),
    }),
    z.object({
      TriesToUnstake: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      TriesToStake: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        balance: z.lazy(() => NearTokenSchema()),
        locked: z.lazy(() => NearTokenSchema()),
        stake: z.lazy(() => NearTokenSchema()),
      }),
    }),
    z.object({
      InsufficientStake: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        minimumStake: z.lazy(() => NearTokenSchema()),
        stake: z.lazy(() => NearTokenSchema()),
      }),
    }),
    z.object({
      FunctionCallError: z.lazy(() => FunctionCallErrorSchema()),
    }),
    z.object({
      NewReceiptValidationError: z.lazy(() => ReceiptValidationErrorSchema()),
    }),
    z.object({
      OnlyImplicitAccountCreationAllowed: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      DeleteAccountWithLargeState: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.enum(['DelegateActionInvalidSignature']),
    z.object({
      DelegateActionSenderDoesNotMatchTxReceiver: z.object({
        receiverId: z.lazy(() => AccountIdSchema()),
        senderId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.enum(['DelegateActionExpired']),
    z.object({
      DelegateActionAccessKeyError: z.lazy(() => InvalidAccessKeyErrorSchema()),
    }),
    z.object({
      DelegateActionInvalidNonce: z.object({
        akNonce: z.number(),
        delegateNonce: z.number(),
      }),
    }),
    z.object({
      DelegateActionNonceTooLarge: z.object({
        delegateNonce: z.number(),
        upperBound: z.number(),
      }),
    }),
    z.object({
      GlobalContractDoesNotExist: z.object({
        identifier: z.lazy(() => GlobalContractIdentifierSchema()),
      }),
    }),
  ]);

export const ActionViewSchema = () =>
  z.union([
    z.enum(['CreateAccount']),
    z.object({
      DeployContract: z.object({
        code: z.string(),
      }),
    }),
    z.object({
      FunctionCall: z.object({
        args: z.lazy(() => FunctionArgsSchema()),
        deposit: z.lazy(() => NearTokenSchema()),
        gas: z.lazy(() => NearGasSchema()),
        methodName: z.string(),
      }),
    }),
    z.object({
      Transfer: z.object({
        deposit: z.lazy(() => NearTokenSchema()),
      }),
    }),
    z.object({
      Stake: z.object({
        publicKey: z.lazy(() => PublicKeySchema()),
        stake: z.lazy(() => NearTokenSchema()),
      }),
    }),
    z.object({
      AddKey: z.object({
        accessKey: z.lazy(() => AccessKeyViewSchema()),
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
    }),
    z.object({
      DeleteKey: z.object({
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
    }),
    z.object({
      DeleteAccount: z.object({
        beneficiaryId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      Delegate: z.object({
        delegateAction: z.lazy(() => DelegateActionSchema()),
        signature: z.lazy(() => SignatureSchema()),
      }),
    }),
    z.object({
      DeployGlobalContract: z.object({
        code: z.string(),
      }),
    }),
    z.object({
      DeployGlobalContractByAccountId: z.object({
        code: z.string(),
      }),
    }),
    z.object({
      UseGlobalContract: z.object({
        codeHash: z.lazy(() => CryptoHashSchema()),
      }),
    }),
    z.object({
      UseGlobalContractByAccountId: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      DeterministicStateInit: z.object({
        code: z.lazy(() => GlobalContractIdentifierViewSchema()),
        data: z.record(z.string(), z.string()),
        deposit: z.lazy(() => NearTokenSchema()),
      }),
    }),
  ]);

// Describes the error for validating a list of actions.
export const ActionsValidationErrorSchema = () =>
  z.union([
    z.enum(['DeleteActionMustBeFinal']),
    z.object({
      TotalPrepaidGasExceeded: z.object({
        limit: z.lazy(() => NearGasSchema()),
        totalPrepaidGas: z.lazy(() => NearGasSchema()),
      }),
    }),
    z.object({
      TotalNumberOfActionsExceeded: z.object({
        limit: z.number(),
        totalNumberOfActions: z.number(),
      }),
    }),
    z.object({
      AddKeyMethodNamesNumberOfBytesExceeded: z.object({
        limit: z.number(),
        totalNumberOfBytes: z.number(),
      }),
    }),
    z.object({
      AddKeyMethodNameLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
    z.enum(['IntegerOverflow']),
    z.object({
      InvalidAccountId: z.object({
        accountId: z.string(),
      }),
    }),
    z.object({
      ContractSizeExceeded: z.object({
        limit: z.number(),
        size: z.number(),
      }),
    }),
    z.object({
      FunctionCallMethodNameLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
    z.object({
      FunctionCallArgumentsLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
    z.object({
      UnsuitableStakingKey: z.object({
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
    }),
    z.enum(['FunctionCallZeroAttachedGas']),
    z.enum(['DelegateActionMustBeOnlyOne']),
    z.object({
      UnsupportedProtocolFeature: z.object({
        protocolFeature: z.string(),
        version: z.number(),
      }),
    }),
    z.object({
      InvalidDeterministicStateInitReceiver: z.object({
        derivedId: z.lazy(() => AccountIdSchema()),
        receiverId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      DeterministicStateInitKeyLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
    z.object({
      DeterministicStateInitValueLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
  ]);

// An action that adds key with public key associated
export const AddKeyActionSchema = () =>
  z.object({
    accessKey: z.lazy(() => AccessKeySchema()),
    publicKey: z.lazy(() => PublicKeySchema()),
  });

//
// `BandwidthRequest` describes the size of receipts that a shard would like
// to send to another shard. When a shard wants to send a lot of receipts to
// another shard, it needs to create a request and wait for a bandwidth grant
// from the bandwidth scheduler.

export const BandwidthRequestSchema = () =>
  z.object({
    requestedValuesBitmap: z.lazy(() => BandwidthRequestBitmapSchema()),
    toShard: z.number(),
  });

//
// Bitmap which describes which values from the predefined list are being
// requested. The nth bit is set to 1 when the nth value from the list is
// being requested.

export const BandwidthRequestBitmapSchema = () =>
  z.object({
    data: z.array(z.number()),
  });

//
// A list of shard's bandwidth requests. Describes how much the shard would
// like to send to other shards.

export const BandwidthRequestsSchema = () =>
  z.object({
    V1: z.lazy(() => BandwidthRequestsV1Schema()),
  });

// Version 1 of [`BandwidthRequest`].
export const BandwidthRequestsV1Schema = () =>
  z.object({
    requests: z.array(z.lazy(() => BandwidthRequestSchema())),
  });

//
// A part of a state for the current head of a light client. More info
// [here](https://nomicon.io/ChainSpec/LightClient).

export const BlockHeaderInnerLiteViewSchema = () =>
  z.object({
    blockMerkleRoot: z.lazy(() => CryptoHashSchema()),
    epochId: z.lazy(() => CryptoHashSchema()),
    height: z.number(),
    nextBpHash: z.lazy(() => CryptoHashSchema()),
    nextEpochId: z.lazy(() => CryptoHashSchema()),
    outcomeRoot: z.lazy(() => CryptoHashSchema()),
    prevStateRoot: z.lazy(() => CryptoHashSchema()),
    timestamp: z.number(),
    timestampNanosec: z.string(),
  });

// Contains main info about the block.
export const BlockHeaderViewSchema = () =>
  z.object({
    approvals: z.array(z.union([z.lazy(() => SignatureSchema()), z.null()])),
    blockBodyHash: z.optional(
      z.union([z.lazy(() => CryptoHashSchema()), z.null()])
    ),
    blockMerkleRoot: z.lazy(() => CryptoHashSchema()),
    blockOrdinal: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    challengesResult: z.array(z.lazy(() => SlashedValidatorSchema())),
    challengesRoot: z.lazy(() => CryptoHashSchema()),
    chunkEndorsements: z.optional(
      z.union([z.union([z.array(z.array(z.number())), z.null()]), z.null()])
    ),
    chunkHeadersRoot: z.lazy(() => CryptoHashSchema()),
    chunkMask: z.array(z.boolean()),
    chunkReceiptsRoot: z.lazy(() => CryptoHashSchema()),
    chunkTxRoot: z.lazy(() => CryptoHashSchema()),
    chunksIncluded: z.number(),
    epochId: z.lazy(() => CryptoHashSchema()),
    epochSyncDataHash: z.optional(
      z.union([z.lazy(() => CryptoHashSchema()), z.null()])
    ),
    gasPrice: z.lazy(() => NearTokenSchema()),
    hash: z.lazy(() => CryptoHashSchema()),
    height: z.number(),
    lastDsFinalBlock: z.lazy(() => CryptoHashSchema()),
    lastFinalBlock: z.lazy(() => CryptoHashSchema()),
    latestProtocolVersion: z.number(),
    nextBpHash: z.lazy(() => CryptoHashSchema()),
    nextEpochId: z.lazy(() => CryptoHashSchema()),
    outcomeRoot: z.lazy(() => CryptoHashSchema()),
    prevHash: z.lazy(() => CryptoHashSchema()),
    prevHeight: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    prevStateRoot: z.lazy(() => CryptoHashSchema()),
    randomValue: z.lazy(() => CryptoHashSchema()),
    rentPaid: z.optional(z.lazy(() => NearTokenSchema())),
    signature: z.lazy(() => SignatureSchema()),
    timestamp: z.number(),
    timestampNanosec: z.string(),
    totalSupply: z.lazy(() => NearTokenSchema()),
    validatorProposals: z.array(z.lazy(() => ValidatorStakeViewSchema())),
    validatorReward: z.optional(z.lazy(() => NearTokenSchema())),
  });

export const BlockIdSchema = () =>
  z.union([z.number(), z.lazy(() => CryptoHashSchema())]);

export const BlockReferenceSchema = () =>
  z.union([
    z.object({
      blockId: z.lazy(() => BlockIdSchema()),
    }),
    z.object({
      finality: z.lazy(() => FinalitySchema()),
    }),
    z.object({
      syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
    }),
  ]);

// Height and hash of a block
export const BlockStatusViewSchema = () =>
  z.object({
    hash: z.lazy(() => CryptoHashSchema()),
    height: z.number(),
  });

// A result returned by contract method
export const CallResultSchema = () =>
  z.object({
    logs: z.array(z.string()),
    result: z.array(z.number()),
  });

//
// Status of the
// [catchup](https://near.github.io/nearcore/architecture/how/sync.html#catchup)
// process

export const CatchupStatusViewSchema = () =>
  z.object({
    blocksToCatchup: z.array(z.lazy(() => BlockStatusViewSchema())),
    shardSyncStatus: z.record(z.string(), z.unknown()),
    syncBlockHash: z.lazy(() => CryptoHashSchema()),
    syncBlockHeight: z.number(),
  });

//
// Config for the Chunk Distribution Network feature. This allows nodes to
// push and pull chunks from a central stream. The two benefits of this
// approach are: (1) less request/response traffic on the peer-to-peer network
// and (2) lower latency for RPC nodes indexing the chain.

export const ChunkDistributionNetworkConfigSchema = () =>
  z.object({
    enabled: z.optional(z.boolean()),
    uris: z.optional(z.lazy(() => ChunkDistributionUrisSchema())),
  });

// URIs for the Chunk Distribution Network feature.
export const ChunkDistributionUrisSchema = () =>
  z.object({
    get: z.optional(z.string()),
    set: z.optional(z.string()),
  });

export const ChunkHashSchema = () => z.lazy(() => CryptoHashSchema());

// Contains main info about the chunk.
export const ChunkHeaderViewSchema = () =>
  z.object({
    balanceBurnt: z.lazy(() => NearTokenSchema()),
    bandwidthRequests: z.optional(
      z.union([z.lazy(() => BandwidthRequestsSchema()), z.null()])
    ),
    chunkHash: z.lazy(() => CryptoHashSchema()),
    congestionInfo: z.optional(
      z.union([z.lazy(() => CongestionInfoViewSchema()), z.null()])
    ),
    encodedLength: z.number(),
    encodedMerkleRoot: z.lazy(() => CryptoHashSchema()),
    gasLimit: z.lazy(() => NearGasSchema()),
    gasUsed: z.lazy(() => NearGasSchema()),
    heightCreated: z.number(),
    heightIncluded: z.number(),
    outcomeRoot: z.lazy(() => CryptoHashSchema()),
    outgoingReceiptsRoot: z.lazy(() => CryptoHashSchema()),
    prevBlockHash: z.lazy(() => CryptoHashSchema()),
    prevStateRoot: z.lazy(() => CryptoHashSchema()),
    rentPaid: z.optional(z.lazy(() => NearTokenSchema())),
    shardId: z.lazy(() => ShardIdSchema()),
    signature: z.lazy(() => SignatureSchema()),
    txRoot: z.lazy(() => CryptoHashSchema()),
    validatorProposals: z.array(z.lazy(() => ValidatorStakeViewSchema())),
    validatorReward: z.optional(z.lazy(() => NearTokenSchema())),
  });

//
// Configuration for a cloud-based archival writer. If this config is present,
// the writer is enabled and writes chunk-related data based on the tracked
// shards. This config also controls additional archival behavior such as
// block data and polling interval.

export const CloudArchivalWriterConfigSchema = () =>
  z.object({
    archiveBlockData: z.optional(z.boolean()),
    pollingInterval: z.optional(
      z.lazy(() => DurationAsStdSchemaProviderSchema())
    ),
  });

export const CompilationErrorSchema = () =>
  z.union([
    z.object({
      CodeDoesNotExist: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      PrepareError: z.lazy(() => PrepareErrorSchema()),
    }),
    z.object({
      WasmerCompileError: z.object({
        msg: z.string(),
      }),
    }),
  ]);

//
// The configuration for congestion control. More info about congestion
// [here](https://near.github.io/nearcore/architecture/how/receipt-congestion.html?highlight=congestion#receipt-congestion)

export const CongestionControlConfigViewSchema = () =>
  z.object({
    allowedShardOutgoingGas: z.optional(z.lazy(() => NearGasSchema())),
    maxCongestionIncomingGas: z.optional(z.lazy(() => NearGasSchema())),
    maxCongestionMemoryConsumption: z.optional(z.number()),
    maxCongestionMissedChunks: z.optional(z.number()),
    maxCongestionOutgoingGas: z.optional(z.lazy(() => NearGasSchema())),
    maxOutgoingGas: z.optional(z.lazy(() => NearGasSchema())),
    maxTxGas: z.optional(z.lazy(() => NearGasSchema())),
    minOutgoingGas: z.optional(z.lazy(() => NearGasSchema())),
    minTxGas: z.optional(z.lazy(() => NearGasSchema())),
    outgoingReceiptsBigSizeLimit: z.optional(z.number()),
    outgoingReceiptsUsualSizeLimit: z.optional(z.number()),
    rejectTxCongestionThreshold: z.optional(z.number()),
  });

//
// Stores the congestion level of a shard. More info about congestion
// [here](https://near.github.io/nearcore/architecture/how/receipt-congestion.html?highlight=congestion#receipt-congestion)

export const CongestionInfoViewSchema = () =>
  z.object({
    allowedShard: z.number(),
    bufferedReceiptsGas: z.string(),
    delayedReceiptsGas: z.string(),
    receiptBytes: z.number(),
  });

// A view of the contract code.
export const ContractCodeViewSchema = () =>
  z.object({
    codeBase64: z.string(),
    hash: z.lazy(() => CryptoHashSchema()),
  });

//
// Shows gas profile. More info
// [here](https://near.github.io/nearcore/architecture/gas/gas_profile.html?highlight=WASM_HOST_COST#example-transaction-gas-profile).

export const CostGasUsedSchema = () =>
  z.object({
    cost: z.string(),
    costCategory: z.string(),
    gasUsed: z.string(),
  });

// Create account action
export const CreateAccountActionSchema = () =>
  z.record(z.string(), z.unknown());

export const CryptoHashSchema = () => z.string();

// Describes information about the current epoch validator
export const CurrentEpochValidatorInfoSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    isSlashed: z.boolean(),
    numExpectedBlocks: z.number(),
    numExpectedChunks: z.optional(z.number()),
    numExpectedChunksPerShard: z.optional(z.array(z.number())),
    numExpectedEndorsements: z.optional(z.number()),
    numExpectedEndorsementsPerShard: z.optional(z.array(z.number())),
    numProducedBlocks: z.number(),
    numProducedChunks: z.optional(z.number()),
    numProducedChunksPerShard: z.optional(z.array(z.number())),
    numProducedEndorsements: z.optional(z.number()),
    numProducedEndorsementsPerShard: z.optional(z.array(z.number())),
    publicKey: z.lazy(() => PublicKeySchema()),
    shards: z.array(z.lazy(() => ShardIdSchema())),
    shardsEndorsed: z.optional(z.array(z.lazy(() => ShardIdSchema()))),
    stake: z.lazy(() => NearTokenSchema()),
  });

// The fees settings for a data receipt creation
export const DataReceiptCreationConfigViewSchema = () =>
  z.object({
    baseCost: z.optional(z.lazy(() => FeeSchema())),
    costPerByte: z.optional(z.lazy(() => FeeSchema())),
  });

export const DataReceiverViewSchema = () =>
  z.object({
    dataId: z.lazy(() => CryptoHashSchema()),
    receiverId: z.lazy(() => AccountIdSchema()),
  });

// This action allows to execute the inner actions behalf of the defined sender.
export const DelegateActionSchema = () =>
  z.object({
    actions: z.array(z.lazy(() => NonDelegateActionSchema())),
    maxBlockHeight: z.number(),
    nonce: z.number(),
    publicKey: z.lazy(() => PublicKeySchema()),
    receiverId: z.lazy(() => AccountIdSchema()),
    senderId: z.lazy(() => AccountIdSchema()),
  });

export const DeleteAccountActionSchema = () =>
  z.object({
    beneficiaryId: z.lazy(() => AccountIdSchema()),
  });

export const DeleteKeyActionSchema = () =>
  z.object({
    publicKey: z.lazy(() => PublicKeySchema()),
  });

// Deploy contract action
export const DeployContractActionSchema = () =>
  z.object({
    code: z.string(),
  });

// Deploy global contract action
export const DeployGlobalContractActionSchema = () =>
  z.object({
    code: z.string(),
    deployMode: z.lazy(() => GlobalContractDeployModeSchema()),
  });

export const DetailedDebugStatusSchema = () =>
  z.object({
    blockProductionDelayMillis: z.number(),
    catchupStatus: z.array(z.lazy(() => CatchupStatusViewSchema())),
    currentHeadStatus: z.lazy(() => BlockStatusViewSchema()),
    currentHeaderHeadStatus: z.lazy(() => BlockStatusViewSchema()),
    networkInfo: z.lazy(() => NetworkInfoViewSchema()),
    syncStatus: z.string(),
  });

export const DeterministicAccountStateInitSchema = () =>
  z.object({
    V1: z.lazy(() => DeterministicAccountStateInitV1Schema()),
  });

export const DeterministicAccountStateInitV1Schema = () =>
  z.object({
    code: z.lazy(() => GlobalContractIdentifierSchema()),
    data: z.record(z.string(), z.string()),
  });

export const DeterministicStateInitActionSchema = () =>
  z.object({
    deposit: z.lazy(() => NearTokenSchema()),
    stateInit: z.lazy(() => DeterministicAccountStateInitSchema()),
  });

export const DirectionSchema = () => z.enum(['Left', 'Right']);

// Configures how to dump state to external storage.
export const DumpConfigSchema = () =>
  z.object({
    credentialsFile: z.optional(
      z.union([z.union([z.string(), z.null()]), z.null()])
    ),
    iterationDelay: z.optional(
      z.union([z.lazy(() => DurationAsStdSchemaProviderSchema()), z.null()])
    ),
    location: z.optional(z.lazy(() => ExternalStorageLocationSchema())),
    restartDumpForShards: z.optional(
      z.union([
        z.union([z.array(z.lazy(() => ShardIdSchema())), z.null()]),
        z.null(),
      ])
    ),
  });

export const DurationAsStdSchemaProviderSchema = () =>
  z.object({
    nanos: z.number(),
    secs: z.number(),
  });

//
// Configuration for dynamic resharding feature See
// [`DynamicReshardingConfig`] for more details.

export const DynamicReshardingConfigViewSchema = () =>
  z.object({
    blockSplitShards: z.array(z.lazy(() => ShardIdSchema())),
    forceSplitShards: z.array(z.lazy(() => ShardIdSchema())),
    maxNumberOfShards: z.number(),
    memoryUsageThreshold: z.number(),
    minChildMemoryUsage: z.number(),
    minEpochsBetweenResharding: z.number(),
  });

//
// Epoch identifier -- wrapped hash, to make it easier to distinguish. EpochId
// of epoch T is the hash of last block in T-2 EpochId of first two epochs is
// 0

export const EpochIdSchema = () => z.lazy(() => CryptoHashSchema());

export const EpochSyncConfigSchema = () =>
  z.object({
    epochSyncHorizon: z.optional(z.number()),
    timeoutForEpochSync: z.optional(
      z.lazy(() => DurationAsStdSchemaProviderSchema())
    ),
  });

export const ErrorWrapperFor_GenesisConfigErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => GenesisConfigErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcBlockErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcBlockErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcCallFunctionErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcCallFunctionErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcChunkErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcChunkErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcClientConfigErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcClientConfigErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcGasPriceErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcGasPriceErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcLightClientNextBlockErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcLightClientNextBlockErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcLightClientProofErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcLightClientProofErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcMaintenanceWindowsErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcMaintenanceWindowsErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcNetworkInfoErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcNetworkInfoErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcProtocolConfigErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcProtocolConfigErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcQueryErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcQueryErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcReceiptErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcReceiptErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcSplitStorageInfoErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcSplitStorageInfoErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcStateChangesErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcStateChangesErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcStatusErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcStatusErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcTransactionErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcTransactionErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcValidatorErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcValidatorErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcViewAccessKeyErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcViewAccessKeyErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcViewAccessKeyListErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcViewAccessKeyListErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcViewAccountErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcViewAccountErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcViewCodeErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcViewCodeErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ErrorWrapperFor_RpcViewStateErrorSchema = () =>
  z.union([
    z.object({
      cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
      name: z.enum(['REQUEST_VALIDATION_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => RpcViewStateErrorSchema()),
      name: z.enum(['HANDLER_ERROR']),
    }),
    z.object({
      cause: z.lazy(() => InternalErrorSchema()),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const ExecutionMetadataViewSchema = () =>
  z.object({
    gasProfile: z.optional(
      z.union([
        z.union([z.array(z.lazy(() => CostGasUsedSchema())), z.null()]),
        z.null(),
      ])
    ),
    version: z.number(),
  });

export const ExecutionOutcomeViewSchema = () =>
  z.object({
    executorId: z.lazy(() => AccountIdSchema()),
    gasBurnt: z.lazy(() => NearGasSchema()),
    logs: z.array(z.string()),
    metadata: z.optional(z.lazy(() => ExecutionMetadataViewSchema())),
    receiptIds: z.array(z.lazy(() => CryptoHashSchema())),
    status: z.lazy(() => ExecutionStatusViewSchema()),
    tokensBurnt: z.lazy(() => NearTokenSchema()),
  });

export const ExecutionOutcomeWithIdViewSchema = () =>
  z.object({
    blockHash: z.lazy(() => CryptoHashSchema()),
    id: z.lazy(() => CryptoHashSchema()),
    outcome: z.lazy(() => ExecutionOutcomeViewSchema()),
    proof: z.array(z.lazy(() => MerklePathItemSchema())),
  });

export const ExecutionStatusViewSchema = () =>
  z.union([
    z.enum(['Unknown']),
    z.object({
      Failure: z.lazy(() => TxExecutionErrorSchema()),
    }),
    z.object({
      SuccessValue: z.string(),
    }),
    z.object({
      SuccessReceiptId: z.lazy(() => CryptoHashSchema()),
    }),
  ]);

//
// Typed view of ExtCostsConfig to preserve JSON output field names in
// protocol config RPC output.

export const ExtCostsConfigViewSchema = () =>
  z.object({
    altBn128G1MultiexpBase: z.optional(z.lazy(() => NearGasSchema())),
    altBn128G1MultiexpElement: z.optional(z.lazy(() => NearGasSchema())),
    altBn128G1SumBase: z.optional(z.lazy(() => NearGasSchema())),
    altBn128G1SumElement: z.optional(z.lazy(() => NearGasSchema())),
    altBn128PairingCheckBase: z.optional(z.lazy(() => NearGasSchema())),
    altBn128PairingCheckElement: z.optional(z.lazy(() => NearGasSchema())),
    base: z.optional(z.lazy(() => NearGasSchema())),
    bls12381G1MultiexpBase: z.optional(z.lazy(() => NearGasSchema())),
    bls12381G1MultiexpElement: z.optional(z.lazy(() => NearGasSchema())),
    bls12381G2MultiexpBase: z.optional(z.lazy(() => NearGasSchema())),
    bls12381G2MultiexpElement: z.optional(z.lazy(() => NearGasSchema())),
    bls12381MapFp2ToG2Base: z.optional(z.lazy(() => NearGasSchema())),
    bls12381MapFp2ToG2Element: z.optional(z.lazy(() => NearGasSchema())),
    bls12381MapFpToG1Base: z.optional(z.lazy(() => NearGasSchema())),
    bls12381MapFpToG1Element: z.optional(z.lazy(() => NearGasSchema())),
    bls12381P1DecompressBase: z.optional(z.lazy(() => NearGasSchema())),
    bls12381P1DecompressElement: z.optional(z.lazy(() => NearGasSchema())),
    bls12381P1SumBase: z.optional(z.lazy(() => NearGasSchema())),
    bls12381P1SumElement: z.optional(z.lazy(() => NearGasSchema())),
    bls12381P2DecompressBase: z.optional(z.lazy(() => NearGasSchema())),
    bls12381P2DecompressElement: z.optional(z.lazy(() => NearGasSchema())),
    bls12381P2SumBase: z.optional(z.lazy(() => NearGasSchema())),
    bls12381P2SumElement: z.optional(z.lazy(() => NearGasSchema())),
    bls12381PairingBase: z.optional(z.lazy(() => NearGasSchema())),
    bls12381PairingElement: z.optional(z.lazy(() => NearGasSchema())),
    contractCompileBase: z.optional(z.lazy(() => NearGasSchema())),
    contractCompileBytes: z.optional(z.lazy(() => NearGasSchema())),
    contractLoadingBase: z.optional(z.lazy(() => NearGasSchema())),
    contractLoadingBytes: z.optional(z.lazy(() => NearGasSchema())),
    ecrecoverBase: z.optional(z.lazy(() => NearGasSchema())),
    ed25519VerifyBase: z.optional(z.lazy(() => NearGasSchema())),
    ed25519VerifyByte: z.optional(z.lazy(() => NearGasSchema())),
    keccak256Base: z.optional(z.lazy(() => NearGasSchema())),
    keccak256Byte: z.optional(z.lazy(() => NearGasSchema())),
    keccak512Base: z.optional(z.lazy(() => NearGasSchema())),
    keccak512Byte: z.optional(z.lazy(() => NearGasSchema())),
    logBase: z.optional(z.lazy(() => NearGasSchema())),
    logByte: z.optional(z.lazy(() => NearGasSchema())),
    promiseAndBase: z.optional(z.lazy(() => NearGasSchema())),
    promiseAndPerPromise: z.optional(z.lazy(() => NearGasSchema())),
    promiseReturn: z.optional(z.lazy(() => NearGasSchema())),
    readCachedTrieNode: z.optional(z.lazy(() => NearGasSchema())),
    readMemoryBase: z.optional(z.lazy(() => NearGasSchema())),
    readMemoryByte: z.optional(z.lazy(() => NearGasSchema())),
    readRegisterBase: z.optional(z.lazy(() => NearGasSchema())),
    readRegisterByte: z.optional(z.lazy(() => NearGasSchema())),
    ripemd160Base: z.optional(z.lazy(() => NearGasSchema())),
    ripemd160Block: z.optional(z.lazy(() => NearGasSchema())),
    sha256Base: z.optional(z.lazy(() => NearGasSchema())),
    sha256Byte: z.optional(z.lazy(() => NearGasSchema())),
    storageHasKeyBase: z.optional(z.lazy(() => NearGasSchema())),
    storageHasKeyByte: z.optional(z.lazy(() => NearGasSchema())),
    storageIterCreateFromByte: z.optional(z.lazy(() => NearGasSchema())),
    storageIterCreatePrefixBase: z.optional(z.lazy(() => NearGasSchema())),
    storageIterCreatePrefixByte: z.optional(z.lazy(() => NearGasSchema())),
    storageIterCreateRangeBase: z.optional(z.lazy(() => NearGasSchema())),
    storageIterCreateToByte: z.optional(z.lazy(() => NearGasSchema())),
    storageIterNextBase: z.optional(z.lazy(() => NearGasSchema())),
    storageIterNextKeyByte: z.optional(z.lazy(() => NearGasSchema())),
    storageIterNextValueByte: z.optional(z.lazy(() => NearGasSchema())),
    storageLargeReadOverheadBase: z.optional(z.lazy(() => NearGasSchema())),
    storageLargeReadOverheadByte: z.optional(z.lazy(() => NearGasSchema())),
    storageReadBase: z.optional(z.lazy(() => NearGasSchema())),
    storageReadKeyByte: z.optional(z.lazy(() => NearGasSchema())),
    storageReadValueByte: z.optional(z.lazy(() => NearGasSchema())),
    storageRemoveBase: z.optional(z.lazy(() => NearGasSchema())),
    storageRemoveKeyByte: z.optional(z.lazy(() => NearGasSchema())),
    storageRemoveRetValueByte: z.optional(z.lazy(() => NearGasSchema())),
    storageWriteBase: z.optional(z.lazy(() => NearGasSchema())),
    storageWriteEvictedByte: z.optional(z.lazy(() => NearGasSchema())),
    storageWriteKeyByte: z.optional(z.lazy(() => NearGasSchema())),
    storageWriteValueByte: z.optional(z.lazy(() => NearGasSchema())),
    touchingTrieNode: z.optional(z.lazy(() => NearGasSchema())),
    utf16DecodingBase: z.optional(z.lazy(() => NearGasSchema())),
    utf16DecodingByte: z.optional(z.lazy(() => NearGasSchema())),
    utf8DecodingBase: z.optional(z.lazy(() => NearGasSchema())),
    utf8DecodingByte: z.optional(z.lazy(() => NearGasSchema())),
    validatorStakeBase: z.optional(z.lazy(() => NearGasSchema())),
    validatorTotalStakeBase: z.optional(z.lazy(() => NearGasSchema())),
    writeMemoryBase: z.optional(z.lazy(() => NearGasSchema())),
    writeMemoryByte: z.optional(z.lazy(() => NearGasSchema())),
    writeRegisterBase: z.optional(z.lazy(() => NearGasSchema())),
    writeRegisterByte: z.optional(z.lazy(() => NearGasSchema())),
    yieldCreateBase: z.optional(z.lazy(() => NearGasSchema())),
    yieldCreateByte: z.optional(z.lazy(() => NearGasSchema())),
    yieldResumeBase: z.optional(z.lazy(() => NearGasSchema())),
    yieldResumeByte: z.optional(z.lazy(() => NearGasSchema())),
  });

export const ExternalStorageConfigSchema = () =>
  z.object({
    externalStorageFallbackThreshold: z.optional(z.number()),
    location: z.optional(z.lazy(() => ExternalStorageLocationSchema())),
    numConcurrentRequests: z.optional(z.number()),
    numConcurrentRequestsDuringCatchup: z.optional(z.number()),
  });

// Supported external storage backends and their minimal config.
export const ExternalStorageLocationSchema = () =>
  z.union([
    z.object({
      S3: z.object({
        bucket: z.string(),
        region: z.string(),
      }),
    }),
    z.object({
      Filesystem: z.object({
        rootDir: z.string(),
      }),
    }),
    z.object({
      GCS: z.object({
        bucket: z.string(),
      }),
    }),
  ]);

//
// Costs associated with an object that can only be sent over the network (and
// executed by the receiver). NOTE: `send_sir` or `send_not_sir` fees are
// usually burned when the item is being created. And `execution` fee is
// burned when the item is being executed.

export const FeeSchema = () =>
  z.object({
    execution: z.lazy(() => NearGasSchema()),
    sendNotSir: z.lazy(() => NearGasSchema()),
    sendSir: z.lazy(() => NearGasSchema()),
  });

//
// Execution outcome of the transaction and all the subsequent receipts. Could
// be not finalized yet

export const FinalExecutionOutcomeViewSchema = () =>
  z.object({
    receiptsOutcome: z.array(z.lazy(() => ExecutionOutcomeWithIdViewSchema())),
    status: z.lazy(() => FinalExecutionStatusSchema()),
    transaction: z.lazy(() => SignedTransactionViewSchema()),
    transactionOutcome: z.lazy(() => ExecutionOutcomeWithIdViewSchema()),
  });

//
// Final execution outcome of the transaction and all of subsequent the
// receipts. Also includes the generated receipt.

export const FinalExecutionOutcomeWithReceiptViewSchema = () =>
  z.object({
    receipts: z.array(z.lazy(() => ReceiptViewSchema())),
    receiptsOutcome: z.array(z.lazy(() => ExecutionOutcomeWithIdViewSchema())),
    status: z.lazy(() => FinalExecutionStatusSchema()),
    transaction: z.lazy(() => SignedTransactionViewSchema()),
    transactionOutcome: z.lazy(() => ExecutionOutcomeWithIdViewSchema()),
  });

export const FinalExecutionStatusSchema = () =>
  z.union([
    z.enum(['NotStarted']),
    z.enum(['Started']),
    z.object({
      Failure: z.lazy(() => TxExecutionErrorSchema()),
    }),
    z.object({
      SuccessValue: z.string(),
    }),
  ]);

// Different types of finality.
export const FinalitySchema = () =>
  z.enum(['optimistic', 'near-final', 'final']);

//
// This type is used to mark function arguments. NOTE: The main reason for
// this to exist (except the type-safety) is that the value is transparently
// serialized and deserialized as a base64-encoded string when serde is used
// (serde_json).

export const FunctionArgsSchema = () => z.string();

export const FunctionCallActionSchema = () =>
  z.object({
    args: z.string(),
    deposit: z.lazy(() => NearTokenSchema()),
    gas: z.lazy(() => NearGasSchema()),
    methodName: z.string(),
  });

//
// Serializable version of `near-vm-runner::FunctionCallError`. Must never
// reorder/remove elements, can only add new variants at the end (but do that
// very carefully). It describes stable serialization format, and only used by
// serialization logic.

export const FunctionCallErrorSchema = () =>
  z.union([
    z.enum(['WasmUnknownError', '_EVMError']),
    z.object({
      CompilationError: z.lazy(() => CompilationErrorSchema()),
    }),
    z.object({
      LinkError: z.object({
        msg: z.string(),
      }),
    }),
    z.object({
      MethodResolveError: z.lazy(() => MethodResolveErrorSchema()),
    }),
    z.object({
      WasmTrap: z.lazy(() => WasmTrapSchema()),
    }),
    z.object({
      HostError: z.lazy(() => HostErrorSchema()),
    }),
    z.object({
      ExecutionError: z.string(),
    }),
  ]);

//
// Grants limited permission to make transactions with FunctionCallActions The
// permission can limit the allowed balance to be spent on the prepaid gas. It
// also restrict the account ID of the receiver for this function call. It
// also can restrict the method name for the allowed function calls.

export const FunctionCallPermissionSchema = () =>
  z.object({
    allowance: z.optional(z.union([z.lazy(() => NearTokenSchema()), z.null()])),
    methodNames: z.array(z.string()),
    receiverId: z.string(),
  });

// Configuration for garbage collection.
export const GCConfigSchema = () =>
  z.object({
    gcBlocksLimit: z.optional(z.number()),
    gcForkCleanStep: z.optional(z.number()),
    gcNumEpochsToKeep: z.optional(z.number()),
    gcStepPeriod: z.optional(z.lazy(() => DurationAsStdSchemaProviderSchema())),
  });

export const GenesisConfigSchema = () =>
  z.object({
    avgHiddenValidatorSeatsPerShard: z.array(z.number()),
    blockProducerKickoutThreshold: z.number(),
    chainId: z.string(),
    chunkProducerAssignmentChangesLimit: z.optional(z.number()),
    chunkProducerKickoutThreshold: z.number(),
    chunkValidatorOnlyKickoutThreshold: z.optional(z.number()),
    dynamicResharding: z.boolean(),
    epochLength: z.number(),
    fishermenThreshold: z.lazy(() => NearTokenSchema()),
    gasLimit: z.lazy(() => NearGasSchema()),
    gasPriceAdjustmentRate: z.array(z.number()),
    genesisHeight: z.number(),
    genesisTime: z.string(),
    maxGasPrice: z.lazy(() => NearTokenSchema()),
    maxInflationRate: z.array(z.number()),
    maxKickoutStakePerc: z.optional(z.number()),
    minGasPrice: z.lazy(() => NearTokenSchema()),
    minimumStakeDivisor: z.optional(z.number()),
    minimumStakeRatio: z.optional(z.array(z.number())),
    minimumValidatorsPerShard: z.optional(z.number()),
    numBlockProducerSeats: z.number(),
    numBlockProducerSeatsPerShard: z.array(z.number()),
    numBlocksPerYear: z.number(),
    numChunkOnlyProducerSeats: z.optional(z.number()),
    numChunkProducerSeats: z.optional(z.number()),
    numChunkValidatorSeats: z.optional(z.number()),
    onlineMaxThreshold: z.optional(z.array(z.number())),
    onlineMinThreshold: z.optional(z.array(z.number())),
    protocolRewardRate: z.array(z.number()),
    protocolTreasuryAccount: z.lazy(() => AccountIdSchema()),
    protocolUpgradeStakeThreshold: z.optional(z.array(z.number())),
    protocolVersion: z.number(),
    shardLayout: z.optional(z.lazy(() => ShardLayoutSchema())),
    shuffleShardAssignmentForChunkProducers: z.optional(z.boolean()),
    targetValidatorMandatesPerShard: z.optional(z.number()),
    totalSupply: z.lazy(() => NearTokenSchema()),
    transactionValidityPeriod: z.number(),
    useProductionConfig: z.optional(z.boolean()),
    validators: z.array(z.lazy(() => AccountInfoSchema())),
  });

export const GenesisConfigErrorSchema = () => z.null();

export const GenesisConfigRequestSchema = () => z.null();

export const GlobalContractDeployModeSchema = () =>
  z.union([z.enum(['CodeHash']), z.enum(['AccountId'])]);

export const GlobalContractIdentifierSchema = () =>
  z.union([
    z.object({
      CodeHash: z.lazy(() => CryptoHashSchema()),
    }),
    z.object({
      AccountId: z.lazy(() => AccountIdSchema()),
    }),
  ]);

export const GlobalContractIdentifierViewSchema = () =>
  z.union([
    z.object({
      hash: z.lazy(() => CryptoHashSchema()),
    }),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
    }),
  ]);

export const HostErrorSchema = () =>
  z.union([
    z.enum(['BadUTF16']),
    z.enum(['BadUTF8']),
    z.enum(['GasExceeded']),
    z.enum(['GasLimitExceeded']),
    z.enum(['BalanceExceeded']),
    z.enum(['EmptyMethodName']),
    z.object({
      GuestPanic: z.object({
        panicMsg: z.string(),
      }),
    }),
    z.enum(['IntegerOverflow']),
    z.object({
      InvalidPromiseIndex: z.object({
        promiseIdx: z.number(),
      }),
    }),
    z.enum(['CannotAppendActionToJointPromise']),
    z.enum(['CannotReturnJointPromise']),
    z.object({
      InvalidPromiseResultIndex: z.object({
        resultIdx: z.number(),
      }),
    }),
    z.object({
      InvalidRegisterId: z.object({
        registerId: z.number(),
      }),
    }),
    z.object({
      IteratorWasInvalidated: z.object({
        iteratorIndex: z.number(),
      }),
    }),
    z.enum(['MemoryAccessViolation']),
    z.object({
      InvalidReceiptIndex: z.object({
        receiptIndex: z.number(),
      }),
    }),
    z.object({
      InvalidIteratorIndex: z.object({
        iteratorIndex: z.number(),
      }),
    }),
    z.enum(['InvalidAccountId']),
    z.enum(['InvalidMethodName']),
    z.enum(['InvalidPublicKey']),
    z.object({
      ProhibitedInView: z.object({
        methodName: z.string(),
      }),
    }),
    z.object({
      NumberOfLogsExceeded: z.object({
        limit: z.number(),
      }),
    }),
    z.object({
      KeyLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
    z.object({
      ValueLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
    z.object({
      TotalLogLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
    z.object({
      NumberPromisesExceeded: z.object({
        limit: z.number(),
        numberOfPromises: z.number(),
      }),
    }),
    z.object({
      NumberInputDataDependenciesExceeded: z.object({
        limit: z.number(),
        numberOfInputDataDependencies: z.number(),
      }),
    }),
    z.object({
      ReturnedValueLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
    z.object({
      ContractSizeExceeded: z.object({
        limit: z.number(),
        size: z.number(),
      }),
    }),
    z.object({
      Deprecated: z.object({
        methodName: z.string(),
      }),
    }),
    z.object({
      ECRecoverError: z.object({
        msg: z.string(),
      }),
    }),
    z.object({
      AltBn128InvalidInput: z.object({
        msg: z.string(),
      }),
    }),
    z.object({
      Ed25519VerifyInvalidInput: z.object({
        msg: z.string(),
      }),
    }),
  ]);

export const InternalErrorSchema = () =>
  z.object({
    info: z.object({
      errorMessage: z.string(),
    }),
    name: z.enum(['INTERNAL_ERROR']),
  });

export const InvalidAccessKeyErrorSchema = () =>
  z.union([
    z.object({
      AccessKeyNotFound: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
    }),
    z.object({
      ReceiverMismatch: z.object({
        akReceiver: z.string(),
        txReceiver: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      MethodNameMismatch: z.object({
        methodName: z.string(),
      }),
    }),
    z.enum(['RequiresFullAccess']),
    z.object({
      NotEnoughAllowance: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        allowance: z.lazy(() => NearTokenSchema()),
        cost: z.lazy(() => NearTokenSchema()),
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
    }),
    z.enum(['DepositWithFunctionCall']),
  ]);

// An error happened during TX execution
export const InvalidTxErrorSchema = () =>
  z.union([
    z.object({
      InvalidAccessKeyError: z.lazy(() => InvalidAccessKeyErrorSchema()),
    }),
    z.object({
      InvalidSignerId: z.object({
        signerId: z.string(),
      }),
    }),
    z.object({
      SignerDoesNotExist: z.object({
        signerId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      InvalidNonce: z.object({
        akNonce: z.number(),
        txNonce: z.number(),
      }),
    }),
    z.object({
      NonceTooLarge: z.object({
        txNonce: z.number(),
        upperBound: z.number(),
      }),
    }),
    z.object({
      InvalidReceiverId: z.object({
        receiverId: z.string(),
      }),
    }),
    z.enum(['InvalidSignature']),
    z.object({
      NotEnoughBalance: z.object({
        balance: z.lazy(() => NearTokenSchema()),
        cost: z.lazy(() => NearTokenSchema()),
        signerId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      LackBalanceForState: z.object({
        amount: z.lazy(() => NearTokenSchema()),
        signerId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.enum(['CostOverflow']),
    z.enum(['InvalidChain']),
    z.enum(['Expired']),
    z.object({
      ActionsValidation: z.lazy(() => ActionsValidationErrorSchema()),
    }),
    z.object({
      TransactionSizeExceeded: z.object({
        limit: z.number(),
        size: z.number(),
      }),
    }),
    z.enum(['InvalidTransactionVersion']),
    z.object({
      StorageError: z.lazy(() => StorageErrorSchema()),
    }),
    z.object({
      ShardCongested: z.object({
        congestionLevel: z.number(),
        shardId: z.number(),
      }),
    }),
    z.object({
      ShardStuck: z.object({
        missedChunks: z.number(),
        shardId: z.number(),
      }),
    }),
  ]);

export const JsonRpcRequestFor_EXPERIMENTALCallFunctionSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_call_function']),
    params: z.lazy(() => RpcCallFunctionRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALChangesSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_changes']),
    params: z.lazy(() => RpcStateChangesInBlockByTypeRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALChangesInBlockSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_changes_in_block']),
    params: z.lazy(() => RpcStateChangesInBlockRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALCongestionLevelSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_congestion_level']),
    params: z.lazy(() => RpcCongestionLevelRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALGenesisConfigSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_genesis_config']),
    params: z.lazy(() => GenesisConfigRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALLightClientBlockProofSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_light_client_block_proof']),
    params: z.lazy(() => RpcLightClientBlockProofRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALLightClientProofSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_light_client_proof']),
    params: z.lazy(() => RpcLightClientExecutionProofRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALMaintenanceWindowsSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_maintenance_windows']),
    params: z.lazy(() => RpcMaintenanceWindowsRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALProtocolConfigSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_protocol_config']),
    params: z.lazy(() => RpcProtocolConfigRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALReceiptSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_receipt']),
    params: z.lazy(() => RpcReceiptRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALSplitStorageInfoSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_split_storage_info']),
    params: z.lazy(() => RpcSplitStorageInfoRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALTxStatusSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_tx_status']),
    params: z.lazy(() => RpcTransactionStatusRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALValidatorsOrderedSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_validators_ordered']),
    params: z.lazy(() => RpcValidatorsOrderedRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALViewAccessKeySchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_view_access_key']),
    params: z.lazy(() => RpcViewAccessKeyRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALViewAccessKeyListSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_view_access_key_list']),
    params: z.lazy(() => RpcViewAccessKeyListRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALViewAccountSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_view_account']),
    params: z.lazy(() => RpcViewAccountRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALViewCodeSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_view_code']),
    params: z.lazy(() => RpcViewCodeRequestSchema()),
  });

export const JsonRpcRequestFor_EXPERIMENTALViewStateSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['EXPERIMENTAL_view_state']),
    params: z.lazy(() => RpcViewStateRequestSchema()),
  });

export const JsonRpcRequestForBlockSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['block']),
    params: z.lazy(() => RpcBlockRequestSchema()),
  });

export const JsonRpcRequestForBlockEffectsSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['block_effects']),
    params: z.lazy(() => RpcStateChangesInBlockRequestSchema()),
  });

export const JsonRpcRequestForBroadcastTxAsyncSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['broadcast_tx_async']),
    params: z.lazy(() => RpcSendTransactionRequestSchema()),
  });

export const JsonRpcRequestForBroadcastTxCommitSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['broadcast_tx_commit']),
    params: z.lazy(() => RpcSendTransactionRequestSchema()),
  });

export const JsonRpcRequestForChangesSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['changes']),
    params: z.lazy(() => RpcStateChangesInBlockByTypeRequestSchema()),
  });

export const JsonRpcRequestForChunkSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['chunk']),
    params: z.lazy(() => RpcChunkRequestSchema()),
  });

export const JsonRpcRequestForClientConfigSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['client_config']),
    params: z.lazy(() => RpcClientConfigRequestSchema()),
  });

export const JsonRpcRequestForGasPriceSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['gas_price']),
    params: z.lazy(() => RpcGasPriceRequestSchema()),
  });

export const JsonRpcRequestForGenesisConfigSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['genesis_config']),
    params: z.lazy(() => GenesisConfigRequestSchema()),
  });

export const JsonRpcRequestForHealthSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['health']),
    params: z.lazy(() => RpcHealthRequestSchema()),
  });

export const JsonRpcRequestForLightClientProofSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['light_client_proof']),
    params: z.lazy(() => RpcLightClientExecutionProofRequestSchema()),
  });

export const JsonRpcRequestForMaintenanceWindowsSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['maintenance_windows']),
    params: z.lazy(() => RpcMaintenanceWindowsRequestSchema()),
  });

export const JsonRpcRequestForNetworkInfoSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['network_info']),
    params: z.lazy(() => RpcNetworkInfoRequestSchema()),
  });

export const JsonRpcRequestForNextLightClientBlockSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['next_light_client_block']),
    params: z.lazy(() => RpcLightClientNextBlockRequestSchema()),
  });

export const JsonRpcRequestForQuerySchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['query']),
    params: z.lazy(() => RpcQueryRequestSchema()),
  });

export const JsonRpcRequestForSendTxSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['send_tx']),
    params: z.lazy(() => RpcSendTransactionRequestSchema()),
  });

export const JsonRpcRequestForStatusSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['status']),
    params: z.lazy(() => RpcStatusRequestSchema()),
  });

export const JsonRpcRequestForTxSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['tx']),
    params: z.lazy(() => RpcTransactionStatusRequestSchema()),
  });

export const JsonRpcRequestForValidatorsSchema = () =>
  z.object({
    id: z.string(),
    jsonrpc: z.string(),
    method: z.enum(['validators']),
    params: z.lazy(() => RpcValidatorRequestSchema()),
  });

export const JsonRpcResponseFor_ArrayOf_RangeOfUint64And_RpcMaintenanceWindowsErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.array(z.lazy(() => RangeOfUint64Schema())),
        }),
        z.object({
          error: z.lazy(() =>
            ErrorWrapperFor_RpcMaintenanceWindowsErrorSchema()
          ),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_ArrayOf_ValidatorStakeViewAnd_RpcValidatorErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.array(z.lazy(() => ValidatorStakeViewSchema())),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcValidatorErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_CryptoHashAnd_RpcTransactionErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => CryptoHashSchema()),
      }),
      z.object({
        error: z.lazy(() => ErrorWrapperFor_RpcTransactionErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_GenesisConfigAnd_GenesisConfigErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => GenesisConfigSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_GenesisConfigErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_Nullable_RpcHealthResponseAnd_RpcStatusErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.union([z.lazy(() => RpcHealthResponseSchema()), z.null()]),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcStatusErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcBlockResponseAnd_RpcBlockErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcBlockResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => ErrorWrapperFor_RpcBlockErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcCallFunctionResponseAnd_RpcCallFunctionErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcCallFunctionResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcCallFunctionErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcChunkResponseAnd_RpcChunkErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcChunkResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => ErrorWrapperFor_RpcChunkErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcClientConfigResponseAnd_RpcClientConfigErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcClientConfigResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcClientConfigErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcCongestionLevelResponseAnd_RpcChunkErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcCongestionLevelResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcChunkErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcGasPriceResponseAnd_RpcGasPriceErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcGasPriceResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcGasPriceErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcLightClientBlockProofResponseAnd_RpcLightClientProofErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcLightClientBlockProofResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcLightClientProofErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcLightClientProofErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcLightClientExecutionProofResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcLightClientProofErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcLightClientNextBlockResponseAnd_RpcLightClientNextBlockErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcLightClientNextBlockResponseSchema()),
        }),
        z.object({
          error: z.lazy(() =>
            ErrorWrapperFor_RpcLightClientNextBlockErrorSchema()
          ),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcNetworkInfoResponseAnd_RpcNetworkInfoErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcNetworkInfoResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcNetworkInfoErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcProtocolConfigResponseAnd_RpcProtocolConfigErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcProtocolConfigResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcProtocolConfigErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcQueryResponseAnd_RpcQueryErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcQueryResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => ErrorWrapperFor_RpcQueryErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcReceiptResponseAnd_RpcReceiptErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcReceiptResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcReceiptErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcSplitStorageInfoResponseAnd_RpcSplitStorageInfoErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcSplitStorageInfoResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcSplitStorageInfoErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcStateChangesInBlockByTypeResponseAnd_RpcStateChangesErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcStateChangesInBlockByTypeResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcStateChangesErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcStateChangesErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcStateChangesInBlockResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcStateChangesErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcStatusResponseAnd_RpcStatusErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcStatusResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcStatusErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcTransactionResponseAnd_RpcTransactionErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcTransactionResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcTransactionErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcValidatorResponseAnd_RpcValidatorErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcValidatorResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcValidatorErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcViewAccessKeyListResponseAnd_RpcViewAccessKeyListErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcViewAccessKeyListResponseSchema()),
        }),
        z.object({
          error: z.lazy(() =>
            ErrorWrapperFor_RpcViewAccessKeyListErrorSchema()
          ),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcViewAccessKeyResponseAnd_RpcViewAccessKeyErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcViewAccessKeyResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcViewAccessKeyErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcViewAccountResponseAnd_RpcViewAccountErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcViewAccountResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcViewAccountErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcViewCodeResponseAnd_RpcViewCodeErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcViewCodeResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcViewCodeErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcViewStateResponseAnd_RpcViewStateErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcViewStateResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => ErrorWrapperFor_RpcViewStateErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

//
// Information about a Producer: its account name, peer_id and a list of
// connected peers that the node can use to send message for this producer.

export const KnownProducerViewSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    nextHops: z.optional(
      z.union([
        z.union([z.array(z.lazy(() => PublicKeySchema())), z.null()]),
        z.null(),
      ])
    ),
    peerId: z.lazy(() => PublicKeySchema()),
  });

export const LightClientBlockLiteViewSchema = () =>
  z.object({
    innerLite: z.lazy(() => BlockHeaderInnerLiteViewSchema()),
    innerRestHash: z.lazy(() => CryptoHashSchema()),
    prevBlockHash: z.lazy(() => CryptoHashSchema()),
  });

//
// Describes limits for VM and Runtime. TODO #4139: consider switching to
// strongly-typed wrappers instead of raw quantities

export const LimitConfigSchema = () =>
  z.object({
    accountIdValidityRulesVersion: z.optional(
      z.lazy(() => AccountIdValidityRulesVersionSchema())
    ),
    initialMemoryPages: z.optional(z.number()),
    maxActionsPerReceipt: z.optional(z.number()),
    maxArgumentsLength: z.optional(z.number()),
    maxContractSize: z.optional(z.number()),
    maxElementsPerContractTable: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    maxFunctionsNumberPerContract: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    maxGasBurnt: z.optional(z.lazy(() => NearGasSchema())),
    maxLengthMethodName: z.optional(z.number()),
    maxLengthReturnedData: z.optional(z.number()),
    maxLengthStorageKey: z.optional(z.number()),
    maxLengthStorageValue: z.optional(z.number()),
    maxLocalsPerContract: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    maxMemoryPages: z.optional(z.number()),
    maxNumberBytesMethodNames: z.optional(z.number()),
    maxNumberInputDataDependencies: z.optional(z.number()),
    maxNumberLogs: z.optional(z.number()),
    maxNumberRegisters: z.optional(z.number()),
    maxPromisesPerFunctionCallAction: z.optional(z.number()),
    maxReceiptSize: z.optional(z.number()),
    maxRegisterSize: z.optional(z.number()),
    maxStackHeight: z.optional(z.number()),
    maxTablesPerContract: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    maxTotalLogLength: z.optional(z.number()),
    maxTotalPrepaidGas: z.optional(z.lazy(() => NearGasSchema())),
    maxTransactionSize: z.optional(z.number()),
    maxYieldPayloadSize: z.optional(z.number()),
    perReceiptStorageProofSizeLimit: z.optional(z.number()),
    registersMemoryLimit: z.optional(z.number()),
    yieldTimeoutLengthInBlocks: z.optional(z.number()),
  });

export const LogSummaryStyleSchema = () => z.enum(['plain', 'colored']);

export const MerklePathItemSchema = () =>
  z.object({
    direction: z.lazy(() => DirectionSchema()),
    hash: z.lazy(() => CryptoHashSchema()),
  });

export const MethodResolveErrorSchema = () =>
  z.enum(['MethodEmptyName', 'MethodNotFound', 'MethodInvalidSignature']);

export const MissingTrieValueSchema = () =>
  z.object({
    context: z.lazy(() => MissingTrieValueContextSchema()),
    hash: z.lazy(() => CryptoHashSchema()),
  });

// Contexts in which `StorageError::MissingTrieValue` error might occur.
export const MissingTrieValueContextSchema = () =>
  z.union([
    z.enum(['TrieIterator']),
    z.enum(['TriePrefetchingStorage']),
    z.enum(['TrieMemoryPartialStorage']),
    z.enum(['TrieStorage']),
  ]);

export const MutableConfigValueSchema = () => z.string();

export const NearGasSchema = () => z.number();

export const NearTokenSchema = () => z.string();

export const NetworkInfoViewSchema = () =>
  z.object({
    connectedPeers: z.array(z.lazy(() => PeerInfoViewSchema())),
    knownProducers: z.array(z.lazy(() => KnownProducerViewSchema())),
    numConnectedPeers: z.number(),
    peerMaxCount: z.number(),
    tier1AccountsData: z.array(z.lazy(() => AccountDataViewSchema())),
    tier1AccountsKeys: z.array(z.lazy(() => PublicKeySchema())),
    tier1Connections: z.array(z.lazy(() => PeerInfoViewSchema())),
  });

export const NextEpochValidatorInfoSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    publicKey: z.lazy(() => PublicKeySchema()),
    shards: z.array(z.lazy(() => ShardIdSchema())),
    stake: z.lazy(() => NearTokenSchema()),
  });

//
// An Action that can be included in a transaction or receipt, excluding
// delegate actions. This type represents all possible action types except
// DelegateAction to prevent infinite recursion in meta-transactions.

export const NonDelegateActionSchema = () =>
  z.union([
    z.object({
      CreateAccount: z.lazy(() => CreateAccountActionSchema()),
    }),
    z.object({
      DeployContract: z.lazy(() => DeployContractActionSchema()),
    }),
    z.object({
      FunctionCall: z.lazy(() => FunctionCallActionSchema()),
    }),
    z.object({
      Transfer: z.lazy(() => TransferActionSchema()),
    }),
    z.object({
      Stake: z.lazy(() => StakeActionSchema()),
    }),
    z.object({
      AddKey: z.lazy(() => AddKeyActionSchema()),
    }),
    z.object({
      DeleteKey: z.lazy(() => DeleteKeyActionSchema()),
    }),
    z.object({
      DeleteAccount: z.lazy(() => DeleteAccountActionSchema()),
    }),
    z.object({
      DeployGlobalContract: z.lazy(() => DeployGlobalContractActionSchema()),
    }),
    z.object({
      UseGlobalContract: z.lazy(() => UseGlobalContractActionSchema()),
    }),
    z.object({
      DeterministicStateInit: z.lazy(() =>
        DeterministicStateInitActionSchema()
      ),
    }),
  ]);

// Peer id is the public key.
export const PeerIdSchema = () => z.lazy(() => PublicKeySchema());

export const PeerInfoViewSchema = () =>
  z.object({
    accountId: z.optional(z.union([z.lazy(() => AccountIdSchema()), z.null()])),
    addr: z.string(),
    archival: z.boolean(),
    blockHash: z.optional(
      z.union([z.lazy(() => CryptoHashSchema()), z.null()])
    ),
    connectionEstablishedTimeMillis: z.number(),
    height: z.optional(z.union([z.union([z.number(), z.null()]), z.null()])),
    isHighestBlockInvalid: z.boolean(),
    isOutboundPeer: z.boolean(),
    lastTimePeerRequestedMillis: z.number(),
    lastTimeReceivedMessageMillis: z.number(),
    nonce: z.number(),
    peerId: z.lazy(() => PublicKeySchema()),
    receivedBytesPerSec: z.number(),
    sentBytesPerSec: z.number(),
    trackedShards: z.array(z.lazy(() => ShardIdSchema())),
  });

// Error that can occur while preparing or executing Wasm smart-contract.
export const PrepareErrorSchema = () =>
  z.union([
    z.enum(['Serialization']),
    z.enum(['Deserialization']),
    z.enum(['InternalMemoryDeclared']),
    z.enum(['GasInstrumentation']),
    z.enum(['StackHeightInstrumentation']),
    z.enum(['Instantiate']),
    z.enum(['Memory']),
    z.enum(['TooManyFunctions']),
    z.enum(['TooManyLocals']),
    z.enum(['TooManyTables']),
    z.enum(['TooManyTableElements']),
  ]);

//
// Configures whether the node checks the next or the next next epoch for
// network version compatibility.

export const ProtocolVersionCheckConfigSchema = () =>
  z.enum(['Next', 'NextNext']);

export const PublicKeySchema = () => z.string();

export const RangeOfUint64Schema = () =>
  z.object({
    end: z.number(),
    start: z.number(),
  });

export const ReceiptEnumViewSchema = () =>
  z.union([
    z.object({
      Action: z.object({
        actions: z.array(z.lazy(() => ActionViewSchema())),
        gasPrice: z.lazy(() => NearTokenSchema()),
        inputDataIds: z.array(z.lazy(() => CryptoHashSchema())),
        isPromiseYield: z.optional(z.boolean()),
        outputDataReceivers: z.array(z.lazy(() => DataReceiverViewSchema())),
        refundTo: z.optional(
          z.union([z.lazy(() => AccountIdSchema()), z.null()])
        ),
        signerId: z.lazy(() => AccountIdSchema()),
        signerPublicKey: z.lazy(() => PublicKeySchema()),
      }),
    }),
    z.object({
      Data: z.object({
        data: z.optional(z.union([z.union([z.string(), z.null()]), z.null()])),
        dataId: z.lazy(() => CryptoHashSchema()),
        isPromiseResume: z.optional(z.boolean()),
      }),
    }),
    z.object({
      GlobalContractDistribution: z.object({
        alreadyDeliveredShards: z.array(z.lazy(() => ShardIdSchema())),
        code: z.string(),
        id: z.lazy(() => GlobalContractIdentifierSchema()),
        targetShard: z.lazy(() => ShardIdSchema()),
      }),
    }),
  ]);

// Describes the error for validating a receipt.
export const ReceiptValidationErrorSchema = () =>
  z.union([
    z.object({
      InvalidPredecessorId: z.object({
        accountId: z.string(),
      }),
    }),
    z.object({
      InvalidReceiverId: z.object({
        accountId: z.string(),
      }),
    }),
    z.object({
      InvalidSignerId: z.object({
        accountId: z.string(),
      }),
    }),
    z.object({
      InvalidDataReceiverId: z.object({
        accountId: z.string(),
      }),
    }),
    z.object({
      ReturnedValueLengthExceeded: z.object({
        length: z.number(),
        limit: z.number(),
      }),
    }),
    z.object({
      NumberInputDataDependenciesExceeded: z.object({
        limit: z.number(),
        numberOfInputDataDependencies: z.number(),
      }),
    }),
    z.object({
      ActionsValidation: z.lazy(() => ActionsValidationErrorSchema()),
    }),
    z.object({
      ReceiptSizeExceeded: z.object({
        limit: z.number(),
        size: z.number(),
      }),
    }),
    z.object({
      InvalidRefundTo: z.object({
        accountId: z.string(),
      }),
    }),
  ]);

export const ReceiptViewSchema = () =>
  z.object({
    predecessorId: z.lazy(() => AccountIdSchema()),
    priority: z.optional(z.number()),
    receipt: z.lazy(() => ReceiptEnumViewSchema()),
    receiptId: z.lazy(() => CryptoHashSchema()),
    receiverId: z.lazy(() => AccountIdSchema()),
  });

export const RpcBlockErrorSchema = () =>
  z.union([
    z.object({
      info: z.record(z.string(), z.unknown()),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      name: z.enum(['NOT_SYNCED_YET']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcBlockRequestSchema = () =>
  z.union([
    z.object({
      blockId: z.lazy(() => BlockIdSchema()),
    }),
    z.object({
      finality: z.lazy(() => FinalitySchema()),
    }),
    z.object({
      syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
    }),
  ]);

export const RpcBlockResponseSchema = () =>
  z.object({
    author: z.lazy(() => AccountIdSchema()),
    chunks: z.array(z.lazy(() => ChunkHeaderViewSchema())),
    header: z.lazy(() => BlockHeaderViewSchema()),
  });

export const RpcCallFunctionErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        blockReference: z.lazy(() => BlockReferenceSchema()),
      }),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['INVALID_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['UNKNOWN_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        contractAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['NO_CONTRACT_CODE']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        vmError: z.lazy(() => FunctionCallErrorSchema()),
      }),
      name: z.enum(['CONTRACT_EXECUTION_ERROR']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcCallFunctionRequestSchema = () =>
  z.intersection(
    z.union([
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
    ]),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
      argsBase64: z.lazy(() => FunctionArgsSchema()),
      methodName: z.string(),
    })
  );

// A result returned by contract method
export const RpcCallFunctionResponseSchema = () =>
  z.object({
    blockHash: z.lazy(() => CryptoHashSchema()),
    blockHeight: z.number(),
    logs: z.array(z.string()),
    result: z.array(z.number()),
  });

export const RpcChunkErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
    z.object({
      info: z.record(z.string(), z.unknown()),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        shardId: z.lazy(() => ShardIdSchema()),
      }),
      name: z.enum(['INVALID_SHARD_ID']),
    }),
    z.object({
      info: z.object({
        chunkHash: z.lazy(() => ChunkHashSchema()),
      }),
      name: z.enum(['UNKNOWN_CHUNK']),
    }),
  ]);

export const RpcChunkRequestSchema = () =>
  z.union([
    z.object({
      blockId: z.lazy(() => BlockIdSchema()),
      shardId: z.lazy(() => ShardIdSchema()),
    }),
    z.object({
      chunkId: z.lazy(() => CryptoHashSchema()),
    }),
  ]);

export const RpcChunkResponseSchema = () =>
  z.object({
    author: z.lazy(() => AccountIdSchema()),
    header: z.lazy(() => ChunkHeaderViewSchema()),
    receipts: z.array(z.lazy(() => ReceiptViewSchema())),
    transactions: z.array(z.lazy(() => SignedTransactionViewSchema())),
  });

export const RpcClientConfigErrorSchema = () =>
  z.object({
    info: z.object({
      errorMessage: z.string(),
    }),
    name: z.enum(['INTERNAL_ERROR']),
  });

export const RpcClientConfigRequestSchema = () => z.null();

// ClientConfig where some fields can be updated at runtime.
export const RpcClientConfigResponseSchema = () =>
  z.object({
    archive: z.optional(z.boolean()),
    blockFetchHorizon: z.optional(z.number()),
    blockHeaderFetchHorizon: z.optional(z.number()),
    blockProductionTrackingDelay: z.optional(z.array(z.number())),
    catchupStepPeriod: z.optional(z.array(z.number())),
    chainId: z.optional(z.string()),
    chunkDistributionNetwork: z.optional(
      z.union([z.lazy(() => ChunkDistributionNetworkConfigSchema()), z.null()])
    ),
    chunkRequestRetryPeriod: z.optional(z.array(z.number())),
    chunkValidationThreads: z.optional(z.number()),
    chunkWaitMult: z.optional(z.array(z.number())),
    chunksCacheHeightHorizon: z.optional(z.number()),
    clientBackgroundMigrationThreads: z.optional(z.number()),
    cloudArchivalWriter: z.optional(
      z.union([z.lazy(() => CloudArchivalWriterConfigSchema()), z.null()])
    ),
    disableTxRouting: z.optional(z.boolean()),
    doomslugStepPeriod: z.optional(z.array(z.number())),
    enableEarlyPrepareTransactions: z.optional(z.boolean()),
    enableMultilineLogging: z.optional(z.boolean()),
    enableStatisticsExport: z.optional(z.boolean()),
    epochLength: z.optional(z.number()),
    epochSync: z.optional(z.lazy(() => EpochSyncConfigSchema())),
    expectedShutdown: z.optional(z.lazy(() => MutableConfigValueSchema())),
    gc: z.optional(z.lazy(() => GCConfigSchema())),
    headerSyncExpectedHeightPerSecond: z.optional(z.number()),
    headerSyncInitialTimeout: z.optional(z.array(z.number())),
    headerSyncProgressTimeout: z.optional(z.array(z.number())),
    headerSyncStallBanTimeout: z.optional(z.array(z.number())),
    logSummaryPeriod: z.optional(z.array(z.number())),
    logSummaryStyle: z.optional(z.lazy(() => LogSummaryStyleSchema())),
    maxBlockProductionDelay: z.optional(z.array(z.number())),
    maxBlockWaitDelay: z.optional(z.array(z.number())),
    maxGasBurntView: z.optional(
      z.union([z.lazy(() => NearGasSchema()), z.null()])
    ),
    minBlockProductionDelay: z.optional(z.array(z.number())),
    minNumPeers: z.optional(z.number()),
    numBlockProducerSeats: z.optional(z.number()),
    orphanStateWitnessMaxSize: z.optional(z.number()),
    orphanStateWitnessPoolSize: z.optional(z.number()),
    produceChunkAddTransactionsTimeLimit: z.optional(z.string()),
    produceEmptyBlocks: z.optional(z.boolean()),
    protocolVersionCheck: z.optional(
      z.lazy(() => ProtocolVersionCheckConfigSchema())
    ),
    reshardingConfig: z.optional(z.lazy(() => MutableConfigValueSchema())),
    rpcAddr: z.optional(z.union([z.union([z.string(), z.null()]), z.null()])),
    saveInvalidWitnesses: z.optional(z.boolean()),
    saveLatestWitnesses: z.optional(z.boolean()),
    saveStateChanges: z.optional(z.boolean()),
    saveTrieChanges: z.optional(z.boolean()),
    saveTxOutcomes: z.optional(z.boolean()),
    saveUntrackedPartialChunksParts: z.optional(z.boolean()),
    skipSyncWait: z.optional(z.boolean()),
    stateRequestServerThreads: z.optional(z.number()),
    stateRequestThrottlePeriod: z.optional(z.array(z.number())),
    stateRequestsPerThrottlePeriod: z.optional(z.number()),
    stateSync: z.optional(z.lazy(() => StateSyncConfigSchema())),
    stateSyncEnabled: z.optional(z.boolean()),
    stateSyncExternalBackoff: z.optional(z.array(z.number())),
    stateSyncExternalTimeout: z.optional(z.array(z.number())),
    stateSyncP2pTimeout: z.optional(z.array(z.number())),
    stateSyncRetryBackoff: z.optional(z.array(z.number())),
    syncCheckPeriod: z.optional(z.array(z.number())),
    syncHeightThreshold: z.optional(z.number()),
    syncMaxBlockRequests: z.optional(z.number()),
    syncStepPeriod: z.optional(z.array(z.number())),
    trackedShardsConfig: z.optional(z.lazy(() => TrackedShardsConfigSchema())),
    transactionPoolSizeLimit: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    transactionRequestHandlerThreads: z.optional(z.number()),
    trieViewerStateSizeLimit: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    ttlAccountIdRouter: z.optional(z.array(z.number())),
    txRoutingHeightHorizon: z.optional(z.number()),
    version: z.optional(z.lazy(() => VersionSchema())),
    viewClientThreads: z.optional(z.number()),
  });

export const RpcCongestionLevelRequestSchema = () =>
  z.union([
    z.object({
      blockId: z.lazy(() => BlockIdSchema()),
      shardId: z.lazy(() => ShardIdSchema()),
    }),
    z.object({
      chunkId: z.lazy(() => CryptoHashSchema()),
    }),
  ]);

export const RpcCongestionLevelResponseSchema = () =>
  z.object({
    congestionLevel: z.number(),
  });

export const RpcGasPriceErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
    z.object({
      info: z.record(z.string(), z.unknown()),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
  ]);

export const RpcGasPriceRequestSchema = () =>
  z.object({
    blockId: z.optional(z.union([z.lazy(() => BlockIdSchema()), z.null()])),
  });

export const RpcGasPriceResponseSchema = () =>
  z.object({
    gasPrice: z.lazy(() => NearTokenSchema()),
  });

export const RpcHealthRequestSchema = () => z.null();

export const RpcHealthResponseSchema = () => z.null();

export const RpcKnownProducerSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    addr: z.optional(z.union([z.union([z.string(), z.null()]), z.null()])),
    peerId: z.lazy(() => PeerIdSchema()),
  });

export const RpcLightClientBlockProofRequestSchema = () =>
  z.object({
    blockHash: z.lazy(() => CryptoHashSchema()),
    lightClientHead: z.lazy(() => CryptoHashSchema()),
  });

export const RpcLightClientBlockProofResponseSchema = () =>
  z.object({
    blockHeaderLite: z.lazy(() => LightClientBlockLiteViewSchema()),
    blockProof: z.array(z.lazy(() => MerklePathItemSchema())),
  });

export const RpcLightClientExecutionProofRequestSchema = () =>
  z.intersection(
    z.union([
      z.object({
        senderId: z.lazy(() => AccountIdSchema()),
        transactionHash: z.lazy(() => CryptoHashSchema()),
        type: z.enum(['transaction']),
      }),
      z.object({
        receiptId: z.lazy(() => CryptoHashSchema()),
        receiverId: z.lazy(() => AccountIdSchema()),
        type: z.enum(['receipt']),
      }),
    ]),
    z.object({
      lightClientHead: z.lazy(() => CryptoHashSchema()),
    })
  );

export const RpcLightClientExecutionProofResponseSchema = () =>
  z.object({
    blockHeaderLite: z.lazy(() => LightClientBlockLiteViewSchema()),
    blockProof: z.array(z.lazy(() => MerklePathItemSchema())),
    outcomeProof: z.lazy(() => ExecutionOutcomeWithIdViewSchema()),
    outcomeRootProof: z.array(z.lazy(() => MerklePathItemSchema())),
  });

export const RpcLightClientNextBlockErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
    z.object({
      info: z.record(z.string(), z.unknown()),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        epochId: z.lazy(() => EpochIdSchema()),
      }),
      name: z.enum(['EPOCH_OUT_OF_BOUNDS']),
    }),
  ]);

export const RpcLightClientNextBlockRequestSchema = () =>
  z.object({
    lastBlockHash: z.lazy(() => CryptoHashSchema()),
  });

//
// A state for the current head of a light client. More info
// [here](https://nomicon.io/ChainSpec/LightClient).

export const RpcLightClientNextBlockResponseSchema = () =>
  z.object({
    approvalsAfterNext: z.optional(
      z.array(z.union([z.lazy(() => SignatureSchema()), z.null()]))
    ),
    innerLite: z.optional(z.lazy(() => BlockHeaderInnerLiteViewSchema())),
    innerRestHash: z.optional(z.lazy(() => CryptoHashSchema())),
    nextBlockInnerHash: z.optional(z.lazy(() => CryptoHashSchema())),
    nextBps: z.optional(
      z.union([
        z.union([z.array(z.lazy(() => ValidatorStakeViewSchema())), z.null()]),
        z.null(),
      ])
    ),
    prevBlockHash: z.optional(z.lazy(() => CryptoHashSchema())),
  });

export const RpcLightClientProofErrorSchema = () =>
  z.union([
    z.object({
      info: z.record(z.string(), z.unknown()),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        executionOutcomeShardId: z.lazy(() => ShardIdSchema()),
        numberOrShards: z.number(),
      }),
      name: z.enum(['INCONSISTENT_STATE']),
    }),
    z.object({
      info: z.object({
        transactionOrReceiptId: z.lazy(() => CryptoHashSchema()),
      }),
      name: z.enum(['NOT_CONFIRMED']),
    }),
    z.object({
      info: z.object({
        transactionOrReceiptId: z.lazy(() => CryptoHashSchema()),
      }),
      name: z.enum(['UNKNOWN_TRANSACTION_OR_RECEIPT']),
    }),
    z.object({
      info: z.object({
        shardId: z.lazy(() => ShardIdSchema()),
        transactionOrReceiptId: z.lazy(() => CryptoHashSchema()),
      }),
      name: z.enum(['UNAVAILABLE_SHARD']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcMaintenanceWindowsErrorSchema = () =>
  z.object({
    info: z.object({
      errorMessage: z.string(),
    }),
    name: z.enum(['INTERNAL_ERROR']),
  });

export const RpcMaintenanceWindowsRequestSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
  });

export const RpcNetworkInfoErrorSchema = () =>
  z.object({
    info: z.object({
      errorMessage: z.string(),
    }),
    name: z.enum(['INTERNAL_ERROR']),
  });

export const RpcNetworkInfoRequestSchema = () => z.null();

export const RpcNetworkInfoResponseSchema = () =>
  z.object({
    activePeers: z.array(z.lazy(() => RpcPeerInfoSchema())),
    knownProducers: z.array(z.lazy(() => RpcKnownProducerSchema())),
    numActivePeers: z.number(),
    peerMaxCount: z.number(),
    receivedBytesPerSec: z.number(),
    sentBytesPerSec: z.number(),
  });

export const RpcPeerInfoSchema = () =>
  z.object({
    accountId: z.optional(z.union([z.lazy(() => AccountIdSchema()), z.null()])),
    addr: z.optional(z.union([z.union([z.string(), z.null()]), z.null()])),
    id: z.lazy(() => PeerIdSchema()),
  });

export const RpcProtocolConfigErrorSchema = () =>
  z.union([
    z.object({
      info: z.record(z.string(), z.unknown()),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcProtocolConfigRequestSchema = () =>
  z.union([
    z.object({
      blockId: z.lazy(() => BlockIdSchema()),
    }),
    z.object({
      finality: z.lazy(() => FinalitySchema()),
    }),
    z.object({
      syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
    }),
  ]);

export const RpcProtocolConfigResponseSchema = () =>
  z.object({
    avgHiddenValidatorSeatsPerShard: z.optional(z.array(z.number())),
    blockProducerKickoutThreshold: z.optional(z.number()),
    chainId: z.optional(z.string()),
    chunkProducerKickoutThreshold: z.optional(z.number()),
    chunkValidatorOnlyKickoutThreshold: z.optional(z.number()),
    dynamicResharding: z.optional(z.boolean()),
    epochLength: z.optional(z.number()),
    fishermenThreshold: z.optional(z.lazy(() => NearTokenSchema())),
    gasLimit: z.optional(z.lazy(() => NearGasSchema())),
    gasPriceAdjustmentRate: z.optional(z.array(z.number())),
    genesisHeight: z.optional(z.number()),
    genesisTime: z.optional(z.string()),
    maxGasPrice: z.optional(z.lazy(() => NearTokenSchema())),
    maxInflationRate: z.optional(z.array(z.number())),
    maxKickoutStakePerc: z.optional(z.number()),
    minGasPrice: z.optional(z.lazy(() => NearTokenSchema())),
    minimumStakeDivisor: z.optional(z.number()),
    minimumStakeRatio: z.optional(z.array(z.number())),
    minimumValidatorsPerShard: z.optional(z.number()),
    numBlockProducerSeats: z.optional(z.number()),
    numBlockProducerSeatsPerShard: z.optional(z.array(z.number())),
    numBlocksPerYear: z.optional(z.number()),
    onlineMaxThreshold: z.optional(z.array(z.number())),
    onlineMinThreshold: z.optional(z.array(z.number())),
    protocolRewardRate: z.optional(z.array(z.number())),
    protocolTreasuryAccount: z.optional(z.lazy(() => AccountIdSchema())),
    protocolUpgradeStakeThreshold: z.optional(z.array(z.number())),
    protocolVersion: z.optional(z.number()),
    runtimeConfig: z.optional(z.lazy(() => RuntimeConfigViewSchema())),
    shardLayout: z.optional(z.lazy(() => ShardLayoutSchema())),
    shuffleShardAssignmentForChunkProducers: z.optional(z.boolean()),
    targetValidatorMandatesPerShard: z.optional(z.number()),
    transactionValidityPeriod: z.optional(z.number()),
  });

export const RpcQueryErrorSchema = () =>
  z.union([
    z.object({
      name: z.enum(['NO_SYNCED_BLOCKS']),
    }),
    z.object({
      info: z.object({
        requestedShardId: z.lazy(() => ShardIdSchema()),
      }),
      name: z.enum(['UNAVAILABLE_SHARD']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
      }),
      name: z.enum(['GARBAGE_COLLECTED_BLOCK']),
    }),
    z.object({
      info: z.object({
        blockReference: z.lazy(() => BlockReferenceSchema()),
      }),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['INVALID_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['UNKNOWN_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        contractAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['NO_CONTRACT_CODE']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        contractAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['TOO_LARGE_CONTRACT_STATE']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
      name: z.enum(['UNKNOWN_ACCESS_KEY']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
      name: z.enum(['UNKNOWN_GAS_KEY']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        error: z.lazy(() => FunctionCallErrorSchema()),
        vmError: z.string(),
      }),
      name: z.enum(['CONTRACT_EXECUTION_ERROR']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        identifier: z.lazy(() => GlobalContractIdentifierSchema()),
      }),
      name: z.enum(['NO_GLOBAL_CONTRACT_CODE']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcQueryRequestSchema = () =>
  z.union([
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_account']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_code']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        includeProof: z.optional(z.boolean()),
        prefixBase64: z.lazy(() => StoreKeySchema()),
        requestType: z.enum(['view_state']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        publicKey: z.lazy(() => PublicKeySchema()),
        requestType: z.enum(['view_access_key']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_access_key_list']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        argsBase64: z.lazy(() => FunctionArgsSchema()),
        methodName: z.string(),
        requestType: z.enum(['call_function']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        codeHash: z.lazy(() => CryptoHashSchema()),
        requestType: z.enum(['view_global_contract_code']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_global_contract_code_by_account_id']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_account']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_code']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        includeProof: z.optional(z.boolean()),
        prefixBase64: z.lazy(() => StoreKeySchema()),
        requestType: z.enum(['view_state']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        publicKey: z.lazy(() => PublicKeySchema()),
        requestType: z.enum(['view_access_key']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_access_key_list']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        argsBase64: z.lazy(() => FunctionArgsSchema()),
        methodName: z.string(),
        requestType: z.enum(['call_function']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        codeHash: z.lazy(() => CryptoHashSchema()),
        requestType: z.enum(['view_global_contract_code']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_global_contract_code_by_account_id']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_account']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_code']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        includeProof: z.optional(z.boolean()),
        prefixBase64: z.lazy(() => StoreKeySchema()),
        requestType: z.enum(['view_state']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        publicKey: z.lazy(() => PublicKeySchema()),
        requestType: z.enum(['view_access_key']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_access_key_list']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        argsBase64: z.lazy(() => FunctionArgsSchema()),
        methodName: z.string(),
        requestType: z.enum(['call_function']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        codeHash: z.lazy(() => CryptoHashSchema()),
        requestType: z.enum(['view_global_contract_code']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_global_contract_code_by_account_id']),
      })
    ),
  ]);

export const RpcQueryResponseSchema = () =>
  z.intersection(
    z.union([
      z.lazy(() => AccountViewSchema()),
      z.lazy(() => ContractCodeViewSchema()),
      z.lazy(() => ViewStateResultSchema()),
      z.lazy(() => CallResultSchema()),
      z.lazy(() => AccessKeyViewSchema()),
      z.lazy(() => AccessKeyListSchema()),
    ]),
    z.object({
      blockHash: z.lazy(() => CryptoHashSchema()),
      blockHeight: z.number(),
    })
  );

export const RpcReceiptErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
    z.object({
      info: z.object({
        receiptId: z.lazy(() => CryptoHashSchema()),
      }),
      name: z.enum(['UNKNOWN_RECEIPT']),
    }),
  ]);

export const RpcReceiptRequestSchema = () =>
  z.object({
    receiptId: z.lazy(() => CryptoHashSchema()),
  });

export const RpcReceiptResponseSchema = () =>
  z.object({
    predecessorId: z.lazy(() => AccountIdSchema()),
    priority: z.optional(z.number()),
    receipt: z.lazy(() => ReceiptEnumViewSchema()),
    receiptId: z.lazy(() => CryptoHashSchema()),
    receiverId: z.lazy(() => AccountIdSchema()),
  });

export const RpcRequestValidationErrorKindSchema = () =>
  z.union([
    z.object({
      info: z.object({
        methodName: z.string(),
      }),
      name: z.enum(['METHOD_NOT_FOUND']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['PARSE_ERROR']),
    }),
  ]);

export const RpcSendTransactionRequestSchema = () =>
  z.object({
    signedTxBase64: z.lazy(() => SignedTransactionSchema()),
    waitUntil: z.optional(z.lazy(() => TxExecutionStatusSchema())),
  });

export const RpcSplitStorageInfoErrorSchema = () =>
  z.object({
    info: z.object({
      errorMessage: z.string(),
    }),
    name: z.enum(['INTERNAL_ERROR']),
  });

export const RpcSplitStorageInfoRequestSchema = () =>
  z.record(z.string(), z.unknown());

// Contains the split storage information.
export const RpcSplitStorageInfoResponseSchema = () =>
  z.object({
    coldHeadHeight: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    finalHeadHeight: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    headHeight: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    hotDbKind: z.optional(z.union([z.union([z.string(), z.null()]), z.null()])),
  });

export const RpcStateChangesErrorSchema = () =>
  z.union([
    z.object({
      info: z.record(z.string(), z.unknown()),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      name: z.enum(['NOT_SYNCED_YET']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

//
// It is a [serializable view] of [`StateChangesRequest`]. [serializable
// view]: ./index.html [`StateChangesRequest`]:
// ../types/struct.StateChangesRequest.html

export const RpcStateChangesInBlockByTypeRequestSchema = () =>
  z.union([
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['account_changes']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        changesType: z.enum(['single_access_key_changes']),
        keys: z.array(z.lazy(() => AccountWithPublicKeySchema())),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['all_access_key_changes']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['contract_code_changes']),
      })
    ),
    z.intersection(
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['data_changes']),
        keyPrefixBase64: z.lazy(() => StoreKeySchema()),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['account_changes']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        changesType: z.enum(['single_access_key_changes']),
        keys: z.array(z.lazy(() => AccountWithPublicKeySchema())),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['all_access_key_changes']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['contract_code_changes']),
      })
    ),
    z.intersection(
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['data_changes']),
        keyPrefixBase64: z.lazy(() => StoreKeySchema()),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['account_changes']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        changesType: z.enum(['single_access_key_changes']),
        keys: z.array(z.lazy(() => AccountWithPublicKeySchema())),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['all_access_key_changes']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['contract_code_changes']),
      })
    ),
    z.intersection(
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['data_changes']),
        keyPrefixBase64: z.lazy(() => StoreKeySchema()),
      })
    ),
  ]);

export const RpcStateChangesInBlockByTypeResponseSchema = () =>
  z.object({
    blockHash: z.lazy(() => CryptoHashSchema()),
    changes: z.array(z.lazy(() => StateChangeKindViewSchema())),
  });

export const RpcStateChangesInBlockRequestSchema = () =>
  z.union([
    z.object({
      blockId: z.lazy(() => BlockIdSchema()),
    }),
    z.object({
      finality: z.lazy(() => FinalitySchema()),
    }),
    z.object({
      syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
    }),
  ]);

export const RpcStateChangesInBlockResponseSchema = () =>
  z.object({
    blockHash: z.lazy(() => CryptoHashSchema()),
    changes: z.array(z.lazy(() => StateChangeWithCauseViewSchema())),
  });

export const RpcStatusErrorSchema = () =>
  z.union([
    z.object({
      name: z.enum(['NODE_IS_SYNCING']),
    }),
    z.object({
      info: z.object({
        elapsed: z.array(z.number()),
      }),
      name: z.enum(['NO_NEW_BLOCKS']),
    }),
    z.object({
      info: z.object({
        epochId: z.lazy(() => EpochIdSchema()),
      }),
      name: z.enum(['EPOCH_OUT_OF_BOUNDS']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcStatusRequestSchema = () => z.null();

export const RpcStatusResponseSchema = () =>
  z.object({
    chainId: z.string(),
    detailedDebugStatus: z.optional(
      z.union([z.lazy(() => DetailedDebugStatusSchema()), z.null()])
    ),
    genesisHash: z.lazy(() => CryptoHashSchema()),
    latestProtocolVersion: z.number(),
    nodeKey: z.optional(z.union([z.lazy(() => PublicKeySchema()), z.null()])),
    nodePublicKey: z.lazy(() => PublicKeySchema()),
    protocolVersion: z.number(),
    rpcAddr: z.optional(z.union([z.union([z.string(), z.null()]), z.null()])),
    syncInfo: z.lazy(() => StatusSyncInfoSchema()),
    uptimeSec: z.number(),
    validatorAccountId: z.optional(
      z.union([z.lazy(() => AccountIdSchema()), z.null()])
    ),
    validatorPublicKey: z.optional(
      z.union([z.lazy(() => PublicKeySchema()), z.null()])
    ),
    validators: z.array(z.lazy(() => ValidatorInfoSchema())),
    version: z.lazy(() => VersionSchema()),
  });

export const RpcTransactionErrorSchema = () =>
  z.union([
    z.object({
      info: z.record(z.string(), z.unknown()),
      name: z.enum(['INVALID_TRANSACTION']),
    }),
    z.object({
      name: z.enum(['DOES_NOT_TRACK_SHARD']),
    }),
    z.object({
      info: z.object({
        transactionHash: z.lazy(() => CryptoHashSchema()),
      }),
      name: z.enum(['REQUEST_ROUTED']),
    }),
    z.object({
      info: z.object({
        requestedTransactionHash: z.lazy(() => CryptoHashSchema()),
      }),
      name: z.enum(['UNKNOWN_TRANSACTION']),
    }),
    z.object({
      info: z.object({
        debugInfo: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
    z.object({
      name: z.enum(['TIMEOUT_ERROR']),
    }),
  ]);

export const RpcTransactionResponseSchema = () =>
  z.intersection(
    z.union([
      z.lazy(() => FinalExecutionOutcomeWithReceiptViewSchema()),
      z.lazy(() => FinalExecutionOutcomeViewSchema()),
    ]),
    z.object({
      finalExecutionStatus: z.lazy(() => TxExecutionStatusSchema()),
    })
  );

export const RpcTransactionStatusRequestSchema = () =>
  z.intersection(
    z.union([
      z.object({
        signedTxBase64: z.lazy(() => SignedTransactionSchema()),
      }),
      z.object({
        senderAccountId: z.lazy(() => AccountIdSchema()),
        txHash: z.lazy(() => CryptoHashSchema()),
      }),
    ]),
    z.object({
      waitUntil: z.optional(z.lazy(() => TxExecutionStatusSchema())),
    })
  );

export const RpcValidatorErrorSchema = () =>
  z.union([
    z.object({
      name: z.enum(['UNKNOWN_EPOCH']),
    }),
    z.object({
      name: z.enum(['VALIDATOR_INFO_UNAVAILABLE']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcValidatorRequestSchema = () =>
  z.union([
    z.enum(['latest']),
    z.object({
      epochId: z.lazy(() => EpochIdSchema()),
    }),
    z.object({
      blockId: z.lazy(() => BlockIdSchema()),
    }),
  ]);

// Information about this epoch validators and next epoch validators
export const RpcValidatorResponseSchema = () =>
  z.object({
    currentFishermen: z.array(z.lazy(() => ValidatorStakeViewSchema())),
    currentProposals: z.array(z.lazy(() => ValidatorStakeViewSchema())),
    currentValidators: z.array(z.lazy(() => CurrentEpochValidatorInfoSchema())),
    epochHeight: z.number(),
    epochStartHeight: z.number(),
    nextFishermen: z.array(z.lazy(() => ValidatorStakeViewSchema())),
    nextValidators: z.array(z.lazy(() => NextEpochValidatorInfoSchema())),
    prevEpochKickout: z.array(z.lazy(() => ValidatorKickoutViewSchema())),
  });

export const RpcValidatorsOrderedRequestSchema = () =>
  z.object({
    blockId: z.optional(z.union([z.lazy(() => BlockIdSchema()), z.null()])),
  });

export const RpcViewAccessKeyErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        blockReference: z.lazy(() => BlockReferenceSchema()),
      }),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['INVALID_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['UNKNOWN_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        publicKey: z.lazy(() => PublicKeySchema()),
      }),
      name: z.enum(['UNKNOWN_ACCESS_KEY']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcViewAccessKeyListErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        blockReference: z.lazy(() => BlockReferenceSchema()),
      }),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['INVALID_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['UNKNOWN_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcViewAccessKeyListRequestSchema = () =>
  z.intersection(
    z.union([
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
    ]),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
    })
  );

// Lists access keys
export const RpcViewAccessKeyListResponseSchema = () =>
  z.object({
    blockHash: z.lazy(() => CryptoHashSchema()),
    blockHeight: z.number(),
    keys: z.array(z.lazy(() => AccessKeyInfoViewSchema())),
  });

export const RpcViewAccessKeyRequestSchema = () =>
  z.intersection(
    z.union([
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
    ]),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
      publicKey: z.lazy(() => PublicKeySchema()),
    })
  );

// Describes access key permission scope and nonce.
export const RpcViewAccessKeyResponseSchema = () =>
  z.object({
    blockHash: z.lazy(() => CryptoHashSchema()),
    blockHeight: z.number(),
    nonce: z.number(),
    permission: z.lazy(() => AccessKeyPermissionViewSchema()),
  });

export const RpcViewAccountErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        blockReference: z.lazy(() => BlockReferenceSchema()),
      }),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['INVALID_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['UNKNOWN_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcViewAccountRequestSchema = () =>
  z.intersection(
    z.union([
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
    ]),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
    })
  );

// A view of the account
export const RpcViewAccountResponseSchema = () =>
  z.object({
    amount: z.lazy(() => NearTokenSchema()),
    blockHash: z.lazy(() => CryptoHashSchema()),
    blockHeight: z.number(),
    codeHash: z.lazy(() => CryptoHashSchema()),
    globalContractAccountId: z.optional(
      z.union([z.lazy(() => AccountIdSchema()), z.null()])
    ),
    globalContractHash: z.optional(
      z.union([z.lazy(() => CryptoHashSchema()), z.null()])
    ),
    locked: z.lazy(() => NearTokenSchema()),
    storagePaidAt: z.optional(z.number()),
    storageUsage: z.number(),
  });

export const RpcViewCodeErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        blockReference: z.lazy(() => BlockReferenceSchema()),
      }),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['INVALID_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['UNKNOWN_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        contractAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['NO_CONTRACT_CODE']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcViewCodeRequestSchema = () =>
  z.intersection(
    z.union([
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
    ]),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
    })
  );

// A view of the contract code.
export const RpcViewCodeResponseSchema = () =>
  z.object({
    blockHash: z.lazy(() => CryptoHashSchema()),
    blockHeight: z.number(),
    codeBase64: z.string(),
    hash: z.lazy(() => CryptoHashSchema()),
  });

export const RpcViewStateErrorSchema = () =>
  z.union([
    z.object({
      info: z.object({
        blockReference: z.lazy(() => BlockReferenceSchema()),
      }),
      name: z.enum(['UNKNOWN_BLOCK']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['INVALID_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        requestedAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['UNKNOWN_ACCOUNT']),
    }),
    z.object({
      info: z.object({
        blockHash: z.lazy(() => CryptoHashSchema()),
        blockHeight: z.number(),
        contractAccountId: z.lazy(() => AccountIdSchema()),
      }),
      name: z.enum(['TOO_LARGE_CONTRACT_STATE']),
    }),
    z.object({
      info: z.object({
        errorMessage: z.string(),
      }),
      name: z.enum(['INTERNAL_ERROR']),
    }),
  ]);

export const RpcViewStateRequestSchema = () =>
  z.intersection(
    z.union([
      z.object({
        blockId: z.lazy(() => BlockIdSchema()),
      }),
      z.object({
        finality: z.lazy(() => FinalitySchema()),
      }),
      z.object({
        syncCheckpoint: z.lazy(() => SyncCheckpointSchema()),
      }),
    ]),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
      includeProof: z.optional(z.boolean()),
      prefixBase64: z.lazy(() => StoreKeySchema()),
    })
  );

// Resulting state values for a view state query request
export const RpcViewStateResponseSchema = () =>
  z.object({
    blockHash: z.lazy(() => CryptoHashSchema()),
    blockHeight: z.number(),
    proof: z.optional(z.array(z.string())),
    values: z.array(z.lazy(() => StateItemSchema())),
  });

// View that preserves JSON format of the runtime config.
export const RuntimeConfigViewSchema = () =>
  z.object({
    accountCreationConfig: z.optional(
      z.lazy(() => AccountCreationConfigViewSchema())
    ),
    congestionControlConfig: z.optional(
      z.lazy(() => CongestionControlConfigViewSchema())
    ),
    dynamicReshardingConfig: z.optional(
      z.lazy(() => DynamicReshardingConfigViewSchema())
    ),
    storageAmountPerByte: z.optional(z.lazy(() => NearTokenSchema())),
    transactionCosts: z.optional(z.lazy(() => RuntimeFeesConfigViewSchema())),
    wasmConfig: z.optional(z.lazy(() => VMConfigViewSchema())),
    witnessConfig: z.optional(z.lazy(() => WitnessConfigViewSchema())),
  });

// Describes different fees for the runtime
export const RuntimeFeesConfigViewSchema = () =>
  z.object({
    actionCreationConfig: z.optional(
      z.lazy(() => ActionCreationConfigViewSchema())
    ),
    actionReceiptCreationConfig: z.optional(z.lazy(() => FeeSchema())),
    burntGasReward: z.optional(z.array(z.number())),
    dataReceiptCreationConfig: z.optional(
      z.lazy(() => DataReceiptCreationConfigViewSchema())
    ),
    pessimisticGasPriceInflationRatio: z.optional(z.array(z.number())),
    storageUsageConfig: z.optional(
      z.lazy(() => StorageUsageConfigViewSchema())
    ),
  });

//
// The shard identifier. It may be an arbitrary number - it does not need to
// be a number in the range 0..NUM_SHARDS. The shard ids do not need to be
// sequential or contiguous. The shard id is wrapped in a new type to prevent
// the old pattern of using indices in range 0..NUM_SHARDS and casting to
// ShardId. Once the transition if fully complete it potentially may be
// simplified to a regular type alias.

export const ShardIdSchema = () => z.number();

//
// A versioned struct that contains all information needed to assign accounts
// to shards. Because of re-sharding, the chain may use different shard layout
// to split shards at different times. Currently, `ShardLayout` is stored as
// part of `EpochConfig`, which is generated each epoch given the epoch
// protocol version. In mainnet/testnet, we use two shard layouts since
// re-sharding has only happened once. It is stored as part of genesis config,
// see default_simple_nightshade_shard_layout() Below is an overview for some
// important functionalities of ShardLayout interface.

export const ShardLayoutSchema = () =>
  z.union([
    z.object({
      V0: z.lazy(() => ShardLayoutV0Schema()),
    }),
    z.object({
      V1: z.lazy(() => ShardLayoutV1Schema()),
    }),
    z.object({
      V2: z.lazy(() => ShardLayoutV2Schema()),
    }),
    z.object({
      V3: z.lazy(() => ShardLayoutV3Schema()),
    }),
  ]);

//
// A shard layout that maps accounts evenly across all shards -- by calculate
// the hash of account id and mod number of shards. This is added to capture
// the old `account_id_to_shard_id` algorithm, to keep backward compatibility
// for some existing tests. `parent_shards` for `ShardLayoutV1` is always
// `None`, meaning it can only be the first shard layout a chain uses.

export const ShardLayoutV0Schema = () =>
  z.object({
    numShards: z.number(),
    version: z.number(),
  });

export const ShardLayoutV1Schema = () =>
  z.object({
    boundaryAccounts: z.array(z.lazy(() => AccountIdSchema())),
    shardsSplitMap: z.optional(
      z.union([
        z.union([z.array(z.array(z.lazy(() => ShardIdSchema()))), z.null()]),
        z.null(),
      ])
    ),
    toParentShardMap: z.optional(
      z.union([
        z.union([z.array(z.lazy(() => ShardIdSchema())), z.null()]),
        z.null(),
      ])
    ),
    version: z.number(),
  });

//
// Counterpart to `ShardLayoutV2` composed of maps with string keys to aid
// serde serialization.

export const ShardLayoutV2Schema = () =>
  z.object({
    boundaryAccounts: z.array(z.lazy(() => AccountIdSchema())),
    idToIndexMap: z.record(z.string(), z.number()),
    indexToIdMap: z.record(
      z.string(),
      z.lazy(() => ShardIdSchema())
    ),
    shardIds: z.array(z.lazy(() => ShardIdSchema())),
    shardsParentMap: z.optional(
      z.union([
        z.union([
          z.record(
            z.string(),
            z.lazy(() => ShardIdSchema())
          ),
          z.null(),
        ]),
        z.null(),
      ])
    ),
    shardsSplitMap: z.optional(
      z.union([
        z.union([
          z.record(z.string(), z.array(z.lazy(() => ShardIdSchema()))),
          z.null(),
        ]),
        z.null(),
      ])
    ),
    version: z.number(),
  });

//
// Counterpart to `ShardLayoutV3` composed of maps with string keys to aid
// serde serialization.

export const ShardLayoutV3Schema = () =>
  z.object({
    boundaryAccounts: z.array(z.lazy(() => AccountIdSchema())),
    idToIndexMap: z.record(z.string(), z.number()),
    lastSplit: z.lazy(() => ShardIdSchema()),
    shardIds: z.array(z.lazy(() => ShardIdSchema())),
    shardsSplitMap: z.record(
      z.string(),
      z.array(z.lazy(() => ShardIdSchema()))
    ),
  });

//
// `ShardUId` is a unique representation for shards from different shard
// layouts. Comparing to `ShardId`, which is just an ordinal number ranging
// from 0 to NUM_SHARDS-1, `ShardUId` provides a way to unique identify shards
// when shard layouts may change across epochs. This is important because we
// store states indexed by shards in our database, so we need a way to unique
// identify shard even when shards change across epochs. Another difference
// between `ShardUId` and `ShardId` is that `ShardUId` should only exist in a
// node's internal state while `ShardId` can be exposed to outside APIs and
// used in protocol level information (for example, `ShardChunkHeader`
// contains `ShardId` instead of `ShardUId`)

export const ShardUIdSchema = () =>
  z.object({
    shardId: z.number(),
    version: z.number(),
  });

export const SignatureSchema = () => z.string();

export const SignedDelegateActionSchema = () =>
  z.object({
    delegateAction: z.lazy(() => DelegateActionSchema()),
    signature: z.lazy(() => SignatureSchema()),
  });

export const SignedTransactionSchema = () => z.string();

export const SignedTransactionViewSchema = () =>
  z.object({
    actions: z.array(z.lazy(() => ActionViewSchema())),
    hash: z.lazy(() => CryptoHashSchema()),
    nonce: z.number(),
    priorityFee: z.optional(z.number()),
    publicKey: z.lazy(() => PublicKeySchema()),
    receiverId: z.lazy(() => AccountIdSchema()),
    signature: z.lazy(() => SignatureSchema()),
    signerId: z.lazy(() => AccountIdSchema()),
  });

export const SlashedValidatorSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    isDoubleSign: z.boolean(),
  });

// An action which stakes signer_id tokens and setup's validator public key
export const StakeActionSchema = () =>
  z.object({
    publicKey: z.lazy(() => PublicKeySchema()),
    stake: z.lazy(() => NearTokenSchema()),
  });

// See crate::types::StateChangeCause for details.
export const StateChangeCauseViewSchema = () =>
  z.union([
    z.object({
      type: z.enum(['not_writable_to_disk']),
    }),
    z.object({
      type: z.enum(['initial_state']),
    }),
    z.object({
      txHash: z.lazy(() => CryptoHashSchema()),
      type: z.enum(['transaction_processing']),
    }),
    z.object({
      receiptHash: z.lazy(() => CryptoHashSchema()),
      type: z.enum(['action_receipt_processing_started']),
    }),
    z.object({
      receiptHash: z.lazy(() => CryptoHashSchema()),
      type: z.enum(['action_receipt_gas_reward']),
    }),
    z.object({
      receiptHash: z.lazy(() => CryptoHashSchema()),
      type: z.enum(['receipt_processing']),
    }),
    z.object({
      receiptHash: z.lazy(() => CryptoHashSchema()),
      type: z.enum(['postponed_receipt']),
    }),
    z.object({
      type: z.enum(['updated_delayed_receipts']),
    }),
    z.object({
      type: z.enum(['validator_accounts_update']),
    }),
    z.object({
      type: z.enum(['migration']),
    }),
    z.object({
      type: z.enum(['bandwidth_scheduler_state_update']),
    }),
  ]);

//
// It is a [serializable view] of [`StateChangeKind`]. [serializable view]:
// ./index.html [`StateChangeKind`]: ../types/struct.StateChangeKind.html

export const StateChangeKindViewSchema = () =>
  z.union([
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
      type: z.enum(['account_touched']),
    }),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
      type: z.enum(['access_key_touched']),
    }),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
      type: z.enum(['data_touched']),
    }),
    z.object({
      accountId: z.lazy(() => AccountIdSchema()),
      type: z.enum(['contract_code_touched']),
    }),
  ]);

export const StateChangeWithCauseViewSchema = () =>
  z.intersection(
    z.union([
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
          amount: z.lazy(() => NearTokenSchema()),
          codeHash: z.lazy(() => CryptoHashSchema()),
          globalContractAccountId: z.optional(
            z.union([z.lazy(() => AccountIdSchema()), z.null()])
          ),
          globalContractHash: z.optional(
            z.union([z.lazy(() => CryptoHashSchema()), z.null()])
          ),
          locked: z.lazy(() => NearTokenSchema()),
          storagePaidAt: z.optional(z.number()),
          storageUsage: z.number(),
        }),
        type: z.enum(['account_update']),
      }),
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
        }),
        type: z.enum(['account_deletion']),
      }),
      z.object({
        change: z.object({
          accessKey: z.lazy(() => AccessKeyViewSchema()),
          accountId: z.lazy(() => AccountIdSchema()),
          publicKey: z.lazy(() => PublicKeySchema()),
        }),
        type: z.enum(['access_key_update']),
      }),
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
          publicKey: z.lazy(() => PublicKeySchema()),
        }),
        type: z.enum(['access_key_deletion']),
      }),
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
          keyBase64: z.lazy(() => StoreKeySchema()),
          valueBase64: z.lazy(() => StoreValueSchema()),
        }),
        type: z.enum(['data_update']),
      }),
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
          keyBase64: z.lazy(() => StoreKeySchema()),
        }),
        type: z.enum(['data_deletion']),
      }),
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
          codeBase64: z.string(),
        }),
        type: z.enum(['contract_code_update']),
      }),
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
        }),
        type: z.enum(['contract_code_deletion']),
      }),
    ]),
    z.object({
      cause: z.lazy(() => StateChangeCauseViewSchema()),
    })
  );

//
// Item of the state, key and value are serialized in base64 and proof for
// inclusion of given state item.

export const StateItemSchema = () =>
  z.object({
    key: z.lazy(() => StoreKeySchema()),
    value: z.lazy(() => StoreValueSchema()),
  });

export const StateSyncConfigSchema = () =>
  z.object({
    concurrency: z.optional(z.lazy(() => SyncConcurrencySchema())),
    dump: z.optional(z.union([z.lazy(() => DumpConfigSchema()), z.null()])),
    partsCompressionLvl: z.optional(z.number()),
    sync: z.optional(z.lazy(() => SyncConfigSchema())),
  });

export const StatusSyncInfoSchema = () =>
  z.object({
    earliestBlockHash: z.optional(
      z.union([z.lazy(() => CryptoHashSchema()), z.null()])
    ),
    earliestBlockHeight: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    earliestBlockTime: z.optional(
      z.union([z.union([z.string(), z.null()]), z.null()])
    ),
    epochId: z.optional(z.union([z.lazy(() => EpochIdSchema()), z.null()])),
    epochStartHeight: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    latestBlockHash: z.lazy(() => CryptoHashSchema()),
    latestBlockHeight: z.number(),
    latestBlockTime: z.string(),
    latestStateRoot: z.lazy(() => CryptoHashSchema()),
    syncing: z.boolean(),
  });

//
// Errors which may occur during working with trie storages, storing trie
// values (trie nodes and state values) by their hashes.

export const StorageErrorSchema = () =>
  z.union([
    z.enum(['StorageInternalError']),
    z.object({
      MissingTrieValue: z.lazy(() => MissingTrieValueSchema()),
    }),
    z.enum(['UnexpectedTrieValue']),
    z.object({
      StorageInconsistentState: z.string(),
    }),
    z.object({
      FlatStorageBlockNotSupported: z.string(),
    }),
    z.object({
      MemTrieLoadingError: z.string(),
    }),
  ]);

//
// This enum represents if a storage_get call will be performed through flat
// storage or trie

export const StorageGetModeSchema = () => z.enum(['FlatStorage', 'Trie']);

// Describes cost of storage per block
export const StorageUsageConfigViewSchema = () =>
  z.object({
    numBytesAccount: z.optional(z.number()),
    numExtraBytesRecord: z.optional(z.number()),
  });

//
// This type is used to mark keys (arrays of bytes) that are queried from
// store. NOTE: Currently, this type is only used in the view_client and RPC
// to be able to transparently pretty-serialize the bytes arrays as
// base64-encoded strings (see `serialize.rs`).

export const StoreKeySchema = () => z.string();

//
// This type is used to mark values returned from store (arrays of bytes).
// NOTE: Currently, this type is only used in the view_client and RPC to be
// able to transparently pretty-serialize the bytes arrays as base64-encoded
// strings (see `serialize.rs`).

export const StoreValueSchema = () => z.string();

export const SyncCheckpointSchema = () =>
  z.enum(['genesis', 'earliest_available']);

export const SyncConcurrencySchema = () =>
  z.object({
    apply: z.optional(z.number()),
    applyDuringCatchup: z.optional(z.number()),
    peerDownloads: z.optional(z.number()),
    perShard: z.optional(z.number()),
  });

// Configures how to fetch state parts during state sync.
export const SyncConfigSchema = () =>
  z.union([
    z.enum(['Peers']),
    z.object({
      ExternalStorage: z.lazy(() => ExternalStorageConfigSchema()),
    }),
  ]);

export const Tier1ProxyViewSchema = () =>
  z.object({
    addr: z.string(),
    peerId: z.lazy(() => PublicKeySchema()),
  });

//
// Describes the expected behavior of the node regarding shard tracking. If
// the node is an active validator, it will also track the shards it is
// responsible for as a validator.

export const TrackedShardsConfigSchema = () =>
  z.union([
    z.enum(['NoShards']),
    z.object({
      Shards: z.array(z.lazy(() => ShardUIdSchema())),
    }),
    z.enum(['AllShards']),
    z.object({
      ShadowValidator: z.lazy(() => AccountIdSchema()),
    }),
    z.object({
      Schedule: z.array(z.array(z.lazy(() => ShardIdSchema()))),
    }),
    z.object({
      Accounts: z.array(z.lazy(() => AccountIdSchema())),
    }),
  ]);

export const TransferActionSchema = () =>
  z.object({
    deposit: z.lazy(() => NearTokenSchema()),
  });

// Error returned in the ExecutionOutcome in case of failure
export const TxExecutionErrorSchema = () =>
  z.union([
    z.object({
      ActionError: z.lazy(() => ActionErrorSchema()),
    }),
    z.object({
      InvalidTxError: z.lazy(() => InvalidTxErrorSchema()),
    }),
  ]);

export const TxExecutionStatusSchema = () =>
  z.union([
    z.enum(['NONE']),
    z.enum(['INCLUDED']),
    z.enum(['EXECUTED_OPTIMISTIC']),
    z.enum(['INCLUDED_FINAL']),
    z.enum(['EXECUTED']),
    z.enum(['FINAL']),
  ]);

// Use global contract action
export const UseGlobalContractActionSchema = () =>
  z.object({
    contractIdentifier: z.lazy(() => GlobalContractIdentifierSchema()),
  });

export const VMConfigViewSchema = () =>
  z.object({
    deterministicAccountIds: z.optional(z.boolean()),
    discardCustomSections: z.optional(z.boolean()),
    ethImplicitAccounts: z.optional(z.boolean()),
    extCosts: z.optional(z.lazy(() => ExtCostsConfigViewSchema())),
    fixContractLoadingCost: z.optional(z.boolean()),
    globalContractHostFns: z.optional(z.boolean()),
    growMemCost: z.optional(z.number()),
    implicitAccountCreation: z.optional(z.boolean()),
    limitConfig: z.optional(z.lazy(() => LimitConfigSchema())),
    linearOpBaseCost: z.optional(z.number()),
    linearOpUnitCost: z.optional(z.number()),
    reftypesBulkMemory: z.optional(z.boolean()),
    regularOpCost: z.optional(z.number()),
    storageGetMode: z.optional(z.lazy(() => StorageGetModeSchema())),
    vmKind: z.optional(z.lazy(() => VMKindSchema())),
  });

export const VMKindSchema = () =>
  z.union([
    z.enum(['Wasmer0']),
    z.enum(['Wasmtime']),
    z.enum(['Wasmer2']),
    z.enum(['NearVm']),
  ]);

export const ValidatorInfoSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
  });

// Reasons for removing a validator from the validator set.
export const ValidatorKickoutReasonSchema = () =>
  z.union([
    z.enum(['_UnusedSlashed']),
    z.object({
      NotEnoughBlocks: z.object({
        expected: z.number(),
        produced: z.number(),
      }),
    }),
    z.object({
      NotEnoughChunks: z.object({
        expected: z.number(),
        produced: z.number(),
      }),
    }),
    z.enum(['Unstaked']),
    z.object({
      NotEnoughStake: z.object({
        stakeU128: z.lazy(() => NearTokenSchema()),
        thresholdU128: z.lazy(() => NearTokenSchema()),
      }),
    }),
    z.enum(['DidNotGetASeat']),
    z.object({
      NotEnoughChunkEndorsements: z.object({
        expected: z.number(),
        produced: z.number(),
      }),
    }),
    z.object({
      ProtocolVersionTooOld: z.object({
        networkVersion: z.number(),
        version: z.number(),
      }),
    }),
  ]);

export const ValidatorKickoutViewSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    reason: z.lazy(() => ValidatorKickoutReasonSchema()),
  });

export const ValidatorStakeViewSchema = () =>
  z.lazy(() => ValidatorStakeViewV1Schema());

export const ValidatorStakeViewV1Schema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    publicKey: z.lazy(() => PublicKeySchema()),
    stake: z.lazy(() => NearTokenSchema()),
  });

// Data structure for semver version and github tag or commit.
export const VersionSchema = () =>
  z.object({
    build: z.string(),
    commit: z.string(),
    rustcVersion: z.optional(z.string()),
    version: z.string(),
  });

// Resulting state values for a view state query request
export const ViewStateResultSchema = () =>
  z.object({
    proof: z.optional(z.array(z.string())),
    values: z.array(z.lazy(() => StateItemSchema())),
  });

// A kind of a trap happened during execution of a binary
export const WasmTrapSchema = () =>
  z.union([
    z.enum(['Unreachable']),
    z.enum(['IncorrectCallIndirectSignature']),
    z.enum(['MemoryOutOfBounds']),
    z.enum(['CallIndirectOOB']),
    z.enum(['IllegalArithmetic']),
    z.enum(['MisalignedAtomicAccess']),
    z.enum(['IndirectCallToNull']),
    z.enum(['StackOverflow']),
    z.enum(['GenericTrap']),
  ]);

// Configuration specific to ChunkStateWitness.
export const WitnessConfigViewSchema = () =>
  z.object({
    combinedTransactionsSizeLimit: z.optional(z.number()),
    mainStorageProofSizeSoftLimit: z.optional(z.number()),
    newTransactionsValidationStateSizeSoftLimit: z.optional(z.number()),
  });

// Method-specific schemas
//
// Request schema for EXPERIMENTAL_call_function: Calls a view function on a
// contract and returns the result.

export const EXPERIMENTALCallFunctionRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALCallFunctionSchema());

//
// Response schema for EXPERIMENTAL_call_function: Calls a view function on a
// contract and returns the result.

export const EXPERIMENTALCallFunctionResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcCallFunctionResponseAnd_RpcCallFunctionErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_changes: [Deprecated] Returns changes for a
// given account, contract or contract code for given block height or hash.
// Consider using changes instead.

export const EXPERIMENTALChangesRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALChangesSchema());

//
// Response schema for EXPERIMENTAL_changes: [Deprecated] Returns changes for
// a given account, contract or contract code for given block height or hash.
// Consider using changes instead.

export const EXPERIMENTALChangesResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcStateChangesErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_changes_in_block: [Deprecated] Returns
// changes in block for given block height or hash over all transactions for
// all the types. Includes changes like account_touched, access_key_touched,
// data_touched, contract_code_touched. Consider using block_effects instead

export const EXPERIMENTALChangesInBlockRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALChangesInBlockSchema());

//
// Response schema for EXPERIMENTAL_changes_in_block: [Deprecated] Returns
// changes in block for given block height or hash over all transactions for
// all the types. Includes changes like account_touched, access_key_touched,
// data_touched, contract_code_touched. Consider using block_effects instead

export const EXPERIMENTALChangesInBlockResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcStateChangesInBlockByTypeResponseAnd_RpcStateChangesErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_congestion_level: Queries the congestion
// level of a shard. More info about congestion
// [here](https://near.github.io/nearcore/architecture/how/receipt-congestion.html?highlight=congestion#receipt-congestion)

export const EXPERIMENTALCongestionLevelRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALCongestionLevelSchema());

//
// Response schema for EXPERIMENTAL_congestion_level: Queries the congestion
// level of a shard. More info about congestion
// [here](https://near.github.io/nearcore/architecture/how/receipt-congestion.html?highlight=congestion#receipt-congestion)

export const EXPERIMENTALCongestionLevelResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcCongestionLevelResponseAnd_RpcChunkErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_genesis_config: [Deprecated] Get initial
// state and parameters for the genesis block. Consider genesis_config
// instead.

export const EXPERIMENTALGenesisConfigRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALGenesisConfigSchema());

//
// Response schema for EXPERIMENTAL_genesis_config: [Deprecated] Get initial
// state and parameters for the genesis block. Consider genesis_config
// instead.

export const EXPERIMENTALGenesisConfigResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_GenesisConfigAnd_GenesisConfigErrorSchema());

//
// Request schema for EXPERIMENTAL_light_client_block_proof: Returns the
// proofs for a transaction execution.

export const EXPERIMENTALLightClientBlockProofRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALLightClientBlockProofSchema());

//
// Response schema for EXPERIMENTAL_light_client_block_proof: Returns the
// proofs for a transaction execution.

export const EXPERIMENTALLightClientBlockProofResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcLightClientBlockProofResponseAnd_RpcLightClientProofErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_light_client_proof: Returns the proofs for
// a transaction execution.

export const EXPERIMENTALLightClientProofRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALLightClientProofSchema());

//
// Response schema for EXPERIMENTAL_light_client_proof: Returns the proofs for
// a transaction execution.

export const EXPERIMENTALLightClientProofResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcLightClientProofErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_maintenance_windows: [Deprecated] Returns
// the future windows for maintenance in current epoch for the specified
// account. In the maintenance windows, the node will not be block producer or
// chunk producer. Consider using maintenance_windows instead.

export const EXPERIMENTALMaintenanceWindowsRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALMaintenanceWindowsSchema());

//
// Response schema for EXPERIMENTAL_maintenance_windows: [Deprecated] Returns
// the future windows for maintenance in current epoch for the specified
// account. In the maintenance windows, the node will not be block producer or
// chunk producer. Consider using maintenance_windows instead.

export const EXPERIMENTALMaintenanceWindowsResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_ArrayOf_RangeOfUint64And_RpcMaintenanceWindowsErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_protocol_config: A configuration that
// defines the protocol-level parameters such as gas/storage costs, limits,
// feature flags, other settings

export const EXPERIMENTALProtocolConfigRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALProtocolConfigSchema());

//
// Response schema for EXPERIMENTAL_protocol_config: A configuration that
// defines the protocol-level parameters such as gas/storage costs, limits,
// feature flags, other settings

export const EXPERIMENTALProtocolConfigResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcProtocolConfigResponseAnd_RpcProtocolConfigErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_receipt: Fetches a receipt by its ID (as
// is, without a status or execution outcome)

export const EXPERIMENTALReceiptRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALReceiptSchema());

//
// Response schema for EXPERIMENTAL_receipt: Fetches a receipt by its ID (as
// is, without a status or execution outcome)

export const EXPERIMENTALReceiptResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcReceiptResponseAnd_RpcReceiptErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_split_storage_info: Contains the split
// storage information. More info on split storage
// [here](https://near-nodes.io/archival/split-storage-archival)

export const EXPERIMENTALSplitStorageInfoRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALSplitStorageInfoSchema());

//
// Response schema for EXPERIMENTAL_split_storage_info: Contains the split
// storage information. More info on split storage
// [here](https://near-nodes.io/archival/split-storage-archival)

export const EXPERIMENTALSplitStorageInfoResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcSplitStorageInfoResponseAnd_RpcSplitStorageInfoErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_tx_status: Queries status of a transaction
// by hash, returning the final transaction result and details of all
// receipts.

export const EXPERIMENTALTxStatusRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALTxStatusSchema());

//
// Response schema for EXPERIMENTAL_tx_status: Queries status of a transaction
// by hash, returning the final transaction result and details of all
// receipts.

export const EXPERIMENTALTxStatusResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcTransactionResponseAnd_RpcTransactionErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_validators_ordered: Returns the current
// epoch validators ordered in the block producer order with repetition. This
// endpoint is solely used for bridge currently and is not intended for other
// external use cases.

export const EXPERIMENTALValidatorsOrderedRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALValidatorsOrderedSchema());

//
// Response schema for EXPERIMENTAL_validators_ordered: Returns the current
// epoch validators ordered in the block producer order with repetition. This
// endpoint is solely used for bridge currently and is not intended for other
// external use cases.

export const EXPERIMENTALValidatorsOrderedResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_ArrayOf_ValidatorStakeViewAnd_RpcValidatorErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_view_access_key: Returns information about
// a single access key for given account.

export const EXPERIMENTALViewAccessKeyRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALViewAccessKeySchema());

//
// Response schema for EXPERIMENTAL_view_access_key: Returns information about
// a single access key for given account.

export const EXPERIMENTALViewAccessKeyResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcViewAccessKeyResponseAnd_RpcViewAccessKeyErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_view_access_key_list: Returns all access
// keys for a given account.

export const EXPERIMENTALViewAccessKeyListRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALViewAccessKeyListSchema());

//
// Response schema for EXPERIMENTAL_view_access_key_list: Returns all access
// keys for a given account.

export const EXPERIMENTALViewAccessKeyListResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcViewAccessKeyListResponseAnd_RpcViewAccessKeyListErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_view_account: Returns information about an
// account for given account_id.

export const EXPERIMENTALViewAccountRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALViewAccountSchema());

//
// Response schema for EXPERIMENTAL_view_account: Returns information about an
// account for given account_id.

export const EXPERIMENTALViewAccountResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcViewAccountResponseAnd_RpcViewAccountErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_view_code: Returns the contract code (Wasm
// binary) deployed to the account.

export const EXPERIMENTALViewCodeRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALViewCodeSchema());

//
// Response schema for EXPERIMENTAL_view_code: Returns the contract code (Wasm
// binary) deployed to the account.

export const EXPERIMENTALViewCodeResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcViewCodeResponseAnd_RpcViewCodeErrorSchema()
  );

//
// Request schema for EXPERIMENTAL_view_state: Returns the state (key-value
// pairs) of a contract based on the key prefix.

export const EXPERIMENTALViewStateRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALViewStateSchema());

//
// Response schema for EXPERIMENTAL_view_state: Returns the state (key-value
// pairs) of a contract based on the key prefix.

export const EXPERIMENTALViewStateResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcViewStateResponseAnd_RpcViewStateErrorSchema()
  );

// Request schema for block: Returns block details for given height or hash
export const BlockRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForBlockSchema());

// Response schema for block: Returns block details for given height or hash
export const BlockResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcBlockResponseAnd_RpcBlockErrorSchema());

//
// Request schema for block_effects: Returns changes in block for given block
// height or hash over all transactions for all the types. Includes changes
// like account_touched, access_key_touched, data_touched,
// contract_code_touched.

export const BlockEffectsRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForBlockEffectsSchema());

//
// Response schema for block_effects: Returns changes in block for given block
// height or hash over all transactions for all the types. Includes changes
// like account_touched, access_key_touched, data_touched,
// contract_code_touched.

export const BlockEffectsResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcStateChangesInBlockByTypeResponseAnd_RpcStateChangesErrorSchema()
  );

//
// Request schema for broadcast_tx_async: [Deprecated] Sends a transaction and
// immediately returns transaction hash. Consider using send_tx instead.

export const BroadcastTxAsyncRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForBroadcastTxAsyncSchema());

//
// Response schema for broadcast_tx_async: [Deprecated] Sends a transaction
// and immediately returns transaction hash. Consider using send_tx instead.

export const BroadcastTxAsyncResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_CryptoHashAnd_RpcTransactionErrorSchema());

//
// Request schema for broadcast_tx_commit: [Deprecated] Sends a transaction
// and waits until transaction is fully complete. (Has a 10 second timeout).
// Consider using send_tx instead.

export const BroadcastTxCommitRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForBroadcastTxCommitSchema());

//
// Response schema for broadcast_tx_commit: [Deprecated] Sends a transaction
// and waits until transaction is fully complete. (Has a 10 second timeout).
// Consider using send_tx instead.

export const BroadcastTxCommitResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcTransactionResponseAnd_RpcTransactionErrorSchema()
  );

//
// Request schema for changes: Returns changes for a given account, contract
// or contract code for given block height or hash.

export const ChangesRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForChangesSchema());

//
// Response schema for changes: Returns changes for a given account, contract
// or contract code for given block height or hash.

export const ChangesResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcStateChangesErrorSchema()
  );

//
// Request schema for chunk: Returns details of a specific chunk. You can run
// a block details query to get a valid chunk hash.

export const ChunkRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForChunkSchema());

//
// Response schema for chunk: Returns details of a specific chunk. You can run
// a block details query to get a valid chunk hash.

export const ChunkResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcChunkResponseAnd_RpcChunkErrorSchema());

// Request schema for client_config: Queries client node configuration
export const ClientConfigRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForClientConfigSchema());

// Response schema for client_config: Queries client node configuration
export const ClientConfigResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcClientConfigResponseAnd_RpcClientConfigErrorSchema()
  );

//
// Request schema for gas_price: Returns gas price for a specific block_height
// or block_hash. Using [null] will return the most recent block's gas price.

export const GasPriceRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForGasPriceSchema());

//
// Response schema for gas_price: Returns gas price for a specific
// block_height or block_hash. Using [null] will return the most recent
// block's gas price.

export const GasPriceResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcGasPriceResponseAnd_RpcGasPriceErrorSchema()
  );

//
// Response schema for genesis_config: Get initial state and parameters for
// the genesis block

export const GenesisConfigResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_GenesisConfigAnd_GenesisConfigErrorSchema());

//
// Request schema for health: Returns the current health status of the RPC
// node the client connects to.

export const HealthRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForHealthSchema());

//
// Response schema for health: Returns the current health status of the RPC
// node the client connects to.

export const HealthResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_Nullable_RpcHealthResponseAnd_RpcStatusErrorSchema()
  );

//
// Request schema for light_client_proof: Returns the proofs for a transaction
// execution.

export const LightClientProofRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForLightClientProofSchema());

//
// Response schema for light_client_proof: Returns the proofs for a
// transaction execution.

export const LightClientProofResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcLightClientProofErrorSchema()
  );

//
// Request schema for maintenance_windows: Returns the future windows for
// maintenance in current epoch for the specified account. In the maintenance
// windows, the node will not be block producer or chunk producer.

export const MaintenanceWindowsRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForMaintenanceWindowsSchema());

//
// Response schema for maintenance_windows: Returns the future windows for
// maintenance in current epoch for the specified account. In the maintenance
// windows, the node will not be block producer or chunk producer.

export const MaintenanceWindowsResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_ArrayOf_RangeOfUint64And_RpcMaintenanceWindowsErrorSchema()
  );

//
// Request schema for network_info: Queries the current state of node network
// connections. This includes information about active peers, transmitted
// data, known producers, etc.

export const NetworkInfoRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForNetworkInfoSchema());

//
// Response schema for network_info: Queries the current state of node network
// connections. This includes information about active peers, transmitted
// data, known producers, etc.

export const NetworkInfoResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcNetworkInfoResponseAnd_RpcNetworkInfoErrorSchema()
  );

// Request schema for next_light_client_block: Returns the next light client block.
export const NextLightClientBlockRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForNextLightClientBlockSchema());

//
// Response schema for next_light_client_block: Returns the next light client
// block.

export const NextLightClientBlockResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcLightClientNextBlockResponseAnd_RpcLightClientNextBlockErrorSchema()
  );

//
// Request schema for query: This module allows you to make generic requests
// to the network. The `RpcQueryRequest` struct takes in a
// [`BlockReference`](https://docs.rs/near-primitives/0.12.0/near_primitives/types/enum.BlockReference.html)
// and a
// [`QueryRequest`](https://docs.rs/near-primitives/0.12.0/near_primitives/views/enum.QueryRequest.html).
// The `BlockReference` enum allows you to specify a block by `Finality`,
// `BlockId` or `SyncCheckpoint`. The `QueryRequest` enum provides multiple
// variants for performing the following actions: - View an account's details
// - View a contract's code - View the state of an account - View the
// `AccessKey` of an account - View the `AccessKeyList` of an account - Call a
// function in a contract deployed on the network.

export const QueryRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForQuerySchema());

//
// Response schema for query: This module allows you to make generic requests
// to the network. The `RpcQueryRequest` struct takes in a
// [`BlockReference`](https://docs.rs/near-primitives/0.12.0/near_primitives/types/enum.BlockReference.html)
// and a
// [`QueryRequest`](https://docs.rs/near-primitives/0.12.0/near_primitives/views/enum.QueryRequest.html).
// The `BlockReference` enum allows you to specify a block by `Finality`,
// `BlockId` or `SyncCheckpoint`. The `QueryRequest` enum provides multiple
// variants for performing the following actions: - View an account's details
// - View a contract's code - View the state of an account - View the
// `AccessKey` of an account - View the `AccessKeyList` of an account - Call a
// function in a contract deployed on the network.

export const QueryResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcQueryResponseAnd_RpcQueryErrorSchema());

//
// Request schema for send_tx: Sends transaction. Returns the guaranteed
// execution status and the results the blockchain can provide at the moment.

export const SendTxRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForSendTxSchema());

//
// Response schema for send_tx: Sends transaction. Returns the guaranteed
// execution status and the results the blockchain can provide at the moment.

export const SendTxResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcTransactionResponseAnd_RpcTransactionErrorSchema()
  );

//
// Request schema for status: Requests the status of the connected RPC node.
// This includes information about sync status, nearcore node version,
// protocol version, the current set of validators, etc.

export const StatusRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForStatusSchema());

//
// Response schema for status: Requests the status of the connected RPC node.
// This includes information about sync status, nearcore node version,
// protocol version, the current set of validators, etc.

export const StatusResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcStatusResponseAnd_RpcStatusErrorSchema());

//
// Request schema for tx: Queries status of a transaction by hash and returns
// the final transaction result.

export const TxRequestSchema = () => z.lazy(() => JsonRpcRequestForTxSchema());

//
// Response schema for tx: Queries status of a transaction by hash and returns
// the final transaction result.

export const TxResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcTransactionResponseAnd_RpcTransactionErrorSchema()
  );

//
// Request schema for validators: Queries active validators on the network.
// Returns details and the state of validation on the blockchain.

export const ValidatorsRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForValidatorsSchema());

//
// Response schema for validators: Queries active validators on the network.
// Returns details and the state of validation on the blockchain.

export const ValidatorsResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcValidatorResponseAnd_RpcValidatorErrorSchema()
  );

// Auto-generated validation schema mapping
// Maps RPC method names to their request/response schema functions
export const VALIDATION_SCHEMA_MAP: Record<
  string,
  {
    requestSchema?: () => any;
    responseSchema?: () => any;
  }
> = {
  EXPERIMENTAL_call_function: {
    requestSchema: EXPERIMENTALCallFunctionRequestSchema,
    responseSchema: EXPERIMENTALCallFunctionResponseSchema,
  },
  EXPERIMENTAL_changes: {
    requestSchema: EXPERIMENTALChangesRequestSchema,
    responseSchema: EXPERIMENTALChangesResponseSchema,
  },
  EXPERIMENTAL_changes_in_block: {
    requestSchema: EXPERIMENTALChangesInBlockRequestSchema,
    responseSchema: EXPERIMENTALChangesInBlockResponseSchema,
  },
  EXPERIMENTAL_congestion_level: {
    requestSchema: EXPERIMENTALCongestionLevelRequestSchema,
    responseSchema: EXPERIMENTALCongestionLevelResponseSchema,
  },
  EXPERIMENTAL_genesis_config: {
    requestSchema: EXPERIMENTALGenesisConfigRequestSchema,
    responseSchema: EXPERIMENTALGenesisConfigResponseSchema,
  },
  EXPERIMENTAL_light_client_block_proof: {
    requestSchema: EXPERIMENTALLightClientBlockProofRequestSchema,
    responseSchema: EXPERIMENTALLightClientBlockProofResponseSchema,
  },
  EXPERIMENTAL_light_client_proof: {
    requestSchema: EXPERIMENTALLightClientProofRequestSchema,
    responseSchema: EXPERIMENTALLightClientProofResponseSchema,
  },
  EXPERIMENTAL_maintenance_windows: {
    requestSchema: EXPERIMENTALMaintenanceWindowsRequestSchema,
    responseSchema: EXPERIMENTALMaintenanceWindowsResponseSchema,
  },
  EXPERIMENTAL_protocol_config: {
    requestSchema: EXPERIMENTALProtocolConfigRequestSchema,
    responseSchema: EXPERIMENTALProtocolConfigResponseSchema,
  },
  EXPERIMENTAL_receipt: {
    requestSchema: EXPERIMENTALReceiptRequestSchema,
    responseSchema: EXPERIMENTALReceiptResponseSchema,
  },
  EXPERIMENTAL_split_storage_info: {
    requestSchema: EXPERIMENTALSplitStorageInfoRequestSchema,
    responseSchema: EXPERIMENTALSplitStorageInfoResponseSchema,
  },
  EXPERIMENTAL_tx_status: {
    requestSchema: EXPERIMENTALTxStatusRequestSchema,
    responseSchema: EXPERIMENTALTxStatusResponseSchema,
  },
  EXPERIMENTAL_validators_ordered: {
    requestSchema: EXPERIMENTALValidatorsOrderedRequestSchema,
    responseSchema: EXPERIMENTALValidatorsOrderedResponseSchema,
  },
  EXPERIMENTAL_view_access_key: {
    requestSchema: EXPERIMENTALViewAccessKeyRequestSchema,
    responseSchema: EXPERIMENTALViewAccessKeyResponseSchema,
  },
  EXPERIMENTAL_view_access_key_list: {
    requestSchema: EXPERIMENTALViewAccessKeyListRequestSchema,
    responseSchema: EXPERIMENTALViewAccessKeyListResponseSchema,
  },
  EXPERIMENTAL_view_account: {
    requestSchema: EXPERIMENTALViewAccountRequestSchema,
    responseSchema: EXPERIMENTALViewAccountResponseSchema,
  },
  EXPERIMENTAL_view_code: {
    requestSchema: EXPERIMENTALViewCodeRequestSchema,
    responseSchema: EXPERIMENTALViewCodeResponseSchema,
  },
  EXPERIMENTAL_view_state: {
    requestSchema: EXPERIMENTALViewStateRequestSchema,
    responseSchema: EXPERIMENTALViewStateResponseSchema,
  },
  block: {
    requestSchema: BlockRequestSchema,
    responseSchema: BlockResponseSchema,
  },
  block_effects: {
    requestSchema: BlockEffectsRequestSchema,
    responseSchema: BlockEffectsResponseSchema,
  },
  broadcast_tx_async: {
    requestSchema: BroadcastTxAsyncRequestSchema,
    responseSchema: BroadcastTxAsyncResponseSchema,
  },
  broadcast_tx_commit: {
    requestSchema: BroadcastTxCommitRequestSchema,
    responseSchema: BroadcastTxCommitResponseSchema,
  },
  changes: {
    requestSchema: ChangesRequestSchema,
    responseSchema: ChangesResponseSchema,
  },
  chunk: {
    requestSchema: ChunkRequestSchema,
    responseSchema: ChunkResponseSchema,
  },
  client_config: {
    requestSchema: ClientConfigRequestSchema,
    responseSchema: ClientConfigResponseSchema,
  },
  gas_price: {
    requestSchema: GasPriceRequestSchema,
    responseSchema: GasPriceResponseSchema,
  },
  genesis_config: {
    requestSchema: GenesisConfigRequestSchema,
    responseSchema: GenesisConfigResponseSchema,
  },
  health: {
    requestSchema: HealthRequestSchema,
    responseSchema: HealthResponseSchema,
  },
  light_client_proof: {
    requestSchema: LightClientProofRequestSchema,
    responseSchema: LightClientProofResponseSchema,
  },
  maintenance_windows: {
    requestSchema: MaintenanceWindowsRequestSchema,
    responseSchema: MaintenanceWindowsResponseSchema,
  },
  network_info: {
    requestSchema: NetworkInfoRequestSchema,
    responseSchema: NetworkInfoResponseSchema,
  },
  next_light_client_block: {
    requestSchema: NextLightClientBlockRequestSchema,
    responseSchema: NextLightClientBlockResponseSchema,
  },
  query: {
    requestSchema: QueryRequestSchema,
    responseSchema: QueryResponseSchema,
  },
  send_tx: {
    requestSchema: SendTxRequestSchema,
    responseSchema: SendTxResponseSchema,
  },
  status: {
    requestSchema: StatusRequestSchema,
    responseSchema: StatusResponseSchema,
  },
  tx: { requestSchema: TxRequestSchema, responseSchema: TxResponseSchema },
  validators: {
    requestSchema: ValidatorsRequestSchema,
    responseSchema: ValidatorsResponseSchema,
  },
};

// Base JSON-RPC utility schemas
// These schemas are static utilities for the JSON-RPC 2.0 specification
// They are not derived from the OpenAPI spec but are standard JSON-RPC primitives

export const JsonRpcRequestSchema = () =>
  z.object({
    jsonrpc: z.literal('2.0'),
    id: z.string(),
    method: z.string(),
    params: z.optional(z.unknown()),
  });

export const JsonRpcErrorSchema = () =>
  z.object({
    code: z.number(),
    message: z.string(),
    data: z.optional(z.unknown()),
  });

// JSON-RPC 2.0 compliant response schema
// Enforces exactly one of 'result' or 'error' must be present (JSON-RPC 2.0 spec)
// Uses .check() with z.refine() to validate the constraint after parsing
export const JsonRpcResponseSchema = () =>
  z
    .object({
      jsonrpc: z.literal('2.0'),
      id: z.string(),
      result: z.optional(z.unknown()),
      error: z.optional(JsonRpcErrorSchema()),
    })
    .check(
      z.refine(val => {
        const hasError = val.error !== undefined;
        const hasResult = val.result !== undefined;
        // Exactly one of error or result must be present (not both, not neither)
        return (hasError && !hasResult) || (!hasError && hasResult);
      })
    );
