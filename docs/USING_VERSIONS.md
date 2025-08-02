# Using Version-Specific Exports

The NEAR RPC TypeScript client provides version-specific exports to ensure compatibility with different NEAR node versions.

## Available Versions

- `@near-js/jsonrpc-client` - Latest version (default)
- `@near-js/jsonrpc-client/latest` - Explicitly use latest
- `@near-js/jsonrpc-client/v1.1.1` - Stable version 1.1.1
- `@near-js/jsonrpc-client/v1.1.0` - Version 1.1.0
- `@near-js/jsonrpc-client/v1.0.0` - Version 1.0.0

Each version also has a no-validation variant:
- `@near-js/jsonrpc-client/v1.1.1/no-validation` - Without runtime validation

## When to Use Specific Versions

### Use Latest (Default)
```typescript
import { NearRpcClient, status } from '@near-js/jsonrpc-client';
```
- When connecting to mainnet or testnet RPC endpoints
- When you want the latest features
- When you control the RPC node version

### Use Specific Version
```typescript
import { NearRpcClient, status } from '@near-js/jsonrpc-client/v1.1.0';
```
- When your RPC provider runs a specific NEAR node version
- When you need compatibility with older nodes
- When you want to ensure consistent behavior

### Use No-Validation
```typescript
import { NearRpcClient, status } from '@near-js/jsonrpc-client/v1.1.1/no-validation';
```
- When bundle size is critical (e.g., browser apps)
- When you trust the RPC provider's responses
- When you handle validation separately

## Examples

### Basic Usage with Specific Version
```typescript
import { NearRpcClient, block, changes } from '@near-js/jsonrpc-client/v1.1.0';

const client = new NearRpcClient({
  url: 'https://rpc.testnet.fastnear.com'
});

// Use methods available in v1.1.0
const latestBlock = await block(client, { finality: 'final' });
const changes = await changes(client, {
  blockId: 'final',
  changesType: 'all_access_key_changes',
  accountIds: ['example.testnet']
});
```

### Type Imports from Specific Version
```typescript
import type { 
  RpcQueryRequest,
  BlockReference 
} from '@near-js/jsonrpc-types/v1.1.0';

const request: RpcQueryRequest = {
  finality: 'final',
  requestType: 'view_account',
  accountId: 'example.testnet'
};
```

### Dynamic Version Selection
```typescript
// Check node version first
import { NearRpcClient, status } from '@near-js/jsonrpc-client';

const client = new NearRpcClient({ url: 'https://rpc.mainnet.near.org' });
const nodeInfo = await status(client);
const nodeVersion = nodeInfo.version.version;

// Import appropriate version
if (nodeVersion.startsWith('1.0')) {
  const { query } = await import('@near-js/jsonrpc-client/v1.0.0');
  // Use v1.0.0 compatible methods
} else {
  const { query } = await import('@near-js/jsonrpc-client/latest');
  // Use latest methods
}
```

## Version Differences

### v1.0.0
- Basic RPC methods
- No `changes` or `EXPERIMENTAL_changes` distinction

### v1.1.0  
- Added `changes` method (stabilized)
- Added `client_config` method
- Various EXPERIMENTAL methods

### v1.1.1
- Stabilized more methods:
  - `genesis_config` (was EXPERIMENTAL)
  - `maintenance_windows` (was EXPERIMENTAL)
  - `block_effects` endpoint

### latest
- Always tracks the latest OpenAPI spec from NEAR Protocol
- May include unreleased features
- Best for development and testing

## Best Practices

1. **Production Apps**: Use a specific stable version (e.g., `v1.1.1`)
2. **Development**: Use `latest` to access new features
3. **Multi-Provider Apps**: Detect version and load appropriate client
4. **Browser Apps**: Consider no-validation variants for smaller bundles
5. **Type Safety**: Import types from the same version as your client

## Migration Guide

When upgrading versions:

```typescript
// Before (v1.0.0)
import { NearRpcClient, EXPERIMENTAL_changes } from '@near-js/jsonrpc-client/v1.0.0';

// After (v1.1.1) 
import { NearRpcClient, changes } from '@near-js/jsonrpc-client/v1.1.1';
// Note: Method was stabilized and renamed
```

Check the specific version's available methods in the generated TypeScript definitions.