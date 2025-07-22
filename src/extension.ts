import { get } from 'http';
import * as vscode from 'vscode';

// Global output channels
let outputChannel: vscode.OutputChannel;
let logOutputChannel: vscode.LogOutputChannel;

// Log buffer to store all log messages

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

       // Register 'reportIssue' command
       const reportIssueDisposable = vscode.commands.registerCommand('log-tester.reportIssue', async () => {
	       const fs = require('fs');
	       const path = require('path');
	       // Find the log file in the extension's log directory
	       const logDir = context.logUri ? context.logUri.fsPath : context.logPath;
	       // LogOutputChannel file is usually named after the channel, e.g., 'My Extension Log.log'
	       const logFileName = 'My Extension Log.log';
	       const logFilePath = path.join(logDir, logFileName);
	       let logContent = '';
	       try {
		       logContent = fs.readFileSync(logFilePath, 'utf8');
	       } catch (err) {
		       if (err && typeof err === 'object' && 'message' in err) {
			       logContent = 'Could not read log file: ' + (err as any).message;
		       } else {
			       logContent = 'Could not read log file: Unknown error';
		       }
	       }
	       const wrappedLog = `<details><summary>Log Output</summary><pre>${logContent}</pre></details>`;
	       await vscode.commands.executeCommand('vscode.openIssueReporter', {
		       extensionId: 'timheuer.log-tester',
		       data: wrappedLog
	       });
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
