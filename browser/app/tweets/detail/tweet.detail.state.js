app.config(function ($stateProvider) {
  $stateProvider.state('singleTweet', {
    url: '/:tweetId',
    controller: 'TweetCtrl',
    template: '<tweet-item tweet-to-use="tweet"></tweet-item>',
    resolve: {
      theTweet: function (TweetFactory, $stateParams) {
        return TweetFactory.fetchById($stateParams.tweetId);
      }
    }
  })
})
