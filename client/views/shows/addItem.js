/**
 * Created by leniglo on 05/01/16.
 */

Meteor.subscribe('showNames');

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

Template.addItem.events({
    'submit .addItem': function (e) {
        e.preventDefault();
        var $form = $(e.target);

        var obj = {};
        obj.name = $form.find('input[name="name"]').val();
        obj.status = $form.find('select[name="status"]').val();
        obj.season = $form.find('input[name="season"]').val();
        obj.episode = $form.find('input[name="episode"]').val();
        obj.type = $form.data('type');
        obj.owner = Meteor.userId();

        Show.insert(obj, function (err, res) {
            if (!err && res) {
                $form.trigger('reset');
                if (window.location.href.indexOf("local") <= -1) {
                    ga('send', {
                        hitType: 'event',
                        eventCategory: 'Show',
                        eventAction: 'Add',
                        eventLabel: obj.type,
                        eventValue: obj.name,
                        nonInteraction: true
                    });
                }
            }
        });
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
                    return Show.find({type: 'anime'}).fetch();
                },
                template: 'showsuggest',
                header: '<p><em class="tt-title">Animes</em></p>'
            },
            {
                name: 'series',
                valueKey: 'name',
                displayKey: 'name',
                local: function () {
                    return Show.find({type: 'serie'}).fetch();
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