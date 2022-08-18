import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const controller = vscode.tests.createTestController('test','test');
  controller.createRunProfile('berp', vscode.TestRunProfileKind.Run, (request, tok) => Promise.resolve());
  vscode.workspace.onDidChangeTextDocument(e => {
    const originalVersion = e.document.version;
    setTimeout(async () => {

      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }
      const document = await vscode.workspace.openTextDocument(editor.document.uri);
      setTimeout(() => {
        // const document = editor.document;

        if (originalVersion !== document.version) {
          return;
        }

        const text = document.getText();
        const nonSpaceIndex = text.length - text.trimStart().length;

        if (nonSpaceIndex < text.length) {
          const position = editor.document.positionAt(nonSpaceIndex);
          const item = controller.createTestItem('berp','bla', document.uri);
          item.range = new vscode.Range(position, position.translate(0, 1));
          controller.items.replace([item]);
        }
      }, Math.random() * 100);
    }, Math.random() * 300);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
