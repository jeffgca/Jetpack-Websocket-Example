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

require("widget").Widget({
    id: "mozilla-icon",
    label: "Open the Websocket Client Page",
    contentURL: "http://www.mozilla.org/favicon.ico",
    onClick: function() {
        tabs.open(data.url("client.html"))
    }
});
