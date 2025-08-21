# Changelog

## [2.0.0](https://github.com/near/near-jsonrpc-client-ts/compare/jsonrpc-types-v1.3.3...jsonrpc-types-v2.0.0) (2025-08-21)


### ⚠ BREAKING CHANGES

* Client now uses static functions instead of instance methods. Instead of client.block(), use block(client, params).

### Features

* add browser support with Playwright tests and temporary [@psalomo](https://github.com/psalomo) publishing ([#14](https://github.com/near/near-jsonrpc-client-ts/issues/14)) ([6abd7bb](https://github.com/near/near-jsonrpc-client-ts/commit/6abd7bb01b75f431cb3eeaa48aced2f6e7658a34))
* add JSDoc descriptions from OpenAPI spec to generated code ([#58](https://github.com/near/near-jsonrpc-client-ts/issues/58)) ([ce2409f](https://github.com/near/near-jsonrpc-client-ts/commit/ce2409f0b8dce71193a0be0a33bb7decd80d7467))
* add JSON parsing utilities and improve tree-shaking (fixes [#39](https://github.com/near/near-jsonrpc-client-ts/issues/39)) ([#54](https://github.com/near/near-jsonrpc-client-ts/issues/54)) ([a75669d](https://github.com/near/near-jsonrpc-client-ts/commit/a75669d8752b499c20ca6a1acb71c84df9c5c6da))
* configure GitHub release tarball distribution for [@near-js](https://github.com/near-js) packages ([#9](https://github.com/near/near-jsonrpc-client-ts/issues/9)) ([36d6393](https://github.com/near/near-jsonrpc-client-ts/commit/36d6393c10ccf95ad85fe91ae84354f01e42df93))
* implement dynamic RPC client with proper TypeScript types ([#25](https://github.com/near/near-jsonrpc-client-ts/issues/25)) ([e0c2094](https://github.com/near/near-jsonrpc-client-ts/commit/e0c2094640646b2586c584a5e787322eac175d92))
* implement mini client with tree-shaking optimization and comprehensive examples ([#31](https://github.com/near/near-jsonrpc-client-ts/issues/31)) ([7d7b16d](https://github.com/near/near-jsonrpc-client-ts/commit/7d7b16d429b3174d5831f5d27ac3c59b56370b03))
* make mini client the default implementation ([#32](https://github.com/near/near-jsonrpc-client-ts/issues/32)) ([5afbf92](https://github.com/near/near-jsonrpc-client-ts/commit/5afbf92249f93f52fa456882539cb7fadd8c93d2))
* test release-please after enabling PR permissions ([ece29ad](https://github.com/near/near-jsonrpc-client-ts/commit/ece29addf43df8a07c13accbffc2097a8f3264cf))
* **testing:** implement comprehensive testing and coverage ([28c2479](https://github.com/near/near-jsonrpc-client-ts/commit/28c24799bcbd0992bae837dd82ee6cf0937083a3))
* update generated code from OpenAPI spec ([#42](https://github.com/near/near-jsonrpc-client-ts/issues/42)) ([4e77e67](https://github.com/near/near-jsonrpc-client-ts/commit/4e77e67591411f8b1cf5ae191e580dd378e53b97))
* update generated types from OpenAPI spec ([#24](https://github.com/near/near-jsonrpc-client-ts/issues/24)) ([902fa66](https://github.com/near/near-jsonrpc-client-ts/commit/902fa66e3bf01c10c8843b88c272b8389021e505))
* upgrade to Zod v4 and implement z.infer for type generation ([#8](https://github.com/near/near-jsonrpc-client-ts/issues/8)) ([dcba994](https://github.com/near/near-jsonrpc-client-ts/commit/dcba994881812607756049b3e1f01c978f9696a0))


### Bug Fixes

* configure automated type updates to trigger releases ([#23](https://github.com/near/near-jsonrpc-client-ts/issues/23)) ([2f9c9b6](https://github.com/near/near-jsonrpc-client-ts/commit/2f9c9b6eaf87c21e71dfc6402afe1c17090cb1d5))
* correct dependency versions and improve documentation ([83ddde8](https://github.com/near/near-jsonrpc-client-ts/commit/83ddde8c5bbb839e9fcdc43db3ba589d1dadf4a7))
* enable validation to work with convenience helpers and nullable fields ([#45](https://github.com/near/near-jsonrpc-client-ts/issues/45)) ([41b26fd](https://github.com/near/near-jsonrpc-client-ts/commit/41b26fdfeee1be69a5596ecfb5298b15863acd74))
* enforce coverage thresholds and improve test coverage to meet requirements ([#60](https://github.com/near/near-jsonrpc-client-ts/issues/60)) ([edf6459](https://github.com/near/near-jsonrpc-client-ts/commit/edf64597d9da0702b48d8664abf97b243e38e0e2))
* improve CI workflow order and add lint step to scheduled generation ([be575da](https://github.com/near/near-jsonrpc-client-ts/commit/be575da692510bbdd414248b54ce639a4451486d))
* parse JSON-RPC error responses for non-2xx HTTP status codes ([#43](https://github.com/near/near-jsonrpc-client-ts/issues/43)) ([42e9211](https://github.com/near/near-jsonrpc-client-ts/commit/42e9211466bde6da8037a98e37591b173adaa93e))
* resolve module import issues and improve union type handling ([#27](https://github.com/near/near-jsonrpc-client-ts/issues/27)) ([027796f](https://github.com/near/near-jsonrpc-client-ts/commit/027796fff410e38211c1b1a1b56375bdc6cb8c33))


### Miscellaneous

* migrate to [@near-js](https://github.com/near-js) scope and update repository URLs ([#63](https://github.com/near/near-jsonrpc-client-ts/issues/63)) ([cf8adf3](https://github.com/near/near-jsonrpc-client-ts/commit/cf8adf32abb1c60ad7295f463777117ef4fc02b8))
* release main ([#15](https://github.com/near/near-jsonrpc-client-ts/issues/15)) ([20605d3](https://github.com/near/near-jsonrpc-client-ts/commit/20605d301d2cf55424d13cf2a0684f22032af1a4))
* release main ([#18](https://github.com/near/near-jsonrpc-client-ts/issues/18)) ([4ff6b74](https://github.com/near/near-jsonrpc-client-ts/commit/4ff6b749d7476149d49168c495811ca2ecbd7db3))
* release main ([#2](https://github.com/near/near-jsonrpc-client-ts/issues/2)) ([0ba0101](https://github.com/near/near-jsonrpc-client-ts/commit/0ba0101f46fcac8d1af5f06a1eeebdcbc2a51e23))
* release main ([#26](https://github.com/near/near-jsonrpc-client-ts/issues/26)) ([ba8fece](https://github.com/near/near-jsonrpc-client-ts/commit/ba8fece8675f75a6d3af2165f8039e3e1e234148))
* release main ([#28](https://github.com/near/near-jsonrpc-client-ts/issues/28)) ([b807b47](https://github.com/near/near-jsonrpc-client-ts/commit/b807b47058c67376965283ad2d9cd8485da4f4b3))
* release main ([#33](https://github.com/near/near-jsonrpc-client-ts/issues/33)) ([c1e2d44](https://github.com/near/near-jsonrpc-client-ts/commit/c1e2d444c07ee2b4331624ec861c3bb65bc1a478))
* release main ([#37](https://github.com/near/near-jsonrpc-client-ts/issues/37)) ([39206f6](https://github.com/near/near-jsonrpc-client-ts/commit/39206f6d78931648706032a9a130cae0efc87ad9))
* release main ([#44](https://github.com/near/near-jsonrpc-client-ts/issues/44)) ([44304a9](https://github.com/near/near-jsonrpc-client-ts/commit/44304a96d78be10e78efe79e27a1e74bd11dc489))
* release main ([#47](https://github.com/near/near-jsonrpc-client-ts/issues/47)) ([00518bc](https://github.com/near/near-jsonrpc-client-ts/commit/00518bc4c4c9140ffab3e44dc232c8ff9999a8be))
* release main ([#52](https://github.com/near/near-jsonrpc-client-ts/issues/52)) ([0e8b0e6](https://github.com/near/near-jsonrpc-client-ts/commit/0e8b0e60673c2479470843ec9520edff03bd3c87))
* release main ([#55](https://github.com/near/near-jsonrpc-client-ts/issues/55)) ([6d9e888](https://github.com/near/near-jsonrpc-client-ts/commit/6d9e888ce6b56727834c29680991e6d2fa89d2c1))
* release main ([#59](https://github.com/near/near-jsonrpc-client-ts/issues/59)) ([3829c89](https://github.com/near/near-jsonrpc-client-ts/commit/3829c89f2d7decc6db65b93452b3e443aa0d662b))
* release main ([#61](https://github.com/near/near-jsonrpc-client-ts/issues/61)) ([f5f770a](https://github.com/near/near-jsonrpc-client-ts/commit/f5f770a42dcecbb7a640ee04dafdfc04d0759bc9))
* release main ([#64](https://github.com/near/near-jsonrpc-client-ts/issues/64)) ([d6ee94e](https://github.com/near/near-jsonrpc-client-ts/commit/d6ee94ebaaba617ff1fb63c80108eb58ac2d14ea))
* release main ([#68](https://github.com/near/near-jsonrpc-client-ts/issues/68)) ([2973f58](https://github.com/near/near-jsonrpc-client-ts/commit/2973f58e4f9a7de62577416b290604e1e5f7503a))
* update generated types from OpenAPI spec ([#22](https://github.com/near/near-jsonrpc-client-ts/issues/22)) ([eb5be1f](https://github.com/near/near-jsonrpc-client-ts/commit/eb5be1f544d125d4ad094721eba917f0a82d9dfc))
* update generated types from OpenAPI spec ([#3](https://github.com/near/near-jsonrpc-client-ts/issues/3)) ([a718601](https://github.com/near/near-jsonrpc-client-ts/commit/a718601f7c315aa376a79026895b2035b0379ff3))

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
