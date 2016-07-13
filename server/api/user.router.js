'use strict';

var router = require('express').Router();
var _ = require('lodash');

var models = require('../db');
var Tweet = models.Tweet;
var User = models.User;
var HttpError = require('../utils/HttpError');

router.param('id', function (req, res, next, id) {
  User.findById(id)
  .then(function (user) {
    if (user) {
      req.user = user;
      next();
    } else {
      throw HttpError(404);
    }
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  User.findAll()
  .then(function (users) {
    res.json(users);
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  res.json(req.user);
});

router.get('/:id/tweets', function (req, res, next) {
  Tweet.findAll({ where: { UserId: req.user.id } })
  .then(function (tweets) {
    res.json(tweets);
  })
  .catch(next);
});

module.exports = router;
