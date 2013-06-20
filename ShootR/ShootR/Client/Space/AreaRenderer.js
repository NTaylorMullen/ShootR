var AreaRenderer = (function () {
    function AreaRenderer(myShip, mapSize) {
        this.AREA_BOX_COLOR = "#304665";
        this.AREA_TEXT_COLOR = "#3fa9f5";
        this.AREA_TEXT_MARGIN = 13;
        this.KEYBOARD_MAPPING = "m";
        this._showMap = true;
        this._areaLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        this._hudArea = $("#Area");
        this.OnMapResize(mapSize);
        this._myShip = myShip;

        this.ApplyKeyboardMappings();
    }
    AreaRenderer.prototype.ApplyKeyboardMappings = function () {
        var that = this;
        shortcut.add(this.KEYBOARD_MAPPING, function () {
            that._showMap = !that._showMap;
        });
    };

    AreaRenderer.prototype.DrawSectorMap = function (sectorPosition, letterIndex, sectorNumber) {
        var sectors = this.GetBoxPositions(sectorPosition, letterIndex, sectorNumber);

        for (var i = sectors.length - 1; i >= 0; i--) {
            this.DrawAreaBox(sectors[i]);
        }
    };

    AreaRenderer.prototype.DrawAreaBox = function (where) {
        CanvasContext.strokeSquare(where.Position.X, where.Position.Y, this._areaSize, this._areaSize, this.AREA_BOX_COLOR);
        CanvasContext.drawText(where.Sector, where.Position.X + this.AREA_TEXT_MARGIN, where.Position.Y + this.AREA_TEXT_MARGIN, this.AREA_TEXT_COLOR, false, "start", "top");
        CanvasContext.drawText(where.Sector, where.Position.X + this.AREA_TEXT_MARGIN, where.Position.Y + this._areaSize - this.AREA_TEXT_MARGIN, this.AREA_TEXT_COLOR, false, "start", "bottom");
        CanvasContext.drawText(where.Sector, where.Position.X + this._areaSize - this.AREA_TEXT_MARGIN, where.Position.Y + this.AREA_TEXT_MARGIN, this.AREA_TEXT_COLOR, false, "end", "top");
        CanvasContext.drawText(where.Sector, where.Position.X + this._areaSize - this.AREA_TEXT_MARGIN, where.Position.Y + this._areaSize - this.AREA_TEXT_MARGIN, this.AREA_TEXT_COLOR, false, "end", "bottom");
    };

    AreaRenderer.prototype.GetBoxPosition = function (boxIndex) {
        return new Vector2(Math.ceil(boxIndex % 3), Math.floor(boxIndex / 3));
    };

    AreaRenderer.prototype.GetBoxPositions = function (currentSector, letterIndex, sectorNumber) {
        var sectorPositions = [], topLeftSector = Vector2.SubtractVFromN(currentSector, this._areaSize), that = this;

        sectorPositions.push({
            Position: currentSector,
            Sector: that._areaLetters[letterIndex--] + sectorNumber--
        });

        var cameraCheckObj = {
            MovementController: {
                Position: topLeftSector
            },
            WIDTH: this._areaSize,
            HEIGHT: this._areaSize
        };

        for (var i = 0; i < 9; i++) {
            if (i !== 4) {
                var boxRelativePosition = this.GetBoxPosition(i), spos = Vector2.MultiplyN(boxRelativePosition, this._areaSize);

                spos = Vector2.AddV(spos, topLeftSector);

                if (spos.X >= 0 && spos.Y >= 0 && spos.X + this._areaSize <= this._mapSize && spos.Y + this._areaSize <= this._mapSize) {
                    cameraCheckObj.MovementController.Position = spos;
                    if (CanvasContext.Camera.InView(cameraCheckObj)) {
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
        this._areaSize = Math.max(Math.round(this._mapSize / this._areaLetters.length), 1000);
    };

    AreaRenderer.prototype.Draw = function () {
        var letterIndex = Math.max(Math.floor(this._myShip.MovementController.Position.X / this._areaSize), 0), letterSector = this._areaLetters[letterIndex], sectorNumber = Math.max(Math.ceil(this._myShip.MovementController.Position.Y / this._areaSize), 1), sectorPosition = new Vector2(letterIndex * this._areaSize, (sectorNumber - 1) * this._areaSize);

        if (this._showMap) {
            this.DrawSectorMap(sectorPosition, letterIndex, sectorNumber);
        }

        this._hudArea.html(letterSector + sectorNumber);
    };

    AreaRenderer.prototype.Update = function () {
        this.Draw();
    };
    return AreaRenderer;
})();
//@ sourceMappingURL=AreaRenderer.js.map
