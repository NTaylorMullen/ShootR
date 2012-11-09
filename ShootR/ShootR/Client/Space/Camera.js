var Camera = (function () {
    function Camera() {
        this._gameWrapper = $("#gameWrapper");
        this.Position = Vector2.Zero();
    }
    Camera.prototype.Move = function (position) {
        this.Position = position;
        this._gameWrapper.css("background-position", -this.Position.X + "px " + -this.Position.Y + "px");
    };
    Camera.prototype.InView = function (obj) {
        var halfObj = new Size(obj.WIDTH * 0.5, obj.HEIGHT * 0.5);
        var halfView = this.View.Half();
        var centralPoint = {
            X: obj.MovementController.Position.X + halfObj.Width,
            Y: obj.MovementController.Position.Y + halfObj.Height
        };
        var myBounds = {
            X: this.Position.X - this.View.Width * 0.5 - halfObj.Width,
            Y: this.Position.Y - this.View.Height * 0.5 - halfObj.Height,
            WIDTH: this.View.Width + obj.WIDTH,
            HEIGHT: this.View.Height + obj.HEIGHT
        };

        return (myBounds.X <= centralPoint.X && myBounds.X + myBounds.WIDTH >= centralPoint.X && myBounds.Y <= centralPoint.Y && myBounds.Y + myBounds.HEIGHT >= centralPoint.Y);
    };
    Camera.prototype.Update = function (percentOfSecond) {
    };
    return Camera;
})();
//@ sourceMappingURL=Camera.js.map
