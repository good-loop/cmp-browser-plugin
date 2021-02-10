// load the kvstore options manager
import kvstore from './kvstore';
import {TCModel, TCString, GVL} from '@iabtcf/core';
// import {addScript} from './base/utils/miscutils';
// import $ from 'jquery';
// import _ from 'lodash';

const gvljson = require("./data/vendor-list.json");

const LOGTAG = "GL-extension";

import { injectCosmetics } from '@cliqz/adblocker-webextension-cosmetics';
injectCosmetics(window, true);

console.log(LOGTAG, "Hello :)", window, document);
console.log(LOGTAG, "CMP?", kvstore.get("cmp"));

// allowlisted? 
// TODO periodically update this (and other data lists) from a webserver
const allowlistjson = require("./data/allowlist.json");
/** domain = hostname minus any subdomains  */
const getDomain = () => {
	let m = window.location.hostname.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/);
	if ( ! m) {	// safety / paranoia
		console.error("getDomain() error for "+window.location.hostname);
		return window.location.hostname;
	}
	return m[1];
};
const domain = getDomain();	
let allowlisted;
if (allowlistjson[domain]) {
	console.log("Website allowed!", allowlistjson[domain]);
	allowlisted = true;
}

// let uOptions = chrome.runtime.getURL('options.html'); doesnt work
// let uLogo = chrome.extension.getURL('/img/logo.64.png'); //chrome.runtime.getURL('img/logo.64.png');
// let uLogo2 = chrome.extension.getURL('img/logo.64.png');

// set up GVL vendor list
const gvl = new GVL(gvljson);
// create a new TC string
const tcModel = new TCModel(gvl);
tcModel.cmpId = 141;
tcModel.cmpVersion = 4;
tcModel.isServiceSpecific = true;
var encodedString = TCString.encode(tcModel);
console.log("Encoded string in content script: " + encodedString);

/*
function injectScript(func) {
	let actualCode = '(' + func + ')();';
	let script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.remove();
}; */

function injectTcfApi() {
	// inject.js being injected as an extension
	let script = document.createElement('script'); 
	script.src = chrome.runtime.getURL('build/js/inject-bundle-debug.js');
	(document.head||document.documentElement).appendChild(script);
	script.remove();
}

if (allowlisted || ! kvstore.get("cmp")) {
	console.warn("My CMP is OFF!");	
} else {

	chrome.storage.sync.get([domain], function(result) {
		try {
			if (result[domain].off) {
				console.log("Website allowed! Turning off CMP.");
			} else {
				// Setup My CMP
				injectTcfApi();
			}
		} catch(error) {
			console.log("default");
			// Setup My CMP
			injectTcfApi();
		}
	})

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
