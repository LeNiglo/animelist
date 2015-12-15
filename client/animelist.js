Session.setDefault('sortBy', 'name');
Session.setDefault('sortOrder', 1);
Session.setDefault('showCat', true);
Session.setDefault('showFinished', false);
Session.setDefault('searchQ', '');
Session.set('reload', 0);

Meteor.subscribe('mylist');
Meteor.subscribe('showNames');

var showNames = [];

var deltaPress = 200;
var lastUpPress = 0;
var lastDownPress = 0;

Errors = new Meteor.Collection(null);

errorid = 0;

throwError = function (message, type) {
    if (!message)
        return false;
    if (!type)
        type = "danger";

    ++errorid;
    var errorsave = "error" + errorid;
    Errors.insert({type: type, message: message, _id: errorsave});

    Meteor.setTimeout(function () {
        Errors.remove({_id: errorsave});
    }, 3000);
    return false;
};

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
    $cg_pic = $('#change_picture');
    $cg_link = $('#change_link');
    $md_imp_exp = $("#modal_import_export");
    $md_chg_back = $("#modal_change_background");
    $search = $("#search");
    $body = $("body");
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
            $('html, body').animate({scrollTop: newScroll}, 750, function () {
                elem.focus();
            });
        }


    });

    $search.focus();

    window.addEventListener("keydown", function (e) {
        // arrow keys
        if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    window.addEventListener("keyup", function (e) {
        // arrow keys
        if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    $body.keyup(function (e) {
        var currentScroll = $(window).scrollTop() + 150;
        var newScroll = -1;

        if (e.keyCode == 27) { // ESC
            $search.val("");
            Session.set('searchQ', '');
            $search.focus();
            Session.set("TargetedItem", null);
            $('.edited-name').trigger('blur');
        } else if (e.keyCode == 38 && !$(e.target).hasClass('typeahead')) { // UP
            e.preventDefault();

            if (e.shiftKey) {
                $('html, body').animate({scrollTop: 0}, 150);
                return false;
            }

            currentScroll -= 30;
            $($(".item:visible").get().reverse()).each(function () {
                if (newScroll == -1 && $(this).offset().top < currentScroll) {
                    newScroll = $(this).offset().top - 120;
                    return false;
                }
            });
            if (newScroll > 0)
                $('html, body').animate({scrollTop: newScroll}, 150);
            return false;
        } else if (e.keyCode == 40 && !$(e.target).hasClass('typeahead')) { // DOWN
            e.preventDefault();

            if (e.shiftKey) {
                $('html, body').animate({scrollTop: $(document).height()}, 150);
                return false;
            }

            currentScroll += 30;
            $('.item:visible').each(function () {
                if (newScroll == -1 && $(this).offset().top > currentScroll) {
                    newScroll = $(this).offset().top - 120;
                    return false;
                }
            });
            if (newScroll > 0)
                $('html, body').animate({scrollTop: newScroll}, 150);
            return false;
        }
        return true;
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
    'click #change_picture_apply': function (e) {
        e.preventDefault();
        var collec = $cg_pic.find('input[name="collec"]').val();
        var id = $cg_pic.find('input[name="_id"]').val();
        var picture = $cg_pic.find('input[name="pic"]').val();

        if (collec === "animes") {
            Anime.update({_id: id}, {$set: {pic: picture}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0)
                    $cg_pic.hide(500);
            });
        } else if (collec === "series") {
            Serie.update({_id: id}, {$set: {pic: picture}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0)
                    $cg_pic.hide(500);
            });
        } else {
            alert('Error while applying picture.');
        }
    },
    'click #change_link_apply': function (e) {
        e.preventDefault();
        var collec = $cg_link.find('input[name="collec"]').val();
        var id = $cg_link.find('input[name="_id"]').val();
        var link = $cg_link.find('input[name="link"]').val();

        if (collec === "animes") {
            Anime.update({_id: id}, {$set: {link: link}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0)
                    $cg_link.hide(500);
            });
        } else if (collec === "series") {
            Serie.update({_id: id}, {$set: {link: link}}, function (err, res) {
                if (err)
                    alert(err);
                if (res > 0)
                    $cg_link.hide(500);
            });
        } else {
            alert('Error while changing link.');
        }
    },
    'click #confirmChangeBackground': function (e) {
        e.preventDefault();
        var input = $md_chg_back.find('input').val();
        if (Meteor.userId() != null) {
            Meteor.call('changeUserBackground', input, function (error, result) {
                if (result) {
                    $md_chg_back.hide();
                }
            });
        }
    },
    'click #resetChangeBackground': function (e) {
        e.preventDefault();
        if (Meteor.userId()) {
            Meteor.call('changeUserBackground', null, function (error, result) {
                if (result) {
                    $md_chg_back.hide();
                }
            });
        }
    },
    'click #import_json': function (e) {
        e.preventDefault();
        var json = $md_imp_exp.find("textarea").val();
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
        $md_imp_exp.hide(500);
        alert("Imported " + count + " elements.");
    }
});
