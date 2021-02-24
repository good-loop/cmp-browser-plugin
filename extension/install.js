document.getElementById('next').addEventListener('click', nextpage);

function nextpage() {
    var url;
    html = location.pathname.split('/').slice(-1)[0]
    if (html == "install-page1.html") {
        url = chrome.extension.getURL("install-page2.html");
        window.open(url, "_self");
    } else if (html == "install-page2.html") {
        url = chrome.extension.getURL("install-page3.html");
        window.open(url, "_self");
    } else if (html == "install-page3.html") { 
        window.close() 
    }
    
}

