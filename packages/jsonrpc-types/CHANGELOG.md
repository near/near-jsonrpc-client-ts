# Changelog

## [1.6.0](https://github.com/near/near-jsonrpc-client-ts/compare/jsonrpc-types-v1.5.0...jsonrpc-types-v1.6.0) (2025-12-24)


### Features

* Added experimental flat query methods (e.g. experimentalCallFunction) ([#90](https://github.com/near/near-jsonrpc-client-ts/issues/90)) ([9605faa](https://github.com/near/near-jsonrpc-client-ts/commit/9605faa1bec3b336fc0f30f3ae03bdc95fd5c27c))


### Bug Fixes

* enforce JSON-RPC 2.0 spec - exactly one of result or error required ([#93](https://github.com/near/near-jsonrpc-client-ts/issues/93)) ([f5a5389](https://github.com/near/near-jsonrpc-client-ts/commit/f5a5389130e5befa406ca44eab481981ffb8c440))

## [1.5.0](https://github.com/near/near-jsonrpc-client-ts/compare/jsonrpc-types-v1.4.0...jsonrpc-types-v1.5.0) (2025-11-25)


### Features

* update generated code from OpenAPI spec ([#85](https://github.com/near/near-jsonrpc-client-ts/issues/85)) ([1033e61](https://github.com/near/near-jsonrpc-client-ts/commit/1033e61c988ae9d75743364093dae7d04b33270c))
* update generated code from OpenAPI spec ([#88](https://github.com/near/near-jsonrpc-client-ts/issues/88)) ([3345cd5](https://github.com/near/near-jsonrpc-client-ts/commit/3345cd533ef36ab8b229159cc38287bb08f9e680))

## [1.4.0](https://github.com/near/near-jsonrpc-client-ts/compare/jsonrpc-types-v1.3.4...jsonrpc-types-v1.4.0) (2025-09-18)


### Features

* update generated code from OpenAPI spec ([#53](https://github.com/near/near-jsonrpc-client-ts/issues/53)) ([8759b07](https://github.com/near/near-jsonrpc-client-ts/commit/8759b0774fad2838833c56625a7e6a5438e758c9))


### Bug Fixes

* make RPC method params required when not nullable in schema ([#84](https://github.com/near/near-jsonrpc-client-ts/issues/84)) ([c4173fb](https://github.com/near/near-jsonrpc-client-ts/commit/c4173fba6094aae5781d4c6749c25ec923cf045c))
* update @near-js/jsonrpc-types README with accurate examples ([#80](https://github.com/near/near-jsonrpc-client-ts/issues/80)) ([4e37549](https://github.com/near/near-jsonrpc-client-ts/commit/4e37549a90ac9e9460a82d1f4c714e52b0db659e))

## [1.3.4](https://github.com/near/near-jsonrpc-client-ts/compare/jsonrpc-types-v1.3.3...jsonrpc-types-v1.3.4) (2025-08-23)


### Bug Fixes

* handle anyOf schemas with additional properties in code generator ([#70](https://github.com/near/near-jsonrpc-client-ts/issues/70)) ([2c99e32](https://github.com/near/near-jsonrpc-client-ts/commit/2c99e3227e3c98dd8ffe11e63d0dc89da3294cd0))
* remove circular dependency in NonDelegateAction schema ([#62](https://github.com/near/near-jsonrpc-client-ts/issues/62)) ([b673db0](https://github.com/near/near-jsonrpc-client-ts/commit/b673db0ae43e0cbf69a0745e4019e512874e8a8c))


### Miscellaneous

* trigger Release Please for v1.3.4 ([#73](https://github.com/near/near-jsonrpc-client-ts/issues/73)) ([871a84b](https://github.com/near/near-jsonrpc-client-ts/commit/871a84b4a0fc9c006b1fa26e61e4f40d57c5d701))

## [1.3.3](https://github.com/near/near-jsonrpc-client-ts/compare/jsonrpc-types-v1.3.2...jsonrpc-types-v1.3.3) (2025-08-21)


### Miscellaneous

* Fixed publishing pipeline

## [1.3.2](https://github.com/near/near-jsonrpc-client-ts/compare/jsonrpc-types-v1.3.1...jsonrpc-types-v1.3.2) (2025-08-21)


### Miscellaneous

* migrate to [@near-js](https://github.com/near-js) scope and update repository URLs ([#63](https://github.com/near/near-jsonrpc-client-ts/issues/63)) ([cf8adf3](https://github.com/near/near-jsonrpc-client-ts/commit/cf8adf32abb1c60ad7295f463777117ef4fc02b8))

## [1.3.1](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v1.3.0...jsonrpc-types-v1.3.1) (2025-08-03)


### Bug Fixes

* enforce coverage thresholds and improve test coverage to meet requirements ([#60](https://github.com/petersalomonsen/near-rpc-typescript/issues/60)) ([edf6459](https://github.com/petersalomonsen/near-rpc-typescript/commit/edf64597d9da0702b48d8664abf97b243e38e0e2))

## [1.3.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v1.2.0...jsonrpc-types-v1.3.0) (2025-08-03)


### Features

* add JSDoc descriptions from OpenAPI spec to generated code ([#58](https://github.com/petersalomonsen/near-rpc-typescript/issues/58)) ([ce2409f](https://github.com/petersalomonsen/near-rpc-typescript/commit/ce2409f0b8dce71193a0be0a33bb7decd80d7467))

## [1.2.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v1.1.0...jsonrpc-types-v1.2.0) (2025-07-31)


### Features

* add JSON parsing utilities and improve tree-shaking (fixes [#39](https://github.com/petersalomonsen/near-rpc-typescript/issues/39)) ([#54](https://github.com/petersalomonsen/near-rpc-typescript/issues/54)) ([a75669d](https://github.com/petersalomonsen/near-rpc-typescript/commit/a75669d8752b499c20ca6a1acb71c84df9c5c6da))

## [1.1.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v1.0.3...jsonrpc-types-v1.1.0) (2025-07-30)


### Features

* update generated code from OpenAPI spec ([#42](https://github.com/petersalomonsen/near-rpc-typescript/issues/42)) ([4e77e67](https://github.com/petersalomonsen/near-rpc-typescript/commit/4e77e67591411f8b1cf5ae191e580dd378e53b97))

## [1.0.3](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v1.0.2...jsonrpc-types-v1.0.3) (2025-07-30)


### Bug Fixes

* enable validation to work with convenience helpers and nullable fields ([#45](https://github.com/petersalomonsen/near-rpc-typescript/issues/45)) ([41b26fd](https://github.com/petersalomonsen/near-rpc-typescript/commit/41b26fdfeee1be69a5596ecfb5298b15863acd74))

## [1.0.2](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v1.0.1...jsonrpc-types-v1.0.2) (2025-07-28)


### Bug Fixes

* parse JSON-RPC error responses for non-2xx HTTP status codes ([#43](https://github.com/petersalomonsen/near-rpc-typescript/issues/43)) ([42e9211](https://github.com/petersalomonsen/near-rpc-typescript/commit/42e9211466bde6da8037a98e37591b173adaa93e))

## [1.0.1](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v1.0.0...jsonrpc-types-v1.0.1) (2025-07-27)


### Bug Fixes

* correct dependency versions and improve documentation ([83ddde8](https://github.com/petersalomonsen/near-rpc-typescript/commit/83ddde8c5bbb839e9fcdc43db3ba589d1dadf4a7))

## [1.0.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v0.5.0...jsonrpc-types-v1.0.0) (2025-07-26)


### ⚠ BREAKING CHANGES

* Client now uses static functions instead of instance methods. Instead of client.block(), use block(client, params).

### Features

* make mini client the default implementation ([#32](https://github.com/petersalomonsen/near-rpc-typescript/issues/32)) ([5afbf92](https://github.com/petersalomonsen/near-rpc-typescript/commit/5afbf92249f93f52fa456882539cb7fadd8c93d2))

## [0.5.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v0.4.0...jsonrpc-types-v0.5.0) (2025-07-25)


### Features

* implement mini client with tree-shaking optimization and comprehensive examples ([#31](https://github.com/petersalomonsen/near-rpc-typescript/issues/31)) ([7d7b16d](https://github.com/petersalomonsen/near-rpc-typescript/commit/7d7b16d429b3174d5831f5d27ac3c59b56370b03))


### Bug Fixes

* resolve module import issues and improve union type handling ([#27](https://github.com/petersalomonsen/near-rpc-typescript/issues/27)) ([027796f](https://github.com/petersalomonsen/near-rpc-typescript/commit/027796fff410e38211c1b1a1b56375bdc6cb8c33))

## [0.4.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v0.3.0...jsonrpc-types-v0.4.0) (2025-07-21)

### Features

- implement dynamic RPC client with proper TypeScript types ([#25](https://github.com/petersalomonsen/near-rpc-typescript/issues/25)) ([e0c2094](https://github.com/petersalomonsen/near-rpc-typescript/commit/e0c2094640646b2586c584a5e787322eac175d92))

## [0.3.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v0.2.0...jsonrpc-types-v0.3.0) (2025-07-21)

### Features

- update generated types from OpenAPI spec ([#24](https://github.com/petersalomonsen/near-rpc-typescript/issues/24)) ([902fa66](https://github.com/petersalomonsen/near-rpc-typescript/commit/902fa66e3bf01c10c8843b88c272b8389021e505))

### Bug Fixes

- configure automated type updates to trigger releases ([#23](https://github.com/petersalomonsen/near-rpc-typescript/issues/23)) ([2f9c9b6](https://github.com/petersalomonsen/near-rpc-typescript/commit/2f9c9b6eaf87c21e71dfc6402afe1c17090cb1d5))

### Miscellaneous

- update generated types from OpenAPI spec ([#22](https://github.com/petersalomonsen/near-rpc-typescript/issues/22)) ([eb5be1f](https://github.com/petersalomonsen/near-rpc-typescript/commit/eb5be1f544d125d4ad094721eba917f0a82d9dfc))

## [0.2.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v0.1.0...jsonrpc-types-v0.2.0) (2025-07-20)

### Features

- add browser support with Playwright tests and temporary [@psalomo](https://github.com/psalomo) publishing ([#14](https://github.com/petersalomonsen/near-rpc-typescript/issues/14)) ([6abd7bb](https://github.com/petersalomonsen/near-rpc-typescript/commit/6abd7bb01b75f431cb3eeaa48aced2f6e7658a34))

## [0.1.0](https://github.com/petersalomonsen/near-rpc-typescript/compare/jsonrpc-types-v0.0.1...jsonrpc-types-v0.1.0) (2025-07-17)

### Features

- configure GitHub release tarball distribution for [@near-js](https://github.com/near-js) packages ([#9](https://github.com/petersalomonsen/near-rpc-typescript/issues/9)) ([36d6393](https://github.com/petersalomonsen/near-rpc-typescript/commit/36d6393c10ccf95ad85fe91ae84354f01e42df93))
- test release-please after enabling PR permissions ([ece29ad](https://github.com/petersalomonsen/near-rpc-typescript/commit/ece29addf43df8a07c13accbffc2097a8f3264cf))
- **testing:** implement comprehensive testing and coverage ([28c2479](https://github.com/petersalomonsen/near-rpc-typescript/commit/28c24799bcbd0992bae837dd82ee6cf0937083a3))
- upgrade to Zod v4 and implement z.infer for type generation ([#8](https://github.com/petersalomonsen/near-rpc-typescript/issues/8)) ([dcba994](https://github.com/petersalomonsen/near-rpc-typescript/commit/dcba994881812607756049b3e1f01c978f9696a0))

### Bug Fixes

- improve CI workflow order and add lint step to scheduled generation ([be575da](https://github.com/petersalomonsen/near-rpc-typescript/commit/be575da692510bbdd414248b54ce639a4451486d))
