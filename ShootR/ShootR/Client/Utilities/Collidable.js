var Collidable = function () {
    var that = this;
    that.AnimationDrawList = [];
    that.Visible = true;
    that.LastUpdated = new Date();
    that.Vehicle;
    that.FollowID;
    that.DrawOffset = {
        X: 0,
        Y: 0
    }

    that.UpdateProperties = function (properties) {
        for (var key in properties) {
            that[key] = properties[key];
        }
    }

    that.Draw = function () {
        if (that.LifeController.Alive && that.Visible) {
            CanvasContext.drawRotatedImage.apply(that, [that.Vehicle, that.MovementController.Rotation, that.MovementController.Position.X + that.DrawOffset.X, that.MovementController.Position.Y + that.DrawOffset.Y]);

            for (var i = that.AnimationDrawList.length - 1; i >= 0; i--) {
                that.AnimationDrawList[i].Draw();
            }
        }
    }
}