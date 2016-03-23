Show = new Meteor.Collection('shows');

Show.allow({
    insert: function (userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        return (userId && doc.owner === userId);
    },
    update: function (userId, doc, fields, modifier) {
        // can only change your own documents
        return doc.owner === userId;
    },
    remove: function (userId, doc) {
        // can only remove your own documents
        return doc.owner === userId;
    },
    fetch: ['owner']
});

if (Meteor.isServer) {
    Show.before.insert(function (userId, it) {

        if (!userId) {
            return false;
        }

        if (!it.type || it.type === '') {
            return false;
        }

        if (it.name === '') {
            return false;
        }

        it.pic = it.pic ? it.pic : '/img/noPic.png';
        it.link = it.link ? it.link : '';
        it.owner = it.owner == userId ? it.owner : userId;
        it.active = true;

        try {
            it.season = (it.season === '' ? 0 : parseInt(it.season));
            it.episode = (it.episode === '' ? 0 : parseInt(it.episode));
        } catch (e) {
            return false;
        }

        if (!(Match.test(it.name, String) &&
            Match.test(it.type, String) &&
            Match.test(it.pic, String) &&
            Match.test(it.link, String) &&
            Match.test(it.season, Number) &&
            Match.test(it.episode, Number) &&
            Match.test(it.status, String) &&
            Match.test(it.owner, String))) {
            return false;
        }

        var d = new Date();
        it.createdAt = it.createdAt || d.YYYYMMDDHHMMSS();
        it.updatedAt = d.YYYYMMDDHHMMSS();
        return true;
    });

    Show.before.update(function (userId, it, fieldNames, modifier, options) {
        var d = new Date();
        modifier.$set = modifier.$set || {};
        modifier.$set.updatedAt = d.YYYYMMDDHHMMSS();
        return true;
    });

    Show.before.remove(function (userId, it) {
        if (userId == it.owner) {
            Show.update({_id: it._id}, {$set: {active: false}});
        }
        return false;
    });
}