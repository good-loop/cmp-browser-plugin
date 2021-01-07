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
    chrome.storage.sync.get(['purpose1', 'purpose2', 'purpose3', 'purpose4',
    'purpose5', 'purpose6', 'purpose7', 'purpose8', 'purpose9', 'purpose10'], function(result) {
      var settings = document.getElementById('settings');
      settings.setAttribute('style', 'white-space: pre;');
      settings.textContent = "Storage on device consent: " + result.purpose1 + "\r\n";
      settings.textContent += "Show basic ads consent: " + result.purpose2 + "\r\n";
      settings.textContent += "Personalised ads profile consent: " + result.purpose3 + "\r\n";
      settings.textContent += "Show personalised ads consent: " + result.purpose4 + "\r\n";
      settings.textContent += "Personalised content profile consent: " + result.purpose5 + "\r\n";
      settings.textContent += "Show personalised content consent: " + result.purpose6 + "\r\n";
      settings.textContent += "Measure ad performance consent: " + result.purpose7 + "\r\n";
      settings.textContent += "Measure content performance consent: " + result.purpose8 + "\r\n";
      settings.textContent += "Apply market research consent: " + result.purpose9 + "\r\n";
      settings.textContent += "Use of data to improve products consent: " + result.purpose10 + "\r\n";
	  });
}

document.getElementById('save').addEventListener('click',save_options);
document.getElementById('check').addEventListener('click',get_options);