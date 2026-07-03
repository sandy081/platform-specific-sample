/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// @ts-check
'use strict';

const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('platformSpecificSample.showTarget', () => {
			const { platform, arch } = process;
			vscode.window.showInformationMessage(
				`Platform Specific Sample is running on ${platform}-${arch}.`
			);
		})
	);
}

function deactivate() { }

module.exports = { activate, deactivate };
