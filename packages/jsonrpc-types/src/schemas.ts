// Auto-generated Zod schemas from NEAR OpenAPI spec (zod/mini version)
// Generated on: 2025-08-23T15:21:57.925Z
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
          z.union([z.union([z.string(), z.null()]), z.null()])
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
    minAllowedTopLevelAccountLength: z.number(),
    registrarAccountId: z.lazy(() => AccountIdSchema()),
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
    amount: z.string(),
    publicKey: z.lazy(() => PublicKeySchema()),
  });

// A view of the account
export const AccountViewSchema = () =>
  z.object({
    amount: z.string(),
    codeHash: z.lazy(() => CryptoHashSchema()),
    globalContractAccountId: z.optional(
      z.union([z.lazy(() => AccountIdSchema()), z.null()])
    ),
    globalContractHash: z.optional(
      z.union([z.lazy(() => CryptoHashSchema()), z.null()])
    ),
    locked: z.string(),
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
    addKeyCost: z.lazy(() => AccessKeyCreationConfigViewSchema()),
    createAccountCost: z.lazy(() => FeeSchema()),
    delegateCost: z.lazy(() => FeeSchema()),
    deleteAccountCost: z.lazy(() => FeeSchema()),
    deleteKeyCost: z.lazy(() => FeeSchema()),
    deployContractCost: z.lazy(() => FeeSchema()),
    deployContractCostPerByte: z.lazy(() => FeeSchema()),
    functionCallCost: z.lazy(() => FeeSchema()),
    functionCallCostPerByte: z.lazy(() => FeeSchema()),
    stakeCost: z.lazy(() => FeeSchema()),
    transferCost: z.lazy(() => FeeSchema()),
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
        amount: z.string(),
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
        balance: z.string(),
        locked: z.string(),
        stake: z.string(),
      }),
    }),
    z.object({
      InsufficientStake: z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        minimumStake: z.string(),
        stake: z.string(),
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
        deposit: z.string(),
        gas: z.number(),
        methodName: z.string(),
      }),
    }),
    z.object({
      Transfer: z.object({
        deposit: z.string(),
      }),
    }),
    z.object({
      Stake: z.object({
        publicKey: z.lazy(() => PublicKeySchema()),
        stake: z.string(),
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
  ]);

// Describes the error for validating a list of actions.
export const ActionsValidationErrorSchema = () =>
  z.union([
    z.enum(['DeleteActionMustBeFinal']),
    z.object({
      TotalPrepaidGasExceeded: z.object({
        limit: z.number(),
        totalPrepaidGas: z.number(),
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
    gasPrice: z.string(),
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
    rentPaid: z.string(),
    signature: z.lazy(() => SignatureSchema()),
    timestamp: z.number(),
    timestampNanosec: z.string(),
    totalSupply: z.string(),
    validatorProposals: z.array(z.lazy(() => ValidatorStakeViewSchema())),
    validatorReward: z.string(),
  });

export const BlockIdSchema = () =>
  z.union([z.number(), z.lazy(() => CryptoHashSchema())]);

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
    enabled: z.boolean(),
    uris: z.lazy(() => ChunkDistributionUrisSchema()),
  });

// URIs for the Chunk Distribution Network feature.
export const ChunkDistributionUrisSchema = () =>
  z.object({
    get: z.string(),
    set: z.string(),
  });

// Contains main info about the chunk.
export const ChunkHeaderViewSchema = () =>
  z.object({
    balanceBurnt: z.string(),
    bandwidthRequests: z.optional(
      z.union([z.lazy(() => BandwidthRequestsSchema()), z.null()])
    ),
    chunkHash: z.lazy(() => CryptoHashSchema()),
    congestionInfo: z.optional(
      z.union([z.lazy(() => CongestionInfoViewSchema()), z.null()])
    ),
    encodedLength: z.number(),
    encodedMerkleRoot: z.lazy(() => CryptoHashSchema()),
    gasLimit: z.number(),
    gasUsed: z.number(),
    heightCreated: z.number(),
    heightIncluded: z.number(),
    outcomeRoot: z.lazy(() => CryptoHashSchema()),
    outgoingReceiptsRoot: z.lazy(() => CryptoHashSchema()),
    prevBlockHash: z.lazy(() => CryptoHashSchema()),
    prevStateRoot: z.lazy(() => CryptoHashSchema()),
    rentPaid: z.string(),
    shardId: z.lazy(() => ShardIdSchema()),
    signature: z.lazy(() => SignatureSchema()),
    txRoot: z.lazy(() => CryptoHashSchema()),
    validatorProposals: z.array(z.lazy(() => ValidatorStakeViewSchema())),
    validatorReward: z.string(),
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
    allowedShardOutgoingGas: z.number(),
    maxCongestionIncomingGas: z.number(),
    maxCongestionMemoryConsumption: z.number(),
    maxCongestionMissedChunks: z.number(),
    maxCongestionOutgoingGas: z.number(),
    maxOutgoingGas: z.number(),
    maxTxGas: z.number(),
    minOutgoingGas: z.number(),
    minTxGas: z.number(),
    outgoingReceiptsBigSizeLimit: z.number(),
    outgoingReceiptsUsualSizeLimit: z.number(),
    rejectTxCongestionThreshold: z.number(),
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
    stake: z.string(),
  });

// The fees settings for a data receipt creation
export const DataReceiptCreationConfigViewSchema = () =>
  z.object({
    baseCost: z.lazy(() => FeeSchema()),
    costPerByte: z.lazy(() => FeeSchema()),
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
    location: z.lazy(() => ExternalStorageLocationSchema()),
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
// Epoch identifier -- wrapped hash, to make it easier to distinguish. EpochId
// of epoch T is the hash of last block in T-2 EpochId of first two epochs is
// 0

export const EpochIdSchema = () => z.lazy(() => CryptoHashSchema());

export const EpochSyncConfigSchema = () =>
  z.object({
    disableEpochSyncForBootstrapping: z.optional(z.boolean()),
    epochSyncHorizon: z.number(),
    ignoreEpochSyncNetworkRequests: z.optional(z.boolean()),
    timeoutForEpochSync: z.lazy(() => DurationAsStdSchemaProviderSchema()),
  });

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
    gasBurnt: z.number(),
    logs: z.array(z.string()),
    metadata: z.optional(z.lazy(() => ExecutionMetadataViewSchema())),
    receiptIds: z.array(z.lazy(() => CryptoHashSchema())),
    status: z.lazy(() => ExecutionStatusViewSchema()),
    tokensBurnt: z.string(),
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
    altBn128G1MultiexpBase: z.number(),
    altBn128G1MultiexpElement: z.number(),
    altBn128G1SumBase: z.number(),
    altBn128G1SumElement: z.number(),
    altBn128PairingCheckBase: z.number(),
    altBn128PairingCheckElement: z.number(),
    base: z.number(),
    bls12381G1MultiexpBase: z.number(),
    bls12381G1MultiexpElement: z.number(),
    bls12381G2MultiexpBase: z.number(),
    bls12381G2MultiexpElement: z.number(),
    bls12381MapFp2ToG2Base: z.number(),
    bls12381MapFp2ToG2Element: z.number(),
    bls12381MapFpToG1Base: z.number(),
    bls12381MapFpToG1Element: z.number(),
    bls12381P1DecompressBase: z.number(),
    bls12381P1DecompressElement: z.number(),
    bls12381P1SumBase: z.number(),
    bls12381P1SumElement: z.number(),
    bls12381P2DecompressBase: z.number(),
    bls12381P2DecompressElement: z.number(),
    bls12381P2SumBase: z.number(),
    bls12381P2SumElement: z.number(),
    bls12381PairingBase: z.number(),
    bls12381PairingElement: z.number(),
    contractCompileBase: z.number(),
    contractCompileBytes: z.number(),
    contractLoadingBase: z.number(),
    contractLoadingBytes: z.number(),
    ecrecoverBase: z.number(),
    ed25519VerifyBase: z.number(),
    ed25519VerifyByte: z.number(),
    keccak256Base: z.number(),
    keccak256Byte: z.number(),
    keccak512Base: z.number(),
    keccak512Byte: z.number(),
    logBase: z.number(),
    logByte: z.number(),
    promiseAndBase: z.number(),
    promiseAndPerPromise: z.number(),
    promiseReturn: z.number(),
    readCachedTrieNode: z.number(),
    readMemoryBase: z.number(),
    readMemoryByte: z.number(),
    readRegisterBase: z.number(),
    readRegisterByte: z.number(),
    ripemd160Base: z.number(),
    ripemd160Block: z.number(),
    sha256Base: z.number(),
    sha256Byte: z.number(),
    storageHasKeyBase: z.number(),
    storageHasKeyByte: z.number(),
    storageIterCreateFromByte: z.number(),
    storageIterCreatePrefixBase: z.number(),
    storageIterCreatePrefixByte: z.number(),
    storageIterCreateRangeBase: z.number(),
    storageIterCreateToByte: z.number(),
    storageIterNextBase: z.number(),
    storageIterNextKeyByte: z.number(),
    storageIterNextValueByte: z.number(),
    storageLargeReadOverheadBase: z.number(),
    storageLargeReadOverheadByte: z.number(),
    storageReadBase: z.number(),
    storageReadKeyByte: z.number(),
    storageReadValueByte: z.number(),
    storageRemoveBase: z.number(),
    storageRemoveKeyByte: z.number(),
    storageRemoveRetValueByte: z.number(),
    storageWriteBase: z.number(),
    storageWriteEvictedByte: z.number(),
    storageWriteKeyByte: z.number(),
    storageWriteValueByte: z.number(),
    touchingTrieNode: z.number(),
    utf16DecodingBase: z.number(),
    utf16DecodingByte: z.number(),
    utf8DecodingBase: z.number(),
    utf8DecodingByte: z.number(),
    validatorStakeBase: z.number(),
    validatorTotalStakeBase: z.number(),
    writeMemoryBase: z.number(),
    writeMemoryByte: z.number(),
    writeRegisterBase: z.number(),
    writeRegisterByte: z.number(),
    yieldCreateBase: z.number(),
    yieldCreateByte: z.number(),
    yieldResumeBase: z.number(),
    yieldResumeByte: z.number(),
  });

export const ExternalStorageConfigSchema = () =>
  z.object({
    externalStorageFallbackThreshold: z.optional(z.number()),
    location: z.lazy(() => ExternalStorageLocationSchema()),
    numConcurrentRequests: z.optional(z.number()),
    numConcurrentRequestsDuringCatchup: z.optional(z.number()),
  });

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
    execution: z.number(),
    sendNotSir: z.number(),
    sendSir: z.number(),
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
    deposit: z.string(),
    gas: z.number(),
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
    allowance: z.optional(z.union([z.union([z.string(), z.null()]), z.null()])),
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

export const GasKeyViewSchema = () =>
  z.object({
    balance: z.number(),
    numNonces: z.number(),
    permission: z.lazy(() => AccessKeyPermissionViewSchema()),
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
    fishermenThreshold: z.string(),
    gasLimit: z.number(),
    gasPriceAdjustmentRate: z.array(z.number()),
    genesisHeight: z.number(),
    genesisTime: z.string(),
    maxGasPrice: z.string(),
    maxInflationRate: z.array(z.number()),
    maxKickoutStakePerc: z.optional(z.number()),
    minGasPrice: z.string(),
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
    totalSupply: z.string(),
    transactionValidityPeriod: z.number(),
    useProductionConfig: z.optional(z.boolean()),
    validators: z.array(z.lazy(() => AccountInfoSchema())),
  });

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
        allowance: z.string(),
        cost: z.string(),
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
        balance: z.string(),
        cost: z.string(),
        signerId: z.lazy(() => AccountIdSchema()),
      }),
    }),
    z.object({
      LackBalanceForState: z.object({
        amount: z.string(),
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

export const JsonRpcResponseFor_ArrayOf_RangeOfUint64And_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.array(z.lazy(() => RangeOfUint64Schema())),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_ArrayOf_ValidatorStakeViewAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.array(z.lazy(() => ValidatorStakeViewSchema())),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_CryptoHashAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => CryptoHashSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_GenesisConfigAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => GenesisConfigSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_Nullable_RpcHealthResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.union([z.lazy(() => RpcHealthResponseSchema()), z.null()]),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcBlockResponseAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcBlockResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcChunkResponseAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcChunkResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcClientConfigResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcClientConfigResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcCongestionLevelResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcCongestionLevelResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcGasPriceResponseAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcGasPriceResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcLightClientBlockProofResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcLightClientBlockProofResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcLightClientExecutionProofResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcLightClientNextBlockResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcLightClientNextBlockResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcNetworkInfoResponseAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcNetworkInfoResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcProtocolConfigResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcProtocolConfigResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcQueryResponseAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcQueryResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcReceiptResponseAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcReceiptResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcSplitStorageInfoResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcSplitStorageInfoResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcStateChangesInBlockByTypeResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcStateChangesInBlockByTypeResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcErrorSchema =
  () =>
    z.intersection(
      z.union([
        z.object({
          result: z.lazy(() => RpcStateChangesInBlockResponseSchema()),
        }),
        z.object({
          error: z.lazy(() => RpcErrorSchema()),
        }),
      ]),
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      })
    );

export const JsonRpcResponseFor_RpcStatusResponseAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcStatusResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcTransactionResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
      }),
    ]),
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
    })
  );

export const JsonRpcResponseFor_RpcValidatorResponseAnd_RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        result: z.lazy(() => RpcValidatorResponseSchema()),
      }),
      z.object({
        error: z.lazy(() => RpcErrorSchema()),
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
    initialMemoryPages: z.number(),
    maxActionsPerReceipt: z.number(),
    maxArgumentsLength: z.number(),
    maxContractSize: z.number(),
    maxElementsPerContractTable: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    maxFunctionsNumberPerContract: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    maxGasBurnt: z.number(),
    maxLengthMethodName: z.number(),
    maxLengthReturnedData: z.number(),
    maxLengthStorageKey: z.number(),
    maxLengthStorageValue: z.number(),
    maxLocalsPerContract: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    maxMemoryPages: z.number(),
    maxNumberBytesMethodNames: z.number(),
    maxNumberInputDataDependencies: z.number(),
    maxNumberLogs: z.number(),
    maxNumberRegisters: z.number(),
    maxPromisesPerFunctionCallAction: z.number(),
    maxReceiptSize: z.number(),
    maxRegisterSize: z.number(),
    maxStackHeight: z.number(),
    maxTablesPerContract: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    maxTotalLogLength: z.number(),
    maxTotalPrepaidGas: z.number(),
    maxTransactionSize: z.number(),
    maxYieldPayloadSize: z.number(),
    perReceiptStorageProofSizeLimit: z.number(),
    registersMemoryLimit: z.number(),
    yieldTimeoutLengthInBlocks: z.number(),
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
    stake: z.string(),
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
        gasPrice: z.string(),
        inputDataIds: z.array(z.lazy(() => CryptoHashSchema())),
        isPromiseYield: z.optional(z.boolean()),
        outputDataReceivers: z.array(z.lazy(() => DataReceiverViewSchema())),
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
  ]);

export const ReceiptViewSchema = () =>
  z.object({
    predecessorId: z.lazy(() => AccountIdSchema()),
    priority: z.optional(z.number()),
    receipt: z.lazy(() => ReceiptEnumViewSchema()),
    receiptId: z.lazy(() => CryptoHashSchema()),
    receiverId: z.lazy(() => AccountIdSchema()),
  });

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

export const RpcClientConfigRequestSchema = () => z.null();

// ClientConfig where some fields can be updated at runtime.
export const RpcClientConfigResponseSchema = () =>
  z.object({
    archive: z.boolean(),
    blockFetchHorizon: z.number(),
    blockHeaderFetchHorizon: z.number(),
    blockProductionTrackingDelay: z.array(z.number()),
    catchupStepPeriod: z.array(z.number()),
    chainId: z.string(),
    chunkDistributionNetwork: z.optional(
      z.union([z.lazy(() => ChunkDistributionNetworkConfigSchema()), z.null()])
    ),
    chunkRequestRetryPeriod: z.array(z.number()),
    chunkValidationThreads: z.number(),
    chunkWaitMult: z.array(z.number()),
    clientBackgroundMigrationThreads: z.number(),
    doomslugStepPeriod: z.array(z.number()),
    enableMultilineLogging: z.boolean(),
    enableStatisticsExport: z.boolean(),
    epochLength: z.number(),
    epochSync: z.lazy(() => EpochSyncConfigSchema()),
    expectedShutdown: z.lazy(() => MutableConfigValueSchema()),
    gc: z.lazy(() => GCConfigSchema()),
    headerSyncExpectedHeightPerSecond: z.number(),
    headerSyncInitialTimeout: z.array(z.number()),
    headerSyncProgressTimeout: z.array(z.number()),
    headerSyncStallBanTimeout: z.array(z.number()),
    logSummaryPeriod: z.array(z.number()),
    logSummaryStyle: z.lazy(() => LogSummaryStyleSchema()),
    maxBlockProductionDelay: z.array(z.number()),
    maxBlockWaitDelay: z.array(z.number()),
    maxGasBurntView: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    minBlockProductionDelay: z.array(z.number()),
    minNumPeers: z.number(),
    numBlockProducerSeats: z.number(),
    orphanStateWitnessMaxSize: z.number(),
    orphanStateWitnessPoolSize: z.number(),
    produceChunkAddTransactionsTimeLimit: z.string(),
    produceEmptyBlocks: z.boolean(),
    reshardingConfig: z.lazy(() => MutableConfigValueSchema()),
    rpcAddr: z.optional(z.union([z.union([z.string(), z.null()]), z.null()])),
    saveInvalidWitnesses: z.boolean(),
    saveLatestWitnesses: z.boolean(),
    saveTrieChanges: z.boolean(),
    saveTxOutcomes: z.boolean(),
    skipSyncWait: z.boolean(),
    stateRequestServerThreads: z.number(),
    stateRequestThrottlePeriod: z.array(z.number()),
    stateRequestsPerThrottlePeriod: z.number(),
    stateSync: z.lazy(() => StateSyncConfigSchema()),
    stateSyncEnabled: z.boolean(),
    stateSyncExternalBackoff: z.array(z.number()),
    stateSyncExternalTimeout: z.array(z.number()),
    stateSyncP2pTimeout: z.array(z.number()),
    stateSyncRetryBackoff: z.array(z.number()),
    syncCheckPeriod: z.array(z.number()),
    syncHeightThreshold: z.number(),
    syncMaxBlockRequests: z.number(),
    syncStepPeriod: z.array(z.number()),
    trackedShardsConfig: z.lazy(() => TrackedShardsConfigSchema()),
    transactionPoolSizeLimit: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    transactionRequestHandlerThreads: z.number(),
    trieViewerStateSizeLimit: z.optional(
      z.union([z.union([z.number(), z.null()]), z.null()])
    ),
    ttlAccountIdRouter: z.array(z.number()),
    txRoutingHeightHorizon: z.number(),
    version: z.lazy(() => VersionSchema()),
    viewClientThreads: z.number(),
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

//
// This struct may be returned from JSON RPC server in case of error It is
// expected that this struct has impl From<_> all other RPC errors like
// [RpcBlockError](crate::types::blocks::RpcBlockError)

export const RpcErrorSchema = () =>
  z.intersection(
    z.union([
      z.object({
        cause: z.lazy(() => RpcRequestValidationErrorKindSchema()),
        name: z.enum(['REQUEST_VALIDATION_ERROR']),
      }),
      z.object({
        cause: z.unknown(),
        name: z.enum(['HANDLER_ERROR']),
      }),
      z.object({
        cause: z.unknown(),
        name: z.enum(['INTERNAL_ERROR']),
      }),
    ]),
    z.object({
      cause: z.optional(z.unknown()),
      code: z.number(),
      data: z.optional(z.unknown()),
      message: z.string(),
      name: z.optional(z.unknown()),
    })
  );

export const RpcGasPriceRequestSchema = () =>
  z.object({
    blockId: z.optional(z.union([z.lazy(() => BlockIdSchema()), z.null()])),
  });

export const RpcGasPriceResponseSchema = () =>
  z.object({
    gasPrice: z.string(),
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

export const RpcMaintenanceWindowsRequestSchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
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
    avgHiddenValidatorSeatsPerShard: z.array(z.number()),
    blockProducerKickoutThreshold: z.number(),
    chainId: z.string(),
    chunkProducerKickoutThreshold: z.number(),
    chunkValidatorOnlyKickoutThreshold: z.number(),
    dynamicResharding: z.boolean(),
    epochLength: z.number(),
    fishermenThreshold: z.string(),
    gasLimit: z.number(),
    gasPriceAdjustmentRate: z.array(z.number()),
    genesisHeight: z.number(),
    genesisTime: z.string(),
    maxGasPrice: z.string(),
    maxInflationRate: z.array(z.number()),
    maxKickoutStakePerc: z.number(),
    minGasPrice: z.string(),
    minimumStakeDivisor: z.number(),
    minimumStakeRatio: z.array(z.number()),
    minimumValidatorsPerShard: z.number(),
    numBlockProducerSeats: z.number(),
    numBlockProducerSeatsPerShard: z.array(z.number()),
    numBlocksPerYear: z.number(),
    onlineMaxThreshold: z.array(z.number()),
    onlineMinThreshold: z.array(z.number()),
    protocolRewardRate: z.array(z.number()),
    protocolTreasuryAccount: z.lazy(() => AccountIdSchema()),
    protocolUpgradeStakeThreshold: z.array(z.number()),
    protocolVersion: z.number(),
    runtimeConfig: z.lazy(() => RuntimeConfigViewSchema()),
    shardLayout: z.lazy(() => ShardLayoutSchema()),
    shuffleShardAssignmentForChunkProducers: z.boolean(),
    targetValidatorMandatesPerShard: z.number(),
    transactionValidityPeriod: z.number(),
  });

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
        changesType: z.enum(['single_gas_key_changes']),
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
        changesType: z.enum(['all_gas_key_changes']),
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
        changesType: z.enum(['single_gas_key_changes']),
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
        changesType: z.enum(['all_gas_key_changes']),
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
        changesType: z.enum(['single_gas_key_changes']),
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
        changesType: z.enum(['all_gas_key_changes']),
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

// View that preserves JSON format of the runtime config.
export const RuntimeConfigViewSchema = () =>
  z.object({
    accountCreationConfig: z.lazy(() => AccountCreationConfigViewSchema()),
    congestionControlConfig: z.lazy(() => CongestionControlConfigViewSchema()),
    storageAmountPerByte: z.string(),
    transactionCosts: z.lazy(() => RuntimeFeesConfigViewSchema()),
    wasmConfig: z.lazy(() => VMConfigViewSchema()),
    witnessConfig: z.lazy(() => WitnessConfigViewSchema()),
  });

// Describes different fees for the runtime
export const RuntimeFeesConfigViewSchema = () =>
  z.object({
    actionCreationConfig: z.lazy(() => ActionCreationConfigViewSchema()),
    actionReceiptCreationConfig: z.lazy(() => FeeSchema()),
    burntGasReward: z.array(z.number()),
    dataReceiptCreationConfig: z.lazy(() =>
      DataReceiptCreationConfigViewSchema()
    ),
    pessimisticGasPriceInflationRatio: z.array(z.number()),
    storageUsageConfig: z.lazy(() => StorageUsageConfigViewSchema()),
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
    stake: z.string(),
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
          amount: z.string(),
          codeHash: z.lazy(() => CryptoHashSchema()),
          globalContractAccountId: z.optional(
            z.union([z.lazy(() => AccountIdSchema()), z.null()])
          ),
          globalContractHash: z.optional(
            z.union([z.lazy(() => CryptoHashSchema()), z.null()])
          ),
          locked: z.string(),
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
          gasKey: z.lazy(() => GasKeyViewSchema()),
          publicKey: z.lazy(() => PublicKeySchema()),
        }),
        type: z.enum(['gas_key_update']),
      }),
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
          index: z.number(),
          nonce: z.number(),
          publicKey: z.lazy(() => PublicKeySchema()),
        }),
        type: z.enum(['gas_key_nonce_update']),
      }),
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
          publicKey: z.lazy(() => PublicKeySchema()),
        }),
        type: z.enum(['gas_key_deletion']),
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
    numBytesAccount: z.number(),
    numExtraBytesRecord: z.number(),
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
    apply: z.number(),
    applyDuringCatchup: z.number(),
    peerDownloads: z.number(),
    perShard: z.number(),
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
    deposit: z.string(),
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
    discardCustomSections: z.boolean(),
    ethImplicitAccounts: z.boolean(),
    extCosts: z.lazy(() => ExtCostsConfigViewSchema()),
    fixContractLoadingCost: z.boolean(),
    globalContractHostFns: z.boolean(),
    growMemCost: z.number(),
    implicitAccountCreation: z.boolean(),
    limitConfig: z.lazy(() => LimitConfigSchema()),
    reftypesBulkMemory: z.boolean(),
    regularOpCost: z.number(),
    saturatingFloatToInt: z.boolean(),
    storageGetMode: z.lazy(() => StorageGetModeSchema()),
    vmKind: z.lazy(() => VMKindSchema()),
  });

export const VMKindSchema = () =>
  z.union([
    z.enum(['Wasmer0']),
    z.enum(['Wasmtime']),
    z.enum(['Wasmer2']),
    z.enum(['NearVm']),
    z.enum(['NearVm2']),
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
        stakeU128: z.string(),
        thresholdU128: z.string(),
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
    stake: z.string(),
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
    combinedTransactionsSizeLimit: z.number(),
    mainStorageProofSizeSoftLimit: z.number(),
    newTransactionsValidationStateSizeSoftLimit: z.number(),
  });

// Method-specific schemas
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
    JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcErrorSchema()
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
    JsonRpcResponseFor_RpcStateChangesInBlockByTypeResponseAnd_RpcErrorSchema()
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
    JsonRpcResponseFor_RpcCongestionLevelResponseAnd_RpcErrorSchema()
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
  z.lazy(() => JsonRpcResponseFor_GenesisConfigAnd_RpcErrorSchema());

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
    JsonRpcResponseFor_RpcLightClientBlockProofResponseAnd_RpcErrorSchema()
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
    JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcErrorSchema()
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
  z.lazy(() => JsonRpcResponseFor_ArrayOf_RangeOfUint64And_RpcErrorSchema());

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
    JsonRpcResponseFor_RpcProtocolConfigResponseAnd_RpcErrorSchema()
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
  z.lazy(() => JsonRpcResponseFor_RpcReceiptResponseAnd_RpcErrorSchema());

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
    JsonRpcResponseFor_RpcSplitStorageInfoResponseAnd_RpcErrorSchema()
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
  z.lazy(() => JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema());

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
    JsonRpcResponseFor_ArrayOf_ValidatorStakeViewAnd_RpcErrorSchema()
  );

// Request schema for block: Returns block details for given height or hash
export const BlockRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForBlockSchema());

// Response schema for block: Returns block details for given height or hash
export const BlockResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcBlockResponseAnd_RpcErrorSchema());

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
    JsonRpcResponseFor_RpcStateChangesInBlockByTypeResponseAnd_RpcErrorSchema()
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
  z.lazy(() => JsonRpcResponseFor_CryptoHashAnd_RpcErrorSchema());

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
  z.lazy(() => JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema());

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
    JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcErrorSchema()
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
  z.lazy(() => JsonRpcResponseFor_RpcChunkResponseAnd_RpcErrorSchema());

// Request schema for client_config: Queries client node configuration
export const ClientConfigRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForClientConfigSchema());

// Response schema for client_config: Queries client node configuration
export const ClientConfigResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcClientConfigResponseAnd_RpcErrorSchema());

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
  z.lazy(() => JsonRpcResponseFor_RpcGasPriceResponseAnd_RpcErrorSchema());

//
// Response schema for genesis_config: Get initial state and parameters for
// the genesis block

export const GenesisConfigResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_GenesisConfigAnd_RpcErrorSchema());

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
    JsonRpcResponseFor_Nullable_RpcHealthResponseAnd_RpcErrorSchema()
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
    JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcErrorSchema()
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
  z.lazy(() => JsonRpcResponseFor_ArrayOf_RangeOfUint64And_RpcErrorSchema());

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
  z.lazy(() => JsonRpcResponseFor_RpcNetworkInfoResponseAnd_RpcErrorSchema());

// Request schema for next_light_client_block: Returns the next light client block.
export const NextLightClientBlockRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForNextLightClientBlockSchema());

//
// Response schema for next_light_client_block: Returns the next light client
// block.

export const NextLightClientBlockResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcLightClientNextBlockResponseAnd_RpcErrorSchema()
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
  z.lazy(() => JsonRpcResponseFor_RpcQueryResponseAnd_RpcErrorSchema());

//
// Request schema for send_tx: Sends transaction. Returns the guaranteed
// execution status and the results the blockchain can provide at the moment.

export const SendTxRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForSendTxSchema());

//
// Response schema for send_tx: Sends transaction. Returns the guaranteed
// execution status and the results the blockchain can provide at the moment.

export const SendTxResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema());

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
  z.lazy(() => JsonRpcResponseFor_RpcStatusResponseAnd_RpcErrorSchema());

//
// Request schema for tx: Queries status of a transaction by hash and returns
// the final transaction result.

export const TxRequestSchema = () => z.lazy(() => JsonRpcRequestForTxSchema());

//
// Response schema for tx: Queries status of a transaction by hash and returns
// the final transaction result.

export const TxResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema());

//
// Request schema for validators: Queries active validators on the network.
// Returns details and the state of validation on the blockchain.

export const ValidatorsRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForValidatorsSchema());

//
// Response schema for validators: Queries active validators on the network.
// Returns details and the state of validation on the blockchain.

export const ValidatorsResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcValidatorResponseAnd_RpcErrorSchema());

// Auto-generated validation schema mapping
// Maps RPC method names to their request/response schema functions
export const VALIDATION_SCHEMA_MAP: Record<
  string,
  {
    requestSchema?: () => any;
    responseSchema?: () => any;
  }
> = {
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

// Utility schemas
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

export const JsonRpcResponseSchema = () =>
  z.object({
    jsonrpc: z.literal('2.0'),
    id: z.string(),
    result: z.optional(z.unknown()),
    error: z.optional(JsonRpcErrorSchema()),
  });
