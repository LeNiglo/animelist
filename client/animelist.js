Session.setDefault('sortBy', 'name');
Session.setDefault('sortOrder', 1);
Session.setDefault('showCat', true);
Session.setDefault('showFinished', false);
Session.setDefault('searchQ', '');

Meteor.subscribe('mylist');

Template.login.events({
	'submit form': function (e) {
		e.preventDefault();
		$form = $(e.target);
		Meteor.loginWithPassword($form.find('input[name="username"]').val(), $form.find('input[name="password"]').val(), function() {
			console.log('Logged In. Have Fun using My Super Anime List !');
		});
	}
});

Template.footer.events({
	'click #logout': function (e) {
		e.preventDefault();
		Meteor.logout(function() {
			console.log('Logged Out. Thanks for using My Super Anime List !');
		});
	},
	'click #export': function (e) {
		e.preventDefault();
		var json = {
			animes: Anime.find({'owner': Meteor.userId()}).fetch(),
			series: Serie.find({'owner': Meteor.userId()}).fetch()
		};
		$("#modal_import_export").find("textarea").val(JSON.stringify(json));
		$("#modal_import_export").show(500);
		$("#modal_import_export").find("textarea").focus();
	},
	'click #import': function (e) {
		e.preventDefault();
		$("#modal_import_export").find("textarea").val("");
		$("#modal_import_export").show(500);
		$("#modal_import_export").find("textarea").focus();
	}
});

Template.header.events({

	/*
	**	Instant Search
	*/

	'keyup #search': function (e) {
		e.preventDefault();
		Session.set('searchQ', $(e.target).val());
	},

	/*
	**	Turn On/Off the Category View
	*/

	'click #showCategories': function (e) {
		e.preventDefault();
		Session.set('showCat', (Session.get('showCat') === true ? false : true));
		console.log('Show Categories changed to : ' + (Session.get('showCat') === true ? "true" : "false"));
		$('body').focus();
	},

	'click #showFinished': function (e) {
		e.preventDefault();
		Session.set('showFinished', (Session.get('showFinished') === true ? false : true));
		console.log('Show Finished changed to : ' + (Session.get('showFinished') === true ? "true" : "false"));
		$('body').focus();
	},

	/*
	**	Set Orders
	*/

	'click #sortAlpha': function (e) {
		e.preventDefault();
		if ($(e.target).hasClass('active') || $(e.target).parent().hasClass('active')) {
			Session.set('sortOrder', (Session.get('sortOrder') === 1 ? -1 : 1));
			console.log('Sort Order changed to : ' + (Session.get('sortOrder') === 1 ? "ASC" : "DESC"));
		} else {
			Session.set('sortBy', 'name');
			console.log('Sort By changed to : Alpha');
		}
		$('body').focus();
	},
	'click #sortDate': function (e) {
		e.preventDefault();
		if ($(e.target).hasClass('active') || $(e.target).parent().hasClass('active')) {
			Session.set('sortOrder', (Session.get('sortOrder') === 1 ? -1 : 1));
			console.log('Sort Order changed to : ' + (Session.get('sortOrder') === 1 ? "ASC" : "DESC"));
		} else {
			Session.set('sortBy', 'updatedAt');
			console.log('Sort By changed to : Date');
		}
		$('body').focus();
	},

});

Template.yield.events({
	'click .hide-section': function (e) {
		e.preventDefault();
		var $this = $(e.target);
		var $list = $this.parent().parent().parent().next('ul');
		if ($list.is(":visible"))
		$list.slideUp();
		else
		$list.slideDown();
	},
	'click .change_pic': function (e) {
		e.preventDefault();
		var $form = $(e.target);
		var collec = $form.parents('section').attr('id');
		var _id = $form.parents('form').find('input[name="id"]').val();
		$('#change_picture').find('input[name="collec"]').val(collec);
		$('#change_picture').find('input[name="_id"]').val(_id);
		$('#change_picture').find('input[name="pic"]').val('');
		$('#change_picture').show(500);
		$('#change_picture').find('input[name="pic"]').focus();
	},
	'click #change_picture_apply': function (e) {
		e.preventDefault;
		var collec = $("#change_picture").find('input[name="collec"]').val();
		var id = $("#change_picture").find('input[name="_id"]').val();
		var picture = $("#change_picture").find('input[name="pic"]').val();

		if (collec === "animes") {
			Anime.update({_id: id}, { $set: {pic: picture} }, function(err, res) {
				$('#change_picture').hide(500);
			});
		} else if (collec === "series") {
			Serie.update({_id: id}, { $set: {'pic': picture} }, function(err, res) {
				$('#change_picture').hide(500);
			});
		} else {
			alert('Error while applying picture.');
		}
	},
	'click .save': function (e) {
		e.preventDefault();
		var $form = $(e.target).parents('form');
		var collec = $form.parents('section').attr('id');

		obj = {};
		obj._id = $form.find('input[name="id"]').val();
		obj.status = $form.find('select[name="status"]').val();
		obj.season = $form.find('input[name="season"]').val();
		obj.episode = $form.find('input[name="episode"]').val();

		var glyph = $(e.target).hasClass('glyphicon') ? $(e.target) : $($(e.target).find('.glyphicon'));
		if (glyph.hasClass('disabled')) {
			return false;
		}
		glyph.toggleClass('glyphicon-save glyphicon-saved').toggleClass('light-green green').addClass('disabled');
		if (collec === "animes") {
			Anime.update({_id: obj._id}, { $set: {status: obj.status, season: obj.season, episode: obj.episode} }, function() {
				Meteor.setTimeout(function() {
					glyph.toggleClass('glyphicon-save glyphicon-saved').toggleClass('light-green green').removeClass('disabled');
				}, 2000);
			});
		} else if (collec === "series") {
			Serie.update({_id: obj._id}, { $set: {status: obj.status, season: obj.season, episode: obj.episode} }, function() {
				Meteor.setTimeout(function() {
					glyph.toggleClass('glyphicon-save glyphicon-saved').toggleClass('light-green green').removeClass('disabled');
				}, 2000);
			});
		} else {
			alert('Error while creating. not inside a section tag.');
		}
	},
	'click .add_season': function (e) {
		e.preventDefault();
		$(e.target).parent().parent().prev('input').val(1 + parseInt($(e.target).parent().parent().prev('input').val()));
	},
	'click .add_episode': function (e) {
		e.preventDefault();
		$(e.target).parent().parent().prev('input').val(1 + parseInt($(e.target).parent().parent().prev('input').val()));
	},
	'click .remove_item': function (e) {
		e.preventDefault();
		var name = $(e.target).parents('.item').find('big').text();
		var id = $(e.target).parents('form').find('input[name="id"]').val();
		var collec = $(e.target).parents('section').attr('id');
		var r = confirm("Are you sure you want to remove " + name + " from your " + collec + " list ?");
		if (r === true) {
			if (collec === "animes") {
				Anime.remove({_id: id}, function() {});
			} else if (collec === "series") {
				Serie.remove({_id: id}, function() {});
			} else {
				alert('Error while deleting. not inside a section tag.');
			}
		}
	},
	'click #import_json': function (e) {
		e.preventDefault;
		var json = $("#modal_import_export").find("textarea").val();
		try {
			var obj = JSON.parse(json);
		} catch (e) {
			$("#modal_import_export").hide(500);
			alert("Don't try to trick us !\nJSON isn't well formatted.\n"+e.toString());
			return false;
		}
		var animes = obj.animes;
		var series = obj.series;
		var count = 0;
		animes.forEach(function (e) {
			var test = Anime.findOne({name: e.name});
			if (test) {
				if (test.updatedAt === null || e.updatedAt > test.updatedAt) {
					Anime.update({name: e.name}, { $set: {pic: e.pic, status: e.status, season: e.season, episode: e.episode, owner: Meteor.userId()()} }, function() { ++count; });
				}
			} else {
				Anime.insert({
					name: e.name,
					status: e.status,
					season: e.season,
					episode: e.episode,
					pic: e.pic,
					owner: Meteor.userId(),
					createdAt: e.createdAt
				});
				++count;
			}
		});
		series.forEach(function (e) {
			var test = Serie.findOne({name: e.name});
			if (test) {
				if (test.updatedAt === null || e.updatedAt > test.updatedAt) {
					Serie.update({name: e.name}, { $set: {pic: e.pic, status: e.status, season: e.season, episode: e.episode, owner: Meteor.userId()()} }, function() { ++count; });
				}
			} else {
				Serie.insert({
					name: e.name,
					status: e.status,
					season: e.season,
					episode: e.episode,
					pic: e.pic,
					owner: Meteor.userId(),
					createdAt: e.createdAt
				});
				++count;
			}
		});
		$("#modal_import_export").hide(500);
		alert("Imported "+count+" elements.");
	}
});

Template.animes.helpers({
	number: function() {
		return Anime.find({'owner': Meteor.userId(), 'name' : new RegExp(Session.get('searchQ'), 'i')}).count();
	},
	animes: function (st) {
		if (!st) {
			var filter = {sort: {}};
			filter.sort[Session.get('sortBy')] = Session.get('sortOrder');
			return Anime.find({'owner': Meteor.userId(), 'name' : new RegExp(Session.get('searchQ'), 'i')}, filter);
		} else {
			var filter = {sort: {}};
			filter.sort[Session.get('sortBy')] = Session.get('sortOrder');
			return Anime.find({ $and: [
				{ 'owner': Meteor.userId() },
				{ 'status': st },
				{ 'name' : new RegExp(Session.get('searchQ'), 'i') }
			] }, filter);
		}
	}
});

Template.series.helpers({
	number: function() {
		return Serie.find({'owner': Meteor.userId(), 'name' : new RegExp(Session.get('searchQ'), 'i')}).count();
	},
	series: function (st) {
		if (!st) {
			var filter = {sort: {}};
			filter.sort[Session.get('sortBy')] = Session.get('sortOrder');
			return Serie.find({'owner': Meteor.userId(), 'name' : new RegExp(Session.get('searchQ'), 'i')}, filter);
		} else {
			var filter = {sort: {}};
			filter.sort[Session.get('sortBy')] = Session.get('sortOrder');
			return Serie.find({ $and: [
				{ 'owner': Meteor.userId() },
				{ 'status': st },
				{ 'name' : new RegExp(Session.get('searchQ'), 'i') }
			] }, filter);
		}
	}
});

Template.addItem.events({
	'submit .addItem': function (e) {
		e.preventDefault();
		var $form = $(e.target);
		var collec = $form.parents('section').attr('id');

		obj = {};
		obj.name = $form.find('input[name="name"]').val();
		obj.status = $form.find('select[name="status"]').val();
		obj.season = $form.find('input[name="season"]').val();
		obj.episode = $form.find('input[name="episode"]').val();
		obj.owner = Meteor.userId();

		if (collec === "animes") {
			Anime.insert(obj, function(err, res) {
				if (!err) {
					$form.trigger('reset');
				}
			});
		} else if (collec === "series") {
			Serie.insert(obj, function(err, res) {
				if (!err) {
					$form.trigger('reset');
				}
			});
		} else {
			console.log('Error while creating. not inside a section tag.');
		}
	}
});
