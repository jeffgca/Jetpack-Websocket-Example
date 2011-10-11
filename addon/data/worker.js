
var ws = new MozWebSocket('ws://localhost:8090', 'jetpack-protocol');

ws.onmessage = function(ev) {
    self.postMessage(ev.data);
}

self.port.on("message", function(ev) {
    console.log("got message in worker: "+ev);
    ws.send(ev);
});
