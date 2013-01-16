var Camera = (function () {
    function Camera() {
        this.Position = Vector2.Zero();
        this._gameWrapper = $("#gameWrapper");
    }
    Camera.prototype.Move = function (position) {
        this.Position = position;
        this._gameWrapper.css("background-position", -this.Position.X + "px " + -this.Position.Y + "px");
    };
    Camera.prototype.InView = function (obj) {
        var halfObj = new Size(obj.WIDTH * 0.5, obj.HEIGHT * 0.5), halfView = this.View.Half(), centralPoint = new Vector2(obj.MovementController.Position.X + halfObj.Width, obj.MovementController.Position.Y + halfObj.Height), myBounds = {
X: this.Position.X - this.View.Width * 0.5 - halfObj.Width,
Y: this.Position.Y - this.View.Height * 0.5 - halfObj.Height,
WIDTH: this.View.Width + obj.WIDTH,
HEIGHT: this.View.Height + obj.HEIGHT        };
        return (myBounds.X <= centralPoint.X && myBounds.X + myBounds.WIDTH >= centralPoint.X && myBounds.Y <= centralPoint.Y && myBounds.Y + myBounds.HEIGHT >= centralPoint.Y);
    };
    Camera.prototype.Update = function (percentOfSecond) {
    };
    return Camera;
})();
//@ sourceMappingURL=Camera.js.map
