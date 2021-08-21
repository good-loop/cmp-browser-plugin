import { getDomain } from "./base/utils/miscutils";
import { loadOptions, saveOptions } from "./extension-utils";

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
	saveOptions({
		purposes: [purposeConsent1.checked, purposeConsent2.checked, purposeConsent3.checked,
		purposeConsent4.checked, purposeConsent5.checked, purposeConsent6.checked,
		purposeConsent7.checked, purposeConsent8.checked, purposeConsent9.checked,
		purposeConsent10.checked]
	}, function () {
		// Update status to let user know options were saved.
		let status = document.getElementById('status');
		status.textContent = 'Preferences saved!';
		setTimeout(function () {
			status.textContent = '';
		}, 1000);
	});
};

function load_options() {
	loadOptions(['purposes'], function (result) {
		console.log("CMP load_options", result);
		let purposes = result.purposes || {};
		purposeConsent1.checked = purposes[0];
		purposeConsent2.checked = purposes[1];
		purposeConsent3.checked = purposes[2];
		purposeConsent4.checked = purposes[3];
		purposeConsent5.checked = purposes[4];
		purposeConsent6.checked = purposes[5];
		purposeConsent7.checked = purposes[6];
		purposeConsent8.checked = purposes[7];
		purposeConsent9.checked = purposes[8];
		purposeConsent10.checked = purposes[9];
	});

	loadOptions(['userlist'], function (result) {
		console.log("CMP load_options userlist", result);

		// make LI item fn
		let appendWhitelistLI = (domain) => {
			let $li = document.createElement("li");
			$li.textContent = domain;
			whitelistUL.appendChild($li);
			// remove button
			let $rm = document.createElement("button");
			$rm.className = "btn btn-outline-danger";
			$rm.textContent = "x";
			$rm.title = "Remove from allow-list";
			$rm.onclick = () => {
				delete userlist[domain];
				saveOptions({ userlist });
				renderWhitelist();
			};
			$li.appendChild($rm);
		};

		// wire up add control
		let $addToWhitelist = document.getElementById('addToWhitelist');
		$addToWhitelist.onchange = e => {
			let domain = $addToWhitelist.value;
			console.log("Add to whitelist", domain, e);
			if (!domain) return;
			console.log("domain", domain, getDomain(domain));
			userlist[domain] = { "off": true };			
			$addToWhitelist.value = "";
			saveOptions({ userlist });
			renderWhitelist();
		};

		let userlist = result.userlist || {};
		const renderWhitelist = () => {
			let whitelisted = Object.keys(userlist).filter(d => d !== "Description"); // HACK
			if ( ! whitelisted.length) {
				let $li = document.createElement("li");
				$li.textContent = "No Allow-List sites";
				whitelistUL.appendChild($li);
				return;
			}
			whitelisted.forEach(appendWhitelistLI);
		};
		renderWhitelist();

	});
} // ./load_options()

document.getElementById('save').addEventListener('click', save_options);
window.onload = load_options();
