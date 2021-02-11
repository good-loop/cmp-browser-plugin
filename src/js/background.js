import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';
import { browser } from 'webextension-polyfill-ts';

async function blockCookiePopup() {
    const blocker = await WebExtensionBlocker.fromLists(fetch, [
        'https://www.fanboy.co.nz/fanboy-cookiemonster.txt'
    ],{loadNetworkFilters: false});
    blocker.enableBlockingInBrowser(browser);
    console.log("Blocker enabled");
};

blockCookiePopup();

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == 'install' || details.reason == 'update') {
        console.log("Extension installed for the first time");
        console.log("Setting all purposes consent as default false");
        chrome.storage.sync.set({
            purposes: [false, false, false, false, false,
                        false, false, false, false, false]
        })
    }
}); 

async function updateList() {
    const response = await fetch('https://raw.githubusercontent.com/good-loop/cmp-browser-plugin/develop/src/js/data/vendor-list.json');
    const gvljson = await response.json();
}

updateList();