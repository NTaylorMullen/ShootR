/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Ships/Ship.ts" />
var ShootR;
(function (ShootR) {
    var RankingsManager = (function () {
        function RankingsManager() {
            this._myPosition = 0;
            this._globalRanking = $("#GlobalRanking");
            this._globalRankingLB = $("#GlobalRankingLB");
            this._killsEle = $("#Kills");
            this._deathsEle = $("#Deaths");
            this._kdRatioEle = $("#KDRatio");
            this._koStatusCount = this._lastKills = 0;
            this._initialLoad = true;
        }
        RankingsManager.prototype.LoadPayload = function (payload) {
            this.UpdateLeaderboard(payload.LeaderboardPosition, payload.ShipsInWorld);
            this.UpdateKillsDeaths(payload.Kills, payload.Deaths);
        };

        RankingsManager.prototype.Update = function (ship) {
            if (this._initialLoad) {
                this._initialLoad = false;
                this._koStatusCount = 0;
                return;
            }

            while (this._koStatusCount !== 0) {
                ship.Graphic.Status("K.O.", 50, eg.Graphics.Color.White, RankingsManager.KO_FADE_DURATION);

                this._koStatusCount--;
            }
        };

        RankingsManager.prototype.UpdateLeaderboard = function (newPosition, outOf) {
            if (this._myPosition != newPosition || outOf !== this._lastOutOf) {
                if (this._myPosition && this._myPosition != newPosition) {
                    this._globalRanking.stop(true);
                    this._globalRanking.animate({ color: "#FFFFFF" }, 500).animate({ color: "#7F7F7F" }, 500);
                }

                this._myPosition = newPosition;
                this._lastOutOf = outOf;

                this._globalRanking[0].innerHTML = this._myPosition.toString();
                this._globalRankingLB[0].innerHTML = this._myPosition + " of " + outOf;
            }
        };

        RankingsManager.prototype.UpdateKillsDeaths = function (kills, deaths) {
            if (kills != this._lastKills || deaths != this._lastDeaths) {
                if (kills != this._lastKills) {
                    this._koStatusCount = kills - this._lastKills;
                    this._killsEle.stop(true);
                    this._killsEle.animate({ color: "#7F7F7F" }, 500).animate({ color: "#FFFFFF" }, 500);
                    this._killsEle[0].innerHTML = kills.toString();
                }

                if (deaths != this._lastDeaths) {
                    this._deathsEle.stop(true);
                    this._deathsEle.animate({ color: "#7F7F7F" }, 500).animate({ color: "#FFFFFF" }, 500);
                    this._deathsEle[0].innerHTML = deaths.toString();
                }

                var finalRatio;

                if (deaths === 0 && kills !== 0) {
                    finalRatio = "∞";
                } else if (deaths === 0 && kills === 0) {
                    finalRatio = "";
                } else {
                    var kRatio, dRatio;

                    if (kills <= deaths && kills !== 0) {
                        kRatio = 1;
                        dRatio = Math.round((deaths / kills) * 10) / 10;
                    } else {
                        kRatio = Math.round((kills / deaths) * 10) / 10;
                        dRatio = 1;
                    }

                    finalRatio = kRatio + ":" + dRatio;
                }

                this._kdRatioEle[0].innerHTML = finalRatio;

                this._lastKills = kills;
                this._lastDeaths = deaths;
            }
        };
        RankingsManager.KO_FADE_DURATION = eg.TimeSpan.FromSeconds(3);
        return RankingsManager;
    })();
    ShootR.RankingsManager = RankingsManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=RankingsManager.js.map
