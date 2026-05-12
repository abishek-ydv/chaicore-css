# Package Publishing Guide

Use this checklist from the `chaicorecss/` directory.

## Before Publishing

```bash
npm install
npm test
npm run build
```

Check that `dist-package/chaicorecss.js` and `dist-package/auto.js` were generated.

## Publish

```bash
npm login
npm publish
```

For later releases, update the version in `package.json` before publishing again.

The package exports:

- `chaicorecss`
- `chaicorecss/auto`
- `chaicorecss/source`
