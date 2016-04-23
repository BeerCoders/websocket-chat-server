var express = require("express");
var app = express();
var port = 3700;
var online = 0;

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);


io.sockets.on('connection', function (socket) {
    socket.emit('welcome', { message: 'welcome to the BeerCoders chat' });
    online += 1;
    socket.emit('online', online);
    console.log("connection => Online: ", online);

    socket.on('message', function(message) {
        console.log(message);
        socket.emit('message', message);
    });

    socket.on('disconnect', function () {
        online -= 1;
        socket.emit('online', online);
        console.log("disconnect => Online: ",online);
    });
});