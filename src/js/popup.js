import { getDomain } from "./base/utils/miscutils";
import { saveOptions } from "./extension-utils";

function save_preference() {
    chrome.tabs.query({active:true,currentWindow:true},function(tab){
        let temp = new URL(tab[0].url);
        let domain = getDomain(temp.hostname);
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
			saveOptions({userlist:userlistjson});
        })
    });
}

function load_preference() {
    chrome.tabs.query({active:true,currentWindow:true},function(tab){
        let temp = new URL(tab[0].url);
        let domain = getDomain(temp.hostname);
        console.log(domain);
        chrome.storage.local.get(['userlist'], function(result) {
            let userlistjson = result.userlist;
            console.log("CMP userlist", userlistjson);
            if (userlistjson[domain]) {
                document.getElementById('toggler').checked = false;
            } else {
                console.log("CMP default=on");
            }
        })
    });
}

document.getElementById('toggler').addEventListener('change', save_preference);
window.onload = load_preference();