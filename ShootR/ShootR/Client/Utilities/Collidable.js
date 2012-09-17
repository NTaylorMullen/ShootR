var Collidable = function() {
    var that = this;

    that.Destroyed = false;

    that.PropertiesToCopy = ["MovementController"];

    that.Vehicle;
    that.FollowID;

    function RotateVehicle(rotation) {
        $(that.Vehicle).css("-webkit-transform", "rotate(" + rotation + "deg)");
        $(that.Vehicle).css("-moz-transform", "rotate(" + rotation + "deg)");
        $(that.Vehicle).css("-ms-transform", "rotate(" + rotation + "deg)");
        $(that.Vehicle).css("transform", "rotate(" + rotation + "deg)");
    }

    that.UpdateProperties = function (properties) {
        for (var i = 0; i < that.PropertiesToCopy.length; i++) {
            that[that.PropertiesToCopy[i]] = properties[that.PropertiesToCopy[i]];
        }
    }

    that.Draw = function () {
        if (!that.Destroyed) {
            CanvasContext.drawRotatedImage.apply(that, [that.Vehicle, that.MovementController.Rotation, that.MovementController.Position.X, that.MovementController.Position.Y]);
        }
    }    
}