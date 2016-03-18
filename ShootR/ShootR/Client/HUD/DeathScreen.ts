/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class DeathScreen {
        public static RESPAWN_TIMER: eg.TimeSpan;

        private _randomQuotes: string[][];
        private _fadeIns: JQuery = $("#HUDBarCover, #GameCover, #popUpHolder");
        private _respawnTime: JQuery = $("#RespawnTime");
        private _killedByName: JQuery = $("#KilledByNameSmall, #KilledByNameLarge");
        private _killedByPhoto: JQuery = $("#KilledByPhotoSmall, #KilledByPhotoLarge");
        private _doublePopupHolder: JQuery = $("#doublePopupHolder");
        private _popupWindows: JQuery = $("#leaderboardHolder, #deathScreenHolder");
        private _topLineQuote: JQuery = $("#topLineQuote");
        private _botLineQuote: JQuery = $("#botLineQuote");

        constructor() {
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

        public LoadPayload(payload: Server.IPayloadData): void {
            if (payload.KilledByName) {
                this.YouDied(payload.KilledByName, payload.KilledByPhoto);
            }
        }

        private YouDied(by: string, byPhoto: string): void {
            var quote: number = Math.floor(Math.random() * this._randomQuotes.length);

            this._topLineQuote[0].innerHTML = this._randomQuotes[quote][0];
            this._botLineQuote[0].innerHTML = this._randomQuotes[quote][1];

            this._killedByName.text(by);
            this._killedByPhoto.attr("src", byPhoto);

            this._popupWindows.css("display", "block");
            this._doublePopupHolder.css("display", "block");

            this._popupWindows.addClass("goLeft");

            this._fadeIns.fadeIn(1000);
            this._respawnTime[0].innerHTML = DeathScreen.RESPAWN_TIMER.Seconds.toString();

            var interval = setInterval(() => {
                var left: number = parseInt(this._respawnTime[0].innerHTML) - 1;
                this._respawnTime[0].innerHTML = left.toString();

                if (left === 0) {
                    clearInterval(interval);
                    this._fadeIns.fadeOut(1000, () => {
                        this._popupWindows.css("display", "none");
                        this._doublePopupHolder.css("display", "none");
                        this._popupWindows.removeClass("goLeft");
                    });
                }
            }, 1000);
        }
    }

}