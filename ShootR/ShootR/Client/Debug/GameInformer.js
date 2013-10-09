var ShootR;
(function (ShootR) {
    /// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
    (function (Debug) {
        var GameInformer = (function () {
            function GameInformer(_scene) {
                this._scene = _scene;
                this._yOffset = GameInformer.PADDING;
                this._holder = new eg.Graphics.Rectangle(0, 0, 0, 0, GameInformer.HOLDER_BACGROUND_COLOR);
                this._holder.Opacity = .3;
                this._holder.Border(2, eg.Graphics.Color.White);

                this.RepositionHolder();

                this._scene.Add(this._holder);
            }
            GameInformer.prototype.AddTextualInformation = function (title) {
                var textBounds = new eg.Bounds.BoundingRectangle(eg.Vector2d.Zero, GameInformer.MAX_TEXT_SIZE), titleGraphic = new eg.Graphics.Text2d(GameInformer.PADDING, this._yOffset + textBounds.Size.HalfHeight, title + ": ", GameInformer.TITLE_TEXT_COLOR), valueGraphic, currentHolderSize = this._holder.Size.Clone(), sizeDifference, currentChildren = this._holder.GetChildren();

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
            };

            GameInformer.prototype.AddInformation = function (graphic) {
                var bounds = graphic.GetDrawBounds();

                graphic.Position.Y = this._yOffset + bounds.Size.HalfHeight;
                graphic.Position.X = GameInformer.PADDING + bounds.Size.HalfWidth;

                this.ResizeHolder(bounds);

                graphic.Position = graphic.Position.Subtract(this._holder.Size.Multiply(.5));

                this._holder.AddChild(graphic);
            };

            GameInformer.prototype.Update = function (gameTime) {
                this.RepositionHolder();
            };

            GameInformer.prototype.RepositionHolder = function () {
                var cameraTR = this._scene.Camera.TopRight;

                this._holder.Position.X = cameraTR.X - this._holder.Size.HalfWidth;
                this._holder.Position.Y = cameraTR.Y + this._holder.Size.HalfHeight;
            };

            GameInformer.prototype.ResizeHolder = function (target) {
                var targetFullWidth = target.Size.Width + GameInformer.PADDING * 2;

                this._holder.Size.Width = targetFullWidth;

                this._yOffset += target.Size.Height + GameInformer.ITEM_OFFSET;

                this._holder.Size.Height = this._yOffset + GameInformer.PADDING - GameInformer.ITEM_OFFSET;
            };
            GameInformer.ITEM_OFFSET = 3;
            GameInformer.PADDING = 15;
            GameInformer.MAX_TEXT_SIZE = new eg.Size2d(250, 20);
            GameInformer.TITLE_TEXT_COLOR = eg.Graphics.Color.White;
            GameInformer.HOLDER_BACGROUND_COLOR = eg.Graphics.Color.Gray;
            GameInformer.TITLE_TEXT_SIZE = 13;
            GameInformer.VALUE_TEXT_SIZE = 12;
            GameInformer.TEXT_FONT = eg.Graphics.Assets.FontFamily.Verdana;
            return GameInformer;
        })();
        Debug.GameInformer = GameInformer;
    })(ShootR.Debug || (ShootR.Debug = {}));
    var Debug = ShootR.Debug;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=GameInformer.js.map
