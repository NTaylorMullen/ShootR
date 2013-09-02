/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />

class MyRankings {
    private _myPosition: number = 0; // Initially set to a very high value so we flash green on leaderboard position first update
    private _globalRanking: JQuery = $("#GlobalRanking");
    private _globalRankingLB: JQuery = $("#GlobalRankingLB");
    private _killsEle: JQuery = $("#Kills");
    private _deathsEle: JQuery = $("#Deaths");
    private _kdRatioEle: JQuery = $("#KDRatio");
    private _lastKills: number;
    private _lastDeaths: number;
    private _lastOutOf: number;

    constructor () {
    }

    public LoadPosition(newPosition: number, outOf: number): void {
        if (this._myPosition != newPosition || outOf !== this._lastOutOf) {
            if (this._myPosition && this._myPosition != newPosition) {
                this._globalRanking.stop(true);
                this._globalRanking.animate({ color: "#FFFFFF" }, 500).animate({ color: "#7F7F7F" }, 500);
            }

            this._myPosition = newPosition;
            this._lastOutOf = outOf;

            this._globalRanking.html(this._myPosition.toString());
            this._globalRankingLB.html(this._myPosition + " of " + outOf);
        }
    }

    public Update(kills: number, deaths: number): void {
        if (kills != this._lastKills || deaths != this._lastDeaths) {

            if (kills != this._lastKills) {
                this._killsEle.stop(true);
                this._killsEle.animate({ color: "#7F7F7F" }, 500).animate({ color: "#FFFFFF" }, 500);
                this._killsEle.html(kills.toString());
            }

            if (deaths != this._lastDeaths) {
                this._deathsEle.stop(true);
                this._deathsEle.animate({ color: "#7F7F7F" }, 500).animate({ color: "#FFFFFF" }, 500);
                this._deathsEle.html(deaths.toString());
            }

            var finalRatio: string;

            if (deaths === 0 && kills !== 0) {
                finalRatio = "∞";
            }
            else if (deaths === 0 && kills === 0) {
                finalRatio = "";
            }
            else {
                var kRatio: number,
                dRatio: number;

                if (kills <= deaths && kills !== 0) {
                    kRatio = 1;
                    dRatio = Math.round((deaths / kills) * 10) / 10
                }
                else {
                    kRatio = Math.round((kills / deaths) * 10) / 10;
                    dRatio = 1;
                }

                finalRatio = kRatio + ":" + dRatio;
            }

            this._kdRatioEle.html(finalRatio);

            this._lastKills = kills;
            this._lastDeaths = deaths;
        }
    }
}