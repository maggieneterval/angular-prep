app.config(function ($stateProvider) {
  $stateProvider.state('tweets', {
    url: '/tweets',
    templateUrl: '/app/tweets/list/tweet.list.html',
    controller: 'TweetListCtrl',
    resolve: {
      allTweets: function (TweetFactory) {
        return TweetFactory.fetchAll();
      }
    }
  })
})
