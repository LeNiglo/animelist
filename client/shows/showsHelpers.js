/**
 * Created by leniglo on 15/12/15.
 */


Template.animes.helpers({
    number: function (st) {
        if (!st) {
            return Show.find({
                type: 'anime',owner: Meteor.userId(), name: new RegExp(Session.get('searchQ'), 'i')}).count();
        } else {
            return Show.find({
                type: 'anime',
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
                type: 'anime',owner: Meteor.userId(), name: new RegExp(Session.get('searchQ'), 'i')}, filter);
        } else {
            return Show.find({
                type: 'anime',
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
                owner: Meteor.userId(),
                name: new RegExp(Session.get('searchQ'), 'i')
            }).count();
        } else {
            return Show.find({
                type: 'serie',
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
                owner: Meteor.userId(),
                name: new RegExp(Session.get('searchQ'), 'i')
            }, filter);
        } else {
            return Show.find({
                type: 'serie',
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

Template.addItem.helpers({
    shownames: function () {
        return [
            {
                name: 'animes',
                valueKey: 'name',
                displayKey: 'name',
                local: function () {
                    return Show.find({type: "anime"}).fetch();
                },
                template: 'showsuggest',
                header: '<p><em class="tt-title">Animes</em></p>'
            },
            {
                name: 'series',
                valueKey: 'name',
                displayKey: 'name',
                local: function () {
                    return Show.find({type: "serie"}).fetch();
                },
                template: 'showsuggest',
                header: '<p><em class="tt-title">Series</em></p>'
            }
        ];
    }
});

Template.showsuggest.helpers({
    getOwner: function (ow) {
        return Meteor.users.findOne({_id: ow}).username;
    }
});

Template.item.helpers({
    currentlyEditing: function () {
        return Session.get("TargetedItem") && Session.get("TargetedItem") === this._id;
    },
    validLink: function () {
        var links = [undefined, null, '', ' ', '#', '/', 'http://localhost:3000', 'http://animelist.lefrantguillaume.com', 'http://animelist.lefrantguillaume.com/', 'http://animelist.lefrantguillaume.com#', 'http://animelist.lefrantguillaume.com/#'];
        return (links.indexOf(this.link) === -1);
    }
});