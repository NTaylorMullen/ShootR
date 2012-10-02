var Collidable = function () {
    var that = this;

    that.Destroyed = false;
    that.Visible = true;
    that.PropertiesToCopy = ["MovementController"];
    that.LastUpdated = new Date();
    that.Vehicle;
    that.FollowID;

    function RotateVehicle(rotation) {
        $(that.Vehicle).css("-webkit-transform", "rotate(" + rotation + "deg)");
        $(that.Vehicle).css("-moz-transform", "rotate(" + rotation + "deg)");
        $(that.Vehicle).css("-ms-transform", "rotate(" + rotation + "deg)");
        $(that.Vehicle).css("transform", "rotate(" + rotation + "deg)");
    }

    that.UpdateProperties = function (properties) {
        for (var key in properties) {
            that[key] = properties[key];
        }
    }

    that.Draw = function () {
        if (!that.Destroyed && that.Visible) {
            CanvasContext.drawRotatedImage.apply(that, [that.Vehicle, that.MovementController.Rotation, that.MovementController.Position.X, that.MovementController.Position.Y]);
        }
    }
}