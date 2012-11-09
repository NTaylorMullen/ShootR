/// <reference path="../Ship/ShipController.ts" />

declare var $;

class EnvironmentMonitor {
    private _latency: any = $("#Latency");
    private _worldTargets: any = $("#WorldTargets");
    private _worldBullets: any = $("#WorldBullets");
    private _area: any = $("#Area");
    private _areaLetters: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    constructor (private _myShip: ShipController) {
    }

    public Update(payload: any): void {
        var mapSize = Map.WIDTH, // It's square so height is same
            areaSize = Math.max(Math.round( mapSize / 26), 1000);

        this._latency.html(this._myShip.LatencyResolver.Latency);
        this._worldBullets.html(payload.BulletsInWorld);
        this._worldTargets.html(payload.ShipsInWorld);        
    }
}