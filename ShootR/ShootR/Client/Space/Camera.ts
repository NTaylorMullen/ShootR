/// <reference path="../Collidable/Collidable.ts" />
/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Utilities/Size.ts" />

declare var $;

class Camera {
    private _gameWrapper: any = $("#gameWrapper");

    // Position is the center of the screen 
    public Position: Vector2 = Vector2.Zero();

    // View is the area in which the server calculates how to send data down to the client
    // Is set by the prototype
    public View: Size;

    public Following: number;

    constructor () {
    }

    public Move(position: Vector2): void {
        // Update position
        this.Position = position;
        // Update background position based on camera
        this._gameWrapper.css("background-position", -this.Position.X + "px " + -this.Position.Y + "px");
    };

    public Follow(obj: Collidable): void {
        this.Following = obj.ID;
    }

    public InView(obj: any) {
        var halfObj = new Size(obj.WIDTH * .5, obj.HEIGHT * .5),
            halfView = this.View.Half(),
            centralPoint = { X: obj.MovementController.Position.X + halfObj.Width, Y: obj.MovementController.Position.Y + halfObj.Height },
            myBounds = {
                X: this.Position.X - this.View.Width * .5 - halfObj.Width, Y: this.Position.Y - this.View.Height * .5 - halfObj.Height,
                WIDTH: this.View.Width + obj.WIDTH, HEIGHT: this.View.Height + obj.HEIGHT
            };

        return (myBounds.X <= centralPoint.X && myBounds.X + myBounds.WIDTH >= centralPoint.X
                && myBounds.Y <= centralPoint.Y && myBounds.Y + myBounds.HEIGHT >= centralPoint.Y);
    }

    public Update(percentOfSecond: number): void {
    }
}