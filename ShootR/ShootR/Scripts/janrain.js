(function () {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};

    var url = document.location.href;
    var path = url.split("/");
    path = path[path.length - 1];
    url = url.replace("default.aspx", "");
    url = url.replace("controller.aspx", "");
    if (url[url.length - 1] != "/") {
        url += "/";
    }

    if (url[url.length - 1] !== "/") {
        url += "/";
    }

    janrain.settings.tokenUrl =  url + 'Authentication/LoginHandler.ashx?path='+path;
    janrain.settings.type = "embed";

    function isReady() { janrain.ready = true; };
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", isReady, false);
    } else {
        window.attachEvent('onload', isReady);
    }

    var e = document.createElement('script');
    e.type = 'text/javascript';
    e.id = 'janrainAuthWidget';

    if (document.location.protocol === 'https:') {
        e.src = 'https://rpxnow.com/js/lib/shootr/engage.js';
    } else {
        e.src = 'http://widget-cdn.rpxnow.com/js/lib/shootr/engage.js';
    }

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);
})();