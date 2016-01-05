/**
 * Created by leniglo on 15/12/15.
 */

Template.animes.helpers({
    number: function (st) {
        if (!st) {
            return Show.find({
                type: 'anime',
                active: true,
                owner: Meteor.userId(),
                name: new RegExp(Session.get('searchQ'), 'i')
            }).count();
        } else {
            return Show.find({
                type: 'anime',
                active: true,
                owner: Meteor.userId(),
                status: st,
                name: new RegExp(Session.get('searchQ'), 'i')
            }).count();
        }
    },
    animes: function (st) {
        var filter = {sort: {}};
        filter.sort[Session.get('sortBy')] = Session.get('sortOrder');
        if (!st) {
            return Show.find({
                type: 'anime',
                active: true,
                owner: Meteor.userId(),
                name: new RegExp(Session.get('searchQ'), 'i')
            }, filter);
        } else {
            return Show.find({
                type: 'anime',
                active: true,
                owner: Meteor.userId(),
                status: st,
                name: new RegExp(Session.get('searchQ'), 'i')
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
            return Show.find({
                type: 'serie',
                active: true,
                owner: Meteor.userId(),
                name: new RegExp(Session.get('searchQ'), 'i')
            }).count();
        } else {
            return Show.find({
                type: 'serie',
                active: true,
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
            return Show.find({
                type: 'serie',
                active: true,
                owner: Meteor.userId(),
                name: new RegExp(Session.get('searchQ'), 'i')
            }, filter);
        } else {
            return Show.find({
                type: 'serie',
                active: true,
                owner: Meteor.userId(),
                status: st,
                name: new RegExp(Session.get('searchQ'), 'i')
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
