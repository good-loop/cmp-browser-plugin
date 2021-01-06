function save_options() {
    var consent1 = document.getElementById('1').checked;
    var consent2 = document.getElementById('2').checked;
    chrome.storage.sync.set({
      purpose1: consent1,
      purpose2: consent2
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Preferences saved';
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