/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Space/Map.ts" />
/// <reference path="../Ships/Ship.ts" />

module ShootR {

    export class EnvironmentMonitor {
        private _latency: JQuery = $("#Latency");
        private _worldTargets: JQuery = $("#WorldTargets");
        private _worldBullets: JQuery = $("#WorldBullets");
        private _area: JQuery = $("#Area");
        private _areaLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        constructor() { }

        public LoadPayload(payload: Server.IPayloadData): void {
            //this._latency.html(this._myShip.LatencyResolver.Latency);
            this._worldBullets.text(payload.BulletsInWorld.toString());
            this._worldTargets.text(payload.ShipsInWorld.toString());
        }
    }

}