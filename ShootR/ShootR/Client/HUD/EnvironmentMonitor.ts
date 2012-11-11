/// <reference path="../Ship/ShipController.ts" />
/// <reference path="../Space/Map.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />

class EnvironmentMonitor {
    private _latency: JQuery = $("#Latency");
    private _worldTargets: JQuery = $("#WorldTargets");
    private _worldBullets: JQuery = $("#WorldBullets");
    private _area: JQuery = $("#Area");
    private _areaLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    constructor (private _myShip: ShipController) {
    }

    public Update(payload: any): void {
        var mapSize: number = Map.WIDTH, // It's square so height is same
        areaSize: number = Math.max(Math.round(mapSize / 26), 1000);

        this._latency.html(this._myShip.LatencyResolver.Latency);
        this._worldBullets.html(payload.BulletsInWorld);
        this._worldTargets.html(payload.ShipsInWorld);
    }
}