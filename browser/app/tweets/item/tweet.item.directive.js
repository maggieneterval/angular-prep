app.directive('tweetItem', tweetItemDirective = function () {
  return {
    restrict: 'E',
    scope: {
      tweet: '=tweetToUse'
    },
    controller: 'TweetItemCtrl',
    templateUrl: '/app/tweets/item/tweet.item.html'
  };
});
