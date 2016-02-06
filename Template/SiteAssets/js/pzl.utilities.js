/// <reference path="..\..\..\typings\tsd.d.ts" />
var Pzl;
(function (Pzl) {
    var Utilities;
    (function (Utilities) {
        function getJSON(url, successCallback, errorCallback) {
            jQuery.ajax({
                url: url,
                type: 'get',
                headers: { "accept": "application/json;odata=verbose" },
                success: function (response) { successCallback(response.d); },
                error: function (response) { errorCallback(response); }
            });
        }
        Utilities.getJSON = getJSON;
        function GetWelcomePageProperties() {
            var def = jQuery.Deferred();
            ExecuteOrDelayUntilScriptLoaded(function () {
                var ctx = SP.ClientContext.get_current();
                var welcomePage = ctx.get_web().get_lists().getByTitle("Områdesider").getItemById(1);
                ctx.load(welcomePage);
                ctx.executeQueryAsync(function () {
                    def.resolve(welcomePage.get_fieldValues());
                });
            }, "sp.js");
            return def.promise();
        }
        Utilities.GetWelcomePageProperties = GetWelcomePageProperties;
        function GetAllWebProperties() {
            var def = jQuery.Deferred();
            ExecuteOrDelayUntilScriptLoaded(function () {
                var ctx = SP.ClientContext.get_current();
                var web = ctx.get_web();
                var allProperties = web.get_allProperties();
                ctx.load(allProperties);
                ctx.executeQueryAsync(function () {
                    def.resolve(allProperties.get_fieldValues());
                });
            }, "sp.js");
            return def.promise();
        }
        Utilities.GetAllWebProperties = GetAllWebProperties;
        function GetWebProperty(prop) {
            var def = jQuery.Deferred();
            GetAllWebProperties().then(function (allProperties) {
                def.resolve(allProperties[prop]);
            });
            return def.promise();
        }
        Utilities.GetWebProperty = GetWebProperty;
        function SetWebPropertyValue(prop, value) {
            var def = jQuery.Deferred();
            ExecuteOrDelayUntilScriptLoaded(function () {
                var ctx = SP.ClientContext.get_current();
                var web = ctx.get_web();
                web.get_allProperties().set_item(prop, value);
                web.update();
                ctx.executeQueryAsync(def.resolve, def.resolve);
            }, "sp.js");
            return def.promise();
        }
        Utilities.SetWebPropertyValue = SetWebPropertyValue;
        function EnsureUserInGroup(userId, groupId) {
            var def = jQuery.Deferred();
            ExecuteOrDelayUntilScriptLoaded(function () {
                var ctx = SP.ClientContext.get_current();
                var siteGroup = ctx.get_web().get_siteGroups().getById(groupId);
                var user = ctx.get_web().getUserById(userId);
                siteGroup.get_users().addUser(user);
                ctx.load(user);
                ctx.load(siteGroup);
                ctx.executeQueryAsync(function (sender, args) {
                    def.resolve(sender, args);
                }, function (sender, args) {
                    def.resolve(sender, args);
                });
            }, "sp.js");
            return def.promise();
        }
        Utilities.EnsureUserInGroup = EnsureUserInGroup;
    })(Utilities = Pzl.Utilities || (Pzl.Utilities = {}));
})(Pzl || (Pzl = {}));
