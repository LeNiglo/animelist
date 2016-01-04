Meteor.publish('myAnimes', function () {
    console.log(this.userId);
    return Show.find({owner: this.userId, type: "anime", active: true});
});

Meteor.publish('mySeries', function () {
    console.log(this.userId);
    return Show.find({owner: this.userId, type: "serie", active: true});
});

Meteor.publish('showNames', function () {
    var shows = Show.find({}, {fields: {name: 1, type: 1, status: 1, owner: 1}});

    return [
        shows,
        Meteor.users.find({}, {fields: {username: 1, _id: 1}})
    ];
});