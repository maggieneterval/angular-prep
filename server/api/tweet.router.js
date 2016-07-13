'use strict';

var router = require('express').Router();
var _ = require('lodash');

var db = require('../db/database');
var models = require('../db');
var Tweet = models.Tweet;
var User = models.User;
var HttpError = require('../utils/HttpError');

router.param('id', function (req, res, next, id) {
  Tweet.findById(id)
  .then(function (tweet) {
    if (tweet) {
      req.tweet = tweet;
      next();
    } else {
      throw HttpError(404);
    }
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  var query = Tweet.findAll();
  if (req.query.hash) {
    query = Tweet.findByHashtag('#'+req.query.hash);
  }
  query
  .then(function (tweets) {
    res.json(tweets);
  })
  .catch(next);
});

router.get('/:id', function (req, res) {
  res.json(req.tweet);
});

router.post('/', function (req, res, next) {
  User.findOrCreate({ where: { name: req.body.name } })
  .then(function (user) {
    if (Array.isArray(user)) user = user[0];
    var UserId = user.id;
    var text = req.body.text;
    return Tweet.create({ text, UserId });
  })
  .then(function (tweet) {
    res.status(201).json(tweet);
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  _.extend(req.tweet, req.body);
  req.tweet.save()
  .then(function (updatedTweet) {
    res.json(updatedTweet);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.tweet.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

module.exports = router;
