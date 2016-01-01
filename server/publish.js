Meteor.publish('myAnimes', function () {
    return [
        Show.find({owner: this.userId, type: "anime"})
    ];
});

Meteor.publish('mySeries', function () {
    return [
        Show.find({owner: this.userId, type: "serie"})
    ];
});

Meteor.publish('showNames', function () {
    return [
        Show.find({}, {fields: {'name': 1, 'status': 1, 'owner': 1}}),
        Meteor.users.find({}, {fields: {'username': 1, '_id': 1}})
    ];
});