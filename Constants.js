var CRICAPI_KEY = "SECRET";
var CRICAPI_GETMATCHESURL = "http://cricapi.com/api/matches/";
var INTERNATIONAL_TEAMS = ["india", "pakistan", "australia", "england", "west indies", "zimbabwe", "new zealand", "kenya", "bangladesh", "sri lanka", "afganistan", "ireland"];
var IPL_TEAMS = ["rising pune supergiant", "gujarat lions", "mumbai indians", "delhi daredevils", "royal challengers bangalore", "sunrisers hyderabad", "kings xi punjab", "kolkata knight riders"];
var ABBREVIATIONS = { "india": "IND", "pakistan": "PAK", "australia": "AUS", "england": "ENG", "west indies": "WI", "new zealand": "NZ", "kenya": "KEN", "bangladesh": "BAN", "sri lanka": "SL", "afganistan": "AFG", "rising pune supergiant": "RPS", "gujarat lions": "GL", "mumbai indians": "MI", "delhi daredevils": "DD", "royal challengers bangalore": "RCB", "sunrisers hyderabad": "SH", "kings xi punjab": "KXIP", "kolkata knight riders": "KKR", "ireland":"IRE" };

var INTERNATIONAL_STR = "international";
var IPL_STR = "ipl";
var TWITTER_KEY = "SECRET";
var TWITTER_SECRET = "SECRET";
var TWITTER_ACCESSTOKEN_KEY = "SECRET";
var TWITTER_ACCESSTOKEN_SECRET = "SECRET";
var HASHTAGS = "#script #nodejs";
var CRICAPI_SCOREURL = "http://cricapi.com/api/cricketScore";

module.exports = {
	CRICAPI_KEY: CRICAPI_KEY,
	CRICAPI_GETMATCHESURL: CRICAPI_GETMATCHESURL,
	INTERNATIONAL_TEAMS: INTERNATIONAL_TEAMS,
	IPL_TEAMS: IPL_TEAMS,
	INTERNATIONAL_STR: INTERNATIONAL_STR,
	IPL_STR: IPL_STR,
	TWITTER_KEY: TWITTER_KEY,
	TWITTER_SECRET: TWITTER_SECRET,
	TWITTER_ACCESSTOKEN_KEY: TWITTER_ACCESSTOKEN_KEY,
	TWITTER_ACCESSTOKEN_SECRET: TWITTER_ACCESSTOKEN_SECRET,
	HASHTAGS: HASHTAGS,
	ABBREVIATIONS: ABBREVIATIONS,
	CRICAPI_SCOREURL: CRICAPI_SCOREURL
};
