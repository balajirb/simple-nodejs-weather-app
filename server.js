const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

//const apiKey = '5fe747b572f347393f26fba3c3293296';
var apiKey=process.env.API_KEY;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
  console.log("HostName: " + process.env.HOSTNAME);
})

app.post('/', function (req, res) {
  let city = req.body.city;
  console.log('API Key from the environment variable is:'+apiKey);

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
