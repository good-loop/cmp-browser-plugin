/**
 * This code initialise __tcfapi on websites with default rejection
 */
import * as cmpstub from './lib/stub.js';
//import * as cmpstub from '@iabtcf/stub';
//import {CmpApi} from '@iabtcf/cmpapi';
import {CmpApi} from './lib/CmpApi.js';

//const gvljson = require("./data/vendor-list.json");

console.log("HELLO FROM inject.js", document);

// set up __tcfapi stub
cmpstub();
//constructor input arguments: cmpID, cmpVersion, serviceSpecific
const cmpApi = new CmpApi(141, 4, true);

window.postMessage({connection_setup:true}, '*');
window.addEventListener("message", function(event) {
  if (event.data.connection_response) {
    console.log("connection successful!");
    const encodedString = event.data.consentString;
    console.log("Received: " + encodedString);
    cmpApi.update(encodedString, false);
  };
}, false);


/*
// set up GVL vendor list
const gvl = new GVL(gvljson);

// create a new TC string
const tcModel = new TCModel(gvl);
tcModel.cmpId = 141;
tcModel.cmpVersion = 4;
tcModel.isServiceSpecific = true;

const encodedString = TCString.encode(tcModel);

console.log(encodedString); // TC string encoded begins with 'C'
//CO_971SO_971SCNAEAENBECgAAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAAA
cmpApi.update(encodedString, false);

// TODO: __tcfapi in some websites are not overridden, consent popup is still there
// TODO: set tcModel based on user's preferences
// MESSAGING CHANNEL ****************************
window.postMessage({connection_setup:true}, '*');
window.addEventListener("message", function(event) {
  if (event.data.connection_response) {
    console.log("connection successful!");
    var i;
    for (i=0; i<10; i++) {
      if (event.data.purposes[i]) tcModel.purposeConsents.set(i+1);
    }
    const newEncodedString = TCString.encode(tcModel);
    console.log(newEncodedString);
    cmpApi.update(newEncodedString, false);
  };
}, false);
/*
var extensionId = "gpgihgkjcdkilmibcpffonlglmkmiehh";
chrome.runtime.sendMessage(extensionId, {message: "I also need data"},
  function(response) {
    console.log("Collecting response from extension: " + response.marketing);
});*/
// *********************************************

// purpose IDs and their meanings **************
// 1: Store information on device
// 2: Show basic ads
// 3: Build personalised ads profile
// 4: Show personalised ads
// 5: Build personalised content profile
// 6: Show personalised content
// 7: Measure ad performance
// 8: Measure content performance
// 9: Apply market research
//10: Improve products
// *********************************************
