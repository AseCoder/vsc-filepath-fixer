// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "filepath-fixer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('filepath-fixer.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		
		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		const document = editor.document;
		const clipboard = vscode.env.clipboard;
		
		// check selection
		if (selection.isEmpty) {
			// do clipboard
			clipboard.readText().then(text => {
				clipboard.writeText(text.replace(/\\/g, '/'));
				// vscode.window.showInformationMessage(`Clipboard content edited.`); /* not nice for the user */

			})
		} else {
			// do selection
			editor.edit(editBuilder => {
				const text = document.getText(selection).replace(/\\/g, '/');
				editBuilder.replace(selection, text);
			});
		}
	});
	
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
