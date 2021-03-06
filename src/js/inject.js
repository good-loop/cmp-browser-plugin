/**
 * This code initialise __tcfapi on websites with default rejection
 */
import * as cmpstub from './lib/stub.js';
import {CmpApi} from './lib/CmpApi.js';

// prevent instance of babel polyfill to be loaded twice
global._babelPolyfill = false; 

console.log("HELLO FROM inject.js", document);

// set up __tcfapi stub
cmpstub();
//constructor input arguments: cmpID, cmpVersion, serviceSpecific
const cmpApi = new CmpApi(365, 4, true);

// obtain tcString from content script
// MESSAGING CHANNEL ********************************
window.postMessage({connection_setup:true}, '*');
window.addEventListener("message", function(event) {
  if (event.data.connection_response) {
    console.log("connection successful!");
    const encodedString = event.data.consentString;
    console.log("Received: " + encodedString);
    cmpApi.update(encodedString, false);
  };
}, false);
// **************************************************

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
