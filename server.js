// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
// require bodyParser
var bodyParser = require('body-parser');
// require session:
var session = require('express-session');


// use session:
app.use(session({secret: 'grantssecretencrypter'}));  // string for encryption
// use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// submit data with post and store it in session
app.post('/submitForm', function(req, res) {
    console.log("POST DATA", req.body);
    req.session.result = req.body;
 res.redirect('/result');
})
// render result with session data passed
app.get('/result', function(req, res) {
 res.render('result', {userResult: req.session.result});
})
// go back route
app.post('/back', function(req, res) {
 res.redirect('/');
})


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
