'use strict';

var router = require('express').Router();

router.use('/tweets', require('./tweet.router'));

module.exports = router;
