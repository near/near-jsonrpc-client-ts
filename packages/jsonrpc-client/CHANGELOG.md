# Changelog

## [1.3.1](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v1.3.0...jsonrpc-client-v1.3.1) (2025-08-03)


### Bug Fixes

* enforce coverage thresholds and improve test coverage to meet requirements ([#60](https://github.com/petersalomonsen/near-rpc-typescript/issues/60)) ([edf6459](https://github.com/petersalomonsen/near-rpc-typescript/commit/edf64597d9da0702b48d8664abf97b243e38e0e2))

## [1.3.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v1.2.0...jsonrpc-client-v1.3.0) (2025-08-03)


### Features

* add JSDoc descriptions from OpenAPI spec to generated code ([#58](https://github.com/petersalomonsen/near-rpc-typescript/issues/58)) ([ce2409f](https://github.com/petersalomonsen/near-rpc-typescript/commit/ce2409f0b8dce71193a0be0a33bb7decd80d7467))

## [1.2.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v1.1.0...jsonrpc-client-v1.2.0) (2025-07-31)


### Features

* add JSON parsing utilities and improve tree-shaking (fixes [#39](https://github.com/petersalomonsen/near-rpc-typescript/issues/39)) ([#54](https://github.com/petersalomonsen/near-rpc-typescript/issues/54)) ([a75669d](https://github.com/petersalomonsen/near-rpc-typescript/commit/a75669d8752b499c20ca6a1acb71c84df9c5c6da))

## [1.1.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v1.0.4...jsonrpc-client-v1.1.0) (2025-07-30)


### Features

* update generated code from OpenAPI spec ([#42](https://github.com/petersalomonsen/near-rpc-typescript/issues/42)) ([4e77e67](https://github.com/petersalomonsen/near-rpc-typescript/commit/4e77e67591411f8b1cf5ae191e580dd378e53b97))

## [1.0.4](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v1.0.3...jsonrpc-client-v1.0.4) (2025-07-30)


### Bug Fixes

* handle non-standard error responses in RPC results ([#49](https://github.com/petersalomonsen/near-rpc-typescript/issues/49)) ([fc1a943](https://github.com/petersalomonsen/near-rpc-typescript/commit/fc1a9430c72c9b2d2908c3a48f351953587fb010))

## [1.0.3](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v1.0.2...jsonrpc-client-v1.0.3) (2025-07-30)


### Bug Fixes

* enable validation to work with convenience helpers and nullable fields ([#45](https://github.com/petersalomonsen/near-rpc-typescript/issues/45)) ([41b26fd](https://github.com/petersalomonsen/near-rpc-typescript/commit/41b26fdfeee1be69a5596ecfb5298b15863acd74))

## [1.0.2](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v1.0.1...jsonrpc-client-v1.0.2) (2025-07-28)


### Bug Fixes

* parse JSON-RPC error responses for non-2xx HTTP status codes ([#43](https://github.com/petersalomonsen/near-rpc-typescript/issues/43)) ([42e9211](https://github.com/petersalomonsen/near-rpc-typescript/commit/42e9211466bde6da8037a98e37591b173adaa93e))

## [1.0.1](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v1.0.0...jsonrpc-client-v1.0.1) (2025-07-27)


### Bug Fixes

* correct dependency versions and improve documentation ([83ddde8](https://github.com/petersalomonsen/near-rpc-typescript/commit/83ddde8c5bbb839e9fcdc43db3ba589d1dadf4a7))

## [1.0.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v0.5.0...jsonrpc-client-v1.0.0) (2025-07-26)


### ⚠ BREAKING CHANGES

* Client now uses static functions instead of instance methods. Instead of client.block(), use block(client, params).

### Features

* make mini client the default implementation ([#32](https://github.com/petersalomonsen/near-rpc-typescript/issues/32)) ([5afbf92](https://github.com/petersalomonsen/near-rpc-typescript/commit/5afbf92249f93f52fa456882539cb7fadd8c93d2))

## [0.5.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v0.4.0...jsonrpc-client-v0.5.0) (2025-07-25)


### Features

* add TypeScript Language Server testing for IntelliSense validation ([#30](https://github.com/petersalomonsen/near-rpc-typescript/issues/30)) ([30276d7](https://github.com/petersalomonsen/near-rpc-typescript/commit/30276d7be9028c7eb62d2dbd41e483897474f2c8))
* implement mini client with tree-shaking optimization and comprehensive examples ([#31](https://github.com/petersalomonsen/near-rpc-typescript/issues/31)) ([7d7b16d](https://github.com/petersalomonsen/near-rpc-typescript/commit/7d7b16d429b3174d5831f5d27ac3c59b56370b03))

## [0.4.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v0.3.0...jsonrpc-client-v0.4.0) (2025-07-21)

### Features

- implement dynamic RPC client with proper TypeScript types ([#25](https://github.com/petersalomonsen/near-rpc-typescript/issues/25)) ([e0c2094](https://github.com/petersalomonsen/near-rpc-typescript/commit/e0c2094640646b2586c584a5e787322eac175d92))

## [0.3.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v0.2.0...jsonrpc-client-v0.3.0) (2025-07-21)

### Features

- implement dynamic PATH_TO_METHOD_MAP extraction ([#17](https://github.com/petersalomonsen/near-rpc-typescript/issues/17)) ([532c1de](https://github.com/petersalomonsen/near-rpc-typescript/commit/532c1de3fa26ffcbcb1366a7927ccc926a50e780))

### Bug Fixes

- resolve flaky performance test that fails on negative validation overhead ([#19](https://github.com/petersalomonsen/near-rpc-typescript/issues/19)) ([05dbec5](https://github.com/petersalomonsen/near-rpc-typescript/commit/05dbec5880f309b455849fd4154d8c9bf41aa5f0))

## [0.2.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v0.1.0...jsonrpc-client-v0.2.0) (2025-07-20)

### Features

- add browser support with Playwright tests and temporary [@psalomo](https://github.com/psalomo) publishing ([#14](https://github.com/petersalomonsen/near-rpc-typescript/issues/14)) ([6abd7bb](https://github.com/petersalomonsen/near-rpc-typescript/commit/6abd7bb01b75f431cb3eeaa48aced2f6e7658a34))
- add comprehensive Zod validation performance tests ([#12](https://github.com/petersalomonsen/near-rpc-typescript/issues/12)) ([a978102](https://github.com/petersalomonsen/near-rpc-typescript/commit/a978102aa2cd4fcd81b020df0d153363f04d794b))

## [0.1.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-client-v0.0.1...jsonrpc-client-v0.1.0) (2025-07-17)

### Features

- configure GitHub release tarball distribution for [@near-js](https://github.com/near-js) packages ([#9](https://github.com/petersalomonsen/near-rpc-typescript/issues/9)) ([36d6393](https://github.com/petersalomonsen/near-rpc-typescript/commit/36d6393c10ccf95ad85fe91ae84354f01e42df93))
- test release-please after enabling PR permissions ([ece29ad](https://github.com/petersalomonsen/near-rpc-typescript/commit/ece29addf43df8a07c13accbffc2097a8f3264cf))
- **testing:** implement comprehensive testing and coverage ([28c2479](https://github.com/petersalomonsen/near-rpc-typescript/commit/28c24799bcbd0992bae837dd82ee6cf0937083a3))

### Bug Fixes

- improve CI workflow order and add lint step to scheduled generation ([be575da](https://github.com/petersalomonsen/near-rpc-typescript/commit/be575da692510bbdd414248b54ce639a4451486d))
