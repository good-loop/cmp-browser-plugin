# CMP Chrome Plugin

A chrome browser extension for Good-Loop and My-Loop

To install from a local git checkout:

1. `npm i`, `npm run compile` (or `watch.sh`)
2. Put <chrome://extensions/> in your browser
3. ...Switch on Developer Mode (it's a toggle in the top-right)
4. ...Click on "Load Unpacked"
5. ...Pick the `cmp-browser-plugin/extension` folder to load.

Test: open the console and look for messages

Publish here: https://chrome.google.com/webstore/devconsole/

## Future Work

How to flag failures and efficiently patch them?

Is the adblocker up to date? 

Test with Playwright?
https://playwright.dev/docs/chrome-extensions#headless-mode

Mobile app browser

Cross-browser - see: 
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension