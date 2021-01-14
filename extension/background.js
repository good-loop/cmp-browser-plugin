chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == 'install') {
        console.log("Extension installed for the first time");
        console.log("Setting all purposes consent as default false");
        chrome.storage.sync.set({
            purposes: [false, false, false, false, false,
                        false, false, false, false, false]
        })
    }
}); 