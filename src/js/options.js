function save_options() {
    var marketingConsent = document.getElementById('marketing').checked;
    chrome.storage.sync.set({
      marketing: marketingConsent
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Preferences saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 1000);
    });
}

document.getElementById('save').addEventListener('click',save_options);