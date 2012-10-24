<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="controller.aspx.cs" Inherits="ShootR.controller" %>

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

    <asp:Panel runat="server" ID="GameElements" Visible="false">
        <div id="logout">Log Out</div>

        <div id="gameWrapper">
            <canvas id="game"></canvas>
        </div>

        <script src="Scripts/jquery-1.8.2.js" type="text/javascript"></script>
        <script src="Scripts/jquery.cookie.js" type="text/javascript"></script>
        <script src="Scripts/shortcut.js" type="text/javascript"></script>
        <script src="Scripts/jquery.signalR-1.0.0.js" type="text/javascript"></script>
        <script src="Scripts/jquery.spritify-0.0.0.js" type="text/javascript"></script>
        <script src="signalr/hubs" type="text/javascript"></script>

        <script type="text/javascript" src="Client/Space/Camera.js"></script>
        <script type="text/javascript" src="Client/Configuration/ConfigurationManager.js"></script>
        <script src="Client/Utilities/UtilityFunctions.js" type="text/javascript"></script>
        <script src="Client/Space/Screen.js" type="text/javascript"></script>
        <script src="Client/GameController/ShipControllerFunctions.js" type="text/javascript"></script>
        <script src="Client/GameController/JoyStick.js" type="text/javascript"></script>
        <script src="Client/GameController/Adapters/IETouchAdapter.js" type="text/javascript"></script>
        <script src="Client/GameController/Adapters/MouseAdapter.js" type="text/javascript"></script>
        <script src="Client/GameController/Adapters/TouchAdapter.js" type="text/javascript"></script>
        <script src="Client/GameController/TouchController.js" type="text/javascript"></script>
        <script src="Client/Space/CanvasRenderer.js" type="text/javascript"></script>
        <script src="Client/GameController/controllerMain.js" type="text/javascript"></script>
    </asp:Panel>

    </form>
</body>
</html>
