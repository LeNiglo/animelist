Anime = new Meteor.Collection('animes');

Anime.allow({
	insert: function(userId, it) {
		return _.without(_.keys(it), 'name').length === 0;
	},
	remove: function(userId, it) {
		return (userId == it.owner);
	}
});

Anime.before.insert(function (userId, it) {

	if (it.name === '' ) {
		return false;
	}

	it.pic = it.pic ? it.pic : '/img/noPic.png';

	try {
		it.season = (it.season === '' ? 0 : parseInt(it.season));
		it.episode = (it.episode === '' ? 0 : parseInt(it.episode));
	} catch (e) {
		return false;
	}
	
	if (!(Match.test(it.name, String) && Match.test(it.pic, String) && Match.test(it.season, Number) &&
	Match.test(it.episode, Number) && Match.test(it.status, String)))
	return false;

	var d = new Date();
	it.createdAt = it.createdAt || d.YYYYMMDDHHMMSS();
	it.updatedAt = d.YYYYMMDDHHMMSS();
});

Anime.before.update(function (userId, it) {
	var d = new Date();
	it.updatedAt = d.YYYYMMDDHHMMSS();
});

Anime.before.remove(function (userId, it) {
	return userId == it.owner;
});
