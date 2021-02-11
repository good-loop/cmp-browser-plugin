const getDomain = (temp) => {
	let m = temp.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/);
	if ( ! m) {	// safety / paranoia
		console.error("getDomain() error for "+window.location.hostname);
		return window.location.hostname;
	}
	return m[1];
};

function save_preference() {
    chrome.tabs.query({active:true,currentWindow:true},function(tab){
        var temp = new URL(tab[0].url);
        var domain = getDomain(temp.hostname);
        const allowed = !(document.getElementById('toggler').checked);
        chrome.storage.local.get(['allowlist'], function(data){
            let allowlistjson = data.allowlist;
            if (allowed) {
                allowlistjson[domain] = {"off": true};
                console.log("Turned off cmp for " + domain);
                console.log(allowlistjson);
            } else {
                try {
                    delete allowlistjson[domain];
                    console.log("Turned on cmp for " + allowlistjson);
                } catch (error) {
                    console.log("Cmp already turned on.");
                }
            }
            chrome.storage.local.set({allowlist:allowlistjson}, function(){
                console.log("Updated cmp for " + domain);
            });
        })
    });
}

function load_preference() {
    chrome.tabs.query({active:true,currentWindow:true},function(tab){
        var temp = new URL(tab[0].url);
        var domain = getDomain(temp.hostname);
        console.log(domain);
        chrome.storage.local.get(['allowlist'], function(result) {
            let allowlistjson = result.allowlist;
            console.log(allowlistjson);
            if (allowlistjson[domain]) {
                document.getElementById('toggler').checked = false;
            } else {
                console.log("default");
            }
        })
    });
}

document.getElementById('toggler').addEventListener('change', save_preference);
window.onload = load_preference();