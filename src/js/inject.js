/**
 * This code initialise __tcfapi on websites with default rejection
 */
import * as cmpstub from './stub.js';
//import * as cmpstub from '@iabtcf/stub';
import {TCModel, TCString, GVL} from '@iabtcf/core';
import {CmpApi} from '@iabtcf/cmpapi';

const gvljson = require("./data/vendor-list.json")

console.log("HELLO FROM inject.js", document);

// set up __tcfpi stub
cmpstub();
//constructor input arguments: cmpID, cmpVersion, serviceSpecific
const cmpApi = new CmpApi(141, 4, true);

// set up GVL vendor list
const gvl = new GVL(gvljson);

// create a new TC string
const tcModel = new TCModel(gvl);
tcModel.cmpId = 141;
tcModel.cmpVersion = 4;
tcModel.isServiceSpecific = true;

// TODO: set tcModel based on user's preferences
//document.dispatchEvent(new CustomEvent('preferences', { detail: {message:"I need data"} }));
window.postMessage({message:"setting up connection"}, '*');
window.addEventListener("message", function(event) {
  if (event.data.message) {console.log(event.data.message)};
}, false);

var extensionId = "gpgihgkjcdkilmibcpffonlglmkmiehh";
chrome.runtime.sendMessage(extensionId, {message: "I also need data"},
  function(response) {
    console.log("Collecting response from extension: " + response.marketing);
});
// *********************************************

const encodedString = TCString.encode(tcModel);

console.log(encodedString); // TC string encoded begins with 'C'
cmpApi.update(encodedString, false);

// TODO: __tcfapi in some websites are not overridden, consent popup is still there