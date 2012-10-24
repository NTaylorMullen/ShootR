<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="ShootR._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" type="image/ico" href="Images/favicon.ico" />
    <link href="Styles/game.css" rel="stylesheet" />
    <link href="Styles/jquery-ui-1.9.0.css" rel="stylesheet" />
    <link href="Styles/gameHUD.css" rel="stylesheet" />

    <title>SignalR ShootR</title>
</head>
<body style="height: 100%;overflow:hidden">
    <form runat="server">

    <asp:Panel runat="server" ID="JanrainScripts" Visible="true">
        <script src="Scripts/janrain.js" type="text/javascript"></script>
        <div id="janrainEngageEmbed"></div>
    </asp:Panel>

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
                <div id="WhiteHealthHeart"></div>
                <div id="HealthHeart" class="bad"></div>
                <span id="HealthText"></span>
            </div>
            <div id="HUDBar">
                <div id="YouHolder" class="left">
                    <img id="You" src="Images/HUD/You_Default.png" onerror="this.src='Images/HUD/You_Default.png'" alt="Your profile picture" width="96" height="96" />
                </div>
                <div id="PlayerInfoHolder" class="left separate">
                    <div class="offset">
                        <p class="pilotHeader">PILOT<img src="Images/HUD/logout.png" alt="Logout" id="logout" /></p>
                        <p id="DisplayName"></p>
                        <p id="ExperienceHolder">EXP: <span id="Experience">987/2138</span></p>
                        <p id="GlobalRankingHolder">GLOBAL RANKING: <span id="GlobalRanking">193</span></p>
                    </div>
                </div>
                <div id="LeaderboardInfoHolder" class="left separate">
                    <div class="offset">
                        <div class="killsDeathRatio">
                            <div class="killDeathHolder">
                                <div class="killHolder">
                                    <div class="killIcon">
                                    </div>
                                    <div class="killStatsHolder">
                                        <p>KILLS</p>
                                        <h1 id="Kills">222</h1>
                                    </div>
                                </div>
                                <div class="deathHolder">
                                    <div class="deathIcon"></div>
                                    <div class="deathStatsHolder">
                                        <p>DEATHS</p>
                                        <h1 id="Deaths">13</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="ratioHolder">
                                <div class="goRight">
                                    <p>RATIO</p>
                                    <h1 id="KDRatio">12/1</h1>
                                </div>
                            </div>
                        </div>
                        <div class="lastKilledByHolder">
                            <h1>KILLED BY</h1>
                            <img id="KilledByPhotoSmall" src="Images/HUD/KilledBy_Default.png" alt="Killed By" onerror="this.src='Images/HUD/KilledBy_Default.png'" width="50" height="50" />
                            <p id="KilledByNameSmall">YoMoma</p>
                        </div>
                    </div>
                </div>
                <div id="StatisticHolder" class="left">
                    <div class="offset">
                        <div class="mainStatHolder">
                            <p>LEVEL</p>
                            <h1>7</h1>
                        </div>
                        <div class="increasedStatisticsHolder statistics left">
                            <p class="header">SHIP</p>
                            <div>
                                <p class="left">SPEED</p>
                                <p class="right"><span id="Speed">300</span></p>
                            </div>
                            <div>
                                <p class="left">HEALTH BONUS</p>
                                <p class="right">+<span id="IncreasedHealth">300</span></p>
                            </div>
                            <div>
                                <p class="left">DAMAGE BONUS</p>
                                <p class="right">+<span id="IncreasedDamage">20</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="LocationStatisticsHolder" class="left">
                    <div class="offset">
                        <div class="mainStatHolder">
                            <p>AREA</p>
                            <h1>A7</h1>
                        </div>
                        <div class="locationStats statistics left">
                            <p class="header"></p>
                            <div>
                                <p class="left">TARGETS</p>
                                <p class="right"><span id="Targets">20</span>AU</p>
                            </div>
                            <div>
                                <p class="left">WORLD TARGETS</p>
                                <p class="right"><span id="WorldTargets">1000</span></p>
                            </div>
                            <div>
                                <p class="left">WORLD BULLETS</p>
                                <p class="right"><span id="WorldBullets">10235</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightSide right">
                    <div id="ControlsHolder" class="left">
                        <div id="Controls"></div>
                    </div>
                    <div id="HideHUDHolder" class="left">
                        <div id="HideHUD"></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="Notification">
        </div>

        <div id="popUpHolder">
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
    </div>

    <asp:Panel runat="server" ID="GameScripts" Visible="false">
        <!-- NOTE: These are not minified so people can see how the game works.  On a larger release I will minify everything -->
        <script src="Scripts/jquery-1.8.2.js" type="text/javascript"></script>
        <script src="Scripts/jquery.cookie.js" type="text/javascript"></script>
        <script src="Scripts/knockout-2.1.0.js" type="text/javascript"></script>
        <script src="Scripts/jquery-ui-1.9.0.min.js" type="text/javascript"></script>
        <script src="Scripts/shortcut.js" type="text/javascript"></script>
        <script src="Scripts/jquery.signalR-1.0.0.js" type="text/javascript"></script>
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
        <script src="Client/Utilities/ImageAssets.js" type="text/javascript"></script>
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
        <script src="Client/HUD/HUDManager.js" type="text/javascript"></script>
        <script src="Client/HUD/Animation/TextAnimation.js" type="text/javascript"></script>
        <script src="Client/Main.js"></script>
    </asp:Panel>
    </form>
</body>
</html>
