/**
 * Created by leniglo on 15/12/15.
 */

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
            Anime.insert(obj, function (err, res) {
                if (!err && res) {
                    $form.trigger('reset');
                }
            });
        } else if (collec === "series") {
            Serie.insert(obj, function (err, res) {
                if (!err && res) {
                    $form.trigger('reset');
                }
            });
        } else {
            console.log('Error while creating. not inside a section tag.');
        }
    }
});

Template.item.events({
    'click .change_pic': function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var collec = $form.parents('section').attr('id');
        var _id = $form.parents('form').find('input[name="id"]').val();
        $cg_pic.find('input[name="collec"]').val(collec);
        $cg_pic.find('input[name="_id"]').val(_id);
        $cg_pic.find('input[name="pic"]').val('');
        $cg_pic.show(500);
        $cg_pic.find('input[name="pic"]').focus();
    },
    'change .show_commentary': function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var collec = $form.parents('section').attr('id');
        var id = $form.parent().parent().parent().find('input[name="id"]').val();
        var commentary = $form.val();

        var glyph = $form.parent().parent().parent().find('.glyphicon-save');
        if (glyph.hasClass('disabled')) {
            return false;
        }
        glyph.toggleClass('glyphicon-save glyphicon-saved').toggleClass('light-green green').addClass('disabled');
        if (collec === "animes") {
            Anime.update({_id: id}, {$set: {commentary: commentary}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0) {
                    Meteor.setTimeout(function () {
                        glyph.toggleClass('glyphicon-save glyphicon-saved').toggleClass('light-green green').removeClass('disabled');
                    }, 2000);
                }
            });
        } else if (collec === "series") {
            Serie.update({_id: id}, {$set: {commentary: commentary}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0) {
                    Meteor.setTimeout(function () {
                        glyph.toggleClass('glyphicon-save glyphicon-saved').toggleClass('light-green green').removeClass('disabled');
                    }, 2000);
                }
            });
        } else {
            alert('Error while applying commentary.');
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
        if (glyph.hasClass('disabled') && (e.clientX && e.clientY)) {
            return false;
        }
        glyph.addClass('glyphicon-saved').addClass('green').removeClass('glyphicon-save').removeClass('light-green').addClass('disabled');
        if (collec === "animes") {
            Anime.update({_id: obj._id}, {
                $set: {
                    status: obj.status,
                    season: obj.season,
                    episode: obj.episode
                }
            }, function (error, result) {
                if (result > 0) {
                    Meteor.setTimeout(function () {
                        glyph.addClass('glyphicon-save').addClass('light-green').removeClass('glyphicon-saved').removeClass('green').removeClass('disabled');
                    }, 100);
                }
            });
        } else if (collec === "series") {
            Serie.update({_id: obj._id}, {
                $set: {
                    status: obj.status,
                    season: obj.season,
                    episode: obj.episode
                }
            }, function (error, result) {
                if (result > 0) {
                    Meteor.setTimeout(function () {
                        glyph.addClass('glyphicon-save').addClass('light-green').removeClass('glyphicon-saved').removeClass('green').removeClass('disabled');
                    }, 100);
                }
            });
        } else {
            throwError('Error while creating. not inside a section tag.');
        }
    },
    'click .add_season': function (e) {
        e.preventDefault();
        var $form = $(e.target).closest('form');
        var $input = $form.find('input[name="season"]');

        $input.val(1 + parseInt($input.val()));
        $form.find('.save')[0].click();
        return false;
    },
    'click .add_episode': function (e) {
        e.preventDefault();
        var $form = $(e.target).closest('form');
        var $input = $form.find('input[name="episode"]');

        $input.val(1 + parseInt($input.val()));
        $form.find('.save')[0].click();
        return false;
    },
    'click .remove_item': function (e) {
        e.preventDefault();
        var name = $(e.target).parents('.item').find('big').text();
        var id = $(e.target).parents('form').find('input[name="id"]').val();
        var collec = $(e.target).parents('section').attr('id');
        var r = confirm("Are you sure you want to remove " + name + " from your " + collec + " list ?");
        if (r === true) {
            if (collec === "animes") {
                Anime.remove({_id: id}, function () {
                });
            } else if (collec === "series") {
                Serie.remove({_id: id}, function () {
                });
            } else {
                alert('Error while deleting. not inside a section tag.');
            }
        }
    },
    'click .change_link': function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var collec = $form.parents('section').attr('id');
        var _id = $form.parents('form').find('input[name="id"]').val();
        $cg_link.find('input[name="collec"]').val(collec);
        $cg_link.find('input[name="_id"]').val(_id);
        $cg_link.find('input[name="link"]').val('');
        $cg_link.show(500);
        $cg_link.find('input[name="link"]').focus();
    },
    'dblclick .editable-name': function (e, t) {
        return Session.set("TargetedItem", t.data._id);
    },
    'change, blur .edited-name': function (e) {
        var $this = $(e.target);
        var collec = $this.parents('section').attr('id');
        var newName = $this.val();

        if (collec === "animes") {
            Anime.update({_id: this._id}, {
                $set: {
                    name: newName
                }
            }, function (error, result) {
                if (result > 0) {
                    Session.set("TargetedItem", null);
                }
            });
        } else if (collec === "series") {
            Serie.update({_id: this._id}, {
                $set: {
                    name: newName
                }
            }, function (error, result) {
                if (result > 0) {
                    Session.set("TargetedItem", null);
                }
            });
        } else {
            throwError('Error while renaming. Not inside a section tag.');
        }
    }
});