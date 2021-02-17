// load the kvstore options manager
import kvstore from './kvstore';
import {TCModel, TCString, GVL} from '@iabtcf/core';
// import {addScript} from './base/utils/miscutils';
// import $ from 'jquery';
// import _ from 'lodash';
const Cookies = require('js-cookie');

const LOGTAG = "GL-extension";
console.log(LOGTAG, "Hello :)", window, document);
console.log(LOGTAG, "CMP?", kvstore.get("cmp"));

import { injectCosmetics } from '@cliqz/adblocker-webextension-cosmetics';
injectCosmetics(window, true);

const getDomain = () => {
	let m = window.location.hostname.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/);
	if ( ! m) {	// safety / paranoia
		console.error("getDomain() error for "+window.location.hostname);
		return window.location.hostname;
	}
	return m[1];
};

rejectCookie();

chrome.storage.local.get(['vendorlist', 'allowlist', 'userlist'], function(result){
	const domain = getDomain();
	if (result.userlist[domain] || result.allowlist[domain] || !kvstore.get("cmp")) {
		console.log("Website allowed! CMP turned off.");
	} else { // set up our CMP
		// set up GVL vendor list
		const gvl = new GVL(result.vendorlist);
		// create a new TC string
		const tcModel = new TCModel(gvl);
		tcModel.cmpId = 365;
		tcModel.cmpVersion = 4;
		tcModel.isServiceSpecific = true;
		var encodedString = TCString.encode(tcModel);
		console.log("Encoded string in content script: " + encodedString);
		injectTcfApi();

		// send consent string to inject.js
		window.addEventListener("message", function(event) {
			if (event.data.connection_setup) {
				console.log("setting up connection");
				chrome.storage.sync.get(['purposes'], function(result) {
					var i;
					for (i=0; i<10; i++) {
				  		if (result.purposes[i]) tcModel.purposeConsents.set(i+1);
					}
					encodedString = TCString.encode(tcModel);
					console.log("Updated consent string: " + encodedString);
					window.postMessage({connection_response:true, 
						consentString:encodedString}, "*");
				});
			}
		}, false);
	}
})

function injectTcfApi() {
	// inject.js being injected into the webpage
	let script = document.createElement('script'); 
	script.src = chrome.runtime.getURL('build/js/inject-bundle-debug.js');
	(document.head||document.documentElement).appendChild(script);
	script.remove();
}

async function rejectCookie() {
	const domain = getDomain();
	const cookielist = await fetch('https://raw.githubusercontent.com/good-loop/cmp-browser-plugin/feature/feb-2021/dynamic-datalist-load/src/js/data/cookie-list.json');
	const cookielistjson = await cookielist.json();
	if (cookielistjson[domain]) {
		const cookiesNeeded = cookielistjson[domain];
		Object.keys(cookiesNeeded).forEach(function(key) {
    		Cookies.set(key, cookiesNeeded[key]);
  		})
	}
}
