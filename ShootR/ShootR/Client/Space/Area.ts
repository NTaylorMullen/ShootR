/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />

module ShootR {

    export class Area extends eg.Graphics.Rectangle {
        public static BOX_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#304665");
        public static TEXT_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#3fa9f5");
        public static TEXT_MARGIN: number = 20;

        constructor(x: number, y: number, size: number, private _area: string) {
            super(x, y, size, size, eg.Graphics.Color.Transparent);

            this.Border(2, Area.BOX_COLOR);

            this.BuildTextCorners();
        }

        private BuildTextCorners(): void {
            var locationOffset: number = this.Size.HalfWidth - Area.TEXT_MARGIN,
                text: eg.Graphics.Text2d;

            text = new eg.Graphics.Text2d(-locationOffset, -locationOffset, this._area, Area.TEXT_COLOR);
            text.Align = "left";
            text.FontSettings.FontSize = "18px";
            text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Calibri;
            this.AddChild(text);

            text = text.Clone();
            text.Position = new eg.Vector2d(-locationOffset, +locationOffset);
            this.AddChild(text);

            text = text.Clone();
            text.Align = "right";
            text.Position = new eg.Vector2d(locationOffset, -locationOffset);
            this.AddChild(text);

            text = text.Clone();
            text.Position = new eg.Vector2d(locationOffset, locationOffset);
            this.AddChild(text);
        }
    }

}