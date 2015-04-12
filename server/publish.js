Meteor.publish('mylist', function () {
    return [

        Anime.find({owner: this.userId}),
        Serie.find({owner: this.userId})

    ];
});
