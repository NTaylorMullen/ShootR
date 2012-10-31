/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="CanvasRenderer.js" />

declare var $, shortcut;

class AreaRenderer {
    private AREA_BOX_COLOR: string = "#304665";
    private AREA_TEXT_COLOR: string = "#3fa9f5";
    private AREA_TEXT_MARGIN: number = 13;
    private KEYBOARD_MAPPING: string = "m";
    private _showMap: bool = true;
    private _areaLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    private _mapSize: number;
    private _areaSize: number;
    private _hudArea = $("#Area");
    private _myShip;

    constructor (myShip, mapSize) {
        this.OnMapResize(mapSize);
        this._myShip = myShip;

        this.ApplyKeyboardMappings();
    }

    private ApplyKeyboardMappings(): void {
        var that = this;
        shortcut.add(this.KEYBOARD_MAPPING, function () {
            that._showMap = !that._showMap;
        });
    }

    private DrawSectorMap(sectorPosition: Vector2, letterIndex: number, sectorNumber: number): void {
        // Determine where in the box we are
        var sectors = this.GetBoxPositions(sectorPosition, letterIndex, sectorNumber);

        for (var i = sectors.length - 1; i >= 0; i--) {
            this.DrawAreaBox(sectors[i]);
        }
    }

    private DrawAreaBox(where: any): void {
        CanvasContext.strokeSquare(where.Position.X, where.Position.Y, this._areaSize, this._areaSize, this.AREA_BOX_COLOR);
        CanvasContext.drawText(where.Sector, where.Position.X + this.AREA_TEXT_MARGIN, where.Position.Y + this.AREA_TEXT_MARGIN, this.AREA_TEXT_COLOR, false, "start", "top"); // Top left
        CanvasContext.drawText(where.Sector, where.Position.X + this.AREA_TEXT_MARGIN, where.Position.Y + this._areaSize - this.AREA_TEXT_MARGIN, this.AREA_TEXT_COLOR, false, "start", "bottom"); // Bot left
        CanvasContext.drawText(where.Sector, where.Position.X + this._areaSize - this.AREA_TEXT_MARGIN, where.Position.Y + this.AREA_TEXT_MARGIN, this.AREA_TEXT_COLOR, false, "end", "top"); // Top right
        CanvasContext.drawText(where.Sector, where.Position.X + this._areaSize - this.AREA_TEXT_MARGIN, where.Position.Y + this._areaSize - this.AREA_TEXT_MARGIN, this.AREA_TEXT_COLOR, false, "end", "bottom"); // Bot right
    }

    private GetBoxPosition(boxIndex): Vector2 {
        return new Vector2(Math.ceil(boxIndex % 3), Math.floor(boxIndex / 3));
    }

    private GetBoxPositions(currentSector: Vector2, letterIndex: number, sectorNumber: number): any[] {
        var sectorPositions = [],
            topLeftSector = Vector2.SubtractVFromN(currentSector, this._areaSize),
            that = this;

        // Will always have the current sector in view
        sectorPositions.push({
            Position: currentSector,
            Sector: that._areaLetters[letterIndex--] + sectorNumber-- // Subtracting one from both to prep the values for the for loop below
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
                var boxRelativePosition = this.GetBoxPosition(i),
                    spos = Vector2.MultiplyN(boxRelativePosition, this._areaSize);// Convert to positions as if it were at 0,0

                spos = Vector2.AddV(spos, topLeftSector); // Add the top left sector to normalize it back to the current sector position

                if (spos.X >= 0 && spos.Y >= 0 && spos.X + this._areaSize <= this._mapSize && spos.Y + this._areaSize <= this._mapSize) { // Ensure we aren't drawing outside the boundary
                    cameraCheckObj.MovementController.Position = spos;
                    if (CanvasContext.Camera.InView(cameraCheckObj)) {
                        sectorPositions.push(
                            {
                                Position: spos,
                                Sector: that._areaLetters[letterIndex + boxRelativePosition.X] + (sectorNumber + boxRelativePosition.Y)
                            });
                    }
                }
            }
        }

        return sectorPositions;
    }

    public OnMapResize(newSize: number): void {
        // Both are square so height is same as width, don't need to do the extra calculations
        this._mapSize = newSize;
        this._areaSize = Math.max(Math.round(this._mapSize / this._areaLetters.length), 1000);
    }

    // Need to take in the camera to determine what we should draw
    public Draw(): void {
        // Draw sector lines
        var letterIndex = Math.max(Math.floor(this._myShip.MovementController.Position.X / this._areaSize), 0),
            letterSector = this._areaLetters[letterIndex],
            sectorNumber = Math.max(Math.ceil(this._myShip.MovementController.Position.Y / this._areaSize), 1),
            sectorPosition = new Vector2(letterIndex * this._areaSize, (sectorNumber - 1) * this._areaSize);

        if (this._showMap) {
            this.DrawSectorMap(sectorPosition, letterIndex, sectorNumber);
        }

        // Fill out the HUD
        this._hudArea.html(letterSector + sectorNumber);
    }

    public Update(): void {
        this.Draw();
    }
}