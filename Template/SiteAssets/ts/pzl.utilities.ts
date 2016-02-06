/// <reference path="..\..\..\typings\tsd.d.ts" />
module Pzl.Utilities {
    export function getJSON(url: string, successCallback: Function, errorCallback: Function) {
        jQuery.ajax({
            url: url,
            type: 'get',
            headers: { "accept": "application/json;odata=verbose" },
            success: (response) => { successCallback(response.d); },
            error: (response) => { errorCallback(response); }
        });
    }
    export function GetWelcomePageProperties() {
        var def = jQuery.Deferred();
        ExecuteOrDelayUntilScriptLoaded(() => {
            var ctx = SP.ClientContext.get_current();
            var welcomePage = ctx.get_web().get_lists().getByTitle("Områdesider").getItemById(1);
            ctx.load(welcomePage);
            ctx.executeQueryAsync(() => {
                def.resolve(welcomePage.get_fieldValues());
            });
        }, "sp.js");
        return def.promise();
    }
    export function GetAllWebProperties() {
        var def = jQuery.Deferred();
        ExecuteOrDelayUntilScriptLoaded(() => {
            var ctx = SP.ClientContext.get_current();
            var web = ctx.get_web();
            var allProperties = web.get_allProperties();
            ctx.load(allProperties);
            ctx.executeQueryAsync(() => {
                def.resolve(allProperties.get_fieldValues());
            });
        }, "sp.js");
        return def.promise();
    }
    export function GetWebProperty(prop: string) {
        var def = jQuery.Deferred();
        GetAllWebProperties().then(allProperties => {
            def.resolve(allProperties[prop]);
        });
        return def.promise();
    }
    export function SetWebPropertyValue(prop: string, value: string) {
       var def = jQuery.Deferred();
        ExecuteOrDelayUntilScriptLoaded(() => {
            var ctx = SP.ClientContext.get_current();
            var web = ctx.get_web();
            web.get_allProperties().set_item(prop, value);
            web.update();
            ctx.executeQueryAsync(def.resolve, def.resolve);
        }, "sp.js");
        return def.promise();
    }
    export function EnsureUserInGroup(userId: number, groupId: number) {
        var def = jQuery.Deferred();
        ExecuteOrDelayUntilScriptLoaded(() => {
            var ctx = SP.ClientContext.get_current();
            var siteGroup = ctx.get_web().get_siteGroups().getById(groupId);
            var user = ctx.get_web().getUserById(userId);
            siteGroup.get_users().addUser(user);
            ctx.load(user);
            ctx.load(siteGroup);
            ctx.executeQueryAsync((sender, args) => {
                def.resolve(sender, args);
            }, (sender, args) => {
                def.resolve(sender, args);
            });
        }, "sp.js");
        return def.promise();
    }
}