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
/// <reference path="..\..\..\typings\tsd.d.ts" />
/// <reference path="pzl.utilities.ts" />
var Pzl;
(function (Pzl) {
    var Workspace;
    (function (Workspace) {
        var Setup;
        (function (Setup) {
            function SetIsConfigured() {
                var def = jQuery.Deferred();
                Pzl.Utilities.SetWebPropertyValue("Web_Configured", "1").then(function () { return def.resolve(); });
                return def.promise();
            }
            function Reload() {
                window.location.href = window.location.href;
            }
            function GetSiteTemplateConfig(siteTemplate) {
                var def = jQuery.Deferred();
                jQuery.getJSON(_spPageContextInfo.siteAbsoluteUrl + "/SiteTemplates/" + siteTemplate + ".txt", function (json) {
                    def.resolve(json);
                }).fail(def.reject);
                return def.promise();
            }
            function GetSiteTemplate(tmpl) {
                var def = jQuery.Deferred();
                GetSiteTemplateConfig(tmpl).done(function (json) {
                    def.resolve(json);
                }).fail(def.reject);
                return def.promise();
            }
            function SetupSite(siteTemplateConfig) {
                Pzl.Sites.Core.init(siteTemplateConfig, {
                    WaitMessage: {
                        Header: "Applying template",
                        Content: "Shouldn't take long",
                        ShowProgress: true,
                        ProgressOverrides: {
                            "PropertyBagEntries": "Stamping web properties",
                            "Security": "Setting up permissions",
                            "Lists": "Setting up lists, fields and content types",
                            "CustomActions": "Setting up custom actions",
                            "Files": "Adding files and webparts",
                            "Navigation": "Setting up your quicklaunch",
                            "ComposedLook": "Applying theme"
                        }
                    },
                    Logging: {
                        On: true,
                        LoggingFolder: _spPageContextInfo.siteServerRelativeUrl + "/Logs"
                    }
                }).then(function () {
                    SetIsConfigured().then(function () { return Reload(); });
                });
            }
            Setup.SetupSite = SetupSite;
            function AttemptConfiguration() {
                Pzl.Utilities.GetAllWebProperties().then(function (properties) {
                    var isConfigured = properties.Web_Configured == "1";
                    if (isConfigured)
                        return;
                    GetSiteTemplate(properties.SiteTemplate).done(function (siteTemplate) {
                        SetupSite(siteTemplate);
                    }).fail(function () {
                        console.error("The provided template is invalid.");
                    });
                });
            }
            Setup.AttemptConfiguration = AttemptConfiguration;
        })(Setup = Workspace.Setup || (Workspace.Setup = {}));
    })(Workspace = Pzl.Workspace || (Pzl.Workspace = {}));
})(Pzl || (Pzl = {}));
(function () { Pzl.Workspace.Setup.AttemptConfiguration(); })();
