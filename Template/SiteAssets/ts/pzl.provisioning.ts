/// <reference path="..\..\..\typings\jquery\jquery.d.ts" />
/// <reference path="..\..\..\typings\sharepoint\SharePoint.d.ts" />

module Pzl.Provisioning {
    var createWebWaitDialog;
    
    export function Create() {
        var createInfo = {
            url: jQuery("#collabUrlInput").val(),
            title: jQuery("#collabNameInput").val(),
            description: jQuery("#collabDescriptionInput").val(),
            webTemplate: "STS#0",
            webLanguage: 1044,
            inheritPermissions: false
        }
        
        createWebWaitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Creating site", "Please wait...", 130, 600);
        ProvisionSubsite(createInfo).then((web : SP.Web) => {
            StampPropertyBag(web).then(() => {
                AddCustomActions(web).then(() => {
                    SetupFeatures(web).then(() => {
                        RedirectToWeb(web, !createInfo.inheritPermissions);
                    });
                }); 
            }) 
        }).fail((sender, args) => {
           var sId = SP.UI.Status.addStatus("Failed to create workspace", args.get_message(), true);
           SP.UI.Status.setStatusPriColor(sId, "red");
           createWebWaitDialog.close();
        });
    }
    
    /*
        Provisions a subsite
    */
    function ProvisionSubsite(createInfo) {
        var def = jQuery.Deferred();
        ExecuteOrDelayUntilScriptLoaded(function() {
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
            clientContext.executeQueryAsync(
                () => { 
                    def.resolve(newWeb);
                }, 
                (sender, args) => {
                    def.reject(sender, args);
                });
        }, "sp.js");
        
        return def.promise();
    }
    
    function UrlParams() {
        return location.search.substring(1) ? JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}') : {};
    }
    
    /*
        Setting property bag values for web.
    */
    function StampPropertyBag(web : SP.Web) {
        var def = jQuery.Deferred();
         
        var clientContext = web.get_context();
        var propBag = web.get_allProperties();
        propBag.set_item("_Port_WebTemplate", "js-sites-example");
        propBag.set_item("_Port_WebConfigured", "0");
        var urlProps = UrlParams();
        if(Object.keys(urlProps).length > 0) {
            for(var key in urlProps) { propBag.set_item(key, urlProps[key]); };      
            propBag.set_item("_Port_WelcomePageStamped", "0"); 
        }        
        web.update();
        clientContext.executeQueryAsync(def.resolve, def.reject); 
        return def.promise();
    }
    
    /*
        Adding custom actions for web. 
    */
    function AddCustomActions(web : SP.Web) {
         var def = jQuery.Deferred();
         
        var clientContext = web.get_context();
        var webCustomActions = web.get_userCustomActions();
        
        var setupAction = webCustomActions.add();
        setupAction.set_location('ScriptLink');
        setupAction.set_sequence(100);
        setupAction.set_scriptBlock("(_v_dictSod.hasOwnProperty('jquery') || SP.SOD.registerSod('jquery', '~sitecollection/siteassets/js-sites-example/js/jquery.min.js'));SP.SOD.registerSod('pzl.workspace.setup.js', '~sitecollection/siteassets/js-sites-example/js/pzl.workspace.setup.js');SP.SOD.registerSodDep('pzl.workspace.setup.js', 'jquery');EnsureScriptFunc('pzl.workspace.setup.js', null, function() {});")
        setupAction.set_name("pzl.workspace.setup.js");
        setupAction.set_title("pzl.workspace.setup.js"); 
        setupAction.update();
        
        clientContext.load(web, 'Title' ,'UserCustomActions'); 
        clientContext.executeQueryAsync(def.resolve, def.reject);                 
        return def.promise(); 
    }
    
    /*
        Setting up features for web.
        
        Adding: N/A
        Removing: Minimal Download Strategy  
    */
    function SetupFeatures(web : SP.Web) {
        var def = jQuery.Deferred();
         
        var clientContext = web.get_context();
        var webFeatures = web.get_features();
        webFeatures.remove(new SP.Guid("87294c72-f260-42f3-a41b-981a2ffce37a"), true);
        web.update();
        
        clientContext.executeQueryAsync(
            () => { 
                def.resolve();
            }, 
            () => {
                def.reject();
            });
                
        return def.promise();
    }
    
    /*
        Redirecting to web.
    */
    function RedirectToWeb(web : SP.Web, permsetup: Boolean) {
        document.location.href = `${web.get_url()}${permsetup ? '/_layouts/15/permsetup.aspx?hideCancel=1' : ''}`;
    }
    export function Cancel() {
        alert('Creating');
    }
}