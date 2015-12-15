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
        console.log('Show Categories changed to : ' + (Session.get('showCat') === true ? "true" : "false"));
        $body.focus();
    },

    'click #showFinished': function (e) {
        e.preventDefault();
        Session.set('showFinished', (Session.get('showFinished') !== true));
        console.log('Show Finished changed to : ' + (Session.get('showFinished') === true ? "true" : "false"));
        $body.focus();
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
        $body.focus();
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
        $body.focus();
    }

});

Template.login.events({
    'submit form': function (e) {
        e.preventDefault();
        $form = $(e.target);
        Meteor.loginWithPassword($form.find('input[name="username"]').val(), $form.find('input[name="password"]').val(), function (res) {
            if (res) {
                console.log(res.reason);
            } else {
                console.log('Logged In. Have Fun using My Super Anime List !');
            }
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