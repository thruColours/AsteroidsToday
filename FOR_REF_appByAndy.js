const Settings = require('./config/settings.json');
const fetch = require('node-fetch');

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/cu.usbmodem1411', { baudRate: 9600 });
const parser = new Readline();

const api = `${Settings.apiURL}${Settings.key}`

const date = new Date();

const tDay = date.getDate();
const tMonth = date.getMonth()+1;
const tYear = date.getFullYear();

const currentDate = tYear + '-' + '0'+tMonth + '-' + tDay;

let oldAsteroids = [];

port.pipe(parser)

// the open event is fired when the communication
// with serial is opened for the first time
port.on('open', function() {
  setTimeout(function() {
    checkData()
  }, 1500);
});

port.on('data', line => console.log(`> ${line}`));

setInterval(checkData, 60000);

function checkData() {
    fetch(api, {
      method: 'GET'
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      } else {
        throw new Error('BAD RESPONSE');
      }
    })
    .then((json) => {
      var hazardousAsteroids = json.near_earth_objects[currentDate].filter((value) => {
        return value.is_potentially_hazardous_asteroid;
      });
      var totalHazardous = hazardousAsteroids.length;
      var totalAsteroids = json.near_earth_objects[currentDate].length;

      var newHazardousAsteroids = hazardousAsteroids.filter(a => {
        return oldAsteroids.indexOf(a.id) < 0;
      });

      oldAsteroids = oldAsteroids.concat(newHazardousAsteroids.map(a => a.id));

      // Format the total amount of Hazardous and Non-hazardous Asteroid data for concatenation.
      let asteroidData = `TA:${totalAsteroids};`
      let hazardousData = `TH:${totalHazardous};`

      // Concatenate both total amounts together into one string
      var stringDataTransfer = asteroidData.concat(hazardousData);

      // Take the Array of IDs from Hazardous Asteroids and format it into a string.
      var asteroidArrayData = newHazardousAsteroids.join(';');

      // Take the string of IDs and format it into a more understandable way.
      var asteroidDataTransfer = `NHA:${newHazardousAsteroids.length};`;

      // Take both data sets and add them together into a string to be sent via Serial.
      var dataTransfer = `${stringDataTransfer}${asteroidDataTransfer}`;
      console.log(dataTransfer);
      port.write(dataTransfer+'\n');
    })
    .catch((err) => {
      console.log('ERROR:', err.message);
    });
}
