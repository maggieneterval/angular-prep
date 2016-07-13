'use strict';

var app = angular.module('angularCheckpoint', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider, $httpProvider) {
  // remove '#' from urls
	$locationProvider.html5Mode(true);
  $urlRouterProvider.when('/', '/tweets');
  // invalid routes redirect to the root
	$urlRouterProvider.otherwise('/tweets');
  // strip trailing slash off all $http requests (except for '/')
  var trailingSlash = /.\/$/;
  $httpProvider.interceptors.push(function(){
    return {
     request: function(config) {
      if (trailingSlash.test(config.url)) config.url = config.url.slice(0, -1);
      return config;
     }
    };
  });
})
.run(function ($rootScope) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
  });
});

// globals needed for the specs - don't delete!
var tweetItemDirective = function () {};

// these are simply defined here to reduce the number of
// initial errors in the specs when starting out
// you can ignore these if you wish
