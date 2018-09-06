var express = require('express');
var port = 5900;
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var bar = require('./api/controllers/barController')
var app = express();

app.use(session({secret: "barshift",
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'api/views'));
app.set('view engine', 'ejs');

var routes = require('./api/routes/barRoutes');
routes(app);

app.listen(port);

console.log("Server running on port:" + port);