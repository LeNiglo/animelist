/**
 * Created by leniglo on 04/01/16.
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
    },

    'click #showFinished': function (e) {
        e.preventDefault();
        Session.set('showFinished', (Session.get('showFinished') !== true));
        console.log('Show Finished changed to : ' + (Session.get('showFinished') === true ? "true" : "false"));
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
    }

});