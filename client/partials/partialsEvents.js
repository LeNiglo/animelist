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