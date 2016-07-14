app.controller('TweetItemCtrl', function ($scope, TweetFactory) {
  $scope.toggleFavorite = function () {
    TweetFactory.favoriteTweet($scope.tweet)
    .then(function (tweet) {
      $scope.tweet = tweet;
    });
  };
});
