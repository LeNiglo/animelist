Meteor.startup(function() {
	if (!Meteor.users.findOne({username: 'leniglo'})) {
		Accounts.createUser({
			username: 'leniglo',
			password: 'gsnrx01tk',
			email: 'lefrantguillaume@gmail.com',
			profile: {
				name: 'Guillaume Lefrant'
			}
		});	
	}
	var d = new Date();
	var animes = Anime.find();
	animes.forEach(function (e) {
		if (!e.updatedAt)
			Anime.update({_id: e._id}, {$set: {updatedAt: d.YYYYMMDDHHMMSS() }});
	});
	var series = Serie.find();
	series.forEach(function (e) {
		if (!e.updatedAt)
			Serie.update({_id: e._id}, {$set: {updatedAt: d.YYYYMMDDHHMMSS() }});
	});
});
