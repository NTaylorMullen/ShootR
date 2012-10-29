var AreaRenderer = (function () {
    function AreaRenderer(myShip, mapSize) {
        this._areaLetters = [
            'A', 
            'B', 
            'C', 
            'D', 
            'E', 
            'F', 
            'G', 
            'H', 
            'I', 
            'J', 
            'K', 
            'L', 
            'M', 
            'N', 
            'O', 
            'P', 
            'Q', 
            'R', 
            'S', 
            'T', 
            'U', 
            'V', 
            'W', 
            'X', 
            'Y', 
            'Z'
        ];
        this._hudArea = $("#Area");
        this.OnMapResize(mapSize);
        this._myShip = myShip;
    }
    AreaRenderer.prototype.OnMapResize = function (newSize) {
        this._mapSize = newSize.Width;
        this._areaSize = Math.max(Math.round(this._mapSize / this._areaLetters.length), 1000);
    };
    AreaRenderer.prototype.Draw = function (camera) {
        var letterSector = this._areaLetters[Math.max(Math.floor(this._myShip.MovementController.Position.X / this._areaSize), 0)];
        var sectorNumber = Math.max(Math.ceil(this._myShip.MovementController.Position.Y / this._areaSize), 1);

        this._hudArea.html(letterSector + sectorNumber);
    };
    return AreaRenderer;
})();
//@ sourceMappingURL=AreaRenderer.js.map
