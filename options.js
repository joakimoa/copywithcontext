function saveOptions(e) {
	browser.storage.sync.set({
		formatting: document.querySelector("#formatting").value
	});
	e.preventDefault();
}

function restoreOptions() {
	var gettingItem = browser.storage.sync.get('formatting');
	gettingItem.then((res) => {
		document.querySelector("#formatting").value = res.formatting
			|| "{CWC_TEXT}\n\n{CWC_TITLE}\n{CWC_URL}";
	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);