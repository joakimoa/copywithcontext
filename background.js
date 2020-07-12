function loadContentScript() {
	browser.tabs.executeScript({file: "/content_scripts/copy_with_context.js"})
	.then(mainFunction)
	.catch(reportExecuteScriptError);
}

function mainFunction() {
	function sendCommand(tabs) {
		browser.tabs.sendMessage(tabs[0].id, {
			command: "gettext",
			title: tabs[0].title,
			url: tabs[0].url
		});
	}

	function reportError() {
		console.error(`Could not copy selected text: ${error}`);
	}

	function copyWithContext() {
		browser.tabs.query({active: true, currentWindow: true})
			.then(sendCommand)
			.catch(reportError);
	}

	copyWithContext();
}

function reportExecuteScriptError(error) {
 	console.error(`Failed to execute copy with context content script: ${error.message}`);
}

browser.browserAction.onClicked.addListener(loadContentScript);