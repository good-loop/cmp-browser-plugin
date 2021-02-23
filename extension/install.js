document.getElementById('next').addEventListener('click', nextpage);

function nextpage() {
    const url = chrome.extension.getURL('install-page2.html');
    window.open(url, "_self");
}

