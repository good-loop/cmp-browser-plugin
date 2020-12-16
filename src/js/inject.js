/**
 * TODO This code gets injected into the web page.
 */

import * as cmpstub from '@iabtcf/stub';
import {TCModel, TCString, GVL} from '@iabtcf/core';
import {CmpApi} from '@iabtcf/cmpapi';

console.log("HELLO FROM inject.js", document);

// set up __tcfpi stub
cmpstub();
//constructor input arguments: cmpID, cmpVersion, serviceSpecific
const cmpApi = new CmpApi(141, 4, true);
cmpApi.update('');

/*
// unable to access the GVL
GVL.baseUrl = "https://vendor-list.consensu.org/v2/vendor-list.json";

// create a new TC string
const tcModel = new TCModel(new GVL());

// Some fields will not be populated until a GVL is loaded
tcModel.gvl.readyPromise.then(() => {

  tcModel.cmpId = 141;
  tcModel.cmpVersion = 4;
  tcModel.isServiceSpecific = true;

  const encodedString = TCString.encode(tcModel);

  console.log(encodedString); // TC string encoded begins with 'C'

});*/

