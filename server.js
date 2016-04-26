var express = require("express");
var app = express();
var port = 3700;
var online = 0;

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);


io.sockets.on('connection', function (socket) {
    online += 1;
    socket.broadcast.emit('online', online);
    console.log("connection => Online: ", online);

    socket.on('message', function(message) {
        console.log(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('getOnline', function(message) {
        socket.emit('online', online);
    });

    socket.on('disconnect', function () {
        online -= 1;
        socket.broadcast.emit('online', online);
        console.log("disconnect => Online: ",online);
    });
});