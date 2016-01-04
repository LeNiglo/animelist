Session.setDefault('searchQ', '');
Session.set('reload', 0);

Meteor.subscribe('myAnimes');
Meteor.subscribe('mySeries');
