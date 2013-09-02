/// <reference path="Leaderboard.ts" />
/// <reference path="../Ship/ShipController.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />

class DeathScreen {
    static RESPAWN_TIMER: number;

    private _randomQuotes: string[][];
    private _gameCanvas: JQuery = $("#game");
    private _fadeIns: JQuery = $("#HUDBarCover, #GameCover, #popUpHolder");
    private _respawnTime: JQuery = $("#RespawnTime");
    private _killedByName: JQuery = $("#KilledByNameSmall, #KilledByNameLarge");
    private _killedByPhoto: JQuery = $("#KilledByPhotoSmall, #KilledByPhotoLarge");
    private _doublePopupHolder: JQuery = $("#doublePopupHolder");
    private _popupWindows: JQuery = $("#leaderboardHolder, #deathScreenHolder");
    private _topLineQuote: JQuery = $("#topLineQuote");
    private _botLineQuote: JQuery = $("#botLineQuote");

    constructor (private _leaderboard: Leaderboard, private _myShip: ShipController) {
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

    public YouDied(by: string, byPhoto: string): void {
        var quote: number = Math.floor(Math.random() * this._randomQuotes.length);

        this._myShip.ResetTouchController();

        this._topLineQuote.html(this._randomQuotes[quote][0]);
        this._botLineQuote.html(this._randomQuotes[quote][1]);

        this._killedByName.html(by);
        this._killedByPhoto.attr("src", byPhoto);

        this._popupWindows.css("display", "block");
        this._doublePopupHolder.css("display", "block");

        this._popupWindows.addClass("goLeft");

        this._fadeIns.fadeIn(1000);
        this._respawnTime
        this._respawnTime.html(DeathScreen.RESPAWN_TIMER.toString());

        var that: DeathScreen = this;
        var interval = setInterval(function () {
            var left: number = parseInt(that._respawnTime.html()) - 1;
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
    }
}