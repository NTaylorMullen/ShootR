<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="ShootR._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Styles/game.css" rel="stylesheet" />

    <title>SignalR ShootR</title>
</head>
<body style="height: 100%;">
    <a href="https://github.com/NTaylorMullen/ShootR" target="_blank"><img style="position: absolute; top: 0; left: 0; border: 0;" src="/Images/Page/GitHubForkMe.png" alt="Fork me on GitHub" /></a>
    <div id="shipStats">
        <div id="ShipNameHolder"><em>Press X to turn off/on names </em><input type="text" id="ShipName" value="" maxlength="25"/><input type="button" id="ChangeShipName" value="Change" /></div>
    </div>

    <div id="gameWrapper">        
        <canvas id="game"></canvas>
    </div>
    
    <div id="banner"><em>For the latest updates, follow us on Twitter: </em> <a href="https://twitter.com/DamianEdwards" target="_blank">@DamianEdwards</a>, <a href="https://twitter.com/davidfowl" target="_blank">@davidfowl</a>, <a href="https://twitter.com/ntaylormullen" target="_blank">@NTaylorMullen</a>, <a href="https://twitter.com/stephenhaltr" target="_blank">@StephenHaltR</a>, <a href="https://twitter.com/SignalR" target="_blank">@SignalR</a></div>
    <form runat="server">
    </form>

    <script src="Scripts/jquery-1.6.4.js" type="text/javascript"></script>
    <script src="Scripts/shortcut.js" type="text/javascript"></script>
    <script src="Scripts/jquery.signalR-0.5.3.js" type="text/javascript"></script>
    <script src="Scripts/jquery.spritify-0.0.0.js" type="text/javascript"></script>
    <script src="signalr/hubs" type="text/javascript"></script>
    
    <script src="Client/Managers/AnimationManager.js" type="text/javascript"></script>
    <script src="Client/Space/Screen.js" type="text/javascript"></script>
    <script src="Client/GameGlobals.js" type="text/javascript"></script>
    <script src="Client/Utilities/LatencyResolver.js" type="text/javascript"></script>
    <script src="Client/Utilities/UtilityFunctions.js" type="text/javascript"></script>
    <script src="Client/Utilities/ClientServerTime.js" type="text/javascript"></script>
    <script src="Client/Space/Map.js" type="text/javascript"></script>
    <script src="Client/Space/Camera.js" type="text/javascript"></script>
    <script src="Client/Space/CanvasRenderer.js" type="text/javascript"></script>
    <script src="Client/Utilities/GameTime.js" type="text/javascript"></script>
    <script src="Client/Utilities/Collidable.js" type="text/javascript"></script>
    <script src="Client/Bullet/Bullet.js" type="text/javascript"></script>
    <script src="Client/Bullet/BulletManager.js" type="text/javascript"></script>
    <script src="Client/Ship/ShipManager.js" type="text/javascript"></script>
    <script src="Client/Ship/ShipVehicle.js"></script>
    <script src="Client/Ship/Ship.js" type="text/javascript"></script>
    <script src="Client/Utilities/ShipStatRecorder.js" type="text/javascript"></script>
    <script src="Client/Utilities/PayloadManagement/PayloadDecompressor.js" type="text/javascript"></script>
    <script src="Client/Game.js" type="text/javascript"></script>
    <script src="Client/Configuration/ConfigurationManager.js" type="text/javascript"></script>
    <script src="Client/Main.js"></script>
</body>
</html>
