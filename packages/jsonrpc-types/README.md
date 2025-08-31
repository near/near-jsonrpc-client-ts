# `@near-js/jsonrpc-types`

This package contains TypeScript types and Zod schemas for the NEAR Protocol JSON-RPC API, auto-generated from the official NEAR OpenAPI specification.

## Installation

```bash
npm install @near-js/jsonrpc-types
```

## Usage

### Basic Type Imports

Import TypeScript types for type safety in your NEAR applications:

```typescript
import type { 
  AccountView, 
  AccessKeyView, 
  RpcQueryRequest
} from '@near-js/jsonrpc-types';

// Use the types for type-safe NEAR development
const account: AccountView = {
  amount: "1000000000000000000000000",
  locked: "0",
  codeHash: "11111111111111111111111111111111",
  storageUsage: 182,
  storagePaidAt: 0
};

const accessKey: AccessKeyView = {
  nonce: 1,
  permission: "FullAccess"
};
```

### Zod Schema Validation

Every type has a corresponding Zod schema for runtime validation:

```typescript
import { 
  AccountViewSchema,
  AccessKeyViewSchema,
  RpcQueryRequestSchema 
} from '@near-js/jsonrpc-types';

// Validate data at runtime
const accountData = {
  amount: "1000000000000000000000000",
  locked: "0",
  codeHash: "11111111111111111111111111111111",
  storageUsage: 182,
  storagePaidAt: 0
};

const validated = AccountViewSchema().parse(accountData);
console.log('Valid account data:', validated);
```

### RPC Request Types

Build type-safe RPC requests:

```typescript
import type { RpcQueryRequest } from '@near-js/jsonrpc-types';
import { RpcQueryRequestSchema } from '@near-js/jsonrpc-types';

// Create a type-safe query request
const queryRequest: RpcQueryRequest = {
  requestType: "view_account",
  finality: "final",
  accountId: "example.near"
};

// Validate before sending
const validated = RpcQueryRequestSchema().parse(queryRequest);
```

## Features

- **TypeScript Types**: Full type definitions for all NEAR RPC methods and responses
- **Zod Schemas**: Runtime validation schemas for all types
- **Auto-generated**: All types and schemas are automatically generated from the official NEAR OpenAPI specification
- **Type Safety**: Ensure your NEAR applications are type-safe at compile time and runtime
- **Complete Coverage**: Includes all RPC methods, request types, and response types

## API Documentation

For detailed documentation on NEAR RPC methods and their parameters, see the [NEAR RPC API documentation](https://docs.near.org/api/rpc/introduction).

## License

This package is part of the NEAR JavaScript SDK and is distributed under the MIT license.