# ChaiCoreCSS Developer Guide

This document is for maintainers and contributors working on the `chaicorecss` package repository.

For npm users, keep the public package documentation in `README.md`. That file is what npm displays on the package page.

## Project Purpose

ChaiCoreCSS is a browser runtime that scans `chai-*` utility classes, converts supported utilities into inline styles, and optionally observes new DOM nodes with `MutationObserver`.

The package is designed to be:

- Framework agnostic
- Runtime-only for users
- Zero build setup for consumers
- Small enough to publish as a focused npm package

## Important Files

- `README.md` - public npm README.
- `README-Developer.md` - internal developer guide.
- `package.json` - npm metadata, exports, scripts, and publish settings.
- `.npmignore` - extra publish exclusions.
- `lib/chai-core-css.js` - main runtime source.
- `lib/auto.js` - auto-start entrypoint.
- `lib/*.d.ts` - TypeScript declarations.
- `test/` - Vitest test suite.
- `vite.config.js` - package build and test configuration.
- `dist-package/` - generated npm build output.

## Install

```bash
npm install
```

## Development Commands

Run tests:

```bash
npm test
```

Watch tests:

```bash
npm run test:watch
```

Build package output:

```bash
npm run build
```

Preview publish contents:

```bash
npm pack --dry-run
```

## Why Vite Is Used

Vite is only a development/build tool for this package. It is not required by package users.

In this repo Vite:

- Builds `lib/chai-core-css.js` into `dist-package/chaicorecss.js`.
- Builds `lib/auto.js` into `dist-package/auto.js`.
- Produces small ES module output for npm.
- Shares tooling with Vitest for local tests.

Consumers install `chaicorecss` and import the built package. They do not need Vite unless their own app already uses it.

## Package Exports

The package exposes:

- `chaicorecss` - main runtime API.
- `chaicorecss/auto` - auto-start import.
- `chaicorecss/source` - unbuilt source export for local tooling.

The public package entry points are configured in `package.json`.

## Release Checklist

Before publishing:

```bash
npm test
npm run build
npm pack --dry-run
```

Check that the tarball includes only expected files:

- `README.md`
- `LICENSE`
- `package.json`
- `dist-package/auto.js`
- `dist-package/chaicorecss.js`
- `lib/auto.js`
- `lib/chai-core-css.js`
- `lib/*.d.ts`

Then publish:

```bash
npm publish
```

For future releases, bump the version first:

```bash
npm version patch
npm publish
```

Use `minor` or `major` when the change warrants it.

## Related Projects

- Package repo: https://github.com/abishek-ydv/chaicorecss
- Site repo: https://github.com/abishek-ydv/chaicorecss-site
- Landing page: https://chaicore.abishekyadav.in
- npm package: https://www.npmjs.com/package/chaicorecss

## Notes

Keep package docs and developer docs separate:

- `README.md` should stay polished for npm users.
- `README-Developer.md` can include repo workflow, release notes, and maintainer details.
