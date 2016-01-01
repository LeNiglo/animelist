/**
 * Created by leniglo on 15/12/15.
 */

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
        throwError('Show Categories changed to : ' + (Session.get('showCat') === true ? "true" : "false"), "info");
        $body.focus();
    },

    'click #showFinished': function (e) {
        e.preventDefault();
        Session.set('showFinished', (Session.get('showFinished') !== true));
        throwError('Show Finished changed to : ' + (Session.get('showFinished') === true ? "true" : "false"), "info");
        $body.focus();
    },

    /*
     **	Set Orders
     */

    'click #sortAlpha': function (e) {
        e.preventDefault();
        if ($(e.target).hasClass('active') || $(e.target).parent().hasClass('active')) {
            Session.set('sortOrder', (Session.get('sortOrder') === 1 ? -1 : 1));
            throwError('Sort Order changed to : ' + (Session.get('sortOrder') === 1 ? "ASC" : "DESC"), "info");
        } else {
            Session.set('sortBy', 'name');
            throwError('Sort By changed to : Alpha', "info");
        }
        $body.focus();
    },
    'click #sortDate': function (e) {
        e.preventDefault();
        if ($(e.target).hasClass('active') || $(e.target).parent().hasClass('active')) {
            Session.set('sortOrder', (Session.get('sortOrder') === 1 ? -1 : 1));
            throwError('Sort Order changed to : ' + (Session.get('sortOrder') === 1 ? "ASC" : "DESC"), "info");
        } else {
            Session.set('sortBy', 'updatedAt');
            throwError('Sort By changed to : Date', "info");
        }
        $body.focus();
    }

});

Template.login.events({
    'submit form': function (e) {
        e.preventDefault();
        $form = $(e.target);
        Meteor.loginWithPassword($form.find('input[name="username"]').val(), $form.find('input[name="password"]').val(), function (res) {
            if (res) {
                throwError(res.reason, "danger");
            } else {
                throwError('Logged In. Have Fun using My Super Anime List !', "success");
            }
        });
    }
});

Template.footer.events({
    'click #logout': function (e) {
        e.preventDefault();
        Meteor.logout(function () {
            throwError('Logged Out. Thanks for using My Super Anime List !', "success");
        });
    },
    'click #export': function (e) {
        e.preventDefault();
        var json = {
            animes: Show.find({type: 'anime', owner: Meteor.userId()}).fetch(),
            series: Show.find({type: 'serie', owner: Meteor.userId()}).fetch()
        };
        $md_imp_exp.show(500).find("textarea").focus().val(JSON.stringify(json));
    },
    'click #import': function (e) {
        e.preventDefault();
        $md_imp_exp.show(500).find("textarea").val("").focus();
    },
    'click #changeBackground': function (e) {
        e.preventDefault();
        $md_chg_back.show(500).find("input").val("").focus();
    }
});