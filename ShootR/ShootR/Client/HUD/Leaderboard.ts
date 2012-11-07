/// <reference path="../Ship/ShipController.ts" />

declare var $;

class Leaderboard {
    static LEADERBOARD_SIZE: number;

    private _leaderboardHolder: any = $("#leaderboardHolder, #doublePopupHolder");
    private _leaderboard: any = $("#leaderboard");
    private _popUpHolder: any = $("#popUpHolder");
    private _gameCover: any = $("#GameCover");
    private _myRanking: any = $("#myRanking");
    private _leaderboardRows: any[] = [];

    public LeaderboardUp: bool = false;

    constructor (private _gameHUD: any, private _myShip: ShipController, private _connection: any) {
        this.InitializeLeaderboardRows();
        this.ApplyKeyboardShortcuts();
    }

    private InitializeLeaderboardRows(): void {
        var tempRow = $("#leaderboard .row");

        this._leaderboardRows.push(tempRow);

        for (var i = 0; i < Leaderboard.LEADERBOARD_SIZE - 1; i++) {
            var rowCopy = tempRow.clone();
            this._leaderboardRows.push(rowCopy);
            this._leaderboard.append(rowCopy);
        }
    }
    
    
    private BindToLeaderboard(data: any): void {
        for (var i = 0; i < data.length; i++) {
            var row = $(this._leaderboardRows[i]);

            if (data[i].ID === this._myShip.ID) {
                if (data[i].Photo.length === 0) {
                    data[i].Photo = "Images/HUD/You_Default.png";
                }
                row.addClass("highlight");
            }
            else {
                row.removeClass("highlight");
            }

            // Bind photo separately becase it's bound to the src
            var photoEle = row.find(".lbPhoto");
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
    private ApplyKeyboardShortcuts(): void {
        var that = this;

        shortcut.add("Tab", function () {
            that.ToggleLeaderboard();
        }, { 'disable_in_input': true });

        $("#GlobalRanking").click(function () {
            that.ToggleLeaderboard();
        });
    }

    private ToggleLeaderboard(): void {
        if (!this.LeaderboardUp) {
            this.ShowLeaderboard();
        }
        else {
            this.HideLeaderboard();
        }
    }

    private ShowLeaderboard(): void {
        // Go left is turned on when the ship dies.  We want the Leaderboard to float along side the death
        // screen when we're in the "dead" state.
        if (!this._leaderboard.hasClass('goLeft')) {
            this.LeaderboardUp = true;
            this._myShip.ResetTouchController();
            this._leaderboardHolder.css("display", "block");
            this._popUpHolder.fadeIn(350);
            this._gameCover.fadeIn(350);
            this._connection.server.readyForLeaderboardPayloads();
        }
    }

    private HideLeaderboard(): void {
        var that = this;

        if (!this._leaderboard.hasClass('goLeft')) {
            this.LeaderboardUp = false;
            this._popUpHolder.fadeOut(200, function () {
                that._leaderboardHolder.css("display", "none");
            });
            this._gameCover.fadeOut(200);
            this._connection.server.stopLeaderboardPayloads();
        }
    }

    public Load (data: any): void {
        this.BindToLeaderboard(data);
    }
}