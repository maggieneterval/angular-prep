app.controller('TweetListCtrl', function ($scope, tweets, TweetFactory, $state) {
  $scope.tweets = tweets;
  $scope.reverse = true;
  $scope.listOrder = 'dateCreated';

  $scope.sortBy = function (prop) {
    $scope.reverse = ($scope.listOrder === prop) ? !$scope.reverse : true;
    $scope.listOrder = prop;
  };

  $scope.post = function () {
    TweetFactory.postTweet($scope.tweet)
    .then(function (newTweet) {
      $state.go('tweet', {tweetId: newTweet.id});
    });
  }
});
