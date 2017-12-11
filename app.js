//set up express
var express = require('express');
var app = express();
var router = express.Router();

//set the view engine to ejs
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
  var drinks = [
      { name: 'Bloody Mary', drunkness: 3 },
      { name: 'Martini', drunkness: 5 },
      { name: 'Scotch', drunkness: 10 }
  ];
  var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

  res.render('pages/index', {
      drinks: drinks,
      tagline: tagline
  });
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

//listen to port
app.listen(3000);
console.log('Listenting to port 3000');
