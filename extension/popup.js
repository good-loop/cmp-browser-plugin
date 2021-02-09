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
        if (allowed) {
            chrome.storage.sync.set({
                [domain]: {"off":true}
            }, function() {
                console.log("Turned off cmp for this website");
                console.log(domain);
            })
        } else {
            try {
                chrome.storage.sync.remove(domain);
            } catch (error) {
                console.log(error);
            }
        }
    });
}

function load_preference() {
    chrome.tabs.query({active:true,currentWindow:true},function(tab){
        var temp = new URL(tab[0].url);
        var domain = getDomain(temp.hostname);
        console.log(domain);
        chrome.storage.sync.get([domain], function(result) {
            console.log(result);
            try {
                if (result[domain].off) {
                    document.getElementById('toggler').checked = false;
                }
            } catch(error) {
                console.log("default");
            }
        })
    });
}

document.getElementById('toggler').addEventListener('change', save_preference);
window.onload = load_preference();