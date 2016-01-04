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
    // TWO WAY DATA-BINDING
    'change input, change select': function (e) {
        var $this = $(e.target);

        var set = {};
        set[$this.prop("name")] = $this.val();
        Show.update({_id: this._id}, {$set: set});
    },
    'click .change_pic': function (e) {
        e.preventDefault();

        $cg_pic.find('input[name="_id"]').val(this._id);
        $cg_pic.find('input[name="pic"]').val(this.pic);
        $cg_pic.modal('show');
        $cg_pic.find('input[name="pic"]').select();
    },
    'click .change_link': function (e) {
        e.preventDefault();
        var $form = $(e.target);

        $cg_link.find('input[name="_id"]').val(this._id);
        $cg_link.find('input[name="link"]').val(this.link);
        $cg_link.modal('show');
        $cg_link.find('input[name="link"]').select();
    },
    'click .add_season': function (e) {
        e.preventDefault();

        Show.update({_id: this._id}, {$inc: {season: 1}});
        return false;
    },
    'click .add_episode': function (e) {
        e.preventDefault();

        Show.update({_id: this._id}, {$inc: {episode: 1}});
        return false;
    },
    'click .remove_item': function (e) {
        e.preventDefault();

        if (confirm("Are you sure you want to remove " + this.name + " from your " + this.type + " list ?") === true) {
            Show.remove({_id: this._id});
        }
    },
    'dblclick .editable-name': function (e) {
        return Session.set("TargetedItem", this._id);
    },
    'change .edited-name, blur .edited-name': function () {
        Session.set("TargetedItem", null);
    }
});