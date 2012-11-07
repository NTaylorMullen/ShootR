var Leaderboard = (function () {
    function Leaderboard(_gameHUD, _myShip, _connection) {
        this._gameHUD = _gameHUD;
        this._myShip = _myShip;
        this._connection = _connection;
        this._leaderboardHolder = $("#leaderboardHolder, #doublePopupHolder");
        this._leaderboard = $("#leaderboard");
        this._popUpHolder = $("#popUpHolder");
        this._gameCover = $("#GameCover");
        this._myRanking = $("#myRanking");
        this._leaderboardRows = [];
        this.LeaderboardUp = false;
        this.InitializeLeaderboardRows();
        this.ApplyKeyboardShortcuts();
    }
    Leaderboard.LEADERBOARD_SIZE = 0;
    Leaderboard.prototype.InitializeLeaderboardRows = function () {
        var tempRow = $("#leaderboard .row");
        this._leaderboardRows.push(tempRow);
        for(var i = 0; i < Leaderboard.LEADERBOARD_SIZE - 1; i++) {
            var rowCopy = tempRow.clone();
            this._leaderboardRows.push(rowCopy);
            this._leaderboard.append(rowCopy);
        }
    };
    Leaderboard.prototype.BindToLeaderboard = function (data) {
        for(var i = 0; i < data.length; i++) {
            var row = $(this._leaderboardRows[i]);
            if(data[i].ID === this._myShip.ID) {
                if(data[i].Photo.length === 0) {
                    data[i].Photo = "Images/HUD/You_Default.png";
                }
                row.addClass("highlight");
            } else {
                row.removeClass("highlight");
            }
            var photoEle = row.find(".lbPhoto");
            if(data[i].Photo.length === 0) {
                data[i].Photo = "Images/HUD/KilledBy_Default.png";
            }
            if(photoEle.attr("src") !== data[i].Photo) {
                photoEle.attr("src", data[i].Photo);
            }
            delete data[i].Photo;
            delete data[i].ID;
            for(var key in data[i]) {
                row.find(".lb" + key).html(data[i][key]);
            }
        }
    };
    Leaderboard.prototype.ApplyKeyboardShortcuts = function () {
        var that = this;
        shortcut.add("Tab", function () {
            that.ToggleLeaderboard();
        }, {
            'disable_in_input': true
        });
        $("#GlobalRanking").click(function () {
            that.ToggleLeaderboard();
        });
    };
    Leaderboard.prototype.ToggleLeaderboard = function () {
        if(!this.LeaderboardUp) {
            this.ShowLeaderboard();
        } else {
            this.HideLeaderboard();
        }
    };
    Leaderboard.prototype.ShowLeaderboard = function () {
        if(!this._leaderboard.hasClass('goLeft')) {
            this.LeaderboardUp = true;
            this._myShip.ResetTouchController();
            this._leaderboardHolder.css("display", "block");
            this._popUpHolder.fadeIn(350);
            this._gameCover.fadeIn(350);
            this._connection.server.readyForLeaderboardPayloads();
        }
    };
    Leaderboard.prototype.HideLeaderboard = function () {
        var that = this;
        if(!this._leaderboard.hasClass('goLeft')) {
            this.LeaderboardUp = false;
            this._popUpHolder.fadeOut(200, function () {
                that._leaderboardHolder.css("display", "none");
            });
            this._gameCover.fadeOut(200);
            this._connection.server.stopLeaderboardPayloads();
        }
    };
    Leaderboard.prototype.Load = function (data) {
        this.BindToLeaderboard(data);
    };
    return Leaderboard;
})();
//@ sourceMappingURL=Leaderboard.js.map
