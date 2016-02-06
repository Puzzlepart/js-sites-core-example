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
    var Provisioning;
    (function (Provisioning) {
        var createWebWaitDialog;
        var titleSelector = "#WebTitle";
        var descSelector = "#WebDescription";
        var urlSelector = "#WebURL";
        var languageSelector = "#WebLanguage";
        var inheritPermissionsSelector = "#WebInheritPermissions";
        var siteTemplateSelector = "#WebTemplate";
        function Create() {
            var createInfo = {
                title: jQuery(titleSelector).val(),
                url: jQuery(urlSelector).val(),
                description: jQuery(descSelector).val(),
                webTemplate: "STS#0",
                webLanguage: jQuery(languageSelector).val(),
                siteTemplate: jQuery(siteTemplateSelector).val(),
                inheritPermissions: jQuery(inheritPermissionsSelector).prop("checked")
            };
            createWebWaitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Creating site", "Please wait...", 130, 600);
            ProvisionSubsite(createInfo).then(function (web) {
                StampPropertyBag(web, createInfo.siteTemplate).then(function () {
                    AddCustomActions(web).then(function () {
                        SetupFeatures(web).then(function () {
                            RedirectToWeb(web, !createInfo.inheritPermissions);
                        });
                    });
                });
            }).fail(function (sender, args) {
                var sId = SP.UI.Status.addStatus("Failed to create workspace", args.get_message(), true);
                SP.UI.Status.setStatusPriColor(sId, "red");
                createWebWaitDialog.close();
            });
        }
        Provisioning.Create = Create;
        /*
            Provisions a subsite
        */
        function ProvisionSubsite(createInfo) {
            var def = jQuery.Deferred();
            ExecuteOrDelayUntilScriptLoaded(function () {
                var clientContext = SP.ClientContext.get_current();
                var currentWeb = clientContext.get_web();
                var webCreateInfo = new SP.WebCreationInformation();
                webCreateInfo.set_description(createInfo.description);
                webCreateInfo.set_language(createInfo.webLanguage);
                webCreateInfo.set_title(createInfo.title);
                webCreateInfo.set_url(createInfo.url);
                webCreateInfo.set_useSamePermissionsAsParentSite(createInfo.inheritPermissions);
                webCreateInfo.set_webTemplate(createInfo.webTemplate);
                var newWeb = currentWeb.get_webs().add(webCreateInfo);
                clientContext.load(newWeb);
                clientContext.executeQueryAsync(function () {
                    def.resolve(newWeb);
                }, def.reject);
            }, "sp.js");
            return def.promise();
        }
        function UrlParams() {
            return location.search.substring(1) ? JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : {};
        }
        /*
            Setting property bag values for web.
        */
        function StampPropertyBag(web, siteTemplate) {
            var def = jQuery.Deferred();
            var clientContext = web.get_context();
            var propBag = web.get_allProperties();
            propBag.set_item("SiteTemplate", siteTemplate);
            propBag.set_item("Web_Configured", "0");
            web.update();
            clientContext.executeQueryAsync(def.resolve, def.reject);
            return def.promise();
        }
        /*
            Adding custom actions for web.
        */
        function AddCustomActions(web) {
            var def = jQuery.Deferred();
            var clientContext = web.get_context();
            var webCustomActions = web.get_userCustomActions();
            var setupAction = webCustomActions.add();
            setupAction.set_location('ScriptLink');
            setupAction.set_sequence(100);
            setupAction.set_scriptBlock("(_v_dictSod.hasOwnProperty('jquery') || SP.SOD.registerSod('jquery', '~sitecollection/siteassets/js-sites-example/js/jquery.min.js'));SP.SOD.registerSod('pzl.workspace.setup.js', '~sitecollection/siteassets/js-sites-example/js/pzl.workspace.setup.js');SP.SOD.registerSodDep('pzl.workspace.setup.js', 'jquery');EnsureScriptFunc('pzl.workspace.setup.js', null, function() {});");
            setupAction.set_name("pzl.workspace.setup.js");
            setupAction.set_title("pzl.workspace.setup.js");
            setupAction.update();
            clientContext.load(web, 'Title', 'UserCustomActions');
            clientContext.executeQueryAsync(def.resolve, def.reject);
            return def.promise();
        }
        /*
            Setting up features for web.
            
            Adding: N/A
            Removing: Minimal Download Strategy
        */
        function SetupFeatures(web) {
            var def = jQuery.Deferred();
            var clientContext = web.get_context();
            var webFeatures = web.get_features();
            webFeatures.remove(new SP.Guid("87294c72-f260-42f3-a41b-981a2ffce37a"), true);
            web.update();
            clientContext.executeQueryAsync(def.resolve, def.reject);
            return def.promise();
        }
        /*
            Redirecting to web.
        */
        function RedirectToWeb(web, permsetup) {
            document.location.href = "" + web.get_url() + (permsetup ? '/_layouts/15/permsetup.aspx?hideCancel=1' : '');
        }
        function RetrieveTemplates() {
            Pzl.Utilities.getJSON(_spPageContextInfo.siteServerRelativeUrl + "/_api/web/GetFolderByServerRelativeUrl('" + _spPageContextInfo.siteServerRelativeUrl + "/SiteTemplates')/Files?$select=Title,Name&$orderby=TimeLastModified desc", function (response) {
                response.results.forEach(function (r) {
                    jQuery(siteTemplateSelector).append("<option value='" + r.Name.split(".")[0] + "'>" + r.Title + "</option>");
                });
                jQuery(siteTemplateSelector).removeAttr("disabled");
                jQuery(siteTemplateSelector).find("option").first().attr("selected", "");
            }, function () {
            });
        }
        function AutofillUrl() {
            jQuery(titleSelector).keyup(function () { jQuery(urlSelector).val(jQuery(this).val().split(' ').join('-')); });
        }
        function IntializeForm() {
            RetrieveTemplates();
            AutofillUrl();
        }
        _spBodyOnLoadFunctions.push(IntializeForm);
    })(Provisioning = Pzl.Provisioning || (Pzl.Provisioning = {}));
})(Pzl || (Pzl = {}));
