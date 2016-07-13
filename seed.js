'use strict';

var	_ = require('lodash');
var Bluebird = require('bluebird');
var db = require('./server/db/database');
var models = require('./server/db');
var User = models.User;
var Tweet = models.Tweet;
var chalk = require('chalk');

var users = [
	{
		name: 'Donald Trump',
		pictureUrl: 'http://i.imgur.com/CTil4ns.jpg'
	},
	{
		name: 'Ted Cruz',
		pictureUrl: 'http://i.imgur.com/Ru6KUIm.jpg'
	},
	{
		name: 'Bernie Sanders',
		pictureUrl: 'http://i.imgur.com/KhisgEO.jpg'
	},
	{
		name: 'Hillary Clinton',
		pictureUrl: 'http://i.imgur.com/XbsjDcr.jpg'
	},
	{
		name: 'Marco Rubio',
		pictureUrl: 'http://i.imgur.com/cYxVyyg.jpg'
	},
	{
		name: 'John Kasich',
		pictureUrl: 'http://i.imgur.com/I8WtzSw.jpg'
	},
	{
		name: 'Drake',
		pictureUrl: 'http://i.imgur.com/f5Q1IZN.jpg'
	},
	{
		name: 'Kanye West',
		pictureUrl: 'http://i.imgur.com/MItGWVS.jpg'
	},
	{
		name: 'Taylor Swift',
		pictureUrl: 'http://i.imgur.com/JKInSVz.jpg'
	},
	{
		name: 'JSON Unger',
		pictureUrl: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/1557487_2740185827950_1441182074220946025_n.jpg?oh=63f59c6e1cb1abcc1755dee16d13f382&oe=583570CB'
	}
];

var tweets = [
	{ text: 'Make #Fullstack great again!', user: 'Donald Trump' },
	{ text: 'We need a shutdown of #Fullstack until #Avalon is allowed again.', user: 'Ted Cruz' },
	{ text: '#Fullstack should be free for all!', user: 'Bernie Sanders' },
	{ text: 'It takes a village to raise a programmer. #coding #womenwhocode', user: 'Hillary Clinton' },
	{ text: 'They\'re making Promises they cannot resolve. #marco #polo', user: 'Marco Rubio' },
	{ text: 'Only one person tweeting here has ever written Hello World.', user: 'John Kasich' },
	{ text: 'I\'ma let you finish coding, but… #Yeezus #pablo', user: 'Kanye West' },
	{ text: 'I knew you were trouble when you logged in.', user: 'Taylor Swift' },
	{ text: 'I think what Kanye West is going to mean is something similar to what Steve Jobs means.', user: 'Kanye West' },
	{ text: 'I\'ve got some whitespace baby — and I\'ll write your `.name`', user: 'Taylor Swift' },
	{ text: 'Just hold on, we\'re going to the homepage #views #HotlineBling', user: 'Drake' },
	{ text: 'Isn\'t Angular fun?! #review', user: 'JSON Unger' }
];

function createTweets (tweetArr, userArr) {
	var tweetsToCreate = [];
	while (tweetArr.length) {
		var tweet = tweetArr.pop();
		var text = tweet.text;
		var UserId = _.find(userArr, function (user) {
			return user.name === tweet.user;
		}).id;
		tweetsToCreate.push({ text, UserId });
	}
	return tweetsToCreate;
}

var start = new Date();
Bluebird.resolve(db.drop({ cascade: true }))
.then(function () {
	console.log('Emptying the database')
	return db.sync({ force: true })
})
.then(function () {
	console.log('Creating unique users');
	return Bluebird.map(users, function (user) {
		return User.create(user);
	});
})
.then(function (createdUsers) {
	var tweetsToCreate = createTweets(tweets, createdUsers);
	console.log('Creating tweets');
	return Bluebird.map(tweetsToCreate, function (tweet) {
		return Tweet.create(tweet);
	});
})
.then(function () {
	console.log(chalk.green('Seeding successful'));
})
.catch(function (err) {
	console.error(chalk.red(err));
	console.error(err.stack);
})
.finally(function () {
	var end = new Date();
	console.log('Terminated after %ds', (end-start)/1000);
	db.close();
	return null;
});
