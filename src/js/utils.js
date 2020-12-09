// return TCData in the form of json
export function buildTCData() {
	let tcData = {
		"tcString": "",
		"tcfPolicyVersion": 0,
		"cmpId": 0,
		"cmpVersion": 0,
		"gdprApplies": true,
		"eventStatus": "",
		"cmpStatus": "",
		"listenerId": 0,
		"isServiceSpecific": false,
		"useNonStandardStacks": false,
		"publisherCC": "",
		"purposeOneTreatment": false,
		"outOfBand": {
			"allowedVendors": {
				//'[vendor id]': Boolean
			},
			"disclosedVendors": {
				//'[vendor id]': Boolean
			}
		},
		"purpose": {
			"consents": {
				//'[purpose id]': Boolean
			},
			"legitimateInterest": {
				//'[purpose id]': Boolean
			}
		},
		"vendor": {
			"consents": {
				//'[vendor id]': Boolean
			},
			"legitimateInterest": {
				//'[vendor id]': Boolean
			}
		},
		"specialFeatureOptins": {
			//'[special feature id]': Boolean
		},
		"publisher": {
			"consents": {
				//'[purpose id]': Boolean
			},
			"legitimateInterest": {
				//'[purpose id]': Boolean
			},
			"customPurpose": {
				"consents": {
					//'[purpose id]': Boolean
				},
				"legitimateInterest": {
					//'[purpose id]': Boolean
				},
			},
			"restrictions": {
				//'[purpose id]' : {'[vendor id]': 1}
			}
		}
    };
    return tcData;
};

// return pingReturn in the form of a json
export function buildPingReturn() {
	let pingReturn = {
		"gdprApplies": true,
		"cmpLoaded": false,
		"cmpStatus": "",
		"displayStatus": "",
		"apiVersion": "",
		"cmpVersion": 0, 
		"cmpId": 0,
		"gvlVersion": 0,
		"tcfPolicyVersion": 0
	};
	return pingReturn;
}