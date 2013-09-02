/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Utilities/Size.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
var Camera = (function () {
    function Camera() {
        // Position is the center of the screen
        this.Position = Vector2.Zero();
        this._gameWrapper = $("#gameWrapper");
    }
    Camera.prototype.Move = function (position) {
        // Update position
        this.Position = position;

        // Update background position based on camera
        this._gameWrapper.css("background-position", -this.Position.X + "px " + -this.Position.Y + "px");
    };

    Camera.prototype.InView = function (obj) {
        var halfObj = new Size(obj.WIDTH * .5, obj.HEIGHT * .5), halfView = this.View.Half(), centralPoint = new Vector2(obj.MovementController.Position.X + halfObj.Width, obj.MovementController.Position.Y + halfObj.Height), myBounds = {
            X: this.Position.X - this.View.Width * .5 - halfObj.Width,
            Y: this.Position.Y - this.View.Height * .5 - halfObj.Height,
            WIDTH: this.View.Width + obj.WIDTH,
            HEIGHT: this.View.Height + obj.HEIGHT
        };

        return (myBounds.X <= centralPoint.X && myBounds.X + myBounds.WIDTH >= centralPoint.X && myBounds.Y <= centralPoint.Y && myBounds.Y + myBounds.HEIGHT >= centralPoint.Y);
    };

    Camera.prototype.Update = function (percentOfSecond) {
    };
    return Camera;
})();
