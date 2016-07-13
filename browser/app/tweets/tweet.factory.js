app.factory('TweetFactory', function ($http) {
  var tweetFactory = {};
  function parseData (res) {
    return res.data;
  }

  tweetFactory.fetchAll = function () {
    return $http.get('/api/tweets')
    .then(parseData);
  };

  tweetFactory.fetchById = function (id) {
    return $http.get('/api/tweets/'+id)
    .then(parseData);
  };

  tweetFactory.favoriteTweet = function (tweet) {
    var body = {};
    body.favorite = !tweet.favorite;
    return $http.put('/api/tweets/'+tweet.id, body)
    .then(parseData);
  };

  tweetFactory.postTweet = function (tweet) {
    return $http.post('/api/tweets', tweet)
    .then(parseData);
  }

  return tweetFactory;
})
