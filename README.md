# KIWI

KERI Interactive Web Interface

Mithril, construct-ui based user interface

![example workflow](https://github.com/WebOfTrust/kiwi/actions/workflows/test.yaml/badge.svg)

## Dependencies

Yarn v2+ (Berry)
https://yarnpkg.com/getting-started/install

## Installing

```shell
yarn
```

## Running

```shell
yarn run serve
```

## Run tests

```shell
yarn test
```

## Building

Environment files `.env.gleif`, `.env.legal-entity`, and `.env.qvi` are used to
configure environment variables used in the build. These should be properly
configured before creating builds.

```
yarn build:gleif
yarn build:legal-entity
yarn build:qvi

OR

yarn build:all
```

Creates `dist-gleif/`, `dist-legal-entity/` and `dist-qvi/` respectively.
