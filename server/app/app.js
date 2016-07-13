'use strict';

var path = require('path');

var app = require('express')();

app.use(require('cors')());

app.use(require('./logging.middleware'));

app.use(require('./statics.middleware'));

app.use(require('./request-state.middleware'));

app.use('/api', require('../api/api.router'));

var pathToIndex = path.join(__dirname, '..', '..', 'public', 'index.html');

app.get('/*', function (req, res) {
  res.sendFile(pathToIndex);
})

app.use(require('./error.middleware'));

module.exports = app;
