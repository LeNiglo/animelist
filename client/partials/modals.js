/**
 * Created by leniglo on 04/01/16.
 */

Template.modals.events({
    'click #change_picture_apply': function (e) {
        e.preventDefault();
        var id = $cg_pic.find('input[name="_id"]').val();
        var picture = $cg_pic.find('input[name="pic"]').val();

        Show.update({_id: id}, {$set: {pic: picture}}, function (err, res) {
            if (err)
                alert(err);
            if (res > 0)
                $cg_pic.modal('hide');
        });
    },
    'click #change_link_apply': function (e) {
        e.preventDefault();
        var id = $cg_link.find('input[name="_id"]').val();
        var link = $cg_link.find('input[name="link"]').val();

        Show.update({_id: id}, {$set: {link: link}}, function (err, res) {
            if (err)
                alert(err);
            if (res > 0)
                $cg_link.modal('hide');
        });
    },
    'click #confirmChangeBackground': function (e) {
        e.preventDefault();
        var input = $md_chg_back.find('input').val();
        if (Meteor.userId() != null) {
            Meteor.call('changeUserBackground', input, function (error, result) {
                if (result) {
                    $md_chg_back.modal('hide');
                }
            });
        }
    },
    'click #resetChangeBackground': function (e) {
        e.preventDefault();
        if (Meteor.userId()) {
            Meteor.call('changeUserBackground', null, function (error, result) {
                if (result) {
                    $md_chg_back.modal('hide');
                }
            });
        }
    },
    'click #import_json': function (event) {
        event.preventDefault();

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