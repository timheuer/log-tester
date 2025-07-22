## Usage


# Log Tester Extension

This extension is a sample for Visual Studio Code that demonstrates the differences between the `LogOutputChannel` and `OutputChannel` APIs. It is intended for extension developers who want to understand how logging and output channels work in VS Code, and how their behaviors differ in practice.

## Features

- Shows how to create and use both `LogOutputChannel` and `OutputChannel` in a VS Code extension.
- Demonstrates the differences in persistence, formatting, and log management between the two APIs.
- Provides sample commands to write messages to each channel and observe their behavior in the VS Code UI.


## LogOutputChannel vs OutputChannel

### LogOutputChannel

- Designed for logging purposes.
- Persists log messages to disk, allowing for log rotation and archival.
- Supports log levels and structured logging.
- Messages are timestamped and can be filtered by log level.

### OutputChannel

- Designed for general output (e.g., build results, tool output).
- Does not persist messages to disk; output is only available during the session.
- No log levels or structured logging.
- Messages are displayed as plain text.
