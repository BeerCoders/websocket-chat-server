var express = require('express');

var app = express.createServer();
var io = require('socket.io').listen(app);
var online = 0;

app.listen(3000, function () {
    console.log('Server is running', 3000)
});

io.sockets.on('connection', function (socket) {
    online += 1;
    socket.broadcast.emit('online', online);
});

socket.on('disconnect', function () {

    socket.emit('disconnected');
    online -= 1;
    socket.broadcast.emit('online', online);
});

socket.on('setNick', function (data) {
    socket.set('nick', data);
});

socket.on('message', function (message) {
    socket.get('nick', function (error, name) {
        var data = { 'message' : message, nick : name };
        socket.broadcast.emit('message', data);
        console.log("user " + name + " send this : " + message);
    })
});

