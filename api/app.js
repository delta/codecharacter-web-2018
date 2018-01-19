"use strict"; 
const express = require("express");
const path = require("path");
const favicon = require("static-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const routes = require("./routes/index");
const session = require("express-session");

const app = express();
const secretString = require("./config/serverConfig").cookieKey;
//session setup
app.use(session({
	"secret": secretString,
	"cookie": {
	  "maxAge": 186000000,
	},
	"path": "/",
}));
app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(secretString));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	next();
});
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function(err, req, res) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: err
	});
});


module.exports = app;
