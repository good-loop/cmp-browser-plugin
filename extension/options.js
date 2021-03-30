var purposeConsent1 = document.getElementById('purpose1');
var purposeConsent2 = document.getElementById('purpose2');
var purposeConsent3 = document.getElementById('purpose3');
var purposeConsent4 = document.getElementById('purpose4');
var purposeConsent5 = document.getElementById('purpose5');
var purposeConsent6 = document.getElementById('purpose6');
var purposeConsent7 = document.getElementById('purpose7');
var purposeConsent8 = document.getElementById('purpose8');
var purposeConsent9 = document.getElementById('purpose9');
var purposeConsent10 = document.getElementById('purpose10');

function save_options() {

    chrome.storage.sync.set({
      purposes: [purposeConsent1.checked,purposeConsent2.checked,purposeConsent3.checked,
        purposeConsent4.checked,purposeConsent5.checked,purposeConsent6.checked,
        purposeConsent7.checked,purposeConsent8.checked,purposeConsent9.checked,
        purposeConsent10.checked]
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Preferences saved!';
      setTimeout(function() {
        status.textContent = '';
      }, 1000);
    });
}

function load_options() {
  chrome.storage.sync.get(['purposes'], function(result) {
    console.log(result);
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
}

document.getElementById('save').addEventListener('click',save_options);
window.onload = load_options();
