/**
 * Created by leniglo on 01/01/16.
 */

Template.footer.events({
    'click #logout': function (e) {
        e.preventDefault();
        Meteor.logout(function () {
            throwError('Logged Out. Thanks for using My Super Anime List !', "success", 2000);
        });
    },
    'click #export': function (e) {
        e.preventDefault();
        var json = {
            animes: Show.find({type: 'anime', owner: Meteor.userId()}).fetch(),
            series: Show.find({type: 'serie', owner: Meteor.userId()}).fetch()
        };
        $md_imp_exp.show(500).find("textarea").focus().val(JSON.stringify(json));
    },
    'click #import': function (e) {
        e.preventDefault();
        $md_imp_exp.show(500).find("textarea").val("").focus();
    },
    'click #changeBackground': function (e) {
        e.preventDefault();
        $md_chg_back.show(500).find("input").val("").focus();
    }
});