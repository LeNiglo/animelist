/**
 * Created by leniglo on 15/12/15.
 */

Template.item.events({
    // TWO WAY DATA-BINDING, PURE JS SKILLS :p
    'change input, change select': function (e) {
        var $this = $(e.target);

        var set = {};
        set[$this.prop("name")] = $this.prop("type") === "number" ? parseInt($this.val()) : $this.val();
        var obj = this;
        Show.update({_id: this._id}, {$set: set}, function (err, count) {
            if (!err && count) {
                if (window.location.href.indexOf("local") <= -1) {
                    GAnalytics.event('Show', 'Update', obj.type, obj.name);
                }
            }
        });
    },
    'click .change_pic': function (e) {
        e.preventDefault();

        $md_cg_pic.find('input[name="_id"]').val(this._id);
        $md_cg_pic.find('input[name="pic"]').val(this.pic);
        $md_cg_pic.modal('show');
    },
    'click .change_link': function (e) {
        e.preventDefault();

        $md_cg_link.find('input[name="_id"]').val(this._id);
        $md_cg_link.find('input[name="link"]').val(this.link);
        $md_cg_link.modal('show');
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
            var obj = this;
            Show.remove({_id: this._id}, function (err, count) {
                if (!err && count) {
                    if (window.location.href.indexOf("local") <= -1) {
                        GAnalytics.event('Show', 'Remove', obj.type, obj.name);
                    }
                }
            });
        }
    },
    'dblclick .editable-name': function (e) {
        return Session.set("TargetedItem", this._id);
    },
    'change .edited-name, blur .edited-name': function () {
        Session.set("TargetedItem", null);
    }
});

Template.item.helpers({
    currentlyEditing: function () {
        return Session.get("TargetedItem") && Session.get("TargetedItem") === this._id;
    },
    validLink: function () {
        var invalidLinks = [undefined, null, '', ' ', '#', '/', 'http://localhost:3000', 'http://animelist.lefrantguillaume.com', 'http://animelist.lefrantguillaume.com/', 'http://animelist.lefrantguillaume.com#', 'http://animelist.lefrantguillaume.com/#'];
        return (invalidLinks.indexOf(this.link) === -1);
    },
    updatedAtHumanized: function () {
        return moment.tz(this.updatedAt, 'YYYYMMDDHHmmss', 'Europe/London').fromNow();
    }
});