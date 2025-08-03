// Auto-generated Zod schemas from NEAR OpenAPI spec (zod/mini version)
// Generated on: 2025-08-03T07:23:35.680Z
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

export const AccessKeyInfoViewSchema = () =>
  z.object({
    accessKey: z.lazy(() => AccessKeyViewSchema()),
    publicKey: z.lazy(() => PublicKeySchema()),
  });

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

export const AccountWithPublicKeySchema = () =>
  z.object({
    accountId: z.lazy(() => AccountIdSchema()),
    publicKey: z.lazy(() => PublicKeySchema()),
  });

export const ActionSchema: any = () =>
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
      Delegate: z.lazy(() => SignedDelegateActionSchema()),
    }),
    z.object({
      DeployGlobalContract: z.lazy(() => DeployGlobalContractActionSchema()),
    }),
    z.object({
      UseGlobalContract: z.lazy(() => UseGlobalContractActionSchema()),
    }),
  ]);

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
        args: z.string(),
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

export const BandwidthRequestsV1Schema = () =>
  z.object({
    requests: z.array(z.lazy(() => BandwidthRequestSchema())),
  });

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

export const BlockHeaderViewSchema = () =>
  z.object({
    approvals: z.array(z.lazy(() => SignatureSchema())),
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

export const BlockStatusViewSchema = () =>
  z.object({
    hash: z.lazy(() => CryptoHashSchema()),
    height: z.number(),
  });

export const CallResultSchema = () =>
  z.object({
    logs: z.array(z.string()),
    result: z.array(z.number()),
  });

export const CatchupStatusViewSchema = () =>
  z.object({
    blocksToCatchup: z.array(z.lazy(() => BlockStatusViewSchema())),
    shardSyncStatus: z.record(z.string(), z.string()),
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
export const DelegateActionSchema: any = () =>
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

export const GenesisConfigRequestSchema = () =>
  z.record(z.string(), z.unknown());

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
// This is Action which mustn't contain DelegateAction. This struct is needed
// to avoid the recursion when Action/DelegateAction is deserialized.
// Important: Don't make the inner Action public, this must only be
// constructed through the correct interface that ensures the inner Action is
// actually not a delegate action. That would break an assumption of this
// type, which we use in several places. For example, borsh de-/serialization
// relies on it. If the invariant is broken, we may end up with a
// `Transaction` or `Receipt` that we can serialize but deserializing it back
// causes a parsing error.

export const NonDelegateActionSchema: any = () => z.lazy(() => ActionSchema());

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

export const RpcClientConfigRequestSchema = () =>
  z.record(z.string(), z.unknown());

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
    viewClientThrottlePeriod: z.array(z.number()),
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
      data: z.optional(z.union([z.union([z.unknown(), z.null()]), z.null()])),
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

export const RpcHealthRequestSchema = () => z.record(z.string(), z.unknown());

export const RpcHealthResponseSchema = () => z.record(z.string(), z.unknown());

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

export const RpcLightClientNextBlockResponseSchema = () =>
  z.object({
    approvalsAfterNext: z.optional(z.array(z.lazy(() => SignatureSchema()))),
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

export const RpcNetworkInfoRequestSchema = () =>
  z.record(z.string(), z.unknown());

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
    z.union([
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_account']),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_code']),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        includeProof: z.optional(z.boolean()),
        prefixBase64: z.string(),
        requestType: z.enum(['view_state']),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        publicKey: z.lazy(() => PublicKeySchema()),
        requestType: z.enum(['view_access_key']),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_access_key_list']),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        argsBase64: z.string(),
        methodName: z.string(),
        requestType: z.enum(['call_function']),
      }),
      z.object({
        codeHash: z.lazy(() => CryptoHashSchema()),
        requestType: z.enum(['view_global_contract_code']),
      }),
      z.object({
        accountId: z.lazy(() => AccountIdSchema()),
        requestType: z.enum(['view_global_contract_code_by_account_id']),
      }),
    ])
  );

export const RpcQueryResponseSchema = () =>
  z.union([
    z.lazy(() => AccountViewSchema()),
    z.lazy(() => ContractCodeViewSchema()),
    z.lazy(() => ViewStateResultSchema()),
    z.lazy(() => CallResultSchema()),
    z.lazy(() => AccessKeyViewSchema()),
    z.lazy(() => AccessKeyListSchema()),
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
    z.union([
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['account_changes']),
      }),
      z.object({
        changesType: z.enum(['single_access_key_changes']),
        keys: z.array(z.lazy(() => AccountWithPublicKeySchema())),
      }),
      z.object({
        changesType: z.enum(['single_gas_key_changes']),
        keys: z.array(z.lazy(() => AccountWithPublicKeySchema())),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['all_access_key_changes']),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['all_gas_key_changes']),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['contract_code_changes']),
      }),
      z.object({
        accountIds: z.array(z.lazy(() => AccountIdSchema())),
        changesType: z.enum(['data_changes']),
        keyPrefixBase64: z.string(),
      }),
    ])
  );

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

export const RpcStatusRequestSchema = () => z.record(z.string(), z.unknown());

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
  z.union([
    z.lazy(() => FinalExecutionOutcomeWithReceiptViewSchema()),
    z.lazy(() => FinalExecutionOutcomeViewSchema()),
  ]);

export const RpcTransactionStatusRequestSchema = () =>
  z.union([
    z.object({
      signedTxBase64: z.lazy(() => SignedTransactionSchema()),
    }),
    z.object({
      senderAccountId: z.lazy(() => AccountIdSchema()),
      txHash: z.lazy(() => CryptoHashSchema()),
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

export const SignedDelegateActionSchema: any = () =>
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
          keyBase64: z.string(),
          valueBase64: z.string(),
        }),
        type: z.enum(['data_update']),
      }),
      z.object({
        change: z.object({
          accountId: z.lazy(() => AccountIdSchema()),
          keyBase64: z.string(),
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
    key: z.string(),
    value: z.string(),
  });

// Options for dumping state to S3.
export const StateSyncConfigSchema = () =>
  z.object({
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

export const SyncCheckpointSchema = () =>
  z.enum(['genesis', 'earliest_available']);

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
export const EXPERIMENTALChangesRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALChangesSchema());

export const EXPERIMENTALChangesResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcErrorSchema()
  );

export const EXPERIMENTALChangesInBlockRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALChangesInBlockSchema());

export const EXPERIMENTALChangesInBlockResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcStateChangesInBlockByTypeResponseAnd_RpcErrorSchema()
  );

export const EXPERIMENTALCongestionLevelRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALCongestionLevelSchema());

export const EXPERIMENTALCongestionLevelResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcCongestionLevelResponseAnd_RpcErrorSchema()
  );

export const EXPERIMENTALGenesisConfigRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALGenesisConfigSchema());

export const EXPERIMENTALGenesisConfigResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_GenesisConfigAnd_RpcErrorSchema());

export const EXPERIMENTALLightClientBlockProofRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALLightClientBlockProofSchema());

export const EXPERIMENTALLightClientBlockProofResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcLightClientBlockProofResponseAnd_RpcErrorSchema()
  );

export const EXPERIMENTALLightClientProofRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALLightClientProofSchema());

export const EXPERIMENTALLightClientProofResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcErrorSchema()
  );

export const EXPERIMENTALMaintenanceWindowsRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALMaintenanceWindowsSchema());

export const EXPERIMENTALMaintenanceWindowsResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_ArrayOf_RangeOfUint64And_RpcErrorSchema());

export const EXPERIMENTALProtocolConfigRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALProtocolConfigSchema());

export const EXPERIMENTALProtocolConfigResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcProtocolConfigResponseAnd_RpcErrorSchema()
  );

export const EXPERIMENTALReceiptRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALReceiptSchema());

export const EXPERIMENTALReceiptResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcReceiptResponseAnd_RpcErrorSchema());

export const EXPERIMENTALSplitStorageInfoRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALSplitStorageInfoSchema());

export const EXPERIMENTALSplitStorageInfoResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcSplitStorageInfoResponseAnd_RpcErrorSchema()
  );

export const EXPERIMENTALTxStatusRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALTxStatusSchema());

export const EXPERIMENTALTxStatusResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema());

export const EXPERIMENTALValidatorsOrderedRequestSchema = () =>
  z.lazy(() => JsonRpcRequestFor_EXPERIMENTALValidatorsOrderedSchema());

export const EXPERIMENTALValidatorsOrderedResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_ArrayOf_ValidatorStakeViewAnd_RpcErrorSchema()
  );

export const BlockRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForBlockSchema());

export const BlockResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcBlockResponseAnd_RpcErrorSchema());

export const BroadcastTxAsyncRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForBroadcastTxAsyncSchema());

export const BroadcastTxAsyncResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_CryptoHashAnd_RpcErrorSchema());

export const BroadcastTxCommitRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForBroadcastTxCommitSchema());

export const BroadcastTxCommitResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema());

export const ChangesRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForChangesSchema());

export const ChangesResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcErrorSchema()
  );

export const ChunkRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForChunkSchema());

export const ChunkResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcChunkResponseAnd_RpcErrorSchema());

export const ClientConfigRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForClientConfigSchema());

export const ClientConfigResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcClientConfigResponseAnd_RpcErrorSchema());

export const GasPriceRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForGasPriceSchema());

export const GasPriceResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcGasPriceResponseAnd_RpcErrorSchema());

export const HealthRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForHealthSchema());

export const HealthResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_Nullable_RpcHealthResponseAnd_RpcErrorSchema()
  );

export const LightClientProofRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForLightClientProofSchema());

export const LightClientProofResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcErrorSchema()
  );

export const NetworkInfoRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForNetworkInfoSchema());

export const NetworkInfoResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcNetworkInfoResponseAnd_RpcErrorSchema());

export const NextLightClientBlockRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForNextLightClientBlockSchema());

export const NextLightClientBlockResponseSchema = () =>
  z.lazy(() =>
    JsonRpcResponseFor_RpcLightClientNextBlockResponseAnd_RpcErrorSchema()
  );

export const QueryRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForQuerySchema());

export const QueryResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcQueryResponseAnd_RpcErrorSchema());

export const SendTxRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForSendTxSchema());

export const SendTxResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema());

export const StatusRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForStatusSchema());

export const StatusResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcStatusResponseAnd_RpcErrorSchema());

export const TxRequestSchema = () => z.lazy(() => JsonRpcRequestForTxSchema());

export const TxResponseSchema = () =>
  z.lazy(() => JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema());

export const ValidatorsRequestSchema = () =>
  z.lazy(() => JsonRpcRequestForValidatorsSchema());

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
  health: {
    requestSchema: HealthRequestSchema,
    responseSchema: HealthResponseSchema,
  },
  light_client_proof: {
    requestSchema: LightClientProofRequestSchema,
    responseSchema: LightClientProofResponseSchema,
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
