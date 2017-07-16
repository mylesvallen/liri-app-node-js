//'twitter' package assigned to the var myTweets for access to twitter API
var myTweets = require('twitter');

//Node-Spotify-Api assigned to variable to pull data from Spotify's API 
var spotifyThisSong = require('node-spotify-api');

//keys.js is a module with private access to Twitter & Spoitfy API's
var keys = require('./keys.js');

//request is used to grab data from the [OMDB API] 
var request = require("request");

//Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
var doWhatItSays = require('fs');

//chalk is a npm package that was included to make the interface more attractive, fun and easy to read. 
const chalk = require('chalk');
const log = console.log;




//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<TWITTER CODE BELOW!!!!!>>>>>>>>>>>>>>>>>>>>>>>>>
//==============================================================================

// var client = new myTweets({
//     consumer_key: keys.twitterKeys.consumer_key,
//     consumer_secret: keys.twitterKeys.consumer_secret,
//     access_token_key: keys.twitterKeys.access_token_key,
//     access_token_secret: keys.twitterKeys.access_token_secret
// });

// var params = { 
// 	screen_name: 'myles_code',  
// 	};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//         // console.log(tweets);
//     	for (var i = 0; i < tweets.length; i++) {
//     		console.log(chalk.italic.whiteBright(tweets[i].text));
//     	}
//     }
// });
//----------------------------------------------------------------------------
//SPOTIFY SPOTIFY SPOTIFY SPOTIFY SPOTIFY SPOTIFY SPOTIFY SPOTIFY SPOTIFY
// ****************  SPOTIFY CODE BELOW **********************************
//----------------------------------------------------------------------------
//   This will show the following information 
//   about the song in your terminal/bash window
//   * Artist(s)
//   * The song's name
//   * A preview link of the song from Spotify
//   * The album that the song is from
// var spotifyThisSong = require('node-spotify-api');

// var spotify = new spotifyThisSong({
//     id: keys.spotifyKeys.id,
//     secret: keys.spotifyKeys.secret
// });

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//         return log('Error occurred: ' + err);
//     }

//     log(chalk.bold.cyan("\nARTIST: ") + data.tracks.items[0].album.artists[0].name , 
//     	chalk.bold.magentaBright("\nSONG: ") , data.tracks.items[0].name ,
//         chalk.bold.cyan("\nPREVIEW LINK: ") , chalk.red.underline(data.tracks.items[0].href) ,
//         chalk.bold.magentaBright("\nALBUM: ") , data.tracks.items[0].album.name, "\n");
// });

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//%%%%%%%%%%%%%%%%%%%%%%%%% OMDB CODE BELOW %%%%%%%%%%%%%%%%%%%%%%%%%
//==============================================================================




// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie
// Then run a request to the OMDB API with the movie specified

var movieName = process.argv[2];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    log(JSON.parse(body).Title);
  }	else {
  	log(chalk.bold.cyan("Mr. Nobody"));
  }
});


//@@@@@@@@@@@@@@@@@@@@@@@@@@ #DoWhatItSays CODE BELOW @@@@@@@@@@@@@@@@@@@@@@@@@
//==============================================================================


// *It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
// *Feel free to change the text in that document to test out the feature for other commands.

