/// <reference path="..\..\..\typings\sharepoint\SharePoint.d.ts" />

module Pzl.Workspace.Setup {
    function GetWebProperties() {
        var def = jQuery.Deferred();
        ExecuteOrDelayUntilScriptLoaded(function() {
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();  
            var allProperties = web.get_allProperties();
            clientContext.load(allProperties);
            clientContext.executeQueryAsync(
                () => {
                    def.resolve(allProperties.get_fieldValues());
                }, 
                () => {
                    def.reject();
                });
        }, "sp.js");
        
        return def.promise();
    }
    function UpdateWebPropertyBag(key, value) {
        var def = jQuery.Deferred();
         
        const context = SP.ClientContext.get_current();
		const web = context.get_web();
		var allProperties = web.get_allProperties();
        allProperties.set_item(key, value);
		context.load(web);
		web.update();
		context.executeQueryAsync(
			(sender, args) => {
				def.resolve();
			},
			(sender, args) => {
				def.resolve();
			});
            
        return def.promise();
    }
    function SetIsConfigured() {
        var def = jQuery.Deferred();
        UpdateWebPropertyBag("_Port_WebConfigured", "1").then(() => def.resolve());        
        return def.promise();
    }
    function SetNotConfigured() {
        var def = jQuery.Deferred();
        UpdateWebPropertyBag("_Port_WebConfigured", "0").then(() => def.resolve());        
        return def.promise();
    }
    function Reload() {
        window.location.href = window.location.href; 
    }
    function GetSiteTemplateConfig(siteTemplate : string) {
        var def = jQuery.Deferred();
        
        jQuery.getJSON(`${_spPageContextInfo.siteAbsoluteUrl}/siteassets/js-sites-example/sitetemplates/${siteTemplate}.txt`, (json) => {
            def.resolve(json);
        }).fail(() => {
            def.resolve(null);
        })
        
        return def.promise();
    }
    function GetSiteTemplate() {
        var def = jQuery.Deferred();
        
        GetWebProperties().then(allProperties => {
            var isConfigured = (allProperties["_Port_WebConfigured"] == "1");
            if(isConfigured) def.resolve(null);
            var siteTemplate = allProperties["_Port_WebTemplate"];
            
            GetSiteTemplateConfig(siteTemplate).then(configJson => {
                def.resolve(configJson);
            })
        });
        
        return def.promise();
    }
    export function SetupSite(siteTemplateConfig) {
        if(siteTemplateConfig == null) { return; }
    
        Pzl.Sites.Core.init(siteTemplateConfig, 
            { 
                "Logging": 
                { 
                    "On": true, 
                    "LoggingFolder": _spPageContextInfo.siteServerRelativeUrl + "/SiteAssets/logs" }
            }
        ).then(() => {               
            SetIsConfigured().then(() => Reload());
        });
    }
    export function AttemptConfiguration() {
        GetSiteTemplate().then(siteTemplate => {
            SetupSite(siteTemplate);
        });
    }
    export function RerunConfiguration() {
        SetNotConfigured().then(() => {
            GetSiteTemplate().then(siteTemplate => {
                SetupSite(siteTemplate);
            });
        });
    }
}
_spBodyOnLoadFunctions.push(Pzl.Workspace.Setup.AttemptConfiguration);