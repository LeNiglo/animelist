Meteor.publish('mylist', function () {
    return [

        Anime.find({owner: this.userId}),
        Serie.find({owner: this.userId})

    ];
});

Meteor.publish('showNames', function () {
    var animes = Anime.find({}, {fields: {'name': 1, 'owner': 1}}),
        series = Serie.find({}, {fields: {'name': 1, 'owner': 1}});

    return [

        animes,
        series,
        Meteor.users.find({}, {fields: {'username': 1, '_id': 1}})

    ];
});

Meteor.methods({
    changeUserBackground: function(newPic) {
        if (Meteor.userId()) {
            return Meteor.users.update({_id: Meteor.userId()}, { $set:{"profile.background": newPic}});
        } else {
            return false;
        }
    }
});