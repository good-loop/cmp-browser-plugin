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
        chrome.storage.local.get(['userlist'], function(data){
            let userlistjson = data.userlist;
            if (allowed) {
                userlistjson[domain] = {"off": true};
                console.log("Turned off cmp for " + domain);
                console.log(userlistjson);
            } else {
                try {
                    delete userlistjson[domain];
                    console.log("Turned on cmp for " + userlistjson);
                } catch (error) {
                    console.log("Cmp already turned on.");
                }
            }
            chrome.storage.local.set({userlist:userlistjson}, function(){
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
        chrome.storage.local.get(['userlist'], function(result) {
            let userlistjson = result.userlist;
            console.log(userlistjson);
            if (userlistjson[domain]) {
                document.getElementById('toggler').checked = false;
            } else {
                console.log("default");
            }
        })
    });
}

document.getElementById('toggler').addEventListener('change', save_preference);
window.onload = load_preference();