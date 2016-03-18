/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Ships/Ship.ts" />

module ShootR {

    export class RankingsManager {
        public static KO_FADE_DURATION: eg.TimeSpan = eg.TimeSpan.FromSeconds(3);

        private _myPosition: number = 0; // Initially set to a very high value so we flash green on leaderboard position first update
        private _globalRanking: JQuery = $("#GlobalRanking");
        private _globalRankingLB: JQuery = $("#GlobalRankingLB");
        private _killsEle: JQuery = $("#Kills");
        private _deathsEle: JQuery = $("#Deaths");
        private _kdRatioEle: JQuery = $("#KDRatio");
        private _lastKills: number;
        private _lastDeaths: number;
        private _lastOutOf: number;
        private _koStatusCount: number;
        private _initialLoad: boolean;

        constructor() {
            this._koStatusCount = this._lastKills = 0;
            this._initialLoad = true;
        }

        public LoadPayload(payload: Server.IPayloadData): void {
            this.UpdateLeaderboard(payload.LeaderboardPosition, payload.ShipsInWorld);
            this.UpdateKillsDeaths(payload.Kills, payload.Deaths);
        }

        public Update(ship: Ship): void {
            if (this._initialLoad) {
                this._initialLoad = false;
                this._koStatusCount = 0;
                return;
            }

            while (this._koStatusCount !== 0) {                
                ship.Graphic.Status("K.O.", 50, eg.Graphics.Color.White, RankingsManager.KO_FADE_DURATION);

                this._koStatusCount--;
            }
        }

        private UpdateLeaderboard(newPosition: number, outOf: number): void {
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
        }

        private UpdateKillsDeaths(kills: number, deaths: number): void {
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

                this._kdRatioEle[0].innerHTML = finalRatio;

                this._lastKills = kills;
                this._lastDeaths = deaths;
            }
        }
    }

}