/// <reference path="Leaderboard.ts" />
/// <reference path="../Ship/ShipController.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
var DeathScreen = (function () {
    function DeathScreen(_leaderboard, _myShip) {
        this._leaderboard = _leaderboard;
        this._myShip = _myShip;
        this._gameCanvas = $("#game");
        this._fadeIns = $("#HUDBarCover, #GameCover, #popUpHolder");
        this._respawnTime = $("#RespawnTime");
        this._killedByName = $("#KilledByNameSmall, #KilledByNameLarge");
        this._killedByPhoto = $("#KilledByPhotoSmall, #KilledByPhotoLarge");
        this._doublePopupHolder = $("#doublePopupHolder");
        this._popupWindows = $("#leaderboardHolder, #deathScreenHolder");
        this._topLineQuote = $("#topLineQuote");
        this._botLineQuote = $("#botLineQuote");
        this._randomQuotes = [
            ["HAS LEFT A DENT IN YOUR EGO.", "(HOPE NOBODY SAW THAT)"],
            ["JUST DOMINATED YOU.", "OUCH!"],
            ["SUCKS TO BE YOU!", ""],
            ["...", "REALLY?"],
            ["YOU ALRIGHT?", "THAT MUST HAVE HURT."],
            ["SAID TO TELL YOUR MOTHER", "HELLO!"],
            ["TIS BUT A SCRATCH", ""],
            ["BOOM...", "HEADSHOT!"],
            ["CAN'T LET YOU DO THAT STARFOX", ""],
            ["PLAYTIME IS OVER!", ""],
            ["YOU MISSED!", "YOU MAY NEED GLASSES"],
            ["YOU'RE GOOD...", "BUT I'M BETTER."],
            ["TOO SLOW...", "MY GRAMAH DRIVES FASTER THAN THAT!"],
            ["TOASTERS...", "BLAME THE TOASTERS!"],
            ["=(", ""]
        ];
    }
    DeathScreen.prototype.YouDied = function (by, byPhoto) {
        var quote = Math.floor(Math.random() * this._randomQuotes.length);

        this._myShip.ResetTouchController();

        this._topLineQuote.html(this._randomQuotes[quote][0]);
        this._botLineQuote.html(this._randomQuotes[quote][1]);

        this._killedByName.html(by);
        this._killedByPhoto.attr("src", byPhoto);

        this._popupWindows.css("display", "block");
        this._doublePopupHolder.css("display", "block");

        this._popupWindows.addClass("goLeft");

        this._fadeIns.fadeIn(1000);
        this._respawnTime;
        this._respawnTime.html(DeathScreen.RESPAWN_TIMER.toString());

        var that = this;
        var interval = setInterval(function () {
            var left = parseInt(that._respawnTime.html()) - 1;
            that._respawnTime.html(left.toString());

            if (left === 0) {
                clearInterval(interval);
                that._fadeIns.fadeOut(1000, function () {
                    that._popupWindows.css("display", "none");
                    that._doublePopupHolder.css("display", "none");
                    that._popupWindows.removeClass("goLeft");
                });
            }
        }, 1000);
    };
    return DeathScreen;
})();
//# sourceMappingURL=DeathScreen.js.map
