app.config(function ($stateProvider) {
  $stateProvider.state('tweet', {
    url: '/tweets/:tweetId',
    controller: 'TweetCtrl',
    template: '<tweet-item tweet="tweet"></tweet-item>',
    resolve: {
      tweet(TweetFactory, $stateParams) {
        return TweetFactory.fetchById($stateParams.tweetId);
      }
    }
  })
})
