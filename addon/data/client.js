
var L = console.log;

$(document).ready(function() {
    $('#client-form').submit(function() {
        var m = $('#msg').val();
        self.postMessage(m);
        $('#msg').val("").focus();
        return false;
    });
});

var PREFIX = ">> ";

self.port.on("wsmessage", function(m) {
    
    L("got message in content script: "+m);
    $('#log').append(PREFIX+m+"\n");
});

self.port.on("showing", function() {
    $('#msg').val("").focus();
});