/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Utilities/Size.ts" />
/// <reference path="CanvasRenderer.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Ship/ShipController.ts" />

class AreaRenderer {
    static AREA_BOX_COLOR: string = "#304665";
    static AREA_TEXT_COLOR: string = "#3fa9f5";
    static AREA_TEXT_MARGIN: number = 13;
    static KEYBOARD_MAPPING: string = "m";

    private _showMap: bool = true;
    private _areaLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    private _mapSize: number;
    private _areaSize: Size;
    private _hudArea: JQuery = $("#Area");
    private _myShip: ShipController;

    constructor (myShip: ShipController, mapSize: number) {
        this.OnMapResize(mapSize);
        this._myShip = myShip;

        this.applyKeyboardMappings();
    }

    private applyKeyboardMappings(): void {
        var that: AreaRenderer = this;
        shortcut.add(AreaRenderer.KEYBOARD_MAPPING, function () {
            that._showMap = !that._showMap;
        });
    }

    private drawSectorMap(sectorPosition: Vector2, letterIndex: number, sectorNumber: number): void {
        // Determine where in the box we are
        var sectors: ISectorPosition[] = this.getBoxPositions(sectorPosition, letterIndex, sectorNumber);

        for (var i = sectors.length - 1; i >= 0; i--) {
            this.drawAreaBox(sectors[i]);
        }
    }

    private drawAreaBox(where: ISectorPosition): void {
        CanvasContext.strokeSquare(where.Position, this._areaSize, AreaRenderer.AREA_BOX_COLOR);
        CanvasContext.drawText(where.Sector, where.Position.X + AreaRenderer.AREA_TEXT_MARGIN, where.Position.Y + AreaRenderer.AREA_TEXT_MARGIN, AreaRenderer.AREA_TEXT_COLOR, false, "start", "top"); // Top left
        CanvasContext.drawText(where.Sector, where.Position.X + AreaRenderer.AREA_TEXT_MARGIN, where.Position.Y + this._areaSize.Width - AreaRenderer.AREA_TEXT_MARGIN, AreaRenderer.AREA_TEXT_COLOR, false, "start", "bottom"); // Bot left
        CanvasContext.drawText(where.Sector, where.Position.X + this._areaSize.Width - AreaRenderer.AREA_TEXT_MARGIN, where.Position.Y + AreaRenderer.AREA_TEXT_MARGIN, AreaRenderer.AREA_TEXT_COLOR, false, "end", "top"); // Top right
        CanvasContext.drawText(where.Sector, where.Position.X + this._areaSize.Width - AreaRenderer.AREA_TEXT_MARGIN, where.Position.Y + this._areaSize.Width - AreaRenderer.AREA_TEXT_MARGIN, AreaRenderer.AREA_TEXT_COLOR, false, "end", "bottom"); // Bot right
    }

    private getBoxPosition(boxIndex: number): Vector2 {
        return new Vector2(Math.ceil(boxIndex % 3), Math.floor(boxIndex / 3));
    }

    private getBoxPositions(currentSector: Vector2, letterIndex: number, sectorNumber: number): ISectorPosition[] {
        var sectorPositions: ISectorPosition[] = [],
        topLeftSector: Vector2 = Vector2.SubtractVFromN(currentSector, this._areaSize.Width),
        that: AreaRenderer = this;

        // Will always have the current sector in view
        sectorPositions.push({
            Position: currentSector,
            Sector: that._areaLetters[letterIndex--] + sectorNumber-- // Subtracting one from both to prep the values for the for loop below
        });

        var cameraCheckObj = {
            MovementController: {
                Position: topLeftSector
            },
            WIDTH: this._areaSize.Width,
            HEIGHT: this._areaSize.Height
        };

        for (var i = 0; i < 9; i++) {
            if (i !== 4) {
                var boxRelativePosition: Vector2 = this.getBoxPosition(i),
                spos: Vector2 = Vector2.MultiplyN(boxRelativePosition, this._areaSize.Width);// Convert to positions as if it were at 0,0

                spos = Vector2.AddV(spos, topLeftSector); // Add the top left sector to normalize it back to the current sector position

                if (spos.X >= 0 && spos.Y >= 0 && spos.X + this._areaSize.Width <= this._mapSize && spos.Y + this._areaSize.Width <= this._mapSize) { // Ensure we aren't drawing outside the boundary
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
        var temp: number = Math.max(Math.round(this._mapSize / this._areaLetters.length), 1000)
        this._areaSize = new Size(temp);
    }

    // Need to take in the camera to determine what we should draw
    public Draw(): void {
        // Draw sector lines
        var letterIndex: number = Math.max(Math.floor(this._myShip.MovementController.Position.X / this._areaSize.Width), 0),
        letterSector: string = this._areaLetters[letterIndex],
        sectorNumber: number = Math.max(Math.ceil(this._myShip.MovementController.Position.Y / this._areaSize.Height), 1),
        sectorPosition: Vector2 = new Vector2(letterIndex * this._areaSize.Width, (sectorNumber - 1) * this._areaSize.Width);

        if (this._showMap) {
            this.drawSectorMap(sectorPosition, letterIndex, sectorNumber);
        }

        // Fill out the HUD
        this._hudArea.html(letterSector + sectorNumber);
    }

    public Update(): void {
        this.Draw();
    }
}

interface ISectorPosition {
    Position: Vector2;
    Sector: string;
}