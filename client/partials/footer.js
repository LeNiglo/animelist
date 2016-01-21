/**
 * Created by leniglo on 01/01/16.
 */

Template.footer.events({
    'click #logout': function (e) {
        e.preventDefault();
        Meteor.logout(function () {
            FlashMessages.sendSuccess('Logged Out. Thanks for using My Super Anime List !', {hideDelay: 2000});
        });
    },
    'click #export': function (e) {
        e.preventDefault();
        Meteor.call('export', function (error, result) {
            if (error) {
                FlashMessages.sendAlert(error);
            } else {
                $md_imp_exp.modal('show').find("textarea").val(JSON.stringify(result));
            }
        });
    },
    'click #import': function (e) {
        e.preventDefault();
        $md_imp_exp.modal('show');
    },
    'click #changeBackground': function (e) {
        e.preventDefault();
        $md_chg_back.modal('show');
    }
});