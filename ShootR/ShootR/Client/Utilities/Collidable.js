var Collidable = function () {
    var that = this,
        animationCanvasOffset = {
            X: 0,
            Y: 0
        };
    that.AnimationDrawList = [];
    that.Visible = true;
    that.LastUpdated = new Date();
    that.Vehicle;
    that.FollowID;
    that.AnimationCanvas;
    that.AnimationCanvasContext;

    that.InitializeAnimationCanvas = function() {
        that.AnimationCanvas = document.createElement("canvas");
        that.AnimationCanvasContext = that.AnimationCanvas.getContext("2d");
    }

    that.UpdateProperties = function (properties) {
        for (var key in properties) {
            that[key] = properties[key];
        }
    }

    that.UpdateAnimationCanvasSize = function (size) {
        that.AnimationCanvas.width = size.Width;
        that.AnimationCanvas.height = size.Height;
        animationCanvasOffset.X = (that.WIDTH - size.Width) / 2;
        animationCanvasOffset.Y = (that.HEIGHT - size.Height) / 2;
    }

    that.Draw = function () {
        if (that.LifeController.Alive && that.Visible) {
            if (that.Vehicle) {
                CanvasContext.drawRotatedImage.apply(that, [that.Vehicle, that.MovementController.Rotation, that.MovementController.Position.X, that.MovementController.Position.Y]);
            }

            if (that.AnimationCanvas) {
                // Draw animations onto animation canvas
                for (var i = that.AnimationDrawList.length - 1; i >= 0; i--) {
                    that.AnimationDrawList[i].Draw();
                }

                CanvasContext.drawRotatedImage.apply(that, [that.AnimationCanvas, that.MovementController.Rotation, that.MovementController.Position.X + animationCanvasOffset.X, that.MovementController.Position.Y + animationCanvasOffset.Y]);
            }
        }
    }
}