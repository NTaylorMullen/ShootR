declare var $;

class AreaRenderer {
    private _areaLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    private _mapSize;
    private _areaSize;
    private _hudArea = $("#Area");
    private _myShip;

    constructor (myShip, mapSize) {
        this.OnMapResize(mapSize);
        this._myShip = myShip;
    }

    public OnMapResize(newSize) {
        // Both are square so height is same as width, don't need to do the extra calculations
        this._mapSize = newSize.Width;
        this._areaSize = Math.max(Math.round( this._mapSize / this._areaLetters.length), 1000);
    }

    // Need to take in the camera to determine what we should draw
    public Draw(camera) {
        // Draw sector liness

        // Fill out the HUD
        var letterSector = this._areaLetters[Math.max(Math.floor(this._myShip.MovementController.Position.X / this._areaSize), 0)],
            sectorNumber = Math.max(Math.ceil(this._myShip.MovementController.Position.Y / this._areaSize), 1);

        this._hudArea.html(letterSector  + sectorNumber);
    }
}