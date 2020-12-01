
const kvstore = {};
window.kvstore = kvstore;

const DEFAULTS = {
	// TODO: Reset to test for production
	tabUrl: "https://testmy.good-loop.com/newtab.html",
	serverType: "test",
	cmp: true
};

/**
 * 
 * @param {string} key 
 * @param {?Object} callback to match chrome.storage.get
 * @returns {?string} value
 */
kvstore.get = (key, callback) => {
	// map??
	let val = window.localStorage.getItem(key);	
	console.log("kvstore get",key,val);
	if (callback) {
		let options = {};
		options[key] = val;
		callback(options);
	}
	return val;
};

/**
 * 
 * @param {?Object} callback to match chrome.storage.get
 */
kvstore.set = (key, value, callback) => {
	console.log("kvstore SET",key,value);
	window.localStorage.setItem(key, value);	
	if (callback) {		
		callback();
	}
};


kvstore.setupDefaults = () => {
	console.log("setupDefaults");
	Object.keys(DEFAULTS).forEach(k => {
		// TODO: Undisable for production
		if ( ! kvstore.get(k)) {
			kvstore.set(k, DEFAULTS[k]);
		}
	});
};

kvstore.setupDefaults();
