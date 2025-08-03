# NEAR RPC Client Examples

This directory contains examples demonstrating how to use the `@near-js/jsonrpc-client` library in different environments and with different variants.

## 📦 Client Architecture

The library uses a static function architecture for optimal tree-shaking:

### Default Client

- **Bundle size:** Optimized with tree-shaking
- **Import:** `import { NearRpcClient, status, block } from '@near-js/jsonrpc-client'`
- **Architecture:** Static functions with client-based configuration
- **Best for:** All applications requiring minimal bundle size

The client provides identical functionality to traditional instance methods but with better tree-shaking optimization.

## 🚀 Examples

### TypeScript Examples

- **[typescript/mini-client-usage.ts](typescript/mini-client-usage.ts)** - Mini client variant with static functions and tree-shaking
- **[typescript/basic-usage.ts](typescript/basic-usage.ts)** - Basic client usage patterns
- **[typescript/get-latest-block.ts](typescript/get-latest-block.ts)** - Block querying examples
- **[typescript/status-and-account-demo.ts](typescript/status-and-account-demo.ts)** - Network status and account viewing
- **[typescript/call-contract-method.ts](typescript/call-contract-method.ts)** - Contract method calls
- **[typescript/call-contract-method-view-function.ts](typescript/call-contract-method-view-function.ts)** - View function calls
- **[typescript/send-function-call-transaction.ts](typescript/send-function-call-transaction.ts)** - Complete example of signing and sending a real transaction on testnet

### JavaScript Examples

- **[javascript-esm/](javascript-esm/)** - ES6 module examples
- **[javascript-cjs/](javascript-cjs/)** - CommonJS examples

### React Examples

- **[react-mini-client/](react-mini-client/)** - Complete React app with mini client and tree-shaking

### Tree-shaking Examples

- **[tree-shaking/](tree-shaking/)** - Rollup-based bundle analysis demonstrating tree-shaking optimization

### Browser Examples

The browser examples are integrated into our test suite to ensure they remain working with every change:

- **[tests/browser/index.html](../tests/browser/index.html)** - Client browser demo
- **[tests/browser/mini.html](../tests/browser/mini.html)** - Alternative client test page

These examples are:

- ✅ Automatically tested with Playwright
- ✅ Always up-to-date with the latest API
- ✅ Interactive with real NEAR testnet calls
- ✅ Include bundle size comparisons

## 🔧 Running Examples

### TypeScript Examples

```bash
# From the repository root:
pnpm install

# Run the mini client example
pnpm tsx examples/typescript/mini-client-usage.ts

# Run other TypeScript examples
pnpm tsx examples/typescript/basic-usage.ts
```

### React Examples

```bash
# From the repository root:
pnpm install

# Navigate to React example
cd examples/react-mini-client

# Development mode
pnpm dev

# Production build
pnpm build && pnpm preview
```

### Browser Examples (without Playwright)

You can run the browser examples directly using the test server:

```bash
# From project root, build the bundles first
pnpm build

# Start the test server
node tests/browser/server.js

# Open in browser
# Client: http://localhost:3000/index.html
# Alternative test: http://localhost:3000/mini.html
```

The test server serves:

- HTML test pages with interactive demos
- All bundle variants (minified, unminified)
- Direct bundle URLs for one-liner testing

### Running Browser Tests with Playwright

```bash
# Run all browser tests (including mini bundle tests)
pnpm test:browser
```

### TypeScript Validation Tests

All examples are automatically tested for TypeScript errors using a language server:

```bash
# From examples directory
cd examples
pnpm test:typescript
```

This test:

- ✅ Validates all TypeScript examples for type errors
- ✅ Uses each project's own tsconfig.json (respects React/Vite settings)
- ✅ Ensures examples remain error-free with every change
- ✅ Runs automatically in CI/CD pipeline

### JavaScript Examples

```bash
# ES6 modules
cd javascript-esm
npm install
node basic-usage.js

# CommonJS
cd javascript-cjs
npm install
node basic-usage.js
```

### Tree-shaking Examples

```bash
# From the repository root:
cd examples/tree-shaking

# Build all bundle variants (regular, minified, with/without validation)
pnpm build:all

# Run the examples
node dist/bundle.js                     # Without validation
node dist/bundle-with-validation.js     # With Zod validation

# Check bundle sizes
ls -lh dist/
```

The tree-shaking example demonstrates:

- **Bundle size optimization**: 4.9KB → 2.2KB (55% reduction) when minified
- **Validation impact**: 42KB with validation → 19KB minified (selective Zod schema inclusion)
- **Function-level tree-shaking**: Only schemas for imported functions are included
- **Parameter validation**: Using `block()` and `viewAccount()` with proper type checking

## 💡 Bundle Size Comparison

| Variant                    | Size (Unminified) | Size (Minified) | Use Case                           |
| -------------------------- | ----------------- | --------------- | ---------------------------------- |
| Client (no validation)     | 4.9KB             | 2.2KB           | Production web apps                |
| Client (with validation)   | 42KB              | 19KB            | Production with runtime validation |
| React app (complete)       | ~195KB            | ~61KB gzipped   | Full React application             |

**Key insights:**

- **55% size reduction** with minification
- **Function-level tree-shaking**: Only imported schemas included
- **Validation optional**: Add Zod validation when needed
- **React-ready**: Excellent performance in modern web frameworks

## 🌐 Browser Usage Patterns

### One-liner Import (CDN)

```javascript
const { NearRpcClient, status } = await import(
  'https://unpkg.com/@near-js/jsonrpc-client/dist/browser-standalone.min.js'
);
const client = new NearRpcClient({
  endpoint: 'https://rpc.testnet.fastnear.com',
});
const result = await status(client);
```

### Local Bundle

```javascript
// After building the project
const { NearRpcClient, status } = await import(
  './node_modules/@near-js/jsonrpc-client/dist/browser-standalone.min.js'
);
const client = new NearRpcClient({
  endpoint: 'https://rpc.testnet.fastnear.com',
});
```

### Module Bundler (Webpack, Vite, etc.)

```javascript
import { NearRpcClient, status, block } from '@near-js/jsonrpc-client';
const client = new NearRpcClient({
  endpoint: 'https://rpc.testnet.fastnear.com',
});
const statusResult = await status(client);
```

## 🔗 Available RPC Endpoints

- **Mainnet:** `https://rpc.mainnet.fastnear.com`
- **Testnet:** `https://rpc.testnet.fastnear.com`

## 📚 API Documentation

### Static Functions

```javascript
import { NearRpcClient, status, block, viewAccount, viewFunction, viewAccessKey } from '@near-js/jsonrpc-client';
const client = new NearRpcClient({ endpoint: 'https://rpc.testnet.fastnear.com' });

- `status(client)` - Network status
- `block(client, params)` - Block information
- `viewAccount(client, params)` - Account details
- `viewFunction(client, params)` - Call view functions
- `viewAccessKey(client, params)` - View access key details
- `gasPrice(client, params)` - Current gas price
- `query(client, params)` - Generic queries
- `sendTx(client, params)` - Send transactions
- `broadcastTxAsync(client, params)` - Send transaction async (returns hash immediately)
- `broadcastTxCommit(client, params)` - Send transaction and wait for execution
- `tx(client, params)` - Get transaction status
```

The client provides full functionality with case conversion behavior for optimal developer experience.

For complete API documentation, see the main README in the project root.
