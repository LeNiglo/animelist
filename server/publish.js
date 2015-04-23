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
