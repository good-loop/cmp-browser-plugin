// load the kvstore options manager
import kvstore from './kvstore';
import {TCModel, TCString, GVL} from '@iabtcf/core';
import {getDomain} from './base/utils/miscutils';
// import {addScript} from './base/utils/miscutils';
// import $ from 'jquery';
// import _ from 'lodash';
const Cookies = require('js-cookie');

const LOGTAG = "GL-extension";
console.log(LOGTAG, "Hello :)", window, document);
console.log(LOGTAG, "CMP?", kvstore.get("cmp"));

import { injectCosmetics } from '@cliqz/adblocker-webextension-cosmetics';
injectCosmetics(window, true); // What does this do??

// userlist is domain: {off:true} to whitelist domains
// What are vendorlist and allowlist??
chrome.storage.local.get(['vendorlist', 'allowlist', 'userlist'], function(result) {
	console.log("CMP storage local load: ", result);
	const domain = getDomain();
	if (result.userlist[domain] || result.allowlist[domain] || !kvstore.get("cmp")) {
		console.log("Website allowed! CMP turned off.");
		return;
	}

	// custom CMP cookies??
	setCMPCookies();

	// set up our CMP
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
	
	// Block notifications
	try {
		const _original = Notification.requestPermission;
		Notification.requestPermission = (...args) => {
			console.log("CMP Notification.requestPermission", args);
				// return _original(...args);
			return Promise.resolve("default");
		};
		console.log(LOGTAG, "Notifications are blocked (response is always default=off)");
	} catch(err) {
		console.warn(LOGTAG, err);
	}

}); // ./setup

function injectTcfApi() {
	// inject.js being injected into the webpage
	let script = document.createElement('script'); 
	script.src = chrome.runtime.getURL('build/js/inject-bundle-debug.js');
	(document.head||document.documentElement).appendChild(script);
	script.remove();
}

/**
 * If the site is on our list, then set custom cookies to make its CMP happy
 */
async function setCMPCookies() {	
	const domain = getDomain();
	// format?? domain > cookie > value
	const cookielist = await fetch('https://raw.githubusercontent.com/good-loop/cmp-browser-plugin/master/src/js/data/cookie-list.json');
	const cookielistjson = await cookielist.json();
	let cookiesNeeded = cookielistjson[domain];
	if ( ! cookiesNeeded) {
		console.log("CMP setCMPCookies - none set for "+domain);
		return;
	}
	console.log("CMP setCMPCookies",cookiesNeeded);
	Object.keys(cookiesNeeded).forEach(function(key) {
		Cookies.set(key, cookiesNeeded[key]);
	});	
}
