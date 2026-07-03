/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// @ts-check

// Builds one VSIX per platform target and names each asset following the convention used by
// the VS Code built-in extension downloader: `<name>-<osAlias>-<arch>.vsix`.
// Upload the resulting `dist/*.vsix` files as assets to a GitHub release.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const distDir = path.join(root, 'dist');

// Marketplace target platforms (also the values accepted by `vsce package --target`).
const targets = [
	'win32-x64',
	'win32-arm64',
	'linux-x64',
	'linux-arm64',
	'linux-armhf',
	'alpine-x64',
	'alpine-arm64',
	'darwin-x64',
	'darwin-arm64',
];

/**
 * Derives the release asset name for a target, e.g. `darwin-arm64` -> `<name>-osx-arm64.vsix`.
 * @param {string} name
 * @param {string} target
 * @returns {string}
 */
function getAssetName(name, target) {
	const index = target.lastIndexOf('-');
	const targetOs = target.substring(0, index);
	const targetArch = target.substring(index + 1);
	const osAlias = { darwin: 'osx', win32: 'win', linux: 'linux', alpine: 'alpine' }[targetOs] ?? targetOs;
	const assetArch = targetArch === 'armhf' ? 'arm' : targetArch;
	return `${name}-${osAlias}-${assetArch}.vsix`;
}

const vsceBin = path.join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'vsce.cmd' : 'vsce');
if (!existsSync(vsceBin)) {
	console.error('Could not find vsce. Run `npm install` first.');
	process.exit(1);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

for (const target of targets) {
	const out = path.join(distDir, getAssetName(pkg.name, target));
	console.log(`Packaging ${target} -> ${path.relative(root, out)}`);
	execFileSync(vsceBin, ['package', '--target', target, '--out', out], { cwd: root, stdio: 'inherit' });
}

console.log(`\nDone. VSIX assets written to ${path.relative(root, distDir)}/`);
