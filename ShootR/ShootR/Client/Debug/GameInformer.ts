/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />

module ShootR.Debug {

    export class GameInformer {
        public static ITEM_OFFSET: number = 3;
        public static PADDING: number = 15;
        public static MAX_TEXT_SIZE: eg.Size2d = new eg.Size2d(250, 20);
        public static TITLE_TEXT_COLOR: eg.Graphics.Color = eg.Graphics.Color.White;
        public static HOLDER_BACGROUND_COLOR: eg.Graphics.Color = eg.Graphics.Color.Gray;
        public static TITLE_TEXT_SIZE: number = 13;
        public static VALUE_TEXT_SIZE: number = 12;
        public static TEXT_FONT: eg.Graphics.Assets.FontFamily = eg.Graphics.Assets.FontFamily.Verdana;

        private _yOffset: number;
        private _holder: eg.Graphics.Rectangle;

        constructor(private _scene: eg.Rendering.Scene2d) {
            this._yOffset = GameInformer.PADDING;
            this._holder = new eg.Graphics.Rectangle(0, 0, 0, 0, GameInformer.HOLDER_BACGROUND_COLOR);
            this._holder.Opacity = .3;
            this._holder.Border(2, eg.Graphics.Color.White);

            this.RepositionHolder();

            this._scene.Add(this._holder);
        }

        public AddTextualInformation(title: string): eg.Graphics.Text2d {
            var textBounds = new eg.Bounds.BoundingRectangle(eg.Vector2d.Zero, GameInformer.MAX_TEXT_SIZE),
                titleGraphic: eg.Graphics.Text2d = new eg.Graphics.Text2d(GameInformer.PADDING, this._yOffset + textBounds.Size.HalfHeight, title + ": ", GameInformer.TITLE_TEXT_COLOR),
                valueGraphic: eg.Graphics.Text2d,
                currentHolderSize: eg.Size2d = this._holder.Size.Clone(),
                sizeDifference: eg.Size2d,
                currentChildren = this._holder.GetChildren();

            titleGraphic.FontSettings.FontWeight = "bold";
            titleGraphic.Align = "left";
            titleGraphic.FontSettings.FontSize = GameInformer.TITLE_TEXT_SIZE + "px";
            titleGraphic.FontSettings.FontFamily = GameInformer.TEXT_FONT;

            this.ResizeHolder(textBounds);

            sizeDifference = this._holder.Size.Subtract(currentHolderSize).Multiply(.5);

            for (var i = 0; i < currentChildren.length; i++) {
                currentChildren[i].Position = currentChildren[i].Position.Subtract(sizeDifference);
            }

            titleGraphic.Position = titleGraphic.Position.Subtract(this._holder.Size.Multiply(.5));

            valueGraphic = new eg.Graphics.Text2d(titleGraphic.Position.X + GameInformer.MAX_TEXT_SIZE.Width * 2 / 3 - GameInformer.PADDING, titleGraphic.Position.Y, "");
            valueGraphic.Align = "left";
            valueGraphic.FontSettings.FontSize = GameInformer.VALUE_TEXT_SIZE + "px";
            valueGraphic.FontSettings.FontFamily = GameInformer.TEXT_FONT;

            this._holder.AddChild(titleGraphic);
            this._holder.AddChild(valueGraphic);

            return valueGraphic;
        }

        public AddInformation(graphic: eg.Graphics.Graphic2d): void {
            var bounds = <eg.Bounds.BoundingRectangle>graphic.GetDrawBounds();

            graphic.Position.Y = this._yOffset + bounds.Size.HalfHeight;
            graphic.Position.X = GameInformer.PADDING + bounds.Size.HalfWidth;

            this.ResizeHolder(bounds);

            graphic.Position = graphic.Position.Subtract(this._holder.Size.Multiply(.5));

            this._holder.AddChild(graphic);
        }

        public Update(gameTime: eg.GameTime): void {
            this.RepositionHolder();
        }

        private RepositionHolder(): void {
            var cameraTR = this._scene.Camera.TopRight;

            this._holder.Position.X = cameraTR.X - this._holder.Size.HalfWidth;
            this._holder.Position.Y = cameraTR.Y + this._holder.Size.HalfHeight;
        }

        private ResizeHolder(target: eg.Bounds.BoundingRectangle): void {
            var targetFullWidth: number = target.Size.Width + GameInformer.PADDING * 2;

            this._holder.Size.Width = targetFullWidth;

            this._yOffset += target.Size.Height + GameInformer.ITEM_OFFSET;

            this._holder.Size.Height = this._yOffset + GameInformer.PADDING - GameInformer.ITEM_OFFSET;
        }
    }

}