// Auto-generated TypeScript types from NEAR OpenAPI spec using z.infer (zod/mini version)
// Generated on: 2025-08-02T20:30:22.558Z
// Do not edit manually - run 'pnpm generate' to regenerate

import { z } from 'zod/mini';
import * as schemas from './schemas';

/**
 * Access key provides limited access to an account. Each access key belongs
 * to some account and is identified by a unique (within the account) public
 * key. One account may have large number of access keys. Access keys allow to
 * act on behalf of the account by restricting transactions that can be
 * issued. `account_id,public_key` is a key in the state
 */
export type AccessKey = z.infer<ReturnType<typeof schemas.AccessKeySchema>>;

/** Describes the cost of creating an access key. */
export type AccessKeyCreationConfigView = z.infer<ReturnType<typeof schemas.AccessKeyCreationConfigViewSchema>>;

/** Describes information about an access key including the public key. */
export type AccessKeyInfoView = z.infer<ReturnType<typeof schemas.AccessKeyInfoViewSchema>>;

/** Lists access keys */
export type AccessKeyList = z.infer<ReturnType<typeof schemas.AccessKeyListSchema>>;

/** Defines permissions for AccessKey */
export type AccessKeyPermission = z.infer<ReturnType<typeof schemas.AccessKeyPermissionSchema>>;

/**
 * Describes the permission scope for an access key. Whether it is a function
 * call or a full access key.
 */
export type AccessKeyPermissionView = z.infer<ReturnType<typeof schemas.AccessKeyPermissionViewSchema>>;

/** Describes access key permission scope and nonce. */
export type AccessKeyView = z.infer<ReturnType<typeof schemas.AccessKeyViewSchema>>;

/** The structure describes configuration for creation of new accounts. */
export type AccountCreationConfigView = z.infer<ReturnType<typeof schemas.AccountCreationConfigViewSchema>>;

/**
 * AccountData is a piece of global state that a validator signs and
 * broadcasts to the network. It is essentially the data that a validator
 * wants to share with the network. All the nodes in the network are
 * collecting the account data broadcasted by the validators. Since the number
 * of the validators is bounded and their identity is known (and the maximal
 * size of allowed AccountData is bounded) the global state that is
 * distributed in the form of AccountData is bounded as well. Find more
 * information in the docs
 * [here](https://github.com/near/nearcore/blob/560f7fc8f4b3106e0d5d46050688610b1f104ac6/chain/client/src/client.rs#L2232)
 */
export type AccountDataView = z.infer<ReturnType<typeof schemas.AccountDataViewSchema>>;

/**
 * NEAR Account Identifier. This is a unique, syntactically valid,
 * human-readable account identifier on the NEAR network. [See the crate-level
 * docs for information about validation.](index.html#account-id-rules) Also
 * see [Error kind precedence](AccountId#error-kind-precedence). ## Examples
 * ``` use near_account_id::AccountId; let alice: AccountId =
 * "alice.near".parse().unwrap();
 * assert!("ƒelicia.near".parse::<AccountId>().is_err()); // (ƒ is not f) ```
 */
export type AccountId = z.infer<ReturnType<typeof schemas.AccountIdSchema>>;

export type AccountIdValidityRulesVersion = z.infer<ReturnType<typeof schemas.AccountIdValidityRulesVersionSchema>>;

/** Account info for validators */
export type AccountInfo = z.infer<ReturnType<typeof schemas.AccountInfoSchema>>;

/** A view of the account */
export type AccountView = z.infer<ReturnType<typeof schemas.AccountViewSchema>>;

/** Account ID with its public key. */
export type AccountWithPublicKey = z.infer<ReturnType<typeof schemas.AccountWithPublicKeySchema>>;

export type Action = z.infer<ReturnType<typeof schemas.ActionSchema>>;

/**
 * Describes the cost of creating a specific action, `Action`. Includes all
 * variants.
 */
export type ActionCreationConfigView = z.infer<ReturnType<typeof schemas.ActionCreationConfigViewSchema>>;

/** An error happened during Action execution */
export type ActionError = z.infer<ReturnType<typeof schemas.ActionErrorSchema>>;

export type ActionErrorKind = z.infer<ReturnType<typeof schemas.ActionErrorKindSchema>>;

export type ActionView = z.infer<ReturnType<typeof schemas.ActionViewSchema>>;

/** Describes the error for validating a list of actions. */
export type ActionsValidationError = z.infer<ReturnType<typeof schemas.ActionsValidationErrorSchema>>;

/** An action that adds key with public key associated */
export type AddKeyAction = z.infer<ReturnType<typeof schemas.AddKeyActionSchema>>;

/**
 * `BandwidthRequest` describes the size of receipts that a shard would like
 * to send to another shard. When a shard wants to send a lot of receipts to
 * another shard, it needs to create a request and wait for a bandwidth grant
 * from the bandwidth scheduler.
 */
export type BandwidthRequest = z.infer<ReturnType<typeof schemas.BandwidthRequestSchema>>;

/**
 * Bitmap which describes which values from the predefined list are being
 * requested. The nth bit is set to 1 when the nth value from the list is
 * being requested.
 */
export type BandwidthRequestBitmap = z.infer<ReturnType<typeof schemas.BandwidthRequestBitmapSchema>>;

/**
 * A list of shard's bandwidth requests. Describes how much the shard would
 * like to send to other shards.
 */
export type BandwidthRequests = z.infer<ReturnType<typeof schemas.BandwidthRequestsSchema>>;

/** Version 1 of [`BandwidthRequest`]. */
export type BandwidthRequestsV1 = z.infer<ReturnType<typeof schemas.BandwidthRequestsV1Schema>>;

/**
 * A part of a state for the current head of a light client. More info
 * [here](https://nomicon.io/ChainSpec/LightClient).
 */
export type BlockHeaderInnerLiteView = z.infer<ReturnType<typeof schemas.BlockHeaderInnerLiteViewSchema>>;

/** Contains main info about the block. */
export type BlockHeaderView = z.infer<ReturnType<typeof schemas.BlockHeaderViewSchema>>;

export type BlockId = z.infer<ReturnType<typeof schemas.BlockIdSchema>>;

/** Height and hash of a block */
export type BlockStatusView = z.infer<ReturnType<typeof schemas.BlockStatusViewSchema>>;

/** A result returned by contract method */
export type CallResult = z.infer<ReturnType<typeof schemas.CallResultSchema>>;

/**
 * Status of the
 * [catchup](https://near.github.io/nearcore/architecture/how/sync.html#catchup)
 * process
 */
export type CatchupStatusView = z.infer<ReturnType<typeof schemas.CatchupStatusViewSchema>>;

/**
 * Config for the Chunk Distribution Network feature. This allows nodes to
 * push and pull chunks from a central stream. The two benefits of this
 * approach are: (1) less request/response traffic on the peer-to-peer network
 * and (2) lower latency for RPC nodes indexing the chain.
 */
export type ChunkDistributionNetworkConfig = z.infer<ReturnType<typeof schemas.ChunkDistributionNetworkConfigSchema>>;

/** URIs for the Chunk Distribution Network feature. */
export type ChunkDistributionUris = z.infer<ReturnType<typeof schemas.ChunkDistributionUrisSchema>>;

/** Contains main info about the chunk. */
export type ChunkHeaderView = z.infer<ReturnType<typeof schemas.ChunkHeaderViewSchema>>;

export type CompilationError = z.infer<ReturnType<typeof schemas.CompilationErrorSchema>>;

/**
 * The configuration for congestion control. More info about congestion
 * [here](https://near.github.io/nearcore/architecture/how/receipt-congestion.html?highlight=congestion#receipt-congestion)
 */
export type CongestionControlConfigView = z.infer<ReturnType<typeof schemas.CongestionControlConfigViewSchema>>;

/**
 * Stores the congestion level of a shard. More info about congestion
 * [here](https://near.github.io/nearcore/architecture/how/receipt-congestion.html?highlight=congestion#receipt-congestion)
 */
export type CongestionInfoView = z.infer<ReturnType<typeof schemas.CongestionInfoViewSchema>>;

/** A view of the contract code. */
export type ContractCodeView = z.infer<ReturnType<typeof schemas.ContractCodeViewSchema>>;

/**
 * Shows gas profile. More info
 * [here](https://near.github.io/nearcore/architecture/gas/gas_profile.html?highlight=WASM_HOST_COST#example-transaction-gas-profile).
 */
export type CostGasUsed = z.infer<ReturnType<typeof schemas.CostGasUsedSchema>>;

/** Create account action */
export type CreateAccountAction = z.infer<ReturnType<typeof schemas.CreateAccountActionSchema>>;

export type CryptoHash = z.infer<ReturnType<typeof schemas.CryptoHashSchema>>;

/** Describes information about the current epoch validator */
export type CurrentEpochValidatorInfo = z.infer<ReturnType<typeof schemas.CurrentEpochValidatorInfoSchema>>;

/** The fees settings for a data receipt creation */
export type DataReceiptCreationConfigView = z.infer<ReturnType<typeof schemas.DataReceiptCreationConfigViewSchema>>;

export type DataReceiverView = z.infer<ReturnType<typeof schemas.DataReceiverViewSchema>>;

/** This action allows to execute the inner actions behalf of the defined sender. */
export type DelegateAction = z.infer<ReturnType<typeof schemas.DelegateActionSchema>>;

export type DeleteAccountAction = z.infer<ReturnType<typeof schemas.DeleteAccountActionSchema>>;

export type DeleteKeyAction = z.infer<ReturnType<typeof schemas.DeleteKeyActionSchema>>;

/** Deploy contract action */
export type DeployContractAction = z.infer<ReturnType<typeof schemas.DeployContractActionSchema>>;

/** Deploy global contract action */
export type DeployGlobalContractAction = z.infer<ReturnType<typeof schemas.DeployGlobalContractActionSchema>>;

export type DetailedDebugStatus = z.infer<ReturnType<typeof schemas.DetailedDebugStatusSchema>>;

export type Direction = z.infer<ReturnType<typeof schemas.DirectionSchema>>;

/** Configures how to dump state to external storage. */
export type DumpConfig = z.infer<ReturnType<typeof schemas.DumpConfigSchema>>;

export type DurationAsStdSchemaProvider = z.infer<ReturnType<typeof schemas.DurationAsStdSchemaProviderSchema>>;

/**
 * Epoch identifier -- wrapped hash, to make it easier to distinguish. EpochId
 * of epoch T is the hash of last block in T-2 EpochId of first two epochs is
 * 0
 */
export type EpochId = z.infer<ReturnType<typeof schemas.EpochIdSchema>>;

export type EpochSyncConfig = z.infer<ReturnType<typeof schemas.EpochSyncConfigSchema>>;

export type ExecutionMetadataView = z.infer<ReturnType<typeof schemas.ExecutionMetadataViewSchema>>;

export type ExecutionOutcomeView = z.infer<ReturnType<typeof schemas.ExecutionOutcomeViewSchema>>;

export type ExecutionOutcomeWithIdView = z.infer<ReturnType<typeof schemas.ExecutionOutcomeWithIdViewSchema>>;

export type ExecutionStatusView = z.infer<ReturnType<typeof schemas.ExecutionStatusViewSchema>>;

/**
 * Typed view of ExtCostsConfig to preserve JSON output field names in
 * protocol config RPC output.
 */
export type ExtCostsConfigView = z.infer<ReturnType<typeof schemas.ExtCostsConfigViewSchema>>;

export type ExternalStorageConfig = z.infer<ReturnType<typeof schemas.ExternalStorageConfigSchema>>;

export type ExternalStorageLocation = z.infer<ReturnType<typeof schemas.ExternalStorageLocationSchema>>;

/**
 * Costs associated with an object that can only be sent over the network (and
 * executed by the receiver). NOTE: `send_sir` or `send_not_sir` fees are
 * usually burned when the item is being created. And `execution` fee is
 * burned when the item is being executed.
 */
export type Fee = z.infer<ReturnType<typeof schemas.FeeSchema>>;

/**
 * Execution outcome of the transaction and all the subsequent receipts. Could
 * be not finalized yet
 */
export type FinalExecutionOutcomeView = z.infer<ReturnType<typeof schemas.FinalExecutionOutcomeViewSchema>>;

/**
 * Final execution outcome of the transaction and all of subsequent the
 * receipts. Also includes the generated receipt.
 */
export type FinalExecutionOutcomeWithReceiptView = z.infer<ReturnType<typeof schemas.FinalExecutionOutcomeWithReceiptViewSchema>>;

export type FinalExecutionStatus = z.infer<ReturnType<typeof schemas.FinalExecutionStatusSchema>>;

/** Different types of finality. */
export type Finality = z.infer<ReturnType<typeof schemas.FinalitySchema>>;

/**
 * This type is used to mark function arguments. NOTE: The main reason for
 * this to exist (except the type-safety) is that the value is transparently
 * serialized and deserialized as a base64-encoded string when serde is used
 * (serde_json).
 */
export type FunctionArgs = z.infer<ReturnType<typeof schemas.FunctionArgsSchema>>;

export type FunctionCallAction = z.infer<ReturnType<typeof schemas.FunctionCallActionSchema>>;

/**
 * Serializable version of `near-vm-runner::FunctionCallError`. Must never
 * reorder/remove elements, can only add new variants at the end (but do that
 * very carefully). It describes stable serialization format, and only used by
 * serialization logic.
 */
export type FunctionCallError = z.infer<ReturnType<typeof schemas.FunctionCallErrorSchema>>;

/**
 * Grants limited permission to make transactions with FunctionCallActions The
 * permission can limit the allowed balance to be spent on the prepaid gas. It
 * also restrict the account ID of the receiver for this function call. It
 * also can restrict the method name for the allowed function calls.
 */
export type FunctionCallPermission = z.infer<ReturnType<typeof schemas.FunctionCallPermissionSchema>>;

/** Configuration for garbage collection. */
export type GCConfig = z.infer<ReturnType<typeof schemas.GCConfigSchema>>;

export type GasKeyView = z.infer<ReturnType<typeof schemas.GasKeyViewSchema>>;

export type GenesisConfig = z.infer<ReturnType<typeof schemas.GenesisConfigSchema>>;

export type GenesisConfigRequest = z.infer<ReturnType<typeof schemas.GenesisConfigRequestSchema>>;

export type GlobalContractDeployMode = z.infer<ReturnType<typeof schemas.GlobalContractDeployModeSchema>>;

export type GlobalContractIdentifier = z.infer<ReturnType<typeof schemas.GlobalContractIdentifierSchema>>;

export type HostError = z.infer<ReturnType<typeof schemas.HostErrorSchema>>;

export type InvalidAccessKeyError = z.infer<ReturnType<typeof schemas.InvalidAccessKeyErrorSchema>>;

/** An error happened during TX execution */
export type InvalidTxError = z.infer<ReturnType<typeof schemas.InvalidTxErrorSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALChanges = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALChangesSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALChangesInBlock = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALChangesInBlockSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALCongestionLevel = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALCongestionLevelSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALGenesisConfig = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALGenesisConfigSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALLightClientBlockProof = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALLightClientBlockProofSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALLightClientProof = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALLightClientProofSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALMaintenanceWindows = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALMaintenanceWindowsSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALProtocolConfig = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALProtocolConfigSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALReceipt = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALReceiptSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALSplitStorageInfo = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALSplitStorageInfoSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALTxStatus = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALTxStatusSchema>>;

export type JsonRpcRequestFor_EXPERIMENTALValidatorsOrdered = z.infer<ReturnType<typeof schemas.JsonRpcRequestFor_EXPERIMENTALValidatorsOrderedSchema>>;

export type JsonRpcRequestForBlock = z.infer<ReturnType<typeof schemas.JsonRpcRequestForBlockSchema>>;

export type JsonRpcRequestForBlockEffects = z.infer<ReturnType<typeof schemas.JsonRpcRequestForBlockEffectsSchema>>;

export type JsonRpcRequestForBroadcastTxAsync = z.infer<ReturnType<typeof schemas.JsonRpcRequestForBroadcastTxAsyncSchema>>;

export type JsonRpcRequestForBroadcastTxCommit = z.infer<ReturnType<typeof schemas.JsonRpcRequestForBroadcastTxCommitSchema>>;

export type JsonRpcRequestForChanges = z.infer<ReturnType<typeof schemas.JsonRpcRequestForChangesSchema>>;

export type JsonRpcRequestForChunk = z.infer<ReturnType<typeof schemas.JsonRpcRequestForChunkSchema>>;

export type JsonRpcRequestForClientConfig = z.infer<ReturnType<typeof schemas.JsonRpcRequestForClientConfigSchema>>;

export type JsonRpcRequestForGasPrice = z.infer<ReturnType<typeof schemas.JsonRpcRequestForGasPriceSchema>>;

export type JsonRpcRequestForGenesisConfig = z.infer<ReturnType<typeof schemas.JsonRpcRequestForGenesisConfigSchema>>;

export type JsonRpcRequestForHealth = z.infer<ReturnType<typeof schemas.JsonRpcRequestForHealthSchema>>;

export type JsonRpcRequestForLightClientProof = z.infer<ReturnType<typeof schemas.JsonRpcRequestForLightClientProofSchema>>;

export type JsonRpcRequestForMaintenanceWindows = z.infer<ReturnType<typeof schemas.JsonRpcRequestForMaintenanceWindowsSchema>>;

export type JsonRpcRequestForNetworkInfo = z.infer<ReturnType<typeof schemas.JsonRpcRequestForNetworkInfoSchema>>;

export type JsonRpcRequestForNextLightClientBlock = z.infer<ReturnType<typeof schemas.JsonRpcRequestForNextLightClientBlockSchema>>;

export type JsonRpcRequestForQuery = z.infer<ReturnType<typeof schemas.JsonRpcRequestForQuerySchema>>;

export type JsonRpcRequestForSendTx = z.infer<ReturnType<typeof schemas.JsonRpcRequestForSendTxSchema>>;

export type JsonRpcRequestForStatus = z.infer<ReturnType<typeof schemas.JsonRpcRequestForStatusSchema>>;

export type JsonRpcRequestForTx = z.infer<ReturnType<typeof schemas.JsonRpcRequestForTxSchema>>;

export type JsonRpcRequestForValidators = z.infer<ReturnType<typeof schemas.JsonRpcRequestForValidatorsSchema>>;

export type JsonRpcResponseFor_ArrayOf_RangeOfUint64And_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_ArrayOf_RangeOfUint64And_RpcErrorSchema>>;

export type JsonRpcResponseFor_ArrayOf_ValidatorStakeViewAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_ArrayOf_ValidatorStakeViewAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_CryptoHashAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_CryptoHashAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_GenesisConfigAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_GenesisConfigAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_Nullable_RpcHealthResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_Nullable_RpcHealthResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcBlockResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcBlockResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcChunkResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcChunkResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcClientConfigResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcClientConfigResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcCongestionLevelResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcCongestionLevelResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcGasPriceResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcGasPriceResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcLightClientBlockProofResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcLightClientBlockProofResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcLightClientExecutionProofResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcLightClientNextBlockResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcLightClientNextBlockResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcNetworkInfoResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcNetworkInfoResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcProtocolConfigResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcProtocolConfigResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcQueryResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcQueryResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcReceiptResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcReceiptResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcSplitStorageInfoResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcSplitStorageInfoResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcStateChangesInBlockByTypeResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcStateChangesInBlockByTypeResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcStateChangesInBlockResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcStatusResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcStatusResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcTransactionResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcTransactionResponseAnd_RpcErrorSchema>>;

export type JsonRpcResponseFor_RpcValidatorResponseAnd_RpcError = z.infer<ReturnType<typeof schemas.JsonRpcResponseFor_RpcValidatorResponseAnd_RpcErrorSchema>>;

/**
 * Information about a Producer: its account name, peer_id and a list of
 * connected peers that the node can use to send message for this producer.
 */
export type KnownProducerView = z.infer<ReturnType<typeof schemas.KnownProducerViewSchema>>;

export type LightClientBlockLiteView = z.infer<ReturnType<typeof schemas.LightClientBlockLiteViewSchema>>;

/**
 * Describes limits for VM and Runtime. TODO #4139: consider switching to
 * strongly-typed wrappers instead of raw quantities
 */
export type LimitConfig = z.infer<ReturnType<typeof schemas.LimitConfigSchema>>;

export type LogSummaryStyle = z.infer<ReturnType<typeof schemas.LogSummaryStyleSchema>>;

export type MerklePathItem = z.infer<ReturnType<typeof schemas.MerklePathItemSchema>>;

export type MethodResolveError = z.infer<ReturnType<typeof schemas.MethodResolveErrorSchema>>;

export type MissingTrieValue = z.infer<ReturnType<typeof schemas.MissingTrieValueSchema>>;

/** Contexts in which `StorageError::MissingTrieValue` error might occur. */
export type MissingTrieValueContext = z.infer<ReturnType<typeof schemas.MissingTrieValueContextSchema>>;

export type MutableConfigValue = z.infer<ReturnType<typeof schemas.MutableConfigValueSchema>>;

export type NetworkInfoView = z.infer<ReturnType<typeof schemas.NetworkInfoViewSchema>>;

export type NextEpochValidatorInfo = z.infer<ReturnType<typeof schemas.NextEpochValidatorInfoSchema>>;

/**
 * This is Action which mustn't contain DelegateAction. This struct is needed
 * to avoid the recursion when Action/DelegateAction is deserialized.
 * Important: Don't make the inner Action public, this must only be
 * constructed through the correct interface that ensures the inner Action is
 * actually not a delegate action. That would break an assumption of this
 * type, which we use in several places. For example, borsh de-/serialization
 * relies on it. If the invariant is broken, we may end up with a
 * `Transaction` or `Receipt` that we can serialize but deserializing it back
 * causes a parsing error.
 */
export type NonDelegateAction = z.infer<ReturnType<typeof schemas.NonDelegateActionSchema>>;

/** Peer id is the public key. */
export type PeerId = z.infer<ReturnType<typeof schemas.PeerIdSchema>>;

export type PeerInfoView = z.infer<ReturnType<typeof schemas.PeerInfoViewSchema>>;

/** Error that can occur while preparing or executing Wasm smart-contract. */
export type PrepareError = z.infer<ReturnType<typeof schemas.PrepareErrorSchema>>;

export type PublicKey = z.infer<ReturnType<typeof schemas.PublicKeySchema>>;

export type RangeOfUint64 = z.infer<ReturnType<typeof schemas.RangeOfUint64Schema>>;

export type ReceiptEnumView = z.infer<ReturnType<typeof schemas.ReceiptEnumViewSchema>>;

/** Describes the error for validating a receipt. */
export type ReceiptValidationError = z.infer<ReturnType<typeof schemas.ReceiptValidationErrorSchema>>;

export type ReceiptView = z.infer<ReturnType<typeof schemas.ReceiptViewSchema>>;

export type RpcBlockRequest = z.infer<ReturnType<typeof schemas.RpcBlockRequestSchema>>;

export type RpcBlockResponse = z.infer<ReturnType<typeof schemas.RpcBlockResponseSchema>>;

export type RpcChunkRequest = z.infer<ReturnType<typeof schemas.RpcChunkRequestSchema>>;

export type RpcChunkResponse = z.infer<ReturnType<typeof schemas.RpcChunkResponseSchema>>;

export type RpcClientConfigRequest = z.infer<ReturnType<typeof schemas.RpcClientConfigRequestSchema>>;

/** ClientConfig where some fields can be updated at runtime. */
export type RpcClientConfigResponse = z.infer<ReturnType<typeof schemas.RpcClientConfigResponseSchema>>;

export type RpcCongestionLevelRequest = z.infer<ReturnType<typeof schemas.RpcCongestionLevelRequestSchema>>;

export type RpcCongestionLevelResponse = z.infer<ReturnType<typeof schemas.RpcCongestionLevelResponseSchema>>;

/**
 * This struct may be returned from JSON RPC server in case of error It is
 * expected that this struct has impl From<_> all other RPC errors like
 * [RpcBlockError](crate::types::blocks::RpcBlockError)
 */
export type RpcError = z.infer<ReturnType<typeof schemas.RpcErrorSchema>>;

export type RpcGasPriceRequest = z.infer<ReturnType<typeof schemas.RpcGasPriceRequestSchema>>;

export type RpcGasPriceResponse = z.infer<ReturnType<typeof schemas.RpcGasPriceResponseSchema>>;

export type RpcHealthRequest = z.infer<ReturnType<typeof schemas.RpcHealthRequestSchema>>;

export type RpcHealthResponse = z.infer<ReturnType<typeof schemas.RpcHealthResponseSchema>>;

export type RpcKnownProducer = z.infer<ReturnType<typeof schemas.RpcKnownProducerSchema>>;

export type RpcLightClientBlockProofRequest = z.infer<ReturnType<typeof schemas.RpcLightClientBlockProofRequestSchema>>;

export type RpcLightClientBlockProofResponse = z.infer<ReturnType<typeof schemas.RpcLightClientBlockProofResponseSchema>>;

export type RpcLightClientExecutionProofRequest = z.infer<ReturnType<typeof schemas.RpcLightClientExecutionProofRequestSchema>>;

export type RpcLightClientExecutionProofResponse = z.infer<ReturnType<typeof schemas.RpcLightClientExecutionProofResponseSchema>>;

export type RpcLightClientNextBlockRequest = z.infer<ReturnType<typeof schemas.RpcLightClientNextBlockRequestSchema>>;

/**
 * A state for the current head of a light client. More info
 * [here](https://nomicon.io/ChainSpec/LightClient).
 */
export type RpcLightClientNextBlockResponse = z.infer<ReturnType<typeof schemas.RpcLightClientNextBlockResponseSchema>>;

export type RpcMaintenanceWindowsRequest = z.infer<ReturnType<typeof schemas.RpcMaintenanceWindowsRequestSchema>>;

export type RpcNetworkInfoRequest = z.infer<ReturnType<typeof schemas.RpcNetworkInfoRequestSchema>>;

export type RpcNetworkInfoResponse = z.infer<ReturnType<typeof schemas.RpcNetworkInfoResponseSchema>>;

export type RpcPeerInfo = z.infer<ReturnType<typeof schemas.RpcPeerInfoSchema>>;

export type RpcProtocolConfigRequest = z.infer<ReturnType<typeof schemas.RpcProtocolConfigRequestSchema>>;

export type RpcProtocolConfigResponse = z.infer<ReturnType<typeof schemas.RpcProtocolConfigResponseSchema>>;

export type RpcQueryRequest = z.infer<ReturnType<typeof schemas.RpcQueryRequestSchema>>;

export type RpcQueryResponse = z.infer<ReturnType<typeof schemas.RpcQueryResponseSchema>>;

export type RpcReceiptRequest = z.infer<ReturnType<typeof schemas.RpcReceiptRequestSchema>>;

export type RpcReceiptResponse = z.infer<ReturnType<typeof schemas.RpcReceiptResponseSchema>>;

export type RpcRequestValidationErrorKind = z.infer<ReturnType<typeof schemas.RpcRequestValidationErrorKindSchema>>;

export type RpcSendTransactionRequest = z.infer<ReturnType<typeof schemas.RpcSendTransactionRequestSchema>>;

export type RpcSplitStorageInfoRequest = z.infer<ReturnType<typeof schemas.RpcSplitStorageInfoRequestSchema>>;

/** Contains the split storage information. */
export type RpcSplitStorageInfoResponse = z.infer<ReturnType<typeof schemas.RpcSplitStorageInfoResponseSchema>>;

/**
 * It is a [serializable view] of [`StateChangesRequest`]. [serializable
 * view]: ./index.html [`StateChangesRequest`]:
 * ../types/struct.StateChangesRequest.html
 */
export type RpcStateChangesInBlockByTypeRequest = z.infer<ReturnType<typeof schemas.RpcStateChangesInBlockByTypeRequestSchema>>;

export type RpcStateChangesInBlockByTypeResponse = z.infer<ReturnType<typeof schemas.RpcStateChangesInBlockByTypeResponseSchema>>;

export type RpcStateChangesInBlockRequest = z.infer<ReturnType<typeof schemas.RpcStateChangesInBlockRequestSchema>>;

export type RpcStateChangesInBlockResponse = z.infer<ReturnType<typeof schemas.RpcStateChangesInBlockResponseSchema>>;

export type RpcStatusRequest = z.infer<ReturnType<typeof schemas.RpcStatusRequestSchema>>;

export type RpcStatusResponse = z.infer<ReturnType<typeof schemas.RpcStatusResponseSchema>>;

export type RpcTransactionResponse = z.infer<ReturnType<typeof schemas.RpcTransactionResponseSchema>>;

export type RpcTransactionStatusRequest = z.infer<ReturnType<typeof schemas.RpcTransactionStatusRequestSchema>>;

export type RpcValidatorRequest = z.infer<ReturnType<typeof schemas.RpcValidatorRequestSchema>>;

/** Information about this epoch validators and next epoch validators */
export type RpcValidatorResponse = z.infer<ReturnType<typeof schemas.RpcValidatorResponseSchema>>;

export type RpcValidatorsOrderedRequest = z.infer<ReturnType<typeof schemas.RpcValidatorsOrderedRequestSchema>>;

/** View that preserves JSON format of the runtime config. */
export type RuntimeConfigView = z.infer<ReturnType<typeof schemas.RuntimeConfigViewSchema>>;

/** Describes different fees for the runtime */
export type RuntimeFeesConfigView = z.infer<ReturnType<typeof schemas.RuntimeFeesConfigViewSchema>>;

/**
 * The shard identifier. It may be an arbitrary number - it does not need to
 * be a number in the range 0..NUM_SHARDS. The shard ids do not need to be
 * sequential or contiguous. The shard id is wrapped in a new type to prevent
 * the old pattern of using indices in range 0..NUM_SHARDS and casting to
 * ShardId. Once the transition if fully complete it potentially may be
 * simplified to a regular type alias.
 */
export type ShardId = z.infer<ReturnType<typeof schemas.ShardIdSchema>>;

/**
 * A versioned struct that contains all information needed to assign accounts
 * to shards. Because of re-sharding, the chain may use different shard layout
 * to split shards at different times. Currently, `ShardLayout` is stored as
 * part of `EpochConfig`, which is generated each epoch given the epoch
 * protocol version. In mainnet/testnet, we use two shard layouts since
 * re-sharding has only happened once. It is stored as part of genesis config,
 * see default_simple_nightshade_shard_layout() Below is an overview for some
 * important functionalities of ShardLayout interface.
 */
export type ShardLayout = z.infer<ReturnType<typeof schemas.ShardLayoutSchema>>;

/**
 * A shard layout that maps accounts evenly across all shards -- by calculate
 * the hash of account id and mod number of shards. This is added to capture
 * the old `account_id_to_shard_id` algorithm, to keep backward compatibility
 * for some existing tests. `parent_shards` for `ShardLayoutV1` is always
 * `None`, meaning it can only be the first shard layout a chain uses.
 */
export type ShardLayoutV0 = z.infer<ReturnType<typeof schemas.ShardLayoutV0Schema>>;

export type ShardLayoutV1 = z.infer<ReturnType<typeof schemas.ShardLayoutV1Schema>>;

/**
 * Counterpart to `ShardLayoutV2` composed of maps with string keys to aid
 * serde serialization.
 */
export type ShardLayoutV2 = z.infer<ReturnType<typeof schemas.ShardLayoutV2Schema>>;

/**
 * `ShardUId` is a unique representation for shards from different shard
 * layouts. Comparing to `ShardId`, which is just an ordinal number ranging
 * from 0 to NUM_SHARDS-1, `ShardUId` provides a way to unique identify shards
 * when shard layouts may change across epochs. This is important because we
 * store states indexed by shards in our database, so we need a way to unique
 * identify shard even when shards change across epochs. Another difference
 * between `ShardUId` and `ShardId` is that `ShardUId` should only exist in a
 * node's internal state while `ShardId` can be exposed to outside APIs and
 * used in protocol level information (for example, `ShardChunkHeader`
 * contains `ShardId` instead of `ShardUId`)
 */
export type ShardUId = z.infer<ReturnType<typeof schemas.ShardUIdSchema>>;

export type Signature = z.infer<ReturnType<typeof schemas.SignatureSchema>>;

export type SignedDelegateAction = z.infer<ReturnType<typeof schemas.SignedDelegateActionSchema>>;

export type SignedTransaction = z.infer<ReturnType<typeof schemas.SignedTransactionSchema>>;

export type SignedTransactionView = z.infer<ReturnType<typeof schemas.SignedTransactionViewSchema>>;

export type SlashedValidator = z.infer<ReturnType<typeof schemas.SlashedValidatorSchema>>;

/** An action which stakes signer_id tokens and setup's validator public key */
export type StakeAction = z.infer<ReturnType<typeof schemas.StakeActionSchema>>;

/** See crate::types::StateChangeCause for details. */
export type StateChangeCauseView = z.infer<ReturnType<typeof schemas.StateChangeCauseViewSchema>>;

/**
 * It is a [serializable view] of [`StateChangeKind`]. [serializable view]:
 * ./index.html [`StateChangeKind`]: ../types/struct.StateChangeKind.html
 */
export type StateChangeKindView = z.infer<ReturnType<typeof schemas.StateChangeKindViewSchema>>;

export type StateChangeWithCauseView = z.infer<ReturnType<typeof schemas.StateChangeWithCauseViewSchema>>;

/**
 * Item of the state, key and value are serialized in base64 and proof for
 * inclusion of given state item.
 */
export type StateItem = z.infer<ReturnType<typeof schemas.StateItemSchema>>;

export type StateSyncConfig = z.infer<ReturnType<typeof schemas.StateSyncConfigSchema>>;

export type StatusSyncInfo = z.infer<ReturnType<typeof schemas.StatusSyncInfoSchema>>;

/**
 * Errors which may occur during working with trie storages, storing trie
 * values (trie nodes and state values) by their hashes.
 */
export type StorageError = z.infer<ReturnType<typeof schemas.StorageErrorSchema>>;

/**
 * This enum represents if a storage_get call will be performed through flat
 * storage or trie
 */
export type StorageGetMode = z.infer<ReturnType<typeof schemas.StorageGetModeSchema>>;

/** Describes cost of storage per block */
export type StorageUsageConfigView = z.infer<ReturnType<typeof schemas.StorageUsageConfigViewSchema>>;

/**
 * This type is used to mark keys (arrays of bytes) that are queried from
 * store. NOTE: Currently, this type is only used in the view_client and RPC
 * to be able to transparently pretty-serialize the bytes arrays as
 * base64-encoded strings (see `serialize.rs`).
 */
export type StoreKey = z.infer<ReturnType<typeof schemas.StoreKeySchema>>;

/**
 * This type is used to mark values returned from store (arrays of bytes).
 * NOTE: Currently, this type is only used in the view_client and RPC to be
 * able to transparently pretty-serialize the bytes arrays as base64-encoded
 * strings (see `serialize.rs`).
 */
export type StoreValue = z.infer<ReturnType<typeof schemas.StoreValueSchema>>;

export type SyncCheckpoint = z.infer<ReturnType<typeof schemas.SyncCheckpointSchema>>;

export type SyncConcurrency = z.infer<ReturnType<typeof schemas.SyncConcurrencySchema>>;

/** Configures how to fetch state parts during state sync. */
export type SyncConfig = z.infer<ReturnType<typeof schemas.SyncConfigSchema>>;

export type Tier1ProxyView = z.infer<ReturnType<typeof schemas.Tier1ProxyViewSchema>>;

/**
 * Describes the expected behavior of the node regarding shard tracking. If
 * the node is an active validator, it will also track the shards it is
 * responsible for as a validator.
 */
export type TrackedShardsConfig = z.infer<ReturnType<typeof schemas.TrackedShardsConfigSchema>>;

export type TransferAction = z.infer<ReturnType<typeof schemas.TransferActionSchema>>;

/** Error returned in the ExecutionOutcome in case of failure */
export type TxExecutionError = z.infer<ReturnType<typeof schemas.TxExecutionErrorSchema>>;

export type TxExecutionStatus = z.infer<ReturnType<typeof schemas.TxExecutionStatusSchema>>;

/** Use global contract action */
export type UseGlobalContractAction = z.infer<ReturnType<typeof schemas.UseGlobalContractActionSchema>>;

export type VMConfigView = z.infer<ReturnType<typeof schemas.VMConfigViewSchema>>;

export type VMKind = z.infer<ReturnType<typeof schemas.VMKindSchema>>;

export type ValidatorInfo = z.infer<ReturnType<typeof schemas.ValidatorInfoSchema>>;

/** Reasons for removing a validator from the validator set. */
export type ValidatorKickoutReason = z.infer<ReturnType<typeof schemas.ValidatorKickoutReasonSchema>>;

export type ValidatorKickoutView = z.infer<ReturnType<typeof schemas.ValidatorKickoutViewSchema>>;

export type ValidatorStakeView = z.infer<ReturnType<typeof schemas.ValidatorStakeViewSchema>>;

export type ValidatorStakeViewV1 = z.infer<ReturnType<typeof schemas.ValidatorStakeViewV1Schema>>;

/** Data structure for semver version and github tag or commit. */
export type Version = z.infer<ReturnType<typeof schemas.VersionSchema>>;

/** Resulting state values for a view state query request */
export type ViewStateResult = z.infer<ReturnType<typeof schemas.ViewStateResultSchema>>;

/** A kind of a trap happened during execution of a binary */
export type WasmTrap = z.infer<ReturnType<typeof schemas.WasmTrapSchema>>;

/** Configuration specific to ChunkStateWitness. */
export type WitnessConfigView = z.infer<ReturnType<typeof schemas.WitnessConfigViewSchema>>;

// Method-specific types
export type EXPERIMENTALChangesRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALChangesRequestSchema>>;

export type EXPERIMENTALChangesResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALChangesResponseSchema>>;

export type EXPERIMENTALChangesInBlockRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALChangesInBlockRequestSchema>>;

export type EXPERIMENTALChangesInBlockResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALChangesInBlockResponseSchema>>;

export type EXPERIMENTALCongestionLevelRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALCongestionLevelRequestSchema>>;

export type EXPERIMENTALCongestionLevelResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALCongestionLevelResponseSchema>>;

export type EXPERIMENTALGenesisConfigRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALGenesisConfigRequestSchema>>;

export type EXPERIMENTALGenesisConfigResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALGenesisConfigResponseSchema>>;

export type EXPERIMENTALLightClientBlockProofRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALLightClientBlockProofRequestSchema>>;

export type EXPERIMENTALLightClientBlockProofResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALLightClientBlockProofResponseSchema>>;

export type EXPERIMENTALLightClientProofRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALLightClientProofRequestSchema>>;

export type EXPERIMENTALLightClientProofResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALLightClientProofResponseSchema>>;

export type EXPERIMENTALMaintenanceWindowsRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALMaintenanceWindowsRequestSchema>>;

export type EXPERIMENTALMaintenanceWindowsResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALMaintenanceWindowsResponseSchema>>;

export type EXPERIMENTALProtocolConfigRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALProtocolConfigRequestSchema>>;

export type EXPERIMENTALProtocolConfigResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALProtocolConfigResponseSchema>>;

export type EXPERIMENTALReceiptRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALReceiptRequestSchema>>;

export type EXPERIMENTALReceiptResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALReceiptResponseSchema>>;

export type EXPERIMENTALSplitStorageInfoRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALSplitStorageInfoRequestSchema>>;

export type EXPERIMENTALSplitStorageInfoResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALSplitStorageInfoResponseSchema>>;

export type EXPERIMENTALTxStatusRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALTxStatusRequestSchema>>;

export type EXPERIMENTALTxStatusResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALTxStatusResponseSchema>>;

export type EXPERIMENTALValidatorsOrderedRequest = z.infer<ReturnType<typeof schemas.EXPERIMENTALValidatorsOrderedRequestSchema>>;

export type EXPERIMENTALValidatorsOrderedResponse = z.infer<ReturnType<typeof schemas.EXPERIMENTALValidatorsOrderedResponseSchema>>;

export type BlockRequest = z.infer<ReturnType<typeof schemas.BlockRequestSchema>>;

export type BlockResponse = z.infer<ReturnType<typeof schemas.BlockResponseSchema>>;

export type BlockEffectsRequest = z.infer<ReturnType<typeof schemas.BlockEffectsRequestSchema>>;

export type BlockEffectsResponse = z.infer<ReturnType<typeof schemas.BlockEffectsResponseSchema>>;

export type BroadcastTxAsyncRequest = z.infer<ReturnType<typeof schemas.BroadcastTxAsyncRequestSchema>>;

export type BroadcastTxAsyncResponse = z.infer<ReturnType<typeof schemas.BroadcastTxAsyncResponseSchema>>;

export type BroadcastTxCommitRequest = z.infer<ReturnType<typeof schemas.BroadcastTxCommitRequestSchema>>;

export type BroadcastTxCommitResponse = z.infer<ReturnType<typeof schemas.BroadcastTxCommitResponseSchema>>;

export type ChangesRequest = z.infer<ReturnType<typeof schemas.ChangesRequestSchema>>;

export type ChangesResponse = z.infer<ReturnType<typeof schemas.ChangesResponseSchema>>;

export type ChunkRequest = z.infer<ReturnType<typeof schemas.ChunkRequestSchema>>;

export type ChunkResponse = z.infer<ReturnType<typeof schemas.ChunkResponseSchema>>;

export type ClientConfigRequest = z.infer<ReturnType<typeof schemas.ClientConfigRequestSchema>>;

export type ClientConfigResponse = z.infer<ReturnType<typeof schemas.ClientConfigResponseSchema>>;

export type GasPriceRequest = z.infer<ReturnType<typeof schemas.GasPriceRequestSchema>>;

export type GasPriceResponse = z.infer<ReturnType<typeof schemas.GasPriceResponseSchema>>;

export type GenesisConfigResponse = z.infer<ReturnType<typeof schemas.GenesisConfigResponseSchema>>;

export type HealthRequest = z.infer<ReturnType<typeof schemas.HealthRequestSchema>>;

export type HealthResponse = z.infer<ReturnType<typeof schemas.HealthResponseSchema>>;

export type LightClientProofRequest = z.infer<ReturnType<typeof schemas.LightClientProofRequestSchema>>;

export type LightClientProofResponse = z.infer<ReturnType<typeof schemas.LightClientProofResponseSchema>>;

export type MaintenanceWindowsRequest = z.infer<ReturnType<typeof schemas.MaintenanceWindowsRequestSchema>>;

export type MaintenanceWindowsResponse = z.infer<ReturnType<typeof schemas.MaintenanceWindowsResponseSchema>>;

export type NetworkInfoRequest = z.infer<ReturnType<typeof schemas.NetworkInfoRequestSchema>>;

export type NetworkInfoResponse = z.infer<ReturnType<typeof schemas.NetworkInfoResponseSchema>>;

export type NextLightClientBlockRequest = z.infer<ReturnType<typeof schemas.NextLightClientBlockRequestSchema>>;

export type NextLightClientBlockResponse = z.infer<ReturnType<typeof schemas.NextLightClientBlockResponseSchema>>;

export type QueryRequest = z.infer<ReturnType<typeof schemas.QueryRequestSchema>>;

export type QueryResponse = z.infer<ReturnType<typeof schemas.QueryResponseSchema>>;

export type SendTxRequest = z.infer<ReturnType<typeof schemas.SendTxRequestSchema>>;

export type SendTxResponse = z.infer<ReturnType<typeof schemas.SendTxResponseSchema>>;

export type StatusRequest = z.infer<ReturnType<typeof schemas.StatusRequestSchema>>;

export type StatusResponse = z.infer<ReturnType<typeof schemas.StatusResponseSchema>>;

export type TxRequest = z.infer<ReturnType<typeof schemas.TxRequestSchema>>;

export type TxResponse = z.infer<ReturnType<typeof schemas.TxResponseSchema>>;

export type ValidatorsRequest = z.infer<ReturnType<typeof schemas.ValidatorsRequestSchema>>;

export type ValidatorsResponse = z.infer<ReturnType<typeof schemas.ValidatorsResponseSchema>>;

// Re-exports for convenience
export * from './schemas';
