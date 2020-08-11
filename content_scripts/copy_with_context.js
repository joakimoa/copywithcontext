(function() {
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;

	function getSelectedText(title, url) {
		var selectedText = window.getSelection().toString().trim();
		if (selectedText) {
			var gettingItem = browser.storage.sync.get('formatting');
			gettingItem.then((res) => {
				var formattedText;
				// if custom formatting found in storage then use it, otherwise use default
				if (res.formatting) {
					formattedText = res.formatting;
				} else {
					formattedText = "{CWC_TEXT}\n\n{CWC_TITLE}\n{CWC_URL}";
				}
				formattedText = formattedText.replace('{CWC_TEXT}', selectedText);
				formattedText = formattedText.replace('{CWC_TITLE}', title);
				formattedText = formattedText.replace('{CWC_URL}', url);

				navigator.clipboard.writeText(formattedText)
					.catch(error => console.error(`Failed to write to clipboard: ${error}`));
			})
		}
	}

	browser.runtime.onMessage.addListener((message) => {
		if (message.command === "gettext") {
			getSelectedText(message.title, message.url);
		}
	});

})();