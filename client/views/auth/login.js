/**
 * Created by leniglo on 01/01/16.
 */

Template.login.events({
    'submit form#form-login': function (e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        Meteor.loginWithPassword(username, password, function (res) {
            if (res) {
                FlashMessages.sendError(res.reason);
            } else {
                FlashMessages.sendSuccess('Logged In. Have Fun using My Super Anime List !');
            }
        });
    }
});
