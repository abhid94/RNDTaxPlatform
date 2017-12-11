//set up express
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var indexController = require('./controllers/indexController');

app.use(bodyParser.json());
//set the view engine to ejs
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
indexController(app);

//listen to port
app.listen(3000);
console.log('Listenting to port 3000');
