var   express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      request        = require('request');

var apiKey = 'f67382942a8313a2d571adf0cf0fde7d';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');


//INDEX ROUTES
app.get('/', function (req, res) {
	res.render('index');
});

app.post('/', function (req, res) {
	let city = req.body.city;
	let url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

	request(url, function (err, response, body) {
	    if(err){
	      	res.render('show', {weather: null, error: 'Error, please try again'});
	    } else {
	      	let weather = JSON.parse(body);
	      	if(weather.main == undefined){
	        	res.render('show', {weather: null, error: 'Error, please try again'});
	    	} else {
	        	res.render('show', {currentWeather: weather, error: null});
	    	}
	    }
	});
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));