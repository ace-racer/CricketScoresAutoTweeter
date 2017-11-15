console.log('Starting IPL cricket Twitter');
var RETURN_TEXT = "";
var constants = require('./Constants.js');
var request = require("request");
var Twitter = require("twitter");

request.post(constants.CRICAPI_GETMATCHESURL,
	{ json: { "apikey": constants.CRICAPI_KEY } },
    function (error, response, body) {
	if (!error && response.statusCode == 200) {
		// console.log(body)
		var matches = body.matches;
		var matchesOfInterest = [];
		for (var itr = 0; itr < matches.length; itr++) {
			var team1Name = matches[itr]["team-1"];
			var team2Name = matches[itr]["team-2"];
			var matchUniqueId = matches[itr]["unique_id"];
			var isMatchStarted = matches[itr]["matchStarted"];
			var squad = matches[itr]["squad"];
			var matchDate = new Date(matches[itr]["date"]);
			var today = new Date();
			
			if (today.getDate() == matchDate.getDate() && today.getMonth() == matchDate.getMonth() && today.getFullYear() == matchDate.getFullYear()) {
				if (squad && team1Name && team2Name) {
					var team1NameLower = team1Name.toLowerCase();
					var team2NameLower = team2Name.toLowerCase();
					if (constants.INTERNATIONAL_TEAMS.indexOf(team1NameLower) >= 0 || constants.INTERNATIONAL_TEAMS.indexOf(team2NameLower) >= 0) {
						console.log("At least one of the teams involved is international team");
						matches[itr]["type"] = constants.INTERNATIONAL_STR;
						matchesOfInterest.push(matches[itr]);
					}
					else if (constants.IPL_TEAMS.indexOf(team1NameLower) >= 0 || constants.IPL_TEAMS.indexOf(team2NameLower) >= 0) {
						console.log("At least one of the teams involved is an IPL team");
						matches[itr]["type"] = constants.IPL_STR;
						matchesOfInterest.push(matches[itr]);
					}
				}
			}
		}
		
		var doesTweetTextExist = false;
		var tweetText = "Today's matches:\n";
		for (var itr = 0; itr < matchesOfInterest.length; itr++) {
			console.log("Match ID: " + matchesOfInterest[itr]["unique_id"] + "\n");
			console.log("Type: " + matchesOfInterest[itr]["type"] + "\n");
			var team1NameLower = matchesOfInterest[itr]["team-1"].toLowerCase();
			var team2NameLower = matchesOfInterest[itr]["team-2"].toLowerCase();
			var team1NameAbbreviated = constants.ABBREVIATIONS[team1NameLower];
			var team2NameAbbreviated = constants.ABBREVIATIONS[team2NameLower];
			if (team1NameAbbreviated && team2NameAbbreviated) {
				doesTweetTextExist = true;
				var currentTweetText = "#" + team1NameAbbreviated + "vs" + team2NameAbbreviated + "\n";
				matchesOfInterest[itr]["tweetText"] = currentTweetText;
				tweetText += currentTweetText;
			}
			console.log("Team 1: " + matchesOfInterest[itr]["team-1"] + "\n");
			console.log("Team 2: " + matchesOfInterest[itr]["team-2"] + "\n");
		};
		
		tweetText += constants.HASHTAGS;
		
		if (doesTweetTextExist) {
			tweetTextInTwitter(tweetText);
		} else {
			RETURN_TEXT += "Cannot tweet as Tweet text does not exist"
		}

		var shouldShowMatchScores = true
		if (shouldShowMatchScores) {
			for (var itr = 0; itr < matchesOfInterest.length; itr++) {
				tweetScoreDetails(matchesOfInterest[itr]);
			}
		}
	}
}
);

// get the Twitter client
function getTwitterClient() {
	var client = new Twitter({
		consumer_key: constants.TWITTER_KEY,
		consumer_secret: constants.TWITTER_SECRET,
		access_token_key: constants.TWITTER_ACCESSTOKEN_KEY,
		access_token_secret: constants.TWITTER_ACCESSTOKEN_SECRET
	});
	return client;
}

// tweet the provided text in Twitter
function tweetTextInTwitter(tweetText) {
	if (tweetText) {
		console.log("Making a Tweet!");
		var twitterClient = getTwitterClient();
		
		// POST the tweet
		twitterClient.post('statuses/update', { status: tweetText })
		.then(function (tweet) {
			console.log(tweet);
			RETURN_TEXT += "Tweeted: " + tweet;
		})
		.catch(function (error) {
			console.log(error);
			RETURN_TEXT += error;
		});
	}
}

// tweet the score details
function tweetScoreDetails(matchDetails) {
	console.log("Tweeting score details");
	var MATCHOVERSTR = "match over";
	if (matchDetails) {
		var matchId = matchDetails.unique_id;
		var matchTweetText = matchDetails.tweetText;
		var completeTweettext = "";
		if (matchTweetText) {
			console.log("there is a tweet for the match");
			request.post(constants.CRICAPI_SCOREURL,
	{ json: { "apikey": constants.CRICAPI_KEY, "unique_id": matchId } },
    function (error, response, body) {
				if (!error && response.statusCode == 200) {
					var score = body.score;
					var inningsRequirement = body["innings-requirement"];
					var matchStarted = body["matchStarted"];
					if (matchStarted) {
						console.log("The match has started!");
						if (score) {
							if (score.toLowerCase().indexOf(MATCHOVERSTR) >= 0) {
								if (inningsRequirement) {
									console.log("The current match is over!");
									completeTweettext += matchTweetText + "\n" + inningsRequirement;
								}
							} else {
								console.log("The current match is going on!");
								completeTweettext += matchTweetText + "\n" + score;
							}
						} else if (inningsRequirement) {
							console.log("Score value is not present but innings requirement is present!");
							completeTweettext += matchTweetText + "\n" + inningsRequirement;
						}
						
						tweetTextInTwitter(completeTweettext);
					}
				}
				else {
					RETURN_TEXT += "Error response from CRIC API";
				}
			});
		} else {
			console.log("there is no tweet for the match");
			RETURN_TEXT += "No tweet was created for the match";
		}
	}
}