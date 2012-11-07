var Collidable = (function () {
    function Collidable() {
        this._animationCanvasOffset = Vector2.Zero();
        this.LifeController = {
        };
        this.AnimationDrawList = [];
        this.Visible = true;
        this.LastUpdated = new Date();
        this.Controllable = new ValueRef(true);
        this.Collided = false;
        this.Disposed = false;
    }
    Collidable.prototype.InitializeAnimationCanvas = function () {
        this.AnimationCanvas = document.createElement("canvas");
        this.AnimationCanvasContext = this.AnimationCanvas.getContext("2d");
    };
    Collidable.prototype.UpdateProperties = function (properties) {
        for(var key in properties) {
            this[key] = properties[key];
        }
    };
    Collidable.prototype.UpdateAnimationCanvasSize = function (size) {
        this.AnimationCanvas.width = size.Width;
        this.AnimationCanvas.height = size.Height;
        this._animationCanvasOffset.X = (this.WIDTH - size.Width) / 2;
        this._animationCanvasOffset.Y = (this.HEIGHT - size.Height) / 2;
    };
    Collidable.prototype.Draw = function () {
        if(this.LifeController.Alive && this.Visible) {
            if(this.Vehicle) {
                CanvasContext.drawRotatedImage(this.Vehicle, this.MovementController.Rotation, this.MovementController.Position.X, this.MovementController.Position.Y);
            }
            if(this.AnimationCanvas) {
                for(var i = this.AnimationDrawList.length - 1; i >= 0; i--) {
                    this.AnimationDrawList[i].Draw();
                }
                CanvasContext.drawRotatedImage(this.AnimationCanvas, this.MovementController.Rotation, this.MovementController.Position.X + this._animationCanvasOffset.X, this.MovementController.Position.Y + this._animationCanvasOffset.Y);
            }
        }
    };
    return Collidable;
})();
//@ sourceMappingURL=Collidable.js.map
