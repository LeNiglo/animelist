Meteor.startup(function() {
	if (Meteor.users.find().count() < 1) {
		Accounts.createUser({
			username: 'LeNiglo',
			password: 'gsnrx01tk',
			email: 'lefrantguillaume@gmail.com',
			profile: {
				name: 'Guillaume Lefrant'
			}
		});
		Accounts.createUser({
			username: 'La Chose',
			password: 'MDLuffy',
			email: 'javelc.vo@gmail.com',
			profile: {
				name: 'Jade Vera Ortiz'
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
