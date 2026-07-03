# Platform Specific Sample

A minimal sample VS Code extension used to produce **platform-specific VSIXs** for testing the
VS Code built-in extension downloader (which can fetch platform-specific built-in extensions from
GitHub releases).

## Command

- **Platform Specific Sample: Show Target** — shows the `process.platform`-`process.arch` the
  extension host is running on.

## Building platform-specific VSIXs

```bash
npm install
npm run package
```

This produces one VSIX per target platform in `dist/`, named following the convention expected by
the built-in extension downloader — `<name>-<osAlias>-<arch>.vsix`:

| Target platform | Asset name |
| --------------- | ---------- |
| `win32-x64`     | `platform-specific-sample-win-x64.vsix` |
| `win32-arm64`   | `platform-specific-sample-win-arm64.vsix` |
| `linux-x64`     | `platform-specific-sample-linux-x64.vsix` |
| `linux-arm64`   | `platform-specific-sample-linux-arm64.vsix` |
| `linux-armhf`   | `platform-specific-sample-linux-arm.vsix` |
| `alpine-x64`    | `platform-specific-sample-alpine-x64.vsix` |
| `alpine-arm64`  | `platform-specific-sample-alpine-arm64.vsix` |
| `darwin-x64`    | `platform-specific-sample-osx-x64.vsix` |
| `darwin-arm64`  | `platform-specific-sample-osx-arm64.vsix` |

## Publishing

Create a GitHub release tagged `v<version>` (matching the `version` in `package.json`) and upload
all `dist/*.vsix` files as release assets. Then reference the extension in `product.json` under
`builtInExtensions` with a `platformSpecific` map of per-target SHA-256 checksums.
