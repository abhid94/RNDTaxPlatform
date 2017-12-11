//set up express
var express = require('express');
var app = express();
var router = express.Router();

//set the view engine to ejs
app.set('view engine', 'ejs');

//static files
//app.use(express.static('./public'));

// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

//listen to port
app.listen(3000);
console.log('Listenting to port 3000');
