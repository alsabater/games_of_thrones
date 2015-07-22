var fs = require('fs');
//var fileActions = require('./fileactions')


function get_episodes(callback){ 
fs.readFile("./GoTEpisodes.json", 'utf8', read_file);
	function read_file (err, file){
	    if (err) {
	        throw err;
	    }
	    var episodes = JSON.parse(file);
	    callback(episodes);	
	}
}

function format_episodes(episodes) {
	chapters = sort_chapters(episodes);
	chapters = filter_episodes(chapters);
	chapters.map (function (episode) {
		console.log("Title: " + episode.title + "   " + "Episode #: " + 
			episode.episode_number + "\n" + episode.description + "\n" + "Rating: " + 
			episode.rating + " " + showing_stars(episode));
	})
}

function showing_stars(episode) {
	var stars = "";
	for( i = episode.rating; i > 0; i--) {
		stars += "*";
	}
	return stars;
}

function sort_chapters(chapters) {
	sorted_episodes = chapters.sort(function(a, b) {
		return a.episode_number - b.episode_number;
	});
	return sorted_episodes;
}

function filter_episodes(episodes) {
	var filtered_chapters = episodes.filter(function (episode) {
		return episode.rating > 8.5;
	});
	return filtered_chapters;
}

function searchFor(episodes) {

	var jon_snow = 0;

	var n = [];
	episodes.map(function(episode) {
		n.push(episode.description.indexOf("Jon"));
	});
	n.map(function(position) {
		if (position >= 0) {
			jon_snow ++;
		}
	});

	console.log("Jon Snow aparece en: " + jon_snow + " capitulo/s.")
	return jon_snow;
}



get_episodes(format_episodes);
get_episodes(searchFor);