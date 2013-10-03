<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="ShootR._default" %>

<%@ Register TagPrefix="uc" TagName="Login" Src="~/Login.ascx" %>

<%@ Import Namespace="System.Web.Optimization" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="shortcut icon" type="image/ico" href="Images/favicon.ico" />

    <% =Styles.Render("~/bundles/gamecss") %>
    <% =Styles.Render("~/bundles/jquerycss") %>

    <title>SignalR ShootR</title>
</head>
<body style="height: 100%;" class="space">
    <form runat="server">
        <uc:Login runat="server" ID="LoginScripts"></uc:Login>

        <asp:Panel runat="server" ID="GameScripts" Visible="false">
            <div id="loadContent" style="position: absolute; width: 100%;">
                <p style="position: relative; text-align: center; color:white; font-size:3em; font-family: 'Segoe UI'; font-weight: bolder; margin-top: 200px;"><b>Loading, Please Wait...</b></p>
            </div>
            <div id="gameContent" style="display:none;">
                <a href="https://github.com/NTaylorMullen/ShootR" style="z-index: 10001;" target="_blank">
                    <img style="z-index: 10001; position: absolute; top: 0; left: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png" alt="Fork me on GitHub" />
                </a>

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
                                <p id="ExperienceHolder">EXP: <span id="ExperienceBarHolder"><span id="ExperienceBar"></span></span><span id="Experience"></span></p>
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
                        <div id="LevelHolder" class="left" style="overflow: hidden;">
                            <div class="offset">
                                <div class="mainStatHolder" style="min-width: 50px;">
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
                                        <p class="right"><span id="Speed"></span></p>
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
                        <div id="AreaHolder" class="left" style="overflow: hidden;">
                            <div class="offset">
                                <div class="mainStatHolder" style="min-width: 90px;">
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
                                        <p class="left">LATENCY</p>
                                        <p class="right"><span id="Latency"></span></p>
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
                                            <div class="leaderboardStatHolder right">
                                                <h1>Level <span class="lbLevel"></span></h1>
                                                <p>K: <span class="lbKills"></span>D: <span class="lbDeaths"></span></p>
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

            <% =Scripts.Render("~/bundles/jqueryjs") %>
            <% =Scripts.Render("~/bundles/signalr") %>

            <script src='<% =ResolveClientUrl("~/signalr/hubs") %>' type="text/javascript"></script>

            <% =Scripts.Render("~/bundles/gamejs") %>
        </asp:Panel>
    </form>
</body>
</html>
