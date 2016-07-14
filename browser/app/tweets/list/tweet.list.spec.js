'use strict';
var expect = chai.expect;

describe('Tweets list', function () {

  beforeEach(module('angularCheckpoint'));

  describe('controller `TweetListCtrl`', function () {

    var $scope, TweetFactory, $state, allTweets;
    beforeEach(inject(function($rootScope, $q, $controller, _$state_){
      $scope = $rootScope.$new();
      allTweets = [];
      TweetFactory = {
        postTweet: chai.spy(function () {
          return $q.when({id: '123'});
        })
      };

      $state = _$state_;
      $state.go = function () {
        $state._mockUrl = $state.href.apply($state, arguments);
      };

      $controller('TweetListCtrl', {
        $scope: $scope,
        allTweets: allTweets,
        TweetFactory: TweetFactory,
        $state: $state
      });
    }));

    it('places injected `tweets` on the scope', function(){
      expect($scope.tweets).to.equal(allTweets);
    });

    it('initializes `reverse` and `listOrder` on the scope', function () {
      expect($scope.reverse).to.be.true;
      expect($scope.listOrder).to.equal('dateCreated');
    });

    describe('`.sortBy` scope method', function () {

      it('properly alters `$scope.listOrder`', function () {
        $scope.sortBy('User.name');
        expect($scope.listOrder).to.equal('User.name');
        $scope.sortBy('dateCreated');
        expect($scope.listOrder).to.equal('dateCreated');
      });

      it('reverses the order if the given sort is already the `$scope.listOrder`', function () {
        $scope.sortBy('User.name');
        expect($scope.listOrder).to.equal('User.name');
        expect($scope.reverse).to.equal(true);
        $scope.sortBy('User.name');
        expect($scope.reverse).to.equal(false);
      })

    });

    describe('`.post` scope method', function () {

      it('uses the `TweetFactory` factory', function () {
        $scope.post();
        expect(TweetFactory.postTweet).to.have.been.called.once.with($scope.tweet);
      });

      // This should pass once you have defined the `singleTweet` state
      it("goes to the tweet's state after it has been added", function () {
        $scope.post();
        expect($state._mockUrl).not.to.equal('/123');
        $scope.$digest();
        expect($state._mockUrl).to.equal('/123');
      });

    });

  });

  describe('state `tweets`', function () {

    var TweetFactory, $state, $rootScope, $injector;
    beforeEach(inject(function ($q, _$state_, _$rootScope_, _$injector_) {
      $state = _$state_;
      $rootScope = _$rootScope_;
      $injector = _$injector_;
      TweetFactory = {
        fetchAll: chai.spy(function () {
          return $q.when([{id: '123'}, {id: '456'}]);
        })
      };
    }));

    it('url compiles correctly', function () {
      var url = $state.href('tweets');
      expect(url).to.equal('/tweets');
    });

    it('resolves with all `tweets` from the `TweetFactory` factory', function (done) {
      var tweetListState = $state.get('tweets');
      var fn = tweetListState.resolve.allTweets;
      expect(fn).to.be.a('function');
      var result = $injector.invoke(fn, null, {
        TweetFactory: TweetFactory
      });
      expect(TweetFactory.fetchAll).to.have.been.called.once;
      result.then(function(tweets){
        expect(tweets).to.eql([{id: '123'}, {id: '456'}]);
      }).catch(done);
      done();
    });

  });

});
