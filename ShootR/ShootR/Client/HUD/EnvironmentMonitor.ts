/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Space/Map.ts" />
/// <reference path="../Space/AreaRenderer.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../User/UserShipManager.ts" />

module ShootR {

    export class EnvironmentMonitor {
        private _latency: JQuery = $("#Latency");
        private _worldTargets: JQuery = $("#WorldTargets");
        private _worldBullets: JQuery = $("#WorldBullets");
        private _area: JQuery = $("#Area");

        constructor(private _areaRenderer: AreaRenderer, private _userShipManager: UserShipManager) { }

        public LoadPayload(payload: Server.IPayloadData): void {
            this._latency[0].innerHTML = this._userShipManager.LatencyResolver.Latency;
            this._worldBullets[0].innerHTML = payload.BulletsInWorld.toString();
            this._worldTargets[0].innerHTML = payload.ShipsInWorld.toString();
        }

        public Update(ship: Ship): void {
            this._area[0].innerHTML = this._areaRenderer.AreaFromPosition(ship.MovementController.Position).toString();
        }
    }

}