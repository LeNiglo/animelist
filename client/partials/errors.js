/**
 * Created by leniglo on 01/01/16.
 */

Errors = new Meteor.Collection(null);
var errorId = 0;

throwError = function (message, level, timeout) {

    var savedId = ++errorId;

    Errors.insert({
        id: savedId,
        message: message,
        level: level
    });

    if (timeout) {
        Meteor.setTimeout(function () {
            $('.alert[data-id="' + savedId + '"]').fadeOut(200, function () {
                $(this).remove();
                Errors.remove({id: savedId});
            });
        }, timeout);
    }

    return false;

};

Template.errors.helpers({
    errors: function () {
        return Errors.find();
    }
});

Template.error.events({
    "close.bs.alert .alert": function (e) {
        var savedId = $(e.currentTarget).data('id');
        Errors.remove({id: savedId});
    }
});