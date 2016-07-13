'use strict';

var router = require('express').Router();

router.use('/users', require('./user.router'));
router.use('/tweets', require('./tweet.router'));

module.exports = router;
