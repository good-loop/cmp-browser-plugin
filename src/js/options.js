function save_options() {
    var purposeConsent1 = document.getElementById('purpose1').checked;
    var purposeConsent2 = document.getElementById('purpose2').checked;
    var purposeConsent3 = document.getElementById('purpose3').checked;
    var purposeConsent4 = document.getElementById('purpose4').checked;
    var purposeConsent5 = document.getElementById('purpose5').checked;
    var purposeConsent6 = document.getElementById('purpose6').checked;
    var purposeConsent7 = document.getElementById('purpose7').checked;
    var purposeConsent8 = document.getElementById('purpose8').checked;
    var purposeConsent9 = document.getElementById('purpose9').checked;
    var purposeConsent10 = document.getElementById('purpose10').checked;
    chrome.storage.sync.set({
      purpose1: purposeConsent1,
      purpose2: purposeConsent2,
      purpose3: purposeConsent3,
      purpose4: purposeConsent4,
      purpose5: purposeConsent5,
      purpose6: purposeConsent6,
      purpose7: purposeConsent7,
      purpose8: purposeConsent8,
      purpose9: purposeConsent9,
      purpose10: purposeConsent10
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Preferences saved!';
      setTimeout(function() {
        status.textContent = '';
      }, 1000);
    });
}

function get_options() {
    chrome.storage.sync.get(['purpose1'], function(result) {
	    var consent1 = result.purpose1;
      var settings = document.getElementById('settings');
      settings.textContent = 'Storage consent: ' + consent1;
	  });
}

document.getElementById('save').addEventListener('click',save_options);
document.getElementById('check').addEventListener('click',get_options);