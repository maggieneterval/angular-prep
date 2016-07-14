app.controller('TweetListCtrl', function ($scope, allTweets, TweetFactory, $state) {
  $scope.tweets = allTweets;
  $scope.reverse = true;
  $scope.listOrder = 'dateCreated';

  $scope.sortBy = function (prop) {
    if ($scope.listOrder === prop) {
      $scope.reverse = !$scope.reverse;
    } else {
      $scope.reverse = true;
    }
    $scope.listOrder = prop;
  };

  $scope.post = function () {
    TweetFactory.postTweet($scope.tweet)
    .then(function (tweet) {
      $state.go('singleTweet', {tweetId: tweet.id});
    })
  }
});
