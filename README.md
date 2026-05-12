# ChaiCoreCSS Package

This directory contains the npm package for ChaiCoreCSS, a lightweight utility-first CSS runtime that turns `chai-*` classes into inline styles.

## Structure

- `lib/` - package source code and type declarations.
- `test/` - package tests.
- `dist-package/` - generated package build output.
- `vite.config.js` - library build and Vitest configuration.

## Development

```bash
npm install
npm test
npm run build
```

From the repository root, you can also run:

```bash
npm run test:package
npm run build:package
```

## Package Entry Points

- `chaicorecss` - main runtime API.
- `chaicorecss/auto` - auto-start module.
- `chaicorecss/source` - unbuilt source export for local tooling.

## Publishing

```bash
npm test
npm run build
npm publish
```

The `prepublishOnly` script runs tests and rebuilds the package before publish. See `HOSTING.md` for the full npm publishing checklist.
