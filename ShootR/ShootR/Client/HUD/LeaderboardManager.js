/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
var ShootR;
(function (ShootR) {
    var LeaderboardManager = (function () {
        function LeaderboardManager(_myShipId, _keyboard, _serverAdapter) {
            var _this = this;
            this._myShipId = _myShipId;
            this._keyboard = _keyboard;
            this._serverAdapter = _serverAdapter;
            this._leaderboardHolder = $("#leaderboardHolder, #doublePopupHolder");
            this._leaderboard = $("#leaderboard");
            this._popUpHolder = $("#popUpHolder");
            this._gameCover = $("#GameCover");
            this._myRanking = $("#myRanking");
            this._leaderboardRows = [];
            this.LeaderboardUp = false;
            this.initializeLeaderboardRows();
            this.applyKeyboardShortcuts();

            this._serverAdapter.OnLeaderboardUpdate.Bind(function (leaderboardData) {
                _this.bindToLeaderboard(leaderboardData);
            });
        }
        LeaderboardManager.prototype.initializeLeaderboardRows = function () {
            var tempRow = $("#leaderboard .row");

            this._leaderboardRows.push(tempRow);

            for (var i = 0; i < LeaderboardManager.LEADERBOARD_SIZE - 1; i++) {
                var rowCopy = tempRow.clone();
                this._leaderboardRows.push(rowCopy);
                this._leaderboard.append(rowCopy);
            }
        };

        LeaderboardManager.prototype.bindToLeaderboard = function (data) {
            for (var i = 0; i < data.length; i++) {
                var row = $(this._leaderboardRows[i]);

                if (data[i].ID === this._myShipId) {
                    if (data[i].Photo.length === 0) {
                        data[i].Photo = "Images/HUD/You_Default.png";
                    }
                    row.addClass("highlight");
                } else {
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
        };

        // Create shortcuts
        LeaderboardManager.prototype.applyKeyboardShortcuts = function () {
            var _this = this;
            this._keyboard.OnCommandPress("l", function () {
                _this.toggleLeaderboard();
            });

            $("#GlobalRanking").click(function () {
                _this.toggleLeaderboard();
            });
        };

        LeaderboardManager.prototype.toggleLeaderboard = function () {
            if (!this.LeaderboardUp) {
                this.showLeaderboard();
            } else {
                this.hideLeaderboard();
            }
        };

        LeaderboardManager.prototype.showLeaderboard = function () {
            if (!this._leaderboard.hasClass('goLeft')) {
                this.LeaderboardUp = true;
                this._leaderboardHolder.css("display", "block");
                this._popUpHolder.fadeIn(350);
                this._gameCover.fadeIn(350);
                this._serverAdapter.Proxy.invoke("readyForLeaderboardPayloads");
            }
        };

        LeaderboardManager.prototype.hideLeaderboard = function () {
            var _this = this;
            if (!this._leaderboard.hasClass('goLeft')) {
                this.LeaderboardUp = false;
                this._popUpHolder.fadeOut(200, function () {
                    _this._leaderboardHolder.css("display", "none");
                });
                this._gameCover.fadeOut(200);
                this._serverAdapter.Proxy.invoke("stopLeaderboardPayloads");
            }
        };
        return LeaderboardManager;
    })();
    ShootR.LeaderboardManager = LeaderboardManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=LeaderboardManager.js.map
