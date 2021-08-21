

export const saveOptions = (options, callback) => {
	chrome.storage.local.set(options, function() {
		console.log("Updated cmp",options);
		if (callback) callback();
	});
};


export const loadOptions = (names, callback) => {
	chrome.storage.local.get(names, function(res) {
		console.log("loadOptions", res);
		callback(res);
	});
};

saveOptions({"foo":"bar"});
setTimeout(() => {
	loadOptions(["foo"], r => {

	});
}, 1000);
