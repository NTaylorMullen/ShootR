<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="controller.aspx.cs" Inherits="ShootR.controller" %>

<%@ Import Namespace="SquishIt.Framework" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" type="image/ico" href="Images/favicon.ico" />
    <link href="Styles/controller.css" rel="stylesheet" />

    <title>ShootR Controller</title>
</head>
<body>
    <form runat="server">
        <asp:Panel runat="server" ID="JanrainScripts" Visible="true">
            <script src="Scripts/janrain.js" type="text/javascript"></script>
            <div id="janrainEngageEmbed"></div>
        </asp:Panel>

        <asp:Panel runat="server" ID="GameScripts" Visible="false">
            <div id="logout">Log Out</div>

            <div id="gameWrapper">
                <canvas id="game"></canvas>
            </div>

            <%= Bundle.JavaScript()
                .Add("Scripts/jquery-1.8.2.js")
                .Add("Scripts/jquery.cookie.js")
                .Add("Scripts/shortcut.js")
                .Add("Scripts/jquery.signalR-1.0.0.js")                      
            .Render("Scripts/jqueryLIBS.js")
            %>

            <script src='<%= ResolveClientUrl("~/signalr/hubs") %>' type="text/javascript"></script>

            <%= Bundle.JavaScript()
                .Add("Client/Utilities/Vector2.js")
                .Add("Client/Utilities/Size.js")
                .Add("Client/Space/Camera.js")
                .Add("Scripts/Client/Configuration/ConfigurationManager.js")
                .Add("Client/Utilities/UtilityFunctions.js")
                .Add("Client/Space/GameScreen.js")
                .Add("Client/GameController/ShipControllerFunctions.js")
                .Add("Client/GameController/JoyStick.js")
                .Add("Client/GameController/Adapters/IETouchAdapter.js")
                .Add("Client/GameController/Adapters/MouseAdapter.js") 
                .Add("Client/GameController/Adapters/TouchAdapter.js")
                .Add("Client/GameController/TouchController.js")
                .Add("Client/Space/CanvasRenderer.js")
                .Add("Client/GameController/controllerMain.js")                     
            .Render("Scripts/CORE.js")
            %>
        </asp:Panel>

    </form>
</body>
</html>
