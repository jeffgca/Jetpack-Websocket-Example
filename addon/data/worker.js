var L = console.log;
var ws = new MozWebSocket('ws://localhost:8090', 'jetpack-protocol');

ws.onmessage = function(ev) {
    self.postMessage(ev.data);
}

self.port.on('message', function(m) {
    ws.send(m);
});
