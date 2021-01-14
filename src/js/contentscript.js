
import $ from 'jquery';
import {TCModel, TCString, GVL} from '@iabtcf/core';
import {addScript} from './base/utils/miscutils';
// load the kvstore options manager
import kvstore from './kvstore';

const gvljson = require("./data/vendor-list.json");

// import _ from 'lodash';
const LOGTAG = "GL-extension";

console.log(LOGTAG, "Hello :)", window, document);
console.log(LOGTAG, "CMP?", kvstore.get("cmp"));

// // let uOptions = chrome.runtime.getURL('options.html'); doesnt work
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

function injectScript(func) {
	let actualCode = '(' + func + ')();';
	let script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.remove();
};

function injectTcfApi() {
	// inject.js being injected as an extension
	let script = document.createElement('script'); 
	script.src = chrome.runtime.getURL('build/js/inject-bundle-debug.js');
	(document.head||document.documentElement).appendChild(script);
	script.remove();
}

// TODO CMP functions (as seen on a fandom.com page)
// getConsentData undefined callback
// ping 2 callback
// getTCData 2 callback [91]
// addEventListener 2 callback
// removeEventListener 2 callback

if ( ! kvstore.get("cmp")) {
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
	/*
	injectScript(function() {
		console.log("HELLO FROM THE PAGE :)", window, document);
		let fn = function (...args) {
			console.warn("My CMP", args);
		};
		
		Object.defineProperty(window, "__tcfapi",
			{
				value: fn,
				writable: false,
				enumerable: false,
				configurable: false
			}
		);

		Object.defineProperty(window, "__cmp",
			{
				value: fn,
				writable: false,
				enumerable: false,
				configurable: false
			}
		);

		console.warn("Good-Loop CMP set: window.__cmp", window.__cmp, window.__tcfapi);
	});
	*/
}