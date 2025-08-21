# NEAR Protocol TypeScript RPC Client

[![CI](https://github.com/near/near-jsonrpc-client-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/near/near-jsonrpc-client-ts/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/near/near-jsonrpc-client-ts/branch/main/graph/badge.svg)](https://codecov.io/gh/near/near-jsonrpc-client-ts)

An automated, type-safe TypeScript client for NEAR Protocol's JSON-RPC API, generated from the official OpenAPI specification.

## 📦 Packages

This monorepo contains two packages:

- **[@near-js/jsonrpc-types](./packages/jsonrpc-types)** - Pure TypeScript types and Zod schemas
- **[@near-js/jsonrpc-client](./packages/jsonrpc-client)** - Full-featured RPC client implementation

## 🚀 Quick Start

### Installation

```bash
npm install @near-js/jsonrpc-client
```

### Node.js (Vanilla)

```javascript
import { NearRpcClient, block } from '@near-js/jsonrpc-client';

const client = new NearRpcClient({
  endpoint: 'https://rpc.testnet.fastnear.com',
});
const blockResult = await block(client, { finality: 'final' });
console.log('Latest block height:', blockResult.header.height);
```

### Bundlers (React, Vue, Angular, etc.)

```typescript
import { NearRpcClient, block, viewAccount } from '@near-js/jsonrpc-client';

const client = new NearRpcClient({
  endpoint: 'https://rpc.mainnet.near.org',
});

// Fully typed method calls
const blockResult = await block(client, { finality: 'final' });
const account = await viewAccount(client, {
  accountId: 'example.near',
  finality: 'final',
});
```

### Browser (Vanilla HTML)

```html
<script type="module">
  const { NearRpcClient, block } = await import(
    'https://unpkg.com/@near-js/jsonrpc-client@latest/dist/browser-standalone.min.js'
  );
  const client = new NearRpcClient({
    endpoint: 'https://rpc.mainnet.near.org',
  });
  const blockResult = await block(client, { finality: 'final' });
  console.log('Latest block height:', blockResult.header.height);
</script>
```

### Browser Console (One-liner)

Paste this directly into any browser's developer console on any webpage:

```javascript
const { NearRpcClient, block } = await import(
  'https://unpkg.com/@near-js/jsonrpc-client@latest/dist/browser-standalone.min.js'
);
const client = new NearRpcClient({ endpoint: 'https://rpc.mainnet.near.org' });
const blockResult = await block(client, { finality: 'final' });
console.log('Latest block height:', blockResult.header.height);
```

## ✨ Features

- **🔧 Auto-generated** from NEAR's official OpenAPI specification
- **📝 Fully typed** with TypeScript strict mode
- **✅ Runtime validation** with Zod schemas
- **🔄 Automatic updates** via GitHub Actions
- **🌳 Tree-shakable** for optimal bundle size
- **🚀 Modern** fetch-based HTTP client
- **🌐 Browser compatible** with standalone bundle
- **📦 CDN ready** for instant usage anywhere
- **🧪 Well tested** with 80%+ coverage

## 🏗️ Development

This project uses pnpm workspaces and requires Node.js 20+.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Generate types from OpenAPI spec
pnpm generate
```

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run tests for the entire project or for individual packages.

### Running All Tests

To run all tests for both packages, use the following command from the root of the project:

```bash
# Run all tests in watch mode
pnpm -r test:watch

# Run all tests once (avoiding watch mode)
pnpm test
```

_Note: The root `pnpm test` command is an alias for `pnpm -r test`._

### Running Tests for a Specific Package

To run tests for a specific package, use the `--filter` flag with the package name:

```bash
# Run tests for the types package once
pnpm --filter @near-js/jsonrpc-types test

# Run tests for the client package in watch mode
pnpm --filter @near-js/jsonrpc-client test:watch
```

### Coverage

To generate a coverage report, add the `--coverage` flag to the test command:

```bash
# Generate coverage for all packages
pnpm -r test:coverage

# Generate coverage for a specific package
pnpm --filter @near-js/jsonrpc-client test:coverage
```

## 🤖 Automation

The project includes GitHub Actions workflows for:

- **CI/CD**: Testing, linting, and building on every PR
- **Auto-updates**: Daily checks for OpenAPI spec changes
- **Coverage**: Automated test coverage reporting

## 📄 License

MIT - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

---

This is an open source implementation being developed as a proposal for the [NEAR DevHub bounty](https://nearn.io/devhub/13/).
