Session.setDefault('sortBy', 'name');
Session.setDefault('sortOrder', 1);
Session.setDefault('showCat', true);
Session.setDefault('showFinished', false);
Session.setDefault('searchQ', '');
Session.set('reload', 0);

Meteor.subscribe('mylist');
Meteor.subscribe('showNames');

var showNames = [];

var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;

        matches = [];

        substrRegex = new RegExp(q, 'i');

        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push({value: str});
            }
        });

        cb(matches);
    };
};

Template.yield.rendered = function () {
    cg_pic = $('#change_picture');
    cg_link = $('#change_link');
    md_imp_exp = $("#modal_import_export");
    md_chg_back = $("#modal_change_background");
    search = $("#search");
    body = $("body");
    header = $("header");

    $('*[data-dismiss]').click(function () {
        $('.modal').hide(500);
    });

    $('ul.nav-justified a').click(function (e) {
        e.preventDefault();
        var section = $(this).attr('href');
        $('html, body').animate({scrollTop: $(section).position().top - 50}, 750);
    });

    $('.back2top, #back2top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 500);
    });

    $('#go2new').click(function (e) {
        e.preventDefault();

        var currentScroll = $(window).scrollTop();
        var newScroll = -1;
        var elem = null;
        $('form.addItem').each(function () {
            if (newScroll == -1 && $(this).offset().top > currentScroll) {
                newScroll = $(this).offset().top - ($(window).height() / 1.5);
                elem = $(this).find('input[name="name"]');
                return false;
            }
        });
        if (newScroll > 0) {
            $('html, body').animate({scrollTop: newScroll}, 750, function() {
                elem.focus();
            });
        }


    });

    search.focus();

    window.addEventListener("keydown", function(e) {
        // arrow keys
        if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    window.addEventListener("keyup", function(e) {
        // arrow keys
        if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    body.keyup(function (e) {
        if (e.keyCode == 27) { // ESC
            search.val("");
            Session.set('searchQ', '');
            search.focus();
        } else if (e.keyCode == 38) { // UP
            e.preventDefault();
            console.log("UP");
            var currentScroll = $(window).scrollTop() + 120;
            var newScroll = -1;
            $($(".item").get().reverse()).each(function () {
                console.log($(this), $(this).offset().top, $(this).offset().top < currentScroll);
                if (newScroll == -1 && $(this).offset().top < currentScroll) {
                    newScroll = $(this).offset().top - 120;
                    return false;
                }
            });
            if (newScroll > 0)
                $('html, body').animate({scrollTop: newScroll}, 150);
        } else if (e.keyCode == 40) { // DOWN
            e.preventDefault();
            console.log("DOWN");
            var currentScroll = $(window).scrollTop() + 180;
            var newScroll = -1;
            $('.item').each(function () {
                if (newScroll == -1 && $(this).offset().top > currentScroll) {
                    newScroll = $(this).offset().top - 120;
                    return false;
                }
            });
            if (newScroll > 0)
                $('html, body').animate({scrollTop: newScroll}, 150);
        }
        return false;
    });

    header.affix({
        offset: {
            top: 69
        }
    });

    header.on('affix.bs.affix', function () {
        header.transition({height: '75px'}, 300, 'ease');
    });

    header.on('affix-top.bs.affix', function () {
        header.transition({height: '130px'}, 250, 'ease');
    });

    Meteor.setTimeout(function () {
        Session.set('reload', 1);
    }, 500);

    Meteor.typeahead.inject();
};

Template.login.events({
    'submit form': function (e) {
        e.preventDefault();
        $form = $(e.target);
        Meteor.loginWithPassword($form.find('input[name="username"]').val(), $form.find('input[name="password"]').val(), function () {
            console.log('Logged In. Have Fun using My Super Anime List !');
        });
    }
});

Template.footer.events({
    'click #logout': function (e) {
        e.preventDefault();
        Meteor.logout(function () {
            console.log('Logged Out. Thanks for using My Super Anime List !');
        });
    },
    'click #export': function (e) {
        e.preventDefault();
        var json = {
            animes: Anime.find({'owner': Meteor.userId()}).fetch(),
            series: Serie.find({'owner': Meteor.userId()}).fetch()
        };
        md_imp_exp.show(500).find("textarea").focus().val(JSON.stringify(json));
    },
    'click #import': function (e) {
        e.preventDefault();
        md_imp_exp.show(500).find("textarea").val("").focus();
    },
    'click #changeBackground': function (e) {
        e.preventDefault();
        md_chg_back.show(500).find("input").val("").focus();
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
        Session.set('showCat', (Session.get('showCat') !== true));
        console.log('Show Categories changed to : ' + (Session.get('showCat') === true ? "true" : "false"));
        body.focus();
    },

    'click #showFinished': function (e) {
        e.preventDefault();
        Session.set('showFinished', (Session.get('showFinished') !== true));
        console.log('Show Finished changed to : ' + (Session.get('showFinished') === true ? "true" : "false"));
        body.focus();
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
        body.focus();
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
        body.focus();
    }
});

Template.yield.events({
    'click .hide-section': function (e) {
        e.preventDefault();
        var $this = $(e.target);
        var $list = $this.parent().parent().parent().next('ul');
        Meteor.setTimeout(function () {
            Session.set('reload', Session.get('reload') + 1);
        }, 150);
        if ($list.is(":visible"))
            $list.slideUp(100);
        else
            $list.slideDown(100);
    },
    'click .change_pic': function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var collec = $form.parents('section').attr('id');
        var _id = $form.parents('form').find('input[name="id"]').val();
        cg_pic.find('input[name="collec"]').val(collec);
        cg_pic.find('input[name="_id"]').val(_id);
        cg_pic.find('input[name="pic"]').val('');
        cg_pic.show(500);
        cg_pic.find('input[name="pic"]').focus();
    },
    'click #change_picture_apply': function (e) {
        e.preventDefault();
        var collec = cg_pic.find('input[name="collec"]').val();
        var id = cg_pic.find('input[name="_id"]').val();
        var picture = cg_pic.find('input[name="pic"]').val();

        if (collec === "animes") {
            Anime.update({_id: id}, {$set: {pic: picture}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0)
                    cg_pic.hide(500);
            });
        } else if (collec === "series") {
            Serie.update({_id: id}, {$set: {pic: picture}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0)
                    cg_pic.hide(500);
            });
        } else {
            alert('Error while applying picture.');
        }
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
    'click .change_link': function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var collec = $form.parents('section').attr('id');
        var _id = $form.parents('form').find('input[name="id"]').val();
        cg_link.find('input[name="collec"]').val(collec);
        cg_link.find('input[name="_id"]').val(_id);
        cg_link.find('input[name="link"]').val('');
        cg_link.show(500);
        cg_link.find('input[name="link"]').focus();
    },
    'click #change_link_apply': function (e) {
        e.preventDefault();
        var collec = cg_link.find('input[name="collec"]').val();
        var id = cg_link.find('input[name="_id"]').val();
        var link = cg_link.find('input[name="link"]').val();

        if (collec === "animes") {
            Anime.update({_id: id}, {$set: {link: link}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0)
                    cg_link.hide(500);
            });
        } else if (collec === "series") {
            Serie.update({_id: id}, {$set: {link: link}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0)
                    cg_link.hide(500);
            });
        } else {
            alert('Error while changing link.');
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
            Anime.update({_id: obj._id}, {
                $set: {
                    status: obj.status,
                    season: obj.season,
                    episode: obj.episode
                }
            }, function (error, result) {
                if (result > 0)
                    Meteor.setTimeout(function () {
                        glyph.toggleClass('glyphicon-save glyphicon-saved').toggleClass('light-green green').removeClass('disabled');
                    }, 2000);
            });
        } else if (collec === "series") {
            Serie.update({_id: obj._id}, {
                $set: {
                    status: obj.status,
                    season: obj.season,
                    episode: obj.episode
                }
            }, function (error, result) {
                if (result > 0)
                    Meteor.setTimeout(function () {
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
    'click #import_json': function (e) {
        e.preventDefault();
        var json = md_imp_exp.find("textarea").val();
        try {
            var obj = JSON.parse(json);
        } catch (e) {
            $("#modal_import_export").hide(500);
            alert("Don't try to trick us !\nJSON isn't well formatted.\n" + e.toString());
            return false;
        }
        var animes = obj.animes;
        var series = obj.series;
        var count = 0;
        animes.forEach(function (e) {
            var test = Anime.findOne({name: e.name});
            if (test) {
                if (test.updatedAt === null || e.updatedAt > test.updatedAt) {
                    Anime.update({name: e.name}, {
                        $set: {
                            pic: e.pic,
                            status: e.status,
                            season: e.season,
                            episode: e.episode,
                            owner: Meteor.userId()()
                        }
                    }, function () {
                        ++count;
                    });
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
                    Serie.update({name: e.name}, {
                        $set: {
                            pic: e.pic,
                            status: e.status,
                            season: e.season,
                            episode: e.episode,
                            owner: Meteor.userId()()
                        }
                    }, function () {
                        ++count;
                    });
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
        md_imp_exp.hide(500);
        alert("Imported " + count + " elements.");
    },
    'click #confirmChangeBackground': function (e) {
        e.preventDefault();
        var input = md_chg_back.find('input').val();
        if (Meteor.userId() != null) {
            Meteor.call('changeUserBackground', input, function (error, result) {
                if (result) {
                    md_chg_back.hide();
                }
            });
        }
    },
    'click #resetChangeBackground': function (e) {
        e.preventDefault();
        if (Meteor.userId()) {
            Meteor.call('changeUserBackground', null, function (error, result) {
                if (result) {
                    md_chg_back.hide();
                }
            });
        }
    }
});

Template.animes.helpers({
    number: function (st) {
        if (!st) {
            return Anime.find({'owner': Meteor.userId(), 'name': new RegExp(Session.get('searchQ'), 'i')}).count();
        } else {
            return Anime.find({
                'owner': Meteor.userId(),
                'status': st,
                'name': new RegExp(Session.get('searchQ'), 'i')
            }).count();
        }
    },
    animes: function (st) {
        var filter = {sort: {}};
        filter.sort[Session.get('sortBy')] = Session.get('sortOrder');
        if (!st) {
            return Anime.find({'owner': Meteor.userId(), 'name': new RegExp(Session.get('searchQ'), 'i')}, filter);
        } else {
            return Anime.find({
                'owner': Meteor.userId(),
                'status': st,
                'name': new RegExp(Session.get('searchQ'), 'i')
            }, filter);
        }
    },
    stateVisible: function (st) {
        if (!!Session.get('reload')) {
            return ($('#animes').find('h3.' + st.id).next('ul').is(":visible"));
        } else {
            return false;
        }
    }
});

Template.series.helpers({
    number: function (st) {
        if (!st) {
            return Serie.find({'owner': Meteor.userId(), 'name': new RegExp(Session.get('searchQ'), 'i')}).count();
        } else {
            return Serie.find({
                'owner': Meteor.userId(),
                'status': st,
                'name': new RegExp(Session.get('searchQ'), 'i')
            }).count();
        }
    },
    series: function (st) {
        var filter = {sort: {}};
        filter.sort[Session.get('sortBy')] = Session.get('sortOrder');
        if (!st) {
            return Serie.find({'owner': Meteor.userId(), 'name': new RegExp(Session.get('searchQ'), 'i')}, filter);
        } else {
            return Serie.find({
                'owner': Meteor.userId(),
                'status': st,
                'name': new RegExp(Session.get('searchQ'), 'i')
            }, filter);
        }
    },
    stateVisible: function (st) {
        if (!!Session.get('reload')) {
            return ($('#series').find('h3.' + st.id).next('ul').is(":visible"));
        } else {
            return false;
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

Template.addItem.helpers({
    shownames: function () {
        return [
            {
                name: 'animes',
                valueKey: 'name',
                displayKey: 'name',
                local: function () {
                    return Anime.find().fetch();
                },
                template: 'showsuggest',
                header: '<p><em>Animes</em></p>'
            },
            {
                name: 'series',
                valueKey: 'name',
                displayKey: 'name',
                local: function () {
                    return Serie.find().fetch();
                },
                template: 'showsuggest',
                header: '<p><em>Series</em></p>'
            }
        ];
    }
});

Template.showsuggest.helpers({

    getOwner: function (ow) {
        return Meteor.users.findOne({_id: ow}).username;
    }

});