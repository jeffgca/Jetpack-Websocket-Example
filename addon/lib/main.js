var data = require("self").data;
var pageWorkers = require("page-worker");
var tabs = require("tabs");

var worker = pageWorkers.Page({
    contentUrl: data.url('worker.html'),
    contentScriptFile: data.url('worker.js')
});

worker.on('message', function(m) {
    console.log("Message from worker:" + m);
});

worker.on('error', function(err) {
    console.log(err);
});

var client_Url = data.url("client.html");

require("widget").Widget({
    id: "mozilla-icon",
    label: "Open the Websocket Client Page",
    contentURL: "http://www.mozilla.org/favicon.ico",
    onClick: function() {
        tabs.open(client_Url);
    }
});

tabs.on("ready", function(tab) {
    var tabWorker = tab.attach({
        contentScriptFile: [ data.url('jquery.min.js'), data.url('client.js') ]
    });
    tabWorker.on("message", function(m) {
        worker.postMessage(m);
    });
});
