/**
 * TODO This code gets injected into the web page.
 */

import * as cmpstub from '@iabtcf/stub';
//import {TCModel, TCString, GVL} from '@iabtcf/core';
import {CmpApi} from '@iabtcf/cmpapi';

console.log("HELLO FROM inject.js", document);

// set up __tcfpi stub
cmpstub();
//constructor input arguments: cmpID, cmpVersion, serviceSpecific
const cmpApi = new CmpApi(141, 4, true);
cmpApi.update('');