(function() {
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;

	function getSelectedText(title, url) {
		var selectedText = window.getSelection().toString().trim();
		if (selectedText) {
			selectedText = selectedText + "\n\n" + title + "\n" + url;
			navigator.clipboard.writeText(selectedText)
				.catch(error => console.error(`Failed to write to clipboard: ${error}`));
		}
	}

	browser.runtime.onMessage.addListener((message) => {
		if (message.command === "gettext") {
			getSelectedText(message.title, message.url);
		}
	});

})();