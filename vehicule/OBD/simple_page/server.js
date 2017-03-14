var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3080, function() {
    console.log('Example app listening on port 3080!');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


var datas = io
    .of('/datas')
    .on('connection', function(socket) {
      console.log('new client');
        socket.on('data.array', function(data) {
            socket.broadcast.emit('data.array', data);
        });
    });
