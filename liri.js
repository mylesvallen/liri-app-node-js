//chalk is a npm package that was included to make the interface more attractive, fun and easy to read. 
const chalk = require('chalk');
const log = console.log;
var align = require('align-text');
var center = require('center-align');

// on start function for node liri.js 
function start() {
    log("                                                                " +  chalk.bgMagenta.bold("HELLO WELCOME TO MYLES' LIRI BOT") + "\n \n" + "                                                                  " + chalk.bgMagenta.bold("MY WISH IS YOUR COMMAND!!!"));
};


//'twitter' package assigned to the var myTweets for access to twitter API
var Twitter = require('twitter');

// //Node-Spotify-Api assigned to variable to pull data from Spotify's API 
var Spotify = require('node-spotify-api');

//keys.js is a module with private access to Twitter & Spoitfy API's
var keys = require('./keys.js');

//request is used to grab data from the [OMDB API] 
var request = require("request");

//Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
var fs = require('fs');



//one of the 4 commands that can be used
// var doWhatItSays = doWhatItSays();


//action for switch cases 
var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "dowhatitsays":
        doWhatItSays();
        break;
};






//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<TWITTER CODE BELOW!!!!!>>>>>>>>>>>>>>>>>>>>>>>>>
//==============================================================================


function myTweets() {

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = {
        screen_name: 'myles_code',
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                log(chalk.bold.underline.bgMagentaBright("Follow me on twitter @Myles_Code"))
                log(center(chalk.italic.cyanBright(tweets[i].text) , 175));
            };
        };

    });
};





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

function spotifyThisSong() {

    var spotify = new Spotify({
        id: keys.spotifyKeys.id,
        secret: keys.spotifyKeys.secret
    });

    spotify.search({ type: 'track', query: value }, function(err, data) {
        if (err) {
            return log('Error occurred: ' + err);
        }

        log(chalk.bold.cyan("\nARTIST: ") + data.tracks.items[0].album.artists[0].name,
            chalk.bold.magentaBright("\nSONG: "), data.tracks.items[0].name,
            chalk.bold.cyan("\nPREVIEW LINK: "), chalk.red.underline(data.tracks.items[0].href),
            chalk.bold.magentaBright("\nALBUM: "), data.tracks.items[0].album.name, "\n");
    });
};

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

function movieThis() {
    var nodeArgs = process.argv;
    var movieName = "";

    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        } else {

            movieName += nodeArgs[i];

        }
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            log(chalk.bold.cyan("\nTITLE: "), chalk.bold.whiteBright(JSON.parse(body).Title),
                chalk.bold.magentaBright("\nRELEASED IN: ") + chalk.bold.whiteBright(JSON.parse(body).Year),
                chalk.bold.cyan("\nIMDB RATING: "), chalk.bold.redBright(JSON.parse(body).Rating[0].Value),
                chalk.bold.magentaBright("\nROTTEN TOMATOES RATING: "),
                chalk.bold.redBright(JSON.parse(body).Ratings[1].Value),
                chalk.bold.cyan("\nCOUNTRY RELEASED IN: "), chalk.bold.whiteBright(JSON.parse(body).Country),
                chalk.bold.magentaBright("\nLANGUAGE: "), chalk.bold.whiteBright(JSON.parse(body).Language),
                chalk.bold.cyan("\nPLOT: "), '"' + chalk.bold.whiteBright(JSON.parse(body).Plot) + '"',
                chalk.bold.magentaBright("\nACTORS: "), chalk.bold.green(JSON.parse(body).Actors)
            );
        };
    });
};


    // //@@@@@@@@@@@@@@@@@@@@@@@@@@ #DoWhatItSays CODE BELOW @@@@@@@@@@@@@@@@@@@@@@@@@
    // //==============================================================================


    function doWhatItSays() {

        fs.readFile("random.txt", "utf8", function(err, data) {
            if (err) {
                return console.log(err);
            }


            var output = data.split(",");

            // Loop Through the newly created output array
            for (var i = 0; i < output.length; i++) {

                log('hello')// Print each element (item) of the array/
            }
        });

    };


    // *It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

    // *Feel free to change the text in that document to test out the feature for other commands.