'use strict';
/* globals module inject chai */
var expect = chai.expect;

function randomNum (upperBound) {
  return Math.ceil(Math.random() * upperBound);
}

function makeFakeTweet () {
  return {
    id: randomNum(1000),
    text: lorem.ipsum('s3$140'),
    UserId: randomNum(50),
    favorite: false
  };
}

function makeFakeTweets () {
  var fakeTweets = new Array(randomNum(8) + 3);
  for (var i = 0; i < fakeTweets.length; i++) fakeTweets[i] = makeFakeTweet();
  return fakeTweets;
}

// tests proper

describe('`Tweet` factory', function () {

  /*------------------
      CONFIGURATION
  /------------------*/

  // load our Angular application from scratch
  beforeEach(module('angularCheckpoint'));

  // the `Tweet` factory will be loaded before each test
  // $httpBackend lets us "stub" $http responses
  var TweetFactory, $httpBackend, fakeReqTweet, fakeResTweet;
  beforeEach(inject(function ($injector) {
    TweetFactory = $injector.get('TweetFactory');
    $httpBackend = $injector.get('$httpBackend');
    fakeReqTweet = makeFakeTweet();
    fakeResTweet = {
      id: fakeReqTweet.id,
      text: fakeReqTweet.text,
      UserId: fakeReqTweet.UserId,
      User: {
        id: fakeReqTweet
      }
    };
  }));
  // checks that $httpBackend received and handled all expected calls
  afterEach(function(){
    try {
      $httpBackend.verifyNoOutstandingExpectation(false);
      $httpBackend.verifyNoOutstandingRequest();
    } catch (err) {
      this.test.error(err);
    }
  });

  /*------------------
      TEST SPECS
  /------------------*/

  it('`.fetchById` fetches a backend tweet by id', function (done) {
    $httpBackend
      .expect('GET', '/api/tweets/' + fakeReqTweet.id)
      .respond(200, fakeResTweet);
    TweetFactory.fetchById(fakeReqTweet.id)
      .then(function (tweet) {
        expect(tweet).to.deep.equal(fakeResTweet);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

  it('`.fetchAll` fetches all backend tweets', function (done) {
    var fakeTweets = makeFakeTweets();
    $httpBackend
      .expect('GET', '/api/tweets')
      .respond(200, fakeTweets);
    TweetFactory.fetchAll()
      .then(function (tweets) {
        expect(tweets).to.deep.equal(fakeTweets);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

  it('`.postTweet` creates a new backend tweets', function (done) {
    fakeReqTweet = {
      text: lorem.ipsum('s5$100'),
      name: lorem.ipsum('w2')
    };

    fakeResTweet = {
      text: fakeReqTweet.text
    };
    $httpBackend
      .expect('POST', '/api/tweets', fakeReqTweet)
      .respond(201, fakeResTweet);
    TweetFactory.postTweet(fakeReqTweet)
      .then(function (tweet) {
        expect(tweet).to.deep.equal(fakeResTweet);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

  it('`.favoriteTweet` updates an existing backend tweet', function (done) {
    fakeResTweet = Object.assign(fakeReqTweet, {favorite: true});
    $httpBackend
      .expect('PUT', '/api/tweets/' + fakeReqTweet.id, {favorite: false})
      .respond(200, fakeResTweet);
    TweetFactory.favoriteTweet(fakeReqTweet)
      .then(function (tweet) {
        expect(tweet).to.deep.equal(fakeResTweet);
      })
      .catch(done);
    $httpBackend.flush();
    done();
  });

});
