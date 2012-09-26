<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="ShootR._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Styles/game.css" rel="stylesheet" />

    <title>SignalR Shooter</title>
</head>
<body style="height: 100%;">
    <!--<a href="https://github.com/NTaylorMullen/ShootR" target="_blank"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png" alt="Fork me on GitHub" /></a>    -->

    <div id="gameWrapper">
        <div id="ShipNameHolder"><em>Press X to turn off/on names </em><input type="text" id="ShipName" value=""/><input type="button" id="ChangeShipName" value="Change" /></div>
        <canvas id="game" width="1280" height="600"></canvas>
    </div>
    <div id="banner"><em>For the latest updates, follow us on Twitter: </em> <a href="https://twitter.com/DamianEdwards">@DamianEdwards</a>, <a href="https://twitter.com/davidfowl">@davidfowl</a>, <a href="https://twitter.com/ntaylormullen">@NTaylorMullen</a>, <a href="https://twitter.com/SignalR">@SignalR</a></div>
    <form runat="server">
    </form>

    <script src="Scripts/jquery-1.6.4.js" type="text/javascript"></script>
    <script src="Scripts/shortcut.js" type="text/javascript"></script>
    <script src="Scripts/jquery.signalR-0.5.3.js" type="text/javascript"></script>
    <script src="Scripts/jquery.spritify-0.0.0.js" type="text/javascript"></script>
    <script src="signalr/hubs" type="text/javascript"></script>

    <script src="Client/Managers/AnimationManager.js" type="text/javascript"></script>
    <script type="text/javascript" src="Client/Space/Map.js"></script>
    <script src="Client/Space/CanvasRenderer.js" type="text/javascript"></script>
    <script src="Client/Utilities/GameTime.js" type="text/javascript"></script>
    <script src="Client/Utilities/Collidable.js" type="text/javascript"></script>
    <script src="Client/Bullet/Bullet.js" type="text/javascript"></script>
    <script src="Client/Bullet/BulletManager.js" type="text/javascript"></script>
    <script src="Client/Ship/ShipVehicle.js"></script>
    <script src="Client/Ship/Ship.js" type="text/javascript"></script>
    <script src="Client/Utilities/ShipStatRecorder.js" type="text/javascript"></script>
    <script src="Client/Utilities/PayloadManagement/PayloadManager.js" type="text/javascript"></script>
    <script src="Client/Game.js" type="text/javascript"></script>
    <script src="Client/Configuration/ConfigurationManager.js" type="text/javascript"></script>
    <script src="Client/Main.js"></script>
</body>
</html>
