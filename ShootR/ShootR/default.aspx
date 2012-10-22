<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="ShootR._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" type="image/ico" href="Images/favicon.ico" />
    <link href="Styles/game.css" rel="stylesheet" />
    <link href="Styles/jquery-ui-1.9.0.css" rel="stylesheet" />

    <title>SignalR ShootR</title>
</head>
<body style="height: 100%;">
    <form runat="server">
    <a href="https://github.com/NTaylorMullen/ShootR" target="_blank">
        <img style="position: absolute; top: 0; left: 0; border: 0;" src="/Images/Page/GitHubForkMe.png" alt="Fork me on GitHub" />
    </a>
    <div id="shipStats">
        <div id="ShipNameHolder">
            <em>Press X to turn off/on ship details</em>
            <input type="text" id="ShipName" value="" maxlength="25" /><input type="button" id="ChangeShipName" value="Change" />
        </div>
    </div>
    <div id="janrainEngageEmbed"></div>

    <div id="respawnText">
        <p id="respawnHeader">
            <strong>You have died!</strong><br />
            Respawning in:
        </p>
        <p id="timeLeft"></p>
    </div>
    <div id="gameWrapper">
        <canvas id="game"></canvas>
        <div id="gameHUD">
            <div id="HealthHolder">
                <div id="Health"></div>
            </div>

            <div id="Notification">
            </div>

            <div id="ExperienceHUD">
                <div id="LevelIndicator">Level <span id="CurrentLevel"></span></div>
                <div id="ExperienceHolder">
                    <div id="Experience"></div>
                </div>
            </div>
            <div id="leaderboardPosition">
                <span>#</span><strong id="positionNumber"></strong>
            </div>
        </div>

        <div id="popUpHolder" style="display: block;">
            <div id="levelNotification">Level <span id="CurrentLevel_Notification"></span>!</div>
            <div id="leaderboardHolder">
                <div id="leaderboardBG"></div>
                <div id="leaderboard">
                    <h1>Leaderboard</h1>
                    <table>
                        <thead>
                            <tr>
                                <th class="positionColumn">Position</th>
                                <th class="levelColumn">Level</th>
                                <th class="nameColumn">Name</th>
                                <th class="killsColumn">Kills</th>
                                <th class="deathsColumn">Deaths</th>
                                <th class="ddColumn">Damage Dealt</th>
                                <th class="dtColumn">Damage Taken</th>
                                <th class="kdratioColumn">KD Ratio</th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: leaderboard">
                            <tr data-bind="attr: { class: customClass }">
                                <td class="positionColumn">#<span data-bind="text: Position"></span></td>
                                <td class="levelColumn" data-bind="text: Level"></td>
                                <td class="nameColumn" data-bind="text: Name"></td>
                                <td class="killsColumn" data-bind="text: Kills"></td>
                                <td class="deathsColumn" data-bind="text: Deaths"></td>
                                <td class="ddColumn" data-bind="text: DamageDealt"></td>
                                <td class="dtColumn" data-bind="text: DamageTaken"></td>
                                <td class="kdratioColumn"><span data-bind="text: KillDeathRatio"></span>%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="controlRequest">
            <div id="header">Control Request</div>
            <div id="controlRequestButtons">
                <div id="acceptControlRequest">Accept</div>
                <div id="declineControlRequest">Decline</div>
            </div>
        </div>
        <div id="StopControlling">Stop Remote Controllers</div>
    </div>

    <div id="banner"><em>Created by: </em><a href="http://www.ntaylormullen.com" target="_blank" style="margin-right: 10px;">NTaylorMullen.</a>  <em>Follow us on Twitter: </em><a href="https://twitter.com/DamianEdwards" target="_blank">@DamianEdwards</a>, <a href="https://twitter.com/davidfowl" target="_blank">@davidfowl</a>, <a href="https://twitter.com/ntaylormullen" target="_blank">@NTaylorMullen</a>, <a href="https://twitter.com/stephenhaltr" target="_blank">@StephenHaltR</a>, <a href="https://twitter.com/SignalR" target="_blank">@SignalR</a></div>

    <script src="Scripts/janrain.js" type="text/javascript"></script>

        <asp:Panel runat="server" ID="GameScripts" Visible="false">
            <!-- NOTE: These are not minified so people can see how the game works.  On a larger release I will minify everything -->
            <script src="Scripts/jquery-1.8.2.js" type="text/javascript"></script>
            <script src="Scripts/jquery.cookie.js" type="text/javascript"></script>
            <script src="Scripts/knockout-2.1.0.js" type="text/javascript"></script>
            <script src="Scripts/jquery-ui-1.9.0.min.js" type="text/javascript"></script>
            <script src="Scripts/shortcut.js" type="text/javascript"></script>
            <script src="Scripts/jquery.signalR-0.5.3.js" type="text/javascript"></script>
            <script src="Scripts/jquery.spritify-0.0.0.js" type="text/javascript"></script>
            <script src="Scripts/jquery.animate-colors-min.js" type="text/javascript"></script>
            <script src="signalr/hubs" type="text/javascript"></script>

            <script src="Client/Managers/AnimationManager.js" type="text/javascript"></script>
            <script src="Client/Space/Screen.js" type="text/javascript"></script>
            <script src="Client/GameGlobals.js" type="text/javascript"></script>
            <script src="Client/Utilities/LatencyResolver.js" type="text/javascript"></script>
            <script src="Client/Utilities/UtilityFunctions.js" type="text/javascript"></script>
            <script src="Client/GameController/JoyStick.js" type="text/javascript"></script>
            <script src="Client/GameController/Adapters/IETouchAdapter.js" type="text/javascript"></script>
            <script src="Client/GameController/Adapters/MouseAdapter.js" type="text/javascript"></script>
            <script src="Client/GameController/Adapters/TouchAdapter.js" type="text/javascript"></script>
            <script src="Client/GameController/TouchController.js" type="text/javascript"></script>
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
            <script src="Client/HUD/HealthMonitor.js" type="text/javascript"></script>
            <script src="Client/HUD/ExperienceMonitor.js" type="text/javascript"></script>
            <script src="Client/HUD/Leaderboard.js" type="text/javascript"></script>
            <script src="Client/HUD/GameDetailManager.js" type="text/javascript"></script>
            <script src="Client/HUD/ControlRequestManager.js" type="text/javascript"></script>
            <script src="Client/HUD/HUDManager.js" type="text/javascript"></script>
            <script src="Client/HUD/Animation/TextAnimation.js" type="text/javascript"></script>
            <script src="Client/Main.js"></script>
        </asp:Panel>
    </form>
</body>
</html>
