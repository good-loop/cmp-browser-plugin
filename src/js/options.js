function save_options() {
    var marketingConsent = document.getElementById('marketing').checked;
    chrome.storage.sync.set({
      marketing: marketingConsent
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Preferences saved: ' + marketingConsent;
      setTimeout(function() {
        status.textContent = '';
      }, 1000);
    });
}

function get_options() {
    chrome.storage.sync.get(['marketing'], function(result) {
      console.log(result);
	    var marketingConsent = result.marketing;
      var settings = document.getElementById('settings');
      settings.textContent = 'Marketing consent: ' + marketingConsent;
	  });
}

document.getElementById('save').addEventListener('click',save_options);
document.getElementById('check').addEventListener('click',get_options);