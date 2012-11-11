/// <reference path="UtilityFunctions.ts" />

class GameTime {
    private _lastUpdated: Date;
    public PercentOfSecond: number;
    public Now: Date;

    constructor () {
        this._lastUpdated = new Date();
        this.PercentOfSecond = 0;
        this.Now = new Date();
    }

    public Update(): void {
        this.PercentOfSecond = CalculatePOS(this._lastUpdated);

        this.Now = new Date();
        this._lastUpdated = this.Now;
    }
}