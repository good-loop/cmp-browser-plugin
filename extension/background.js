chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
      // send response
      // additional security: check the origins
      if (request.message)
        console.log("Received at background script: " + request.message);
      var marketingConsent;
      chrome.storage.sync.get(['marketing'], function(result) {
        marketingConsent = result.marketing;
        console.log('Marketing consent: ' + result.marketing);
      });
      sendResponse({marketing: marketingConsent});
    });