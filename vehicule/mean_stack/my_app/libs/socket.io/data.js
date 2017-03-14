var libs = process.cwd() + '/libs/';
var Measure = require(libs + 'models/measure');
var log = require(libs + 'log')(module);
var db = require(libs + 'db/mongoose');

'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var connectionString = 'HostName=IoTHubENI.azure-devices.net;DeviceId=OBD_Device;SharedAccessKey=pdPXHD1uKUnpcdtndo771hXgSASfmw4CuveFvJBjPIw=';

var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
   return function printResult(err, res) {
     if (err) console.log(op + ' error: ' + err.toString());
     if (res) console.log(op + ' status: ' + res.constructor.name);
   };
 }


var datas = io
    .of('/datas')
    .on('connection', function(socket) {
        socket.on('data.array', function(data) {
            socket.broadcast.emit('data.array', data);
            var connectCallback = function (err) {
             if (err) {
               console.log('Could not connect: ' + err);
             } else {
               console.log('Client connected');

               // Create a message and send it to the IoT Hub every second
               setInterval(function(){

                  var data_str = JSON.stringify(data);
                   var message = new Message(data_str);
                   console.log("Sending message: " + message.getData());
                   client.sendEvent(message, printResultFor('send'));
               }, 1000);
             }
           };

           client.open(connectCallback);
        });
        socket.on('data', function(data) {
            Measure.create({
                label: data.label,
                value: data.value,
                unit: data.unit
            }, function(err, measure) {

                if (err)
                    log.error(err);
                else
                    log.info("New Measure - %s : %s", data.label, data.value);
            });

        });
    });
