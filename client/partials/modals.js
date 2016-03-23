/**
 * Created by leniglo on 04/01/16.
 */

Template.modals.events({
    'submit #form_change_picture': function (e) {
        e.preventDefault();
        e.stopPropagation();

        var id = $md_cg_pic.find('input[name="_id"]').val();
        var picture = $md_cg_pic.find('input[name="pic"]').val();

        Show.update({_id: id}, {$set: {pic: picture}}, function (err, res) {
            if (err)
                alert(err);
            if (res > 0)
                $md_cg_pic.modal('hide');
        });
    },
    'submit #form_change_link': function (e) {
        e.preventDefault();
        e.stopPropagation();

        var id = $md_cg_link.find('input[name="_id"]').val();
        var link = $md_cg_link.find('input[name="link"]').val();

        Show.update({_id: id}, {$set: {link: link}}, function (err, res) {
            if (err)
                alert(err);
            if (res > 0)
                $md_cg_link.modal('hide');
        });
    },
    'submit #form_change_background': function (e) {
        e.preventDefault();
        e.stopPropagation();

        var input = $md_cg_back.find('input').val();
        if (Meteor.userId() != null) {
            Meteor.call('changeUserBackground', input, function (error, result) {
                if (result) {
                    $body.css('background-image', 'url(' + Meteor.user().profile.background + ')');
                    $md_cg_back.modal('hide');
                }
            });
        }
    },
    'click #reset_change_background': function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (Meteor.userId()) {
            Meteor.call('changeUserBackground', null, function (error, result) {
                if (result) {
                    $body.css('background-image', '');
                    $md_cg_back.modal('hide');
                }
            });
        }
    },
    'submit #form_import_export': function (e) {
        e.preventDefault();
        e.stopPropagation();

        var json = $md_imp_exp.find("textarea").val();
        try {
            var obj = JSON.parse(json);
            Meteor.call('import', obj, function (error, result) {
                $md_imp_exp.modal('hide');
                FlashMessages.sendSuccess("Imported " + result + " element(s).", {autoHide: false});
            });
        } catch (error) {
            $("#modal_import_export").modal('hide');
            alert("Don't try to trick us !\nJSON isn't well formatted.\n" + error.toString());
            return false;
        }
    }
});