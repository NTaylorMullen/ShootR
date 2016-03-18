/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../Ships/ShipManager.ts" />
/// <reference path="Area.ts" />

module ShootR {

    export class AreaRenderer {
        public static AREA_BOX_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#304665");
        public static AREA_TEXT_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#3fa9f5");
        public static AREA_TEXT_MARGE: number = 17;
        public static KEYBOARD_MAPPING: string = "m";
        public static AREA_LETTERS: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        private _areas: Array<eg.Graphics.Rectangle>;
        private _active: boolean;
        private _areaSize: eg.Size2d;
        private _mapSize: eg.Size2d;

        constructor(private _scene: eg.Rendering.Scene2d, keyboard: eg.Input.KeyboardHandler) {
            this._active = true;
            this._areas = new Array<eg.Graphics.Rectangle>();

            keyboard.OnCommandPress(AreaRenderer.KEYBOARD_MAPPING, () => {
                this._active = !this._active;

                this.UpdateVisible();
            });

            // IE is the only browser that can handle the performance, therefore this check sees if we're NOT an ie
            if (!(!!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/)))) {
                this.Hide();
            }
        }

        public OnMapResize(newSize: eg.Size2d): void {
            this._mapSize = newSize;
            this._areaSize = new eg.Size2d(Math.max(Math.round(newSize.Width / AreaRenderer.AREA_LETTERS.length), 1000));

            // On every map resize we need to rebuild the sectors so that they fit within the map
            this.BuildSectors();
        }

        public AreaFromPosition(position: eg.Vector2d): string {
            var letter: string = AreaRenderer.AREA_LETTERS[Math.max(Math.floor(position.X / this._areaSize.Width), 0)],
                sectorNumber: number = Math.max(Math.ceil(position.Y / this._areaSize.Height), 1);

            return letter + sectorNumber.toString();
        }

        public Show(): void {
            this._active = true;
            this.UpdateVisible();
        }

        public Hide(): void {
            this._active = false;
            this.UpdateVisible();
        }

        private BuildSectors(): void {
            var gridCount: number = this._mapSize.Width / this._areaSize.Width,
                locationOffset: number = this._areaSize.HalfWidth,
                area: Area;

            if (gridCount % 1 !== 0) {
                throw new Error("Area size does not divide evenly into the map size.");
            }

            // Remove any existing areas so we can build new
            for (var i = 0; i < this._areas.length; i++) {
                this._areas[i].Dispose();
            }

            this._areas = new Array<eg.Graphics.Rectangle>();

            for (var i = 0; i < gridCount; i++) {
                for (var j = 0; j < gridCount; j++) {
                    area = new Area(locationOffset + this._areaSize.Width * j, locationOffset + this._areaSize.Width * i, this._areaSize.Width, AreaRenderer.AREA_LETTERS[j] + (i + 1));
                    area.ZIndex = -1;
                    this._areas.push(area);
                    this._scene.Add(area);
                }
            }

            this.UpdateVisible();
        }

        private UpdateVisible(): void {
            for (var i = 0; i < this._areas.length; i++) {
                this._areas[i].Visible = this._active;
            }
        }
    }

}