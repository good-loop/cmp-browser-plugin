// load the kvstore options manager
import kvstore from './kvstore';
import {TCModel, TCString, GVL} from '@iabtcf/core';
// import {addScript} from './base/utils/miscutils';
// import $ from 'jquery';
// import _ from 'lodash';

const gvljson = require("./data/vendor-list.json");

const LOGTAG = "GL-extension";

console.log(LOGTAG, "Hello :)", window, document);
console.log(LOGTAG, "CMP?", kvstore.get("cmp"));

// whitelisted?
const whitelistjson = require("./data/whitelist.json");
// domain = hostname minus any subdomains
const domain = window.location.hostname.match(/^(?:.*?\.)?(\w{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/)[1];	
let whitelisted;
if (whitelistjson[domain]) {
	console.log("Whitelisted!", whitelistjson[domain]);
	whitelisted = true;
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

if (whitelisted || ! kvstore.get("cmp")) {
	console.warn("My CMP is OFF!");	
} else {

	// Setup My CMP
	injectTcfApi();
	
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