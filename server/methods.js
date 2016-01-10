/**
 * Created by leniglo on 01/01/16.
 */

Meteor.methods({
    changeUserBackground: function (newPic) {
        if (Meteor.userId()) {
            return Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.background": newPic}});
        } else {
            return false;
        }
    },
    changeUserSettings: function (opts) {
        if (Meteor.userId()) {
            return Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.settings": opts}});
        } else {
            return false;
        }
    },
    import: function (obj) {
        var count = 0;
        obj.animes.forEach(function (elem) {
            if (proceedImport(elem, 'anime'))
                ++count;
        });
        obj.series.forEach(function (elem) {
            if (proceedImport(elem, 'serie'))
                ++count;
        });
        return count;
    },
    export: function () {
        return {
            animes: Show.find({type: 'anime', owner: Meteor.userId()}).fetch(),
            series: Show.find({type: 'serie', owner: Meteor.userId()}).fetch()
        };
    }
});

/*
 * Helper functions
 */

function proceedImport(elem, type) {
    var test = Show.findOne({
        $and: [
            {name: elem.name},
            {type: type},
            {active: true},
            {owner: Meteor.userId()}
        ]
    });
    if (test) {
        if (test.updatedAt === null || elem.updatedAt > test.updatedAt) {
            Show.update({name: elem.name}, {
                $set: {
                    type: type,
                    pic: elem.pic,
                    status: elem.status,
                    season: elem.season,
                    episode: elem.episode,
                    link: elem.link,
                    commentary: elem.commentary
                }
            });
            return true;
        }
    } else {
        Show.insert({
            type: type,
            name: elem.name,
            status: elem.status,
            season: elem.season,
            episode: elem.episode,
            pic: elem.pic,
            link: elem.link,
            commentary: elem.commentary,
            createdAt: elem.createdAt
        });
        return true;
    }
    return false;
}