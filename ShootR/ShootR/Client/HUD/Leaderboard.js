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
        this.initializeLeaderboardRows();
        this.applyKeyboardShortcuts();
    }
    Leaderboard.prototype.initializeLeaderboardRows = function () {
        var tempRow = $("#leaderboard .row");
        this._leaderboardRows.push(tempRow);
        for(var i = 0; i < Leaderboard.LEADERBOARD_SIZE - 1; i++) {
            var rowCopy = tempRow.clone();
            this._leaderboardRows.push(rowCopy);
            this._leaderboard.append(rowCopy);
        }
    };
    Leaderboard.prototype.bindToLeaderboard = function (data) {
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
    Leaderboard.prototype.applyKeyboardShortcuts = function () {
        var that = this;
        shortcut.add("Tab", function () {
            that.toggleLeaderboard();
        }, {
            'disable_in_input': true
        });
        $("#GlobalRanking").click(function () {
            that.toggleLeaderboard();
        });
    };
    Leaderboard.prototype.toggleLeaderboard = function () {
        if(!this.LeaderboardUp) {
            this.showLeaderboard();
        } else {
            this.hideLeaderboard();
        }
    };
    Leaderboard.prototype.showLeaderboard = function () {
        if(!this._leaderboard.hasClass('goLeft')) {
            this.LeaderboardUp = true;
            this._myShip.ResetTouchController();
            this._leaderboardHolder.css("display", "block");
            this._popUpHolder.fadeIn(350);
            this._gameCover.fadeIn(350);
            this._connection.server.readyForLeaderboardPayloads();
        }
    };
    Leaderboard.prototype.hideLeaderboard = function () {
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
        this.bindToLeaderboard(data);
    };
    return Leaderboard;
})();
//@ sourceMappingURL=Leaderboard.js.map
