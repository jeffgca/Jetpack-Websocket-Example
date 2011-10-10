var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + " Received request for " + request.url);
    response.writeHead(404);
    response.end();
});

var port = 8090;

var connections = [];

var broadcast = function(msg) {
    connections.forEach(function(cnn) {
        cnn.sendUTF(msg);
    });
}

var disConnectHandler = function(cnn) {
    for (i in connections) {
        if (connections[i] === cnn) {
            connections.splice(i, 1);
        }
    }
}

server.listen(port, function() {
    console.log((new Date()) + " Server is listening on port " + port);
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true
});

wsServer.on('connect', function(connection) {
    connections.push(connection);
    connection.sendUTF("Connected!");
    console.log((new Date()) + " Connection accepted.");
    connection.on('message', function(message) {
        // console.log('got message: ' + message);
        if (message.type === 'utf8') {
            console.log("Received Message: " + message.utf8Data);
            // connection.sendUTF(message.utf8Data);
            broadcast(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log("Received Binary Message of " + message.binaryData.length + " bytes");
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(connection) {
        disConnectHandler(connection);
        console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
    });
});
