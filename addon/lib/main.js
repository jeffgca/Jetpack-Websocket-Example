var data = require("self").data;
var pageWorkers = require("page-worker");

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
