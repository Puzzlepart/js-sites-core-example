/// <reference path="..\..\..\typings\tsd.d.ts" />
/// <reference path="pzl.utilities.ts" />

module Pzl.Workspace.Setup {
    function SetIsConfigured() {
        var def = jQuery.Deferred();
        Utilities.SetWebPropertyValue("Web_Configured", "1").then(() => def.resolve());
        return def.promise();
    }
    function Reload() {
        window.location.href = window.location.href;
    }
    function GetSiteTemplateConfig(siteTemplate: string) {
        var def = jQuery.Deferred();

        jQuery.getJSON(`${_spPageContextInfo.siteAbsoluteUrl}/SiteTemplates/${siteTemplate}.txt`, (json) => {
            def.resolve(json);
        }).fail(def.reject);

        return def.promise();
    }
    function GetSiteTemplate(tmpl) {
        var def = jQuery.Deferred();

        GetSiteTemplateConfig(tmpl).done(json => {
            def.resolve(json);
        }).fail(def.reject);

        return def.promise();
    }
    export function SetupSite(siteTemplateConfig) {
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
                LoggingFolder: `${_spPageContextInfo.siteServerRelativeUrl}/Logs`
            }
        }).then(() => {
            SetIsConfigured().then(() => Reload());
        });
    }
    export function AttemptConfiguration() {
        Utilities.GetAllWebProperties().then((properties: any) => {
            var isConfigured = properties.Web_Configured == "1";
            if (isConfigured) return;
            GetSiteTemplate(properties.SiteTemplate).done(siteTemplate => {
                SetupSite(siteTemplate);
            }).fail(() => {
                console.error("The provided template is invalid.");
            });
        });
    }
}
(() => { Pzl.Workspace.Setup.AttemptConfiguration(); })();