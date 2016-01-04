/**
 * Created by leniglo on 01/01/16.
 */


Template.register.events({
    'submit #form-register': function (e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var password2 = $('#password2').val();
        var email = $('#email').val();

        if (password !== password2) {
            FlashMessages.sendWarning("Passwords must match.");
            $('#password2').addClass('has-warning').val('').focus();
        }

        Accounts.createUser({
            username: username,
            password: password,
            email: email,
            profile: {
                name: username
            }
        }, function (err) {
            FlashMessages.sendError(err, {autoHide: false});
        });

        return false;
    }
});