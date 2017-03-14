var netatmo = require('netatmo');
 
var auth = {
  "client_id": "58808d6be8ede19e1a8b4fa0",
  "client_secret": "TQn1JNQEwQo6GHRR9N4VvzUgdEHqb2AMmh49sBM55m",
  "username": "sylvestre.franceschi@gmail.com",
  "password": "Konica01!",
};
 
var api = new netatmo(auth);
 
// Get Stations Data 
// See docs: https://dev.netatmo.com/dev/resources/technical/reference/weatherstation/getstationsdata 
//api.getStationsData(function(err, devices) {
//  console.log(devices);
//});

var yesterday = new Date(2017, 1, 14).getTime() / 1000;

// Get Measure 
// See docs: https://dev.netatmo.com/dev/resources/technical/reference/common/getmeasure 
var options = {
  device_id: '70:ee:50:03:65:88',
  scale: 'max',
  date_begin: yesterday,
  type: ['Temperature', 'CO2', 'Humidity', 'Pressure', 'Noise'],
};




api.getMeasure(options, function(err, measure) {
  console.log(measure.length);
  console.log(measure[162]);

  var utcSeconds = measure[162].beg_time;
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  console.log(d);
});