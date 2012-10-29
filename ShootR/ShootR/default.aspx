<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="ShootR._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" type="image/ico" href="Images/favicon.ico" />
    <link href="Styles/game.css" rel="stylesheet" />
    <link href="Styles/jquery-ui-1.9.0.css" rel="stylesheet" />
    <link href="Styles/gameHUD.css" rel="stylesheet" />
    <link href="Styles/popups.css" rel="stylesheet" />

    <title>SignalR ShootR</title>
</head>
<body style="height: 100%;">
    <form runat="server">

    <asp:Panel runat="server" ID="JanrainScripts" Visible="true">
        <script src="Scripts/janrain.js" type="text/javascript"></script>
        <div id="janrainEngageEmbed"></div>
    </asp:Panel>

    <asp:Panel runat="server" ID="GameScripts" Visible="false">
        <div id="gameWrapper">
            <div id="GameCover"></div>
            <canvas id="game"></canvas>
            <div id="gameHUD">
                <div id="HealthHolder">
                    <div id="Health"></div>
                    <div id="WhiteHealthHeart"></div>
                    <div id="HealthHeart" class="bad"></div>
                    <span id="HealthText"></span>
                </div>
                <div id="HUDBar">
                    <div id="HUDBarCover">RESPAWNING IN ... <span id="RespawnTime"></span></div>
                    <div id="YouHolder" class="left">
                        <img id="You" src="Images/HUD/You_Default.png" onerror="this.src='Images/HUD/You_Default.png'" alt="Your profile picture" width="96" height="96" />
                    </div>
                    <div id="PlayerInfoHolder" class="left separate">
                        <div class="offset">
                            <p class="pilotHeader">PILOT<img src="Images/HUD/logout.png" alt="Logout" id="logout" /></p>
                            <p id="DisplayName"></p>
                            <p id="ExperienceHolder">EXP: <span id="Experience"></span></p>
                            <p id="GlobalRankingHolder">GLOBAL RANKING: <span id="GlobalRanking"></span></p>
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
                                            <h1 id="Kills"></h1>
                                        </div>
                                    </div>
                                    <div class="deathHolder">
                                        <div class="deathIcon"></div>
                                        <div class="deathStatsHolder">
                                            <p>DEATHS</p>
                                            <h1 id="Deaths"></h1>
                                        </div>
                                    </div>
                                </div>
                                <div class="ratioHolder">
                                    <div class="goRight">
                                        <p>RATIO</p>
                                        <h1 id="KDRatio"></h1>
                                    </div>
                                </div>
                            </div>
                            <div class="lastKilledByHolder">
                                <h1>KILLED BY</h1>
                                <img id="KilledByPhotoSmall" src="Images/HUD/KilledBy_Default.png" alt="Killed By" onerror="this.src='Images/HUD/KilledBy_Default.png'" width="50" height="50" />
                                <p id="KilledByNameSmall"></p>
                            </div>
                        </div>
                    </div>
                    <div id="LevelHolder" class="left" style="overflow:hidden;">
                        <div class="offset">
                            <div class="mainStatHolder">
                                <p>LEVEL</p>
                                <h1 id="Level"></h1>
                            </div>
                        </div>
                    </div>
                    <div id="StatisticHolder" class="left">
                        <div class="offset">
                            <div class="increasedStatisticsHolder statistics left">
                                <p class="header">SHIP</p>
                                <div>
                                    <p class="left">SPEED</p>
                                    <p class="right"><span id="Speed"></span>AU</p>
                                </div>
                                <div>
                                    <p class="left">HEALTH BONUS</p>
                                    <p class="right">+<span id="IncreasedHealth"></span></p>
                                </div>
                                <div>
                                    <p class="left">DAMAGE BONUS</p>
                                    <p class="right">+<span id="IncreasedDamage"></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="AreaHolder" class="left" style="overflow:hidden;">
                        <div class="offset">
                            <div class="mainStatHolder">
                                <p>AREA</p>
                                <h1 id="Area"></h1>
                            </div>
                        </div>
                    </div>
                    <div id="LocationStatisticsHolder" class="left">
                        <div class="offset">
                            <div class="locationStats statistics left">
                                <p class="header"></p>
                                <div>
                                    <p class="left">TARGETS</p>
                                    <p class="right"><span id="Targets"></span></p>
                                </div>
                                <div>
                                    <p class="left">WORLD TARGETS</p>
                                    <p class="right"><span id="WorldTargets"></span></p>
                                </div>
                                <div>
                                    <p class="left">WORLD BULLETS</p>
                                    <p class="right"><span id="WorldBullets"></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="InfoHolder" class="right">
                        <div id="NotificationHolder">
                            <div id="Notifications">
                                <div class="Notification" style="display: none">
                                    <div class="mainBody">
                                        <img src="Images/Page/toast_sysTIM.png" alt="System Picture" />
                                        <p>Transfering control to this browser.  You were already logged in.</p>
                                    </div>
                                    <div class="bottomArrowHolder">
                                        <img src="Images/Page/toast_start.png" alt="Toast start" />
                                    </div>
                                </div>
                            </div>
                            <div id="ControlsNCredits">
                                <div class="mainBody">
                                    <div class="bodyBox">
                                        <div class="ControlsHolder">
                                            <div id="Controls">
                                            </div>
                                        </div>
                                        <div id="Credits">
                                            <div class="bodyOffset">
                                                <h1>THE SHOOTr TEAM</h1>
                                                <div>
                                                    <p class="left">Creator</p>
                                                    <p class="right"><a href="https://twitter.com/ntaylormullen" target="_blank">N. Taylor Mullen</a></p>
                                                </div>
                                                <div>
                                                    <p class="left">Designer</p>
                                                    <p class="right"><a href="https://twitter.com/jbsterling" target="_blank">Jonah Sterling</a></p>
                                                </div>
                                                <div>
                                                    <p class="left">Developer</p>
                                                    <p class="right"><a href="https://twitter.com/davidfowl" target="_blank">David Fowler</a></p>
                                                </div>
                                                <div>
                                                    <p class="left">Developer</p>
                                                    <p class="right"><a href="https://twitter.com/DamianEdwards" target="_blank">Damian Edwards</a></p>
                                                </div>
                                                <div>
                                                    <p class="left">Developer</p>
                                                    <p class="right"><a href="https://twitter.com/StephenHaltR" target="_blank">Stephen Halter</a></p>
                                                </div>

                                                <h1 style="margin-top: 24px;">CODE</h1>
                                                <div>
                                                    <p class="left"><a href="https://github.com/NTaylorMullen/ShootR" target="_blank">SHOOTr</a></p>
                                                    <p class="right"><a href="http://signalr.net/" target="_blank">SIGNALr</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bottomArrowHolder">
                                        <img src="Images/Page/toast_start.png" alt="Toast start" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="ShowInfo"></div>
                    </div>
                </div>
            </div>

            <div id="popUpHolder">
                <div id="levelNotification">
                    <p id="CurrentLevel_Notification"></p>
                </div>

                <div id="doublePopupHolder">
                    <div id="deathScreenHolder" class="goLeft">
                        <div class="popUpScreenBG"></div>
                        <div class="bodyExtendedHolder">
                            <div class="bodyHolder">
                                <div id="DeathNote"></div>
                                <img src="" id="KilledByPhotoLarge" onerror="this.src='Images/HUD/KilledBy_Default.png'" width="108" height="108" alt="You got killed by" />
                                <h1 id="KilledByNameLarge"></h1>
                                <p id="topLineQuote"></p>
                                <p id="botLineQuote"></p>
                            </div>
                        </div>
                    </div>

                    <div id="leaderboardHolder">
                        <div class="popUpScreenBG"></div>
                        <div class="offset">
                            <div class="lionHolder">
                                <div id="Lion"></div>
                            </div>
                            <div id="leaderboard" data-bind="foreach: leaderboard">
                                <div class="row">
                                    <div class="rowOffset">
                                        <div class="leaderboardImgHolder">
                                            <div class="isMe"></div>
                                            <img src="" class="lbPhoto" onerror="this.src='Images/HUD/KilledBy_Default.png'" width="50" height="50" alt="Profile picture" />
                                        </div>
                                        <div class="leaderboardPosHolder">
                                            <h1># <span class="lbPosition"></span></h1>
                                            <p class="lbName"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span id="myRanking">
                                <div class="dividerForMe">
                                    <img src="Images/Page/leaderboard_divider.png" alt="Divider for me" width="40" height="6" />
                                </div>
                                <div class="row borderless">
                                    <div class="rowOffset">
                                        <div class="leaderboardImgHolder">
                                            <div class="isMe"></div>
                                            <img src="" id="YouLB" onerror="this.src='Images/HUD/You_Default.png'" width="50" height="50" alt="Profile picture" />
                                        </div>
                                        <div class="leaderboardPosHolder">
                                            <h1># <span id="GlobalRankingLB"></span></h1>
                                            <p id="DisplayNameLB"></p>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- NOTE: These are not minified so people can see how the game works.  On a larger release I will minify everything -->
        <script src="Scripts/jquery-1.8.2.js" type="text/javascript"></script>
        <script src="Scripts/jquery.cookie.js" type="text/javascript"></script>
        <script src="Scripts/jquery-ui-1.9.0.min.js" type="text/javascript"></script>
        <script src="Scripts/shortcut.js" type="text/javascript"></script>
        <script src="Scripts/jquery.signalR-1.0.0.js" type="text/javascript"></script>
        <script src="Scripts/jquery.spritify-0.0.0.js" type="text/javascript"></script>
        <script src="Scripts/jquery.animate-colors-min.js" type="text/javascript"></script>
        <script src="signalr/hubs" type="text/javascript"></script>

        <script src="Client/Utilities/ValueRef.js" type="text/javascript"></script>
        <script src="Client/Utilities/ImageAssets.js" type="text/javascript"></script>
        <script src="Client/Utilities/Vector2.js" type="text/javascript"></script>
        <script src="Client/Utilities/GameTime.js" type="text/javascript"></script>

        <script src="Client/Managers/AnimationManager.js" type="text/javascript"></script>
        <script src="Client/Space/Screen.js" type="text/javascript"></script>
        <script src="Client/Space/AreaRenderer.js" type="text/javascript"></script>
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

        <script src="Client/Collidable/Collidable.js" type="text/javascript"></script>
        <script src="Client/Collidable/MovementController.js" type="text/javascript"></script>

        <script src="Client/Powerups/Powerup.js" type="text/javascript"></script>
        <script src="Client/Powerups/HealthPack.js" type="text/javascript"></script>
        <script src="Client/Powerups/PowerupManager.js" type="text/javascript"></script>

        <script src="Client/Bullet/Bullet.js" type="text/javascript"></script>
        <script src="Client/Bullet/BulletManager.js" type="text/javascript"></script>

        <script src="Client/Abilities/AbilityHandlers/AbilityHandler.js" type="text/javascript"></script>
        <script src="Client/Abilities/AbilityHandlers/ShipAbilityHandler.js" type="text/javascript"></script>
        <script src="Client/Abilities/Abstractions/Ability.js" type="text/javascript"></script>
        <script src="Client/Abilities/Abstractions/MovementAbility.js" type="text/javascript"></script>
        <script src="Client/Abilities/Boost.js"></script>

        <script src="Client/Ship/ShipMovementController.js" type="text/javascript"></script>
        <script src="Client/Ship/ShipManager.js" type="text/javascript"></script>
        <script src="Client/Ship/ShipAnimationHandler.js" type="text/javascript"></script>
        <script src="Client/Ship/ShipVehicle.js" type="text/javascript"></script>
        <script src="Client/Ship/Ship.js" type="text/javascript"></script>

        <script src="Client/Utilities/PayloadManagement/PayloadDecompressor.js" type="text/javascript"></script>
        <script src="Client/Configuration/ConfigurationManager.js" type="text/javascript"></script>
        <script src="Client/Game.js" type="text/javascript"></script>

        <script src="Client/HUD/NotificationManager.js" type="text/javascript"></script>
        <script src="Client/HUD/EnvironmentMonitor.js" type="text/javascript"></script>
        <script src="Client/HUD/ShipStatMonitor.js" type="text/javascript"></script>
        <script src="Client/HUD/HealthMonitor.js" type="text/javascript"></script>
        <script src="Client/HUD/DeathScreen.js" type="text/javascript"></script>
        <script src="Client/HUD/MyRankings.js" type="text/javascript"></script>
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
