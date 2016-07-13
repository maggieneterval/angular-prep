app.directive('tweetItem', tweetItemDirective = function () {
  return {
    restrict: 'E',
    templateUrl: '/app/tweets/item/tweet.item.html',
    scope: {
      tweet: '='
    },
    controller: 'TweetItemCtrl'
  };
});
