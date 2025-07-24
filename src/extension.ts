import { createLoggerWithLevel, Logger } from '@timheuer/vscode-ext-logger';
import * as vscode from 'vscode';

// Global output channels
let outputChannel: vscode.OutputChannel;
let logOutputChannel: Logger;
let extContext: vscode.ExtensionContext;

// Log buffer to store all log messages

// Function to get or create a standard output channel
export function getOutputChannel(): vscode.OutputChannel {
	if (!outputChannel) {
		outputChannel = vscode.window.createOutputChannel('My Extension Log');
	}
	return outputChannel;
}

export function activate(context: vscode.ExtensionContext) {

	extContext = context;
	
	if (!logOutputChannel) {
		   logOutputChannel = createLoggerWithLevel('My Extension Log', 'info', true, extContext);
	}
	
	// Logging/output logic as a function
	function logActivationMessages() {
		getOutputChannel().appendLine('Extension activated');
		logOutputChannel.info('Log output channel initialized');
		getOutputChannel().appendLine('This is a basic message in the output channel');
		logOutputChannel.error('This is an error message in the log output channel');
		logOutputChannel.warn('This is a warning message in the log output channel');
		logOutputChannel.debug('This is a debug message in the log output channel');
		logOutputChannel.trace('This is a trace message in the log output channel');
		getOutputChannel().appendLine('This is a warning message in the output channel');
	}

	// Run on activation
	logActivationMessages();

	// Register 'start logging' command
	const disposable = vscode.commands.registerCommand('log-tester.startLogging', () => {
		logActivationMessages();
	});
	context.subscriptions.push(disposable);

	// Register 'reportIssue' command
	const reportIssueDisposable = vscode.commands.registerCommand('log-tester.reportIssue', async () => {
		
		const logResult = await logOutputChannel.getLogContents();

		if (logResult.success) {
			const wrappedLog = `<details><summary>Log Output</summary><pre>${logResult.contents}</pre></details>`;
		
			await vscode.commands.executeCommand('vscode.openIssueReporter', {
				extensionId: extContext.extension.id,
				data: wrappedLog
			});
		}
	});
	context.subscriptions.push(reportIssueDisposable);

}

// This method is called when your extension is deactivated
export function deactivate() {
	if (outputChannel) {
		outputChannel.dispose();
	}
	if (logOutputChannel) {
		logOutputChannel.dispose();
	}
}
