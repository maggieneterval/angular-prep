'use strict';
var expect = chai.expect;

describe('Tweets detail', function () {

  beforeEach(module('angularCheckpoint'));

  describe('controller `TweetDetailCtrl`', function(){

    var $scope, theTweet;
    beforeEach(inject(function ($rootScope, $controller) {
      $scope = $rootScope.$new();
      theTweet = {};
      $controller('TweetCtrl', {
        $scope: $scope,
        theTweet: theTweet
      });
    }));

    it('places an injected `tweet` on the scope', function(){
      expect($scope.tweet).to.equal(theTweet);
    });

  });

  describe('state `tweet`', function () {

    var TweetFactory, $state, $rootScope, $injector;
    beforeEach(inject(function ($q, _$state_, _$rootScope_, _$injector_) {
      $state = _$state_;
      $rootScope = _$rootScope_;
      $injector = _$injector_;
      TweetFactory = {
        fetchById: chai.spy(function (id) {
          return $q.when({ id: id });
        })
      };
    }));

    it('url compiles correctly', function () {
      var url = $state.href('singleTweet', {tweetId: '123'});
      expect(url).to.equal('/123');
    });

    it('resolves with a specific `tweet` from the `TweetFactory` factory', function (done) {
      var tweetDetailState = $state.get('singleTweet');
      var fn = tweetDetailState.resolve.theTweet;
      expect(fn).to.be.a('function');
      var uniqueId = {};
      var result = $injector.invoke(fn, null, {
        TweetFactory: TweetFactory,
        $stateParams: { tweetId: uniqueId }
      });
      expect(TweetFactory.fetchById).to.have.been.called.once.with(uniqueId);
      result.then(function(tweet){
        expect(tweet).to.eql({ id: uniqueId });
      }).catch(done);
      done();
    });

  });

});
