import { get } from 'http';
import * as vscode from 'vscode';

// Global output channels
let outputChannel: vscode.OutputChannel;
let logOutputChannel: vscode.LogOutputChannel;

// Function to get or create a standard output channel
export function getOutputChannel(): vscode.OutputChannel {
	if (!outputChannel) {
		outputChannel = vscode.window.createOutputChannel('My Extension Log');
	}
	return outputChannel;
}

// Function to get or create a log output channel
// This is used for logging messages with different severity levels
export function getLogOutputChannel(): vscode.LogOutputChannel {
	if (!logOutputChannel) {
		logOutputChannel = vscode.window.createOutputChannel('My Extension Log', { log: true });
	}
	return logOutputChannel;
}

export function activate(context: vscode.ExtensionContext) {


       // Logging/output logic as a function
       function logActivationMessages() {
	       getOutputChannel().appendLine('Extension activated');
	       getLogOutputChannel().info('Log output channel initialized');
	       getOutputChannel().appendLine('This is a basic message in the output channel');
	       getLogOutputChannel().error('This is an error message in the log output channel');
	       getLogOutputChannel().warn('This is a warning message in the log output channel');
	       getLogOutputChannel().debug('This is a debug message in the log output channel');
	       getLogOutputChannel().trace('This is a trace message in the log output channel');
	       getOutputChannel().appendLine('This is a warning message in the output channel');
       }

       // Run on activation
       logActivationMessages();

       // Register 'start logging' command
       const disposable = vscode.commands.registerCommand('log-tester.startLogging', () => {
	       logActivationMessages();
       });
       context.subscriptions.push(disposable);

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
