"use strict";

var express = require('express');

var path = require('path');

var favicon = require('serve-favicon');

var logger = require('morgan');

require('dotenv').config();

require('./config/database');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express["static"](path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
var port = process.env.PORT || 3001;
app.use('/api/users', require('./routes/users'));
app.listen(port, function () {
  console.log("Express app running on port ".concat(port));
});
//# sourceMappingURL=server.dev.js.map