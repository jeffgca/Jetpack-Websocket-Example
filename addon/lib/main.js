var data = require("self").data;
var pageWorkers = require("page-worker");
var tabs = require("tabs");

var wsWorker = pageWorkers.Page({
    contentUrl: data.url('worker.html'),
    contentScriptFile: data.url('worker.js')
});

var L = console.log;

var client_Url = data.url("client.html");

var myPanel = require("panel").Panel({
    width: 500,
    height: 300,
    contentURL: data.url('client.html'),
    contentScriptFile: [data.url('jquery.min.js'), data.url('client.js')]
});

myPanel.on('message', function(m) {
    wsWorker.port.emit('message', m);
})

myPanel.on("show", function() {
    this.port.emit("showing", true);
});

wsWorker.on('message', function(m) {
    myPanel.port.emit("wsmessage", m);
});

require("widget").Widget({
    id: "mozilla-icon",
    label: "Open the Websocket Client Page",
    contentURL: "http://www.mozilla.org/favicon.ico",
    panel: myPanel
});
