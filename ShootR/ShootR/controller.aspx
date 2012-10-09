<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="controller.aspx.cs" Inherits="ShootR.controller" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Styles/controller.css" rel="stylesheet" />    

    <title>ShootR Controller</title>
</head>
<body>
    <div id="shipStats">
    </div>

    <div id="gameWrapper">
        <canvas id="game"></canvas>
        <div id="StopControlling">Stop Controlling</div>
        <div id="ControllerRequestHolder">
            <div id="RequestTab">
                <p><strong>Ship To Control:</strong><br />
                    <input type="text" id="shipToControl" />                
                </p>
                <p>
                    <input type="button" id="requestControl" value="Request Control" />
                </p>
            </div>
            <div id="SuccessTab">
                <p><strong>Request: </strong><span>Loading...</span></p>
            </div>
        </div>
    </div>

    <div id="banner"></div>

    <form id="form1" runat="server">
    </form>

    <script src="Scripts/jquery-1.8.2.js" type="text/javascript"></script>
    <script src="Scripts/shortcut.js" type="text/javascript"></script>
    <script src="Scripts/jquery.signalR-0.5.3.js" type="text/javascript"></script>
    <script src="Scripts/jquery.spritify-0.0.0.js" type="text/javascript"></script>
    <script src="signalr/hubs" type="text/javascript"></script>

    <script type="text/javascript" src="Client/Space/Camera.js"></script>
    <script type="text/javascript" src="Client/Configuration/ConfigurationManager.js"></script>
    <script src="Client/Utilities/UtilityFunctions.js" type="text/javascript"></script>
    <script src="Client/Space/Screen.js" type="text/javascript"></script>
    <script src="Client/GameController/ShipControllerFunctions.js" type="text/javascript"></script>
    <script src="Client/GameController/JoyStick.js" type="text/javascript"></script>
    <script src="Client/GameController/TouchController.js" type="text/javascript"></script>
    <script src="Client/Space/CanvasRenderer.js" type="text/javascript"></script>
    <script src="Client/GameController/controllerMain.js" type="text/javascript"></script>
</body>
</html>
