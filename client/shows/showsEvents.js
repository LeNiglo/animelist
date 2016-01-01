/**
 * Created by leniglo on 15/12/15.
 */

Template.addItem.events({
    'submit .addItem': function (e) {
        e.preventDefault();
        var $form = $(e.target);

        var obj = {};
        obj.name = $form.find('input[name="name"]').val();
        obj.status = $form.find('select[name="status"]').val();
        obj.season = $form.find('input[name="season"]').val();
        obj.episode = $form.find('input[name="episode"]').val();
        obj.type = $form.data('type');
        obj.owner = Meteor.userId();

        Show.insert(obj, function (err, res) {
            console.log(obj, err, res);
            if (!err && res) {
                $form.trigger('reset');
            }
        });
    }
});

Template.item.events({
    'click .change_pic': function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var _id = $form.parents('form').find('input[name="id"]').val();
        $cg_pic.find('input[name="_id"]').val(_id);
        $cg_pic.find('input[name="pic"]').val('');
        $cg_pic.show(500);
        $cg_pic.find('input[name="pic"]').focus();
    },
    'change .show_commentary': function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var id = $form.parent().parent().parent().find('input[name="id"]').val();
        var commentary = $form.val();

        var $glyph = $form.parent().parent().parent().find('.glyphicon-save');
        mySave($glyph, id, {commentary: commentary});
    },
    'click .save': function (e) {
        e.preventDefault();
        var $form = $(e.target).closest('form');

        var obj = {};
        obj._id = $form.find('input[name="id"]').val();
        obj.status = $form.find('select[name="status"]').val();
        obj.season = $form.find('input[name="season"]').val();
        obj.episode = $form.find('input[name="episode"]').val();

        var $glyph = $form.find('.glyphicon-save');
        if (e.clientX && e.clientY) {
            throwError("clientX : " + e.clientX + ", clientY" + e.clientY, "warning");
            return false;
        }
        mySave($glyph, obj._id, {
            status: obj.status,
            season: obj.season,
            episode: obj.episode
        });
    },
    'click .add_season': function (e) {
        e.preventDefault();
        var $form = $(e.target).closest('form');
        var $input = $form.find('input[name="season"]');

        $input.val(1 + parseInt($input.val()));
        $form.find('.save')[0].click();
        return false;
    },
    'click .add_episode': function (e) {
        e.preventDefault();
        var $form = $(e.target).closest('form');
        var $input = $form.find('input[name="episode"]');

        $input.val(1 + parseInt($input.val()));
        $form.find('.save')[0].click();
        return false;
    },
    'click .remove_item': function (e) {
        e.preventDefault();
        var name = $(e.target).parents('.item').find('big').text();
        var id = $(e.target).parents('form').find('input[name="id"]').val();

        var r = confirm("Are you sure you want to remove " + name + " from your " + collec + " list ?");
        if (r === true) {
            Show.remove({_id: id}, function () {
            });
        }
    },
    'click .change_link': function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var _id = $form.parents('form').find('input[name="id"]').val();
        $cg_link.find('input[name="_id"]').val(_id);
        $cg_link.find('input[name="link"]').val('');
        $cg_link.show(500);
        $cg_link.find('input[name="link"]').focus();
    },
    'dblclick .editable-name': function (e, t) {
        return Session.set("TargetedItem", t.data._id);
    },
    'change .edited-name, blur .edited-name': function (e) {
        var $this = $(e.target);
        var newName = $this.val();

        var $glyph = $this.closest('.item').find('.glyphicon-save');
        mySave($glyph, this._id, {name: newName});
        Session.set("TargetedItem", null);
    }
});