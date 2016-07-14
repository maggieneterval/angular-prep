app.factory('TweetFactory', function ($http) {
  var tweetFactory = {};
  function parseData (res) {
    return res.data;
  }

  tweetFactory.fetchById = function (id) {
    return $http.get('/api/tweets/'+id)
    .then(parseData);
  };

  tweetFactory.fetchAll = function () {
    return $http.get('/api/tweets')
    .then(parseData);
  };

  tweetFactory.postTweet = function (tweet) {
    return $http.post('/api/tweets', tweet)
    .then(parseData);
  };

  tweetFactory.favoriteTweet = function (tweet) {
    return $http.put('/api/tweets/'+tweet.id, {favorite: !tweet.favorite})
    .then(parseData);
  };

  return tweetFactory;
});
