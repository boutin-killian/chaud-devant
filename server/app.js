var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function (socket) {
    socket.on('changeFilter', function (data) {
        io.emit('changeFilterOnMap', data)
    });
});
