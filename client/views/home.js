/**
 * Created by leniglo on 04/01/16.
 */

Template.home.events({
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
    }
});

Template.home.onCreated(function () {
    $body = $("body");
    var me = Meteor.user();

    Session.setDefault('sortBy', 'name');
    Session.setDefault('sortOrder', 1);
    Session.setDefault('showCat', true);
    Session.setDefault('showFinished', false);

    $body.addClass('animelist');
    if (me != null) {
        if (me.profile.background)
            $body.css('background-image', 'url(' + me.profile.background + ')');
        else
            $body.css('background-image', '');

        if (me.profile.settings) {
            Session.set('sortBy', me.profile.settings.sortBy);
            Session.set('sortOrder', me.profile.settings.sortOrder);
            Session.set('showCat', me.profile.settings.showCat);
            Session.set('showFinished', me.profile.settings.showFinished);
        }
    }
});


Template.home.onRendered(function () {
    $cg_pic = $('#change_picture');
    $cg_link = $('#change_link');
    $md_imp_exp = $("#modal_import_export");
    $md_chg_back = $("#modal_change_background");
    $search = $("#search");
    $header = $("header");

    $('*[data-dismiss]').click(function () {
        $('.modal').modal('hide');
    });

    $('ul.nav-justified a').click(function (e) {
        e.preventDefault();
        var section = $(this).attr('href');
        $('html, body').animate({scrollTop: $(section).position().top - 50}, 750);
    });

    $('#go2new').click(function (e) {
        e.preventDefault();

        var currentScroll = $(window).scrollTop();
        var newScroll = -1;
        var $elem = null;
        $('form.addItem').each(function () {
            if (newScroll == -1 && $(this).offset().top > currentScroll) {
                newScroll = $(this).offset().top - ($(window).height() / 1.5);
                $elem = $(this).find('input[name="name"]');
                return false;
            }
        });
        if (newScroll > 0) {
            $('html, body').animate({scrollTop: newScroll}, 750, function () {
                $elem.focus();
            });
        }


    });

    window.addEventListener("keydown", function (e) {
        // arrow keys
        if ([38, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    window.addEventListener("keyup", function (e) {
        // arrow keys
        if ([38, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    $body.keyup(function (e) {

        if (e.keyCode == 27) { // ESC

            $search.val("");
            Session.set('searchQ', '');
            $search.focus();
            Session.set("TargetedItem", null);
            $('.edited-name').trigger('change');
            $('.modal').modal('hide');

        } else if (e.keyCode == 38 && !$(e.target).hasClass('typeahead')) { // UP

            e.preventDefault();

            var currentScroll = $(window).scrollTop() + 150;
            var newScroll = -1;

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

            var currentScroll = $(window).scrollTop() + 150;
            var newScroll = -1;

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

    $header.affix({
        offset: {
            top: 69
        }
    });

    Meteor.setTimeout(function () {
        Session.set('reload', 1);
    }, 500);

    $search.focus();
    Meteor.typeahead.inject();

    window.onbeforeunload = function () {
        var session = {
            sortBy: Session.get('sortBy'),
            sortOrder: Session.get('sortOrder'),
            showCat: Session.get('showCat'),
            showFinished: Session.get('showFinished')
        };
        Meteor.call('changeUserSettings', session);
        return null;
    }
});

Template.home.onDestroyed(function () {
    $body.removeClass('animelist').css('background-image', '');
});
