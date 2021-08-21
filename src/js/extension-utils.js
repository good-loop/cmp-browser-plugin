

export const saveOptions = (options) => {
	chrome.storage.local.set(options, function() {
		console.log("Updated cmp",options);
	});
};
