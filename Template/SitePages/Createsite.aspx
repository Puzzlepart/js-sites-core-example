<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    <SharePoint:FieldValue ID="PageTitle" FieldName="Title" runat="server"/>
   <SharePoint:projectproperty property="Title" runat="server"/>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageImage" runat="server">
	<img src="/_layouts/15/images/blank.gif?rev=23" width='1' height='1' alt="" /></asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
	<SharePoint:FieldValue ID="FieldValue2" FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderTitleAreaClass" runat="server">
	<SharePoint:FieldValue ID="FieldValue1" FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderSearchArea" runat="server">
	<SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox"/>
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderLeftActions" runat="server" />
<asp:Content ContentPlaceHolderID="PlaceHolderPageDescription" runat="server" >
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="PlaceHolderBodyAreaClass" runat="server">
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
	<div class="newCollabPage">
		<h1>Create sites from pzl-sites-core example</h1>
	    <div id="collabinputform" class="collabInputForm">
	        <label for="collabNameInput">Name <span>*</span></label>
            <input id="collabNameInput" type="text" placeholder="Site name" autofocus required />
	        <label for="collabUrlInput">URL shortname<span>*</span></label>
            <input id="collabUrlInput" type="text" placeholder="URL shortname" required pattern="[a-zA-Z-\d]{3,20}" />
            <label id="collabUrlPreview"></label>
			<div id="collabUrlInputValidation" class="validationMessage" style="display:none">Invalid shortname</div>
	        <label for="collabDescriptionInput">Description</label>
            <textarea id="collabDescriptionInput" type="text" placeholder="Site description"></textarea>
	        <div id="collabFormValidation" class="validationMessage"></div>
	        <button id="createCollabBtn" onclick="Pzl.Provisioning.Create(); return false;">Create site</button>
	    </div>
    </div>
</asp:Content>
