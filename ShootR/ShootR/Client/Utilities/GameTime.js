/// <reference path="UtilityFunctions.ts" />
var GameTime = (function () {
    function GameTime() {
        this._lastUpdated = new Date();
        this.PercentOfSecond = 0;
        this.Now = new Date();
    }
    GameTime.prototype.Update = function () {
        this.PercentOfSecond = CalculatePOS(this._lastUpdated);

        this.Now = new Date();
        this._lastUpdated = this.Now;
    };
    return GameTime;
})();
//# sourceMappingURL=GameTime.js.map
