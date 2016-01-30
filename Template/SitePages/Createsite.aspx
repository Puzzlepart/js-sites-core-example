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
		<h1>Opprett nytt samhandlingsrom</h1>
	    <div id="collabinputform" class="collabInputForm">
	        <label for="collabNameInput">Navn <span>*</span></label>
            <input id="collabNameInput" type="text" placeholder="Samhandlingsrommets navn" autofocus required />
	        <label for="collabUrlInput">URL-kortnavn <span>*</span></label>
            <input id="collabUrlInput" type="text" placeholder="Kortnavn som brukes i URL" required pattern="[a-zA-Z-\d]{3,20}" />
            <label id="collabUrlPreview"></label>
			<div id="collabUrlInputValidation" class="validationMessage" style="display:none">URL-kortnavnet kan bare inneholde bokstaver (utenom æøå), tall og bindestrek og må være mellom 3 og 20 tegn langt.</div>
	        <label for="collabDescriptionInput">Beskrivelse</label>
            <textarea id="collabDescriptionInput" type="text" placeholder="Beskrivelse av Samhandlingsrommet"></textarea>
	        <div id="collabFormValidation" class="validationMessage"></div>
	        <button id="createCollabBtn" onclick="Hemit.MP.Provisioning.Create(); return false;">Opprett samhandlingsrom</button>
	    </div> 
		<div id="gtoldbrowser" style="display:none;">
	        Opprettelse av prosjekter krever at du oppgraderer nettleseren til IE10 eller nyere.
	    </div>
    </div>
	<script type="text/javascript">
	</script>
</asp:Content>
