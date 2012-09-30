function Camera() {
    var that = this;

    // Position is the center of the screen 
    that.Position = {
        X: 0,
        Y: 0
    };

    that.Size = {
        Width: that.Width,
        Height: that.Height
    };

    // View is the area in which the server calculates how to send data down to the client
    // Is set by the prototype
    that.View;

    that.Move = function (Position) {
        // Update position
        that.Position = Position;
        // Update background position based on camera
        $("#gameWrapper").css("background-position", -Position.X + "px " + -Position.Y + "px");
    };

    that.Follow = function (obj) {
        that.Following = obj.GUID;
    }

    that.InView = function (obj) {
        var halfObj = { WIDTH: obj.WIDTH / 2, HEIGHT: obj.HEIGHT / 2},
            centralPoint = { X: obj.MovementController.Position.X + halfObj.WIDTH, Y: obj.MovementController.Position.Y + halfObj.HEIGHT },
            myBounds = {
                X: that.Position.X - that.View.WIDTH / 2 - halfObj.WIDTH, Y: that.Position.Y - that.View.HEIGHT / 2 - halfObj.HEIGHT,
                WIDTH: that.View.WIDTH + obj.WIDTH, HEIGHT: that.View.HEIGHT + obj.HEIGHT
            };

        return (myBounds.X <= centralPoint.X && myBounds.X + myBounds.WIDTH >= centralPoint.X
                && myBounds.Y <= centralPoint.Y && myBounds.Y + myBounds.HEIGHT >= centralPoint.Y);
    }
}