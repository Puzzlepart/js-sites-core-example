<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Taxonomy" Namespace="Microsoft.SharePoint.Taxonomy" Assembly="Microsoft.SharePoint.Taxonomy, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    JS Sites Core - Create site
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageImage" runat="server">
    <img src="/_layouts/15/images/blank.gif?rev=23" width='1' height='1' alt="" />
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    JS Sites Core - Create site
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderTitleAreaClass" runat="server">
    JS Sites Core - Create site
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <meta name="CollaborationServer" content="SharePoint Team Web Site" />
    <SharePoint:styleblock runat="server">
                            .s4-nothome { display:none; }
                        </SharePoint:styleblock>
    <SharePoint:scriptblock runat="server">
                            var navBarHelpOverrideKey = "WSSEndUser";
                        </SharePoint:scriptblock>
    <SharePoint:ScriptLink Name="~sitecollection/siteassets/nfdasd/js/nfdasd.provisioning.js" runat="server" Language="javascript"></SharePoint:ScriptLink>
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderSearchArea" runat="server">
    <SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" />
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderLeftActions" runat="server" />
<asp:Content ContentPlaceHolderID="PlaceHolderPageDescription" runat="server" />
<asp:Content ContentPlaceHolderID="PlaceHolderBodyAreaClass" runat="server">
    <SharePoint:styleblock runat="server">
                            .ms-bodyareaframe { padding: 0px; }
                        </SharePoint:styleblock>
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <style type="text/css">
        .ms-WPBorder {
            border: none;
        }
    </style>
   <table class="ms-propertysheet" border="0" cellspacing="0" cellpadding="0">

        <tbody>
            

            <tr>
                <td class="ms-formdescriptioncolumn-wide" valign="top">
                    <table border="0" cellpadding="1" cellspacing="0" width="100%" summary="" role="presentation">
                        <tbody>
                            <tr>
                                <td class="ms-sectionheader" style="padding-top: 4px;" height="22" valign="top">
                                    <h3 class="ms-standardheader ms-inputformheader">Title and Description

                                    </h3>
                                </td>
                            </tr>

                            <tr>
                                <td class="ms-descriptiontext ms-inputformdescription"></td>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="8" height="1" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                            <tr>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="150" height="19" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                        </tbody>
                    </table>
                </td>
                <td class="ms-authoringcontrols ms-inputformcontrols" valign="top" align="left">
                    <table border="0" width="100%" cellspacing="0" cellpadding="0" summary="" role="presentation">

                        <tbody>
                            

                            <tr>
                                <td></td>
                                <td class="ms-authoringcontrols">

                                    <table class="ms-authoringcontrols" border="0" width="100%" cellspacing="0" cellpadding="0" summary="" role="presentation">


                                        <tbody>
                                            <tr>
                                                <td class="ms-authoringcontrols" colspan="2">
                                                    <span id="ctl00_PlaceHolderMain_idTitleDescSection_ctl01_LiteralLabelText">Title:</span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="3" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>
                                            
                                            <tr>
                                                
                                                <td class="ms-authoringcontrols" width="99%">

                                                    <input type="text" maxlength="255" size="35" id="WebTitle" class="ms-input" title="Title" alwaysenablesilent="true">
                                                    


                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="6" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>


                                            <tr>
                                                <td class="ms-authoringcontrols" colspan="2">
                                                    <span id="ctl00_PlaceHolderMain_idTitleDescSection_ctl02_LiteralLabelText">Description:</span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="3" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>
                                            
                                            <tr>
                                                
                                                <td class="ms-authoringcontrols" width="99%">

                                                    <textarea rows="3" cols="40" id="WebDescription" class="ms-input" title="Description" alwaysenablesilent="true"></textarea>


                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="6" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>


                                            <tr>
                                                <td class="ms-authoringcontrols" colspan="2">
                                                    <span id="ctl00_PlaceHolderMain_idTitleDescSection_ctl03_LiteralLabelText"></span>

                                                </td>
                                            </tr>
                                            <tr id="ctl00_PlaceHolderMain_idTitleDescSection_ctl03_tablerow2">
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="3" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>
                                            
                                            <tr id="ctl00_PlaceHolderMain_idTitleDescSection_ctl03_tablerow3">
                                                <td width="11px">
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="11" height="1" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                                <td class="ms-authoringcontrols" width="99%"></td>
                                            </tr>

                                            <tr id="ctl00_PlaceHolderMain_idTitleDescSection_ctl03_tablerow5">
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="6" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>



                                        </tbody>
                                    </table>

                                </td>
                                <td width="10px">
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="10" height="1" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="150" height="13" alt="" data-accessibility-nocheck="true"></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </td>
            </tr>


            <tr>
                <td class="ms-sectionline" height="1" colspan="2">
                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="1" alt="" data-accessibility-nocheck="true"></td>
            </tr>

            <tr>
                <td class="ms-formdescriptioncolumn-wide" valign="top">
                    <table border="0" cellpadding="1" cellspacing="0" width="100%" summary="" role="presentation">
                        <tbody>
                            <tr>
                                <td class="ms-sectionheader" style="padding-top: 4px;" height="22" valign="top">
                                    <h3 class="ms-standardheader ms-inputformheader">Web Site Address

                                    </h3>
                                </td>
                            </tr>

                            <tr>
                                <td class="ms-descriptiontext ms-inputformdescription"></td>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="8" height="1" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                            <tr>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="150" height="19" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                        </tbody>
                    </table>
                </td>
                <td class="ms-authoringcontrols ms-inputformcontrols" valign="top" align="left">
                    <table border="0" width="100%" cellspacing="0" cellpadding="0" summary="" role="presentation">

                        <tbody>
                            

                            <tr>
                                <td></td>
                                <td class="ms-authoringcontrols">

                                    <table class="ms-authoringcontrols" border="0" width="100%" cellspacing="0" cellpadding="0" summary="" role="presentation">


                                        <tbody>
                                            
                                            <tr id="ctl00_PlaceHolderMain_idUrlSection_ctl01_tablerow2">
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="3" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>
                                            <tr id="ctl00_PlaceHolderMain_idUrlSection_ctl01_tablerow3">
                                                
                                                <td class="ms-authoringcontrols" width="99%">

                                                    <table border="0" cellpadding="0" cellspacing="0" dir="ltr">
                                                        <tbody>
                                                            <tr nowrap="nowrap">
                                                                
                                                                <td class="ms-authoringcontrols">
                                                                    <input type="text" maxlength="260" size="18" id="WebURL" class="ms-input" title="Create Subsite Name" disabled>
                                                                    <span class="ms-error" style="display: none;"></span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>


                                                </td>
                                            </tr>

                                            <tr id="ctl00_PlaceHolderMain_idUrlSection_ctl01_tablerow5">
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="6" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>



                                        </tbody>
                                    </table>

                                </td>
                                <td width="10px">
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="10" height="1" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="150" height="13" alt="" data-accessibility-nocheck="true"></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </td>
            </tr>


            <tr>
                <td class="ms-sectionline" height="1" colspan="2">
                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="1" alt="" data-accessibility-nocheck="true"></td>
            </tr>

            <tr>
                <td class="ms-formdescriptioncolumn-wide" valign="top">
                    <table border="0" cellpadding="1" cellspacing="0" width="100%" summary="" role="presentation">
                        <tbody>
                            <tr>
                                <td class="ms-sectionheader" style="padding-top: 4px;" height="22" valign="top">
                                    <h3 class="ms-standardheader ms-inputformheader">Template Selection

                                    </h3>
                                </td>
                            </tr>

                            <tr>
                                <td class="ms-descriptiontext ms-inputformdescription"></td>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="8" height="1" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                            <tr>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="150" height="19" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                        </tbody>
                    </table>
                </td>
                <td class="ms-authoringcontrols ms-inputformcontrols" valign="top" align="left">
                    <table border="0" width="100%" cellspacing="0" cellpadding="0" summary="" role="presentation">

                        <tbody>
                            

                            <tr>
                                
                                <td class="ms-authoringcontrols">
                                    <label>Select a language:</label><table class="ms-authoringcontrols" border="0" width="100%" cellspacing="0" cellpadding="0" summary="" role="presentation">
                                        <tbody>
                                            <tr <td="" class="ms-authoringcontrols" colspan="2">
                                                    

                                                
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="3" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>
                                            <!-- End Right_Text -->
                                            <tr>
                                                
                                                <td class="ms-authoringcontrols" width="99%">

                                                    <select id="WebLanguage" size="1">
                                                        <option value="1025">Arabic</option>
                                                        <option value="1068">Azerbaijani</option>
                                                        <option value="1069">Basque</option>
                                                        <option value="5146">Bosnian (Latin)</option>
                                                        <option value="1026">Bulgarian</option>
                                                        <option value="1027">Catalan</option>
                                                        <option value="2052">Chinese (Simplified)</option>
                                                        <option value="1028">Chinese (Traditional)</option>
                                                        <option value="1050">Croatian</option>
                                                        <option value="1029">Czech</option>
                                                        <option value="1030">Danish</option>
                                                        <option value="1164">Dari</option>
                                                        <option value="1043">Dutch</option>
                                                        <option selected="selected" value="1033">English</option>
                                                        <option value="1061">Estonian</option>
                                                        <option value="1035">Finnish</option>
                                                        <option value="1036">French</option>
                                                        <option value="1110">Galician</option>
                                                        <option value="1031">German</option>
                                                        <option value="1032">Greek</option>
                                                        <option value="1037">Hebrew</option>
                                                        <option value="1081">Hindi</option>
                                                        <option value="1038">Hungarian</option>
                                                        <option value="1057">Indonesian</option>
                                                        <option value="2108">Irish</option>
                                                        <option value="1040">Italian</option>
                                                        <option value="1041">Japanese</option>
                                                        <option value="1087">Kazakh</option>
                                                        <option value="1042">Korean</option>
                                                        <option value="1062">Latvian</option>
                                                        <option value="1063">Lithuanian</option>
                                                        <option value="1071">Macedonian</option>
                                                        <option value="1086">Malay</option>
                                                        <option value="1044">Norwegian (BokmÃƒÆ’Ã‚Â¥l)</option>
                                                        <option value="1045">Polish</option>
                                                        <option value="1046">Portuguese (Brazil)</option>
                                                        <option value="2070">Portuguese (Portugal)</option>
                                                        <option value="1048">Romanian</option>
                                                        <option value="1049">Russian</option>
                                                        <option value="10266">Serbian (Cyrillic, Serbia)</option>
                                                        <option value="9242">Serbian (Latin, Serbia)</option>
                                                        <option value="1051">Slovak</option>
                                                        <option value="1060">Slovenian</option>
                                                        <option value="3082">Spanish</option>
                                                        <option value="1053">Swedish</option>
                                                        <option value="1054">Thai</option>
                                                        <option value="1055">Turkish</option>
                                                        <option value="1058">Ukrainian</option>
                                                        <option value="1066">Vietnamese</option>
                                                        <option value="1106">Welsh</option>
                                                    </select>
                                                </td>
                                            </tr>

                                            <tr id="ctl00_PlaceHolderMain_InputFormTemplatePickerControl_ctl00_DDLanguageFormControl_tablerow5">
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="6" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>


                                            <tr>
                                                <td class="ms-authoringcontrols" colspan="2">
                                                    <label>Select a template:</label>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="3" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>
                                            <tr>
                                                
                                                <td class="ms-authoringcontrols" width="99%">

                                                    <div class="ms-templatepicker">
                                                        <div id="FilterTabs" class="ms-templatepicker">
                                                           
                                                        </div>
                                                        <select id="WebTemplate" size="12" class="ms-templatepicker-select ms-templatepicker ms-floatLeft" disabled></select>
                                                        <div class="ms-descriptiontext ms-floatLeft" style="width: 440px; display: inline;">
                                                            <span id="ctl00_PlaceHolderMain_InputFormTemplatePickerControl_ctl00_ctl01_LabelWebTemplateDescription"></span>
                                                        </div>
                                                    </div>


                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="6" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>



                                        </tbody>
                                    </table>

                                </td>
                                <td width="10px">
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="10" height="1" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="150" height="13" alt="" data-accessibility-nocheck="true"></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </td>
            </tr>



            <tr id="ctl00_PlaceHolderMain_idPermSection_tablerow1">
                <td class="ms-sectionline" height="1" colspan="2">
                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="1" alt="" data-accessibility-nocheck="true"></td>
            </tr>

            <tr id="ctl00_PlaceHolderMain_idPermSection">
                <td class="ms-formdescriptioncolumn-wide" valign="top">
                    <table border="0" cellpadding="1" cellspacing="0" width="100%" summary="" role="presentation">
                        <tbody>
                            <tr>
                                <td class="ms-sectionheader" style="padding-top: 4px;" height="22" valign="top">
                                    <h3 class="ms-standardheader ms-inputformheader">Permissions

                                    </h3>
                                </td>
                            </tr>

                            <tr>
                                <td class="ms-descriptiontext ms-inputformdescription">You can give permission to access your new site to the same users who have access to this parent site, or you can give permission to a unique set of users.<br>
                                    <br>
                                    Note: If you select <b>Use same permissions as parent site</b>, one set of user permissions is shared by both sites. Consequently, you cannot change user permissions on your new site unless you are an administrator of this parent site.
                                </td>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="8" height="1" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                            <tr>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="150" height="19" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                        </tbody>
                    </table>
                </td>
                <td class="ms-authoringcontrols ms-inputformcontrols" valign="top" align="left">
                    <table border="0" width="100%" cellspacing="0" cellpadding="0" summary="" role="presentation">

                        <tbody>
                            <tr>

                                <td width="9px">
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="9" height="7" alt="" data-accessibility-nocheck="true"></td>

                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="150" height="7" alt="" data-accessibility-nocheck="true"></td>

                                <td width="10px">
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="10" height="1" alt="" data-accessibility-nocheck="true"></td>

                            </tr>

                            <tr>
                                <td></td>
                                <td class="ms-authoringcontrols">

                                    <table class="ms-authoringcontrols" border="0" width="100%" cellspacing="0" cellpadding="0" summary="" role="presentation">


                                        <tbody>
                                            <tr>
                                                <td class="ms-authoringcontrols" colspan="2">
                                                    <span>User Permissions:</span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="3" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>
                                            <tr>
                                                <td width="3px">
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="3" height="1" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                                <td class="ms-authoringcontrols" width="99%">

                                                    <table border="0" width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top" width="1px">
                                                                    <input value="WebInheritPermissions" name="Permissions" type="radio" id="WebInheritPermissions" checked="checked">
                                                                </td>
                                                                <td width="1px">
                                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="1" alt="" data-accessibility-nocheck="true"></td>
                                                                <td nowrap="nowrap" class="ms-authoringcontrols">
                                                                    <label for="WebInheritPermissions">Use same permissions as parent site</label>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td valign="top" width="1px">
                                                                    <input value="WebUseUniquePermissions" name="Permissions" type="radio" id="WebUseUniquePermissions">
                                                                </td>
                                                                <td width="1px">
                                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="1" alt="" data-accessibility-nocheck="true"></td>
                                                                <td nowrap="nowrap" class="ms-authoringcontrols">
                                                                    <label for="WebUseUniquePermissions">Use unique permissions</label>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>


                                                </td>
                                            </tr>

                                            <tr id="ctl00_PlaceHolderMain_idPermSection_ctl01_tablerow5">
                                                <td>
                                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="1" height="6" style="display: block" alt="" data-accessibility-nocheck="true"></td>
                                            </tr>



                                        </tbody>
                                    </table>

                                </td>
                                <td width="10px">
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="10" height="1" alt="" data-accessibility-nocheck="true"></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <img src="/_layouts/15/images/blank.gif?rev=42" width="150" height="13" alt="" data-accessibility-nocheck="true"></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <colgroup>
                            <col width="99%">
                            <col width="1%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                <td nowrap="nowrap">
                                    <input type="button" value="Create" onclick="Pzl.Provisioning.Create()" class="ms-ButtonHeightWidth">
                                    <input type="button" class="ms-ButtonHeightWidth" value="Cancel" onclick="">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>


        </tbody>
    </table>
    <SharePoint:ScriptBlock runat="server">if(typeof(MSOLayout_MakeInvisibleIfEmpty) == "function") {MSOLayout_MakeInvisibleIfEmpty();}</SharePoint:ScriptBlock>
</asp:Content>
