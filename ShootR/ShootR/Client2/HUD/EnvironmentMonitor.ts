/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
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
            this._latency.text(this._userShipManager.LatencyResolver.Latency);
            this._worldBullets.text(payload.BulletsInWorld.toString());
            this._worldTargets.text(payload.ShipsInWorld.toString());            
        }

        public Update(ship: Ship): void {
            this._area.text(this._areaRenderer.AreaFromPosition(ship.MovementController.Position).toString());
        }
    }

}