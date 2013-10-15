/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class LeaderboardManager {
        public static LEADERBOARD_SIZE: number;

        private _leaderboardHolder: JQuery = $("#leaderboardHolder, #doublePopupHolder");
        private _leaderboard: JQuery = $("#leaderboard");
        private _popUpHolder: JQuery = $("#popUpHolder");
        private _gameCover: JQuery = $("#GameCover");
        private _myRanking: JQuery = $("#myRanking");
        private _leaderboardRows: JQuery[] = [];

        public LeaderboardUp: boolean = false;

        constructor(private _myShipId: number, private _keyboard: eg.Input.KeyboardHandler, private _serverAdapter: Server.ServerAdapter) {
            this.initializeLeaderboardRows();
            this.applyKeyboardShortcuts();

            this._serverAdapter.OnLeaderboardUpdate.Bind((leaderboardData: Server.ILeaderboardEntryData[]) => {
                this.bindToLeaderboard(leaderboardData);
            });
        }

        private initializeLeaderboardRows(): void {
            var tempRow: JQuery = $("#leaderboard .row");

            this._leaderboardRows.push(tempRow);

            for (var i = 0; i < LeaderboardManager.LEADERBOARD_SIZE - 1; i++) {
                var rowCopy: JQuery = tempRow.clone();
                this._leaderboardRows.push(rowCopy);
                this._leaderboard.append(rowCopy);
            }
        }

        private bindToLeaderboard(data: Server.ILeaderboardEntryData[]): void {
            for (var i = 0; i < data.length; i++) {
                var row: JQuery = $(this._leaderboardRows[i]);

                if (data[i].ID === this._myShipId) {
                    if (data[i].Photo.length === 0) {
                        data[i].Photo = "Images/HUD/You_Default.png";
                    }
                    row.addClass("highlight");
                }
                else {
                    row.removeClass("highlight");
                }

                // Bind photo separately becase it's bound to the src
                var photoEle: JQuery = row.find(".lbPhoto");
                if (data[i].Photo.length === 0) {
                    data[i].Photo = "Images/HUD/KilledBy_Default.png";
                }

                if (photoEle.attr("src") !== data[i].Photo) {
                    photoEle.attr("src", data[i].Photo);
                }

                // Delete the photo and ID from the data because we don't want them to be bound with the rest of the data
                delete data[i].Photo;
                delete data[i].ID;

                for (var key in data[i]) {
                    row.find(".lb" + key).html(data[i][key]);
                }
            }
        }

        // Create shortcuts
        private applyKeyboardShortcuts(): void {
            this._keyboard.OnCommandPress("l", () => {
                this.toggleLeaderboard();
            });            

            $("#GlobalRanking").click(() => {
                this.toggleLeaderboard();
            });
        }

        private toggleLeaderboard(): void {
            if (!this.LeaderboardUp) {
                this.showLeaderboard();
            } else {
                this.hideLeaderboard();
            }
        }

        private showLeaderboard(): void {
            // Go left is turned on when the ship dies.  We want the Leaderboard to float along side the death
            // screen when we're in the "dead" state.
            if (!this._leaderboard.hasClass('goLeft')) {
                this.LeaderboardUp = true;
                this._leaderboardHolder.css("display", "block");
                this._popUpHolder.fadeIn(350);
                this._gameCover.fadeIn(350);
                this._serverAdapter.Proxy.invoke("readyForLeaderboardPayloads");
            }
        }

        private hideLeaderboard(): void {
            if (!this._leaderboard.hasClass('goLeft')) {
                this.LeaderboardUp = false;
                this._popUpHolder.fadeOut(200, () => {
                    this._leaderboardHolder.css("display", "none");
                });
                this._gameCover.fadeOut(200);
                this._serverAdapter.Proxy.invoke("stopLeaderboardPayloads");
            }
        }
    }

}