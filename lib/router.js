/**
 * Created by leniglo on 01/01/16.
 */

Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loader'
});

Router.route('/', {
    template: 'home',
    fastRender: true,
    onBeforeAction: function () {
        if (!Meteor.user() && !Meteor.loggingIn())
            this.redirect('/login');
        this.next();
    }
});

Router.route('/login', {
    template: 'login',
    fastRender: true,
    onBeforeAction: function () {
        if (Meteor.user())
            this.redirect('/');
        this.next();
    }
});

Router.route('/register', {
    template: 'register',
    fastRender: true,
    onBeforeAction: function () {
        if (Meteor.user())
            this.redirect('/');
        this.next();
    }
});