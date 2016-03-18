/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
var ShootR;
(function (ShootR) {
    var DeathScreen = (function () {
        function DeathScreen() {
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
        DeathScreen.prototype.LoadPayload = function (payload) {
            if (payload.KilledByName) {
                this.YouDied(payload.KilledByName, payload.KilledByPhoto);
            }
        };

        DeathScreen.prototype.YouDied = function (by, byPhoto) {
            var _this = this;
            var quote = Math.floor(Math.random() * this._randomQuotes.length);

            this._topLineQuote[0].innerHTML = this._randomQuotes[quote][0];
            this._botLineQuote[0].innerHTML = this._randomQuotes[quote][1];

            this._killedByName.text(by);
            this._killedByPhoto.attr("src", byPhoto);

            this._popupWindows.css("display", "block");
            this._doublePopupHolder.css("display", "block");

            this._popupWindows.addClass("goLeft");

            this._fadeIns.fadeIn(1000);
            this._respawnTime[0].innerHTML = DeathScreen.RESPAWN_TIMER.Seconds.toString();

            var interval = setInterval(function () {
                var left = parseInt(_this._respawnTime[0].innerHTML) - 1;
                _this._respawnTime[0].innerHTML = left.toString();

                if (left === 0) {
                    clearInterval(interval);
                    _this._fadeIns.fadeOut(1000, function () {
                        _this._popupWindows.css("display", "none");
                        _this._doublePopupHolder.css("display", "none");
                        _this._popupWindows.removeClass("goLeft");
                    });
                }
            }, 1000);
        };
        return DeathScreen;
    })();
    ShootR.DeathScreen = DeathScreen;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=DeathScreen.js.map
