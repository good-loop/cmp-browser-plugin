const html = location.pathname.split('/').slice(-1)[0];
document.getElementById('next').addEventListener('click', nextPage);

if (html == "install-page3.html") {
    document.getElementById('input').addEventListener('submit', addWebsite);
}

const getDomain = (temp) => {
	let m = temp.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/);
	return m[1];
};

function nextPage() {
    var url;
    if (html == "install-page1.html") {
        url = chrome.extension.getURL("install-page2.html");
        window.open(url, "_self");
    } else if (html == "install-page2.html") {
        url = chrome.extension.getURL("install-page3.html");
        window.open(url, "_self");
    } else if (html == "install-page3.html") { 
        window.close();
    }
}

function addWebsite(event) {
    event.preventDefault();
    var website = document.getElementById('website').value;
    try {
        var domain = getDomain(website);
        chrome.storage.local.get(['userlist'], function(data){
            let userlistjson = data.userlist;
            userlistjson[domain] = {"off": true};
            chrome.storage.local.set({userlist:userlistjson}, function(){
                console.log("Updated cmp for " + domain);
            });
        });
        var ul = document.getElementById("allowlisted");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(domain));
        ul.appendChild(li);
    } catch (error) {
        alert('Website entered not recognised! Alternatively, you could turn off the extension when visiting the website.')
    }
}
