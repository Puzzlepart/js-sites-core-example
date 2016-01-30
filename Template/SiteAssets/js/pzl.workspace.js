/// <reference path="..\..\..\typings\sharepoint\SharePoint.d.ts" />
var Pzl;
(function (Pzl) {
    var Workspace;
    (function (Workspace) {
        var inheritMetadataWaitDialog;
        function GetWebProperties() {
            var def = jQuery.Deferred();
            ExecuteOrDelayUntilScriptLoaded(function () {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var allProperties = web.get_allProperties();
                clientContext.load(allProperties);
                clientContext.executeQueryAsync(() => {
                    def.resolve(allProperties.get_fieldValues());
                }, () => {
                    def.reject();
                });
            }, "sp.js");
            return def.promise();
        }
        function ShowWaitMessage(header, content, height, width) {
            inheritMetadataWaitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(header, content, height, width);
        }
        function Reload() {
            window.location.href = window.location.href;
        }
        function GetWelcomePageProperties(startsWith, useDisplayNames, excludeProps = []) {
            var def = jQuery.Deferred();
            var clientContext = SP.ClientContext.get_current();
            var list = clientContext.get_web().get_lists().getByTitle("Site Pages");
            var fields = null;
            var welcomePageItem = list.getItemById(1);
            if (useDisplayNames) {
                fields = list.get_fields();
                clientContext.load(fields);
            }
            clientContext.load(welcomePageItem);
            clientContext.executeQueryAsync(() => {
                var allProperties = welcomePageItem.get_fieldValues();
                if (startsWith) {
                    var fieldValues = {};
                    Object.keys(allProperties).forEach(key => {
                        if (key.substring(0, startsWith.length) != startsWith || Array.contains(excludeProps, key))
                            return;
                        var value = allProperties[key];
                        if (useDisplayNames) {
                            key = jQuery.grep(fields.get_data(), (f) => f.get_internalName() == key)[0].get_title();
                        }
                        fieldValues[key] = value;
                    });
                    def.resolve(fieldValues);
                }
                else {
                    def.resolve(allProperties);
                }
            }, (sender, args) => {
                def.reject(sender, args);
            });
            return def.promise();
        }
        function GetWebPartElement(wpTitle) {
            return jQuery(".ms-webpart-titleText").filter(function () { return jQuery(this).text() == wpTitle; }).parents(".ms-webpart-chrome").first();
        }
        function GetMetadata() {
            var def = jQuery.Deferred();
            ExecuteOrDelayUntilScriptLoaded(() => {
                GetWelcomePageProperties("Port", true).then((properties) => {
                    var metadata = {};
                    var dsActive = properties["Document Space Active"];
                    for (var key in properties) {
                        if (key == "Document Space Active")
                            continue;
                        else if (!properties[key])
                            continue;
                        else if (properties[key].Label)
                            metadata[key] = properties[key].Label;
                        else if (properties[key].get_label)
                            metadata[key] = properties[key].get_label();
                        else
                            metadata[key] = properties[key];
                    }
                    var editMetadataLink = jQuery("<a/>")
                        .css("display", "none")
                        .attr("href", "../SitePages/Forms/EditForm.aspx?ID=1")
                        .attr("id", "editMetadataLink")
                        .html("<span></span>")
                        .fadeIn(300);
                    GetWebPartElement("Key Information").find(".ms-webpart-titleText").append(editMetadataLink);
                    def.resolve({ props: metadata, active: dsActive });
                });
            }, "sp.js");
            return def.promise();
        }
        Workspace.GetMetadata = GetMetadata;
        function UpdateWebPropertyBag(key, value) {
            var def = jQuery.Deferred();
            const context = SP.ClientContext.get_current();
            const web = context.get_web();
            var allProperties = web.get_allProperties();
            allProperties.set_item(key, value);
            context.load(web);
            web.update();
            context.executeQueryAsync((sender, args) => {
                def.resolve();
            }, (sender, args) => {
                def.resolve();
            });
            return def.promise();
        }
        Workspace.UpdateWebPropertyBag = UpdateWebPropertyBag;
        function Initialize() {
            GetWebProperties().then(allProperties => {
                //Nothing yet
            });
        }
        Workspace.Initialize = Initialize;
    })(Workspace = Pzl.Workspace || (Pzl.Workspace = {}));
})(Pzl || (Pzl = {}));
_spBodyOnLoadFunctions.push(Pzl.Workspace.Initialize);
