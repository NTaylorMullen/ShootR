var Collidable = function () {
    var that = this;
    
    that.Visible = true;
    that.PropertiesToCopy = ["MovementController"];
    that.LastUpdated = new Date();
    that.Vehicle;
    that.FollowID;

    that.UpdateProperties = function (properties) {
        for (var key in properties) {
            that[key] = properties[key];
        }
    }

    that.Draw = function () {
        if (that.LifeController.Alive && that.Visible) {
            CanvasContext.drawRotatedImage.apply(that, [that.Vehicle, that.MovementController.Rotation, that.MovementController.Position.X, that.MovementController.Position.Y]);
        }
    }
}