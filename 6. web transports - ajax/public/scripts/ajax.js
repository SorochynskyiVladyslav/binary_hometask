const ajaxRequest = function (options) {
    let url = options.url || '/';
    let method = options.method || 'GET';
    let data = options.data || {};
    let callback = options.callback || function () {};
    let xmlHttp = new XMLHttpRequest();
    let async = options.async  || 'true';

    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.send(JSON.stringify(data));

    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
            callback(xmlHttp.responseText);
        }
    }
}