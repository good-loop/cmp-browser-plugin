import { getDomain } from "./base/utils/miscutils";

let purposeConsent1 = document.getElementById('purpose1');
let purposeConsent2 = document.getElementById('purpose2');
let purposeConsent3 = document.getElementById('purpose3');
let purposeConsent4 = document.getElementById('purpose4');
let purposeConsent5 = document.getElementById('purpose5');
let purposeConsent6 = document.getElementById('purpose6');
let purposeConsent7 = document.getElementById('purpose7');
let purposeConsent8 = document.getElementById('purpose8');
let purposeConsent9 = document.getElementById('purpose9');
let purposeConsent10 = document.getElementById('purpose10');
let whitelistUL = document.getElementById('whitelist');

function save_options() {
    chrome.storage.sync.set({
      purposes: [purposeConsent1.checked,purposeConsent2.checked,purposeConsent3.checked,
        purposeConsent4.checked,purposeConsent5.checked,purposeConsent6.checked,
        purposeConsent7.checked,purposeConsent8.checked,purposeConsent9.checked,
        purposeConsent10.checked]
    }, function() {
      // Update status to let user know options were saved.
      let status = document.getElementById('status');
      status.textContent = 'Preferences saved!';
      setTimeout(function() {
        status.textContent = '';
      }, 1000);
    });
}

function load_options() {
  chrome.storage.sync.get(['purposes'], function(result) {
    console.log("CMP load_options", result);
    purposeConsent1.checked = result.purposes[0];
    purposeConsent2.checked = result.purposes[1];
    purposeConsent3.checked = result.purposes[2];
    purposeConsent4.checked = result.purposes[3];
    purposeConsent5.checked = result.purposes[4];
    purposeConsent6.checked = result.purposes[5];
    purposeConsent7.checked = result.purposes[6];
    purposeConsent8.checked = result.purposes[7];
    purposeConsent9.checked = result.purposes[8];
    purposeConsent10.checked = result.purposes[9];
  });

  chrome.storage.local.get(['userlist'], function(result) {
	console.log("CMP load_options userlist", result);

	// make LI item fn
	let addWhitelistLI = (domain) => {
		let $li = document.createElement("li");
		$li.textContent = domain;
		whitelistUL.appendChild($li);
		// remove button
		let $rm = document.createElement("button");
		$rm.className = "btn btn-outline-danger";
		$rm.textContent = "x";
		$rm.onclick = () => {
			delete userlist[domain];
			saveOptions({userlist});
		};
		$li.appendChild($rm);
	};

	// wire up add control
	let $addToWhitelist = document.getElementById('addToWhitelist');
	$addToWhitelist.onchange = e => {
		let domain = $addToWhitelist.value;
		console.log("Add to whitelist",domain,e);
		if ( ! domain) return;
		console.log("domain",domain, getDomain(domain));
		userlist[domain] = {"off":true};
		addWhitelistLI(domain);
		$addToWhitelist.value = "";
		saveOptions({userlist});
	};

	let userlist = result.userlist || {};
	let whitelisted = Object.keys(userlist).filter(d => d !== "Description"); // HACK
	if ( ! whitelisted.length) {
		let $li = document.createElement("li");
		$li.textContent = "No whitelisted sites";
		whitelistUL.appendChild($li);
		return;
	}
	whitelisted.forEach(addToWhitelistLI);

  });
} // ./load_options()

document.getElementById('save').addEventListener('click',save_options);
window.onload = load_options();
