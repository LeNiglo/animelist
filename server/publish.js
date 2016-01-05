Meteor.publish('myAnimes', function () {
    return Show.find({owner: this.userId, type: "anime", active: true});
});

Meteor.publish('mySeries', function () {
    return Show.find({owner: this.userId, type: "serie", active: true});
});

Meteor.publish('showNames', function () {
    return [
        Show.find({active: true}, {fields: {name: 1, type: 1, status: 1, owner: 1}}),
        Meteor.users.find({}, {fields: {username: 1, _id: 1}})
    ];
});