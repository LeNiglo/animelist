/**
 * Created by leniglo on 01/01/16.
 */

Meteor.methods({
    changeUserBackground: function (newPic) {
        if (Meteor.userId()) {
            return Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.background": newPic}});
        } else {
            return false;
        }
    }
});