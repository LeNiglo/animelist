Meteor.publish('mylist', function () {
    return [

        Anime.find({owner: this.userId}),
        Serie.find({owner: this.userId})

    ];
});

Meteor.publish('showNames', function() {
    return [

        Anime.find({owner: this.userId}, {fields: {'name': 1}}),
        Serie.find({owner: this.userId}, {fields: {'name': 1}})

    ];
});
