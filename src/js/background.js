import { WebExtensionBlocker } from '@cliqz/adblocker-webextension';
import { browser } from 'webextension-polyfill-ts';

async function blockCookie() {
    const blocker = await WebExtensionBlocker.fromLists(fetch, [
        'https://www.fanboy.co.nz/fanboy-cookiemonster.txt'
    ]);
    blocker.enableBlockingInBrowser(browser);
};

blockCookie();

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