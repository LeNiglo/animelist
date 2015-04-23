Serie = new Meteor.Collection('series');

Serie.allow({
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

Serie.before.insert(function (userId, it) {

    if (!userId) {
        return false;
    }

    if (it.name === '') {
        return false;
    }

    it.pic = it.pic ? it.pic : '/img/noPic.png';
    it.link = it.link ? it.link : '#';
    it.owner = it.owner == userId ? it.owner : userId;

    try {
        it.season = (it.season === '' ? 0 : parseInt(it.season));
        it.episode = (it.episode === '' ? 0 : parseInt(it.episode));
    } catch (e) {
        return false;
    }

    if (!(Match.test(it.name, String) && Match.test(it.pic, String) && Match.test(it.link, String) && Match.test(it.season, Number) &&
        Match.test(it.episode, Number) && Match.test(it.status, String) && Match.test(it.owner, String))) {
        return false;
    }

    var d = new Date();
    it.createdAt = it.createdAt || d.YYYYMMDDHHMMSS();
    it.updatedAt = d.YYYYMMDDHHMMSS();
});

Serie.before.update(function (userId, it) {
    if (userId == it.owner) {
        var d = new Date();
        it.updatedAt = d.YYYYMMDDHHMMSS();
    } else {
        return false;
    }
});

Serie.before.remove(function (userId, it) {
    return userId == it.owner;
});
