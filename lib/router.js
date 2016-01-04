/**
 * Created by leniglo on 01/01/16.
 */

Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loader'
});

Router.route('/', {
    template: 'home',
    waitOn: function () {
        return [
            Meteor.subscribe('myAnimes'),
            Meteor.subscribe('mySeries')
        ];
    },
    onBeforeAction: function () {
        if (!Meteor.user())
            Router.go('/login');
        this.next();
    }
});

Router.route('/login', {
    template: 'login',
    onBeforeAction: function () {
        if (Meteor.user())
            Router.go('/');
        this.next();
    }
});

Router.route('/register', {
    template: 'register',
    onBeforeAction: function () {
        if (Meteor.user())
            Router.go('/');
        this.next();
    }
});