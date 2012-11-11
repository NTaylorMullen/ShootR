var AreaRenderer = (function () {
    function AreaRenderer(myShip, mapSize) {
        this._showMap = true;
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
        this.applyKeyboardMappings();
    }
    AreaRenderer.AREA_BOX_COLOR = "#304665";
    AreaRenderer.AREA_TEXT_COLOR = "#3fa9f5";
    AreaRenderer.AREA_TEXT_MARGIN = 13;
    AreaRenderer.KEYBOARD_MAPPING = "m";
    AreaRenderer.prototype.applyKeyboardMappings = function () {
        var that = this;
        shortcut.add(AreaRenderer.KEYBOARD_MAPPING, function () {
            that._showMap = !that._showMap;
        });
    };
    AreaRenderer.prototype.drawSectorMap = function (sectorPosition, letterIndex, sectorNumber) {
        var sectors = this.getBoxPositions(sectorPosition, letterIndex, sectorNumber);
        for(var i = sectors.length - 1; i >= 0; i--) {
            this.drawAreaBox(sectors[i]);
        }
    };
    AreaRenderer.prototype.drawAreaBox = function (where) {
        CanvasContext.strokeSquare(where.Position, this._areaSize, AreaRenderer.AREA_BOX_COLOR);
        CanvasContext.drawText(where.Sector, where.Position.X + AreaRenderer.AREA_TEXT_MARGIN, where.Position.Y + AreaRenderer.AREA_TEXT_MARGIN, AreaRenderer.AREA_TEXT_COLOR, false, "start", "top");
        CanvasContext.drawText(where.Sector, where.Position.X + AreaRenderer.AREA_TEXT_MARGIN, where.Position.Y + this._areaSize.Width - AreaRenderer.AREA_TEXT_MARGIN, AreaRenderer.AREA_TEXT_COLOR, false, "start", "bottom");
        CanvasContext.drawText(where.Sector, where.Position.X + this._areaSize.Width - AreaRenderer.AREA_TEXT_MARGIN, where.Position.Y + AreaRenderer.AREA_TEXT_MARGIN, AreaRenderer.AREA_TEXT_COLOR, false, "end", "top");
        CanvasContext.drawText(where.Sector, where.Position.X + this._areaSize.Width - AreaRenderer.AREA_TEXT_MARGIN, where.Position.Y + this._areaSize.Width - AreaRenderer.AREA_TEXT_MARGIN, AreaRenderer.AREA_TEXT_COLOR, false, "end", "bottom");
    };
    AreaRenderer.prototype.getBoxPosition = function (boxIndex) {
        return new Vector2(Math.ceil(boxIndex % 3), Math.floor(boxIndex / 3));
    };
    AreaRenderer.prototype.getBoxPositions = function (currentSector, letterIndex, sectorNumber) {
        var sectorPositions = [];
        var topLeftSector = Vector2.SubtractVFromN(currentSector, this._areaSize.Width);
        var that = this;

        sectorPositions.push({
            Position: currentSector,
            Sector: that._areaLetters[letterIndex--] + sectorNumber--
        });
        var cameraCheckObj = {
            MovementController: {
                Position: topLeftSector
            },
            WIDTH: this._areaSize.Width,
            HEIGHT: this._areaSize.Height
        };
        for(var i = 0; i < 9; i++) {
            if(i !== 4) {
                var boxRelativePosition = this.getBoxPosition(i);
                var spos = Vector2.MultiplyN(boxRelativePosition, this._areaSize.Width);

                spos = Vector2.AddV(spos, topLeftSector);
                if(spos.X >= 0 && spos.Y >= 0 && spos.X + this._areaSize.Width <= this._mapSize && spos.Y + this._areaSize.Width <= this._mapSize) {
                    cameraCheckObj.MovementController.Position = spos;
                    if(CanvasContext.Camera.InView(cameraCheckObj)) {
                        sectorPositions.push({
                            Position: spos,
                            Sector: that._areaLetters[letterIndex + boxRelativePosition.X] + (sectorNumber + boxRelativePosition.Y)
                        });
                    }
                }
            }
        }
        return sectorPositions;
    };
    AreaRenderer.prototype.OnMapResize = function (newSize) {
        this._mapSize = newSize;
        var temp = Math.max(Math.round(this._mapSize / this._areaLetters.length), 1000);
        this._areaSize = new Size(temp);
    };
    AreaRenderer.prototype.Draw = function () {
        var letterIndex = Math.max(Math.floor(this._myShip.MovementController.Position.X / this._areaSize.Width), 0);
        var letterSector = this._areaLetters[letterIndex];
        var sectorNumber = Math.max(Math.ceil(this._myShip.MovementController.Position.Y / this._areaSize.Height), 1);
        var sectorPosition = new Vector2(letterIndex * this._areaSize.Width, (sectorNumber - 1) * this._areaSize.Width);

        if(this._showMap) {
            this.drawSectorMap(sectorPosition, letterIndex, sectorNumber);
        }
        this._hudArea.html(letterSector + sectorNumber);
    };
    AreaRenderer.prototype.Update = function () {
        this.Draw();
    };
    return AreaRenderer;
})();
//@ sourceMappingURL=AreaRenderer.js.map
