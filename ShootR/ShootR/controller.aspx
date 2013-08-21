<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="controller.aspx.cs" Inherits="ShootR.controller" %>

<%@ Register TagPrefix="uc" TagName="Login" Src="~/Login.ascx" %>

<%@ Import Namespace="System.Web.Optimization" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" type="image/ico" href="Images/favicon.ico" />
    <link href="Styles/controller.css" rel="stylesheet" />

    <title>ShootR Controller</title>
</head>
<body class="space">
    <form runat="server">

        <uc:Login runat="server" ID="LoginScripts"></uc:Login>

        <asp:Panel runat="server" ID="GameScripts" Visible="false">
            <div id="logout">Log Out</div>

            <div id="gameWrapper">
                <canvas id="game"></canvas>
            </div>

            <% =Scripts.Render("~/bundles/jqueryjs") %>
            <% =Scripts.Render("~/bundles/signalr") %>

            <script src='<%= ResolveClientUrl("~/signalr/hubs") %>' type="text/javascript"></script>

            <% =Scripts.Render("~/bundles/controllerjs") %>
        </asp:Panel>

    </form>
</body>
</html>
