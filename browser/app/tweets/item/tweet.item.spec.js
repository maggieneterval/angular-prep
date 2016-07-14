'use strict';
var expect = chai.expect;

describe('Tweet item', function () {

  beforeEach(module('angularCheckpoint'));

  describe('directive `tweetItem`', function () {

    var ddo;
    before(function () {
      ddo = tweetItemDirective();
    });

    it('is an element directive', function () {
      expect(ddo.restrict).to.equal('E');
    });

    it('has isolate scope', function () {
      expect(ddo.scope).to.be.an('object');
    });

    // remember camelCase and kebab-case rules
    it('accepts a model parameter `tweet`', function () {
      expect(ddo.scope.tweet).to.equal('=tweetToUse');
    });

  });

  describe('controller `TweetItemCtrl', function () {

    var TweetFactory, $scope;
    beforeEach(inject(function ($controller, $rootScope, $q) {
      $scope = $rootScope.$new();
      TweetFactory = {
        favoriteTweet: chai.spy(function (tweet) {
          return $q.when({id: tweet.id, favorite: !tweet.favorite});
        })
      };
      $controller('TweetItemCtrl', {
        $scope: $scope,
        TweetFactory: TweetFactory
      });
    }));

    describe('`.toggleFavorite` scope method', function () {

      it('uses the `TweetFactory` factory', function () {
        $scope.tweet = { id: '123', favorite: false };
        $scope.toggleFavorite();
        expect(TweetFactory.favoriteTweet).to.have.been.called.once.with($scope.tweet);
      });

      it('sets the tweet\'s `favorite` property', function () {
        $scope.tweet = { id: 'abc123', favorite: false };
        $scope.tweet = $scope.toggleFavorite();
        $scope.$digest();
        expect($scope.tweet.favorite).to.be.true;
      });

    });

  });

});
