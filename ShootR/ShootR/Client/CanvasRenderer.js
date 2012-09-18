function CanvasRenderer(target) {
    var that = this;
    var drawContext = target[0].getContext("2d");
    var canvasBuffer = document.createElement("canvas");
    var canvasBufferContext = canvasBuffer.getContext("2d");
    var drawBoundary = 707; // Will not draw objects more then X pixels away from the camera

    var TO_RADIANS = Math.PI / 180;

    that.CanvasSize = { width: $(target).width(), height: $(target).height() }
    that.CanvasCenter = { X: .5 * that.CanvasSize.width, Y: .5 * that.CanvasSize.height }

    canvasBuffer.width = that.CanvasSize.width;
    canvasBuffer.height = that.CanvasSize.height;

    function calculateDistance(A, B) {
        return Math.sqrt(Math.pow(A.X - B.X, 2) + Math.pow(A.Y - B.Y, 2));
    }

    that.Camera = {
        // Position is the center of the screen 
        Position: {
            X: 0,
            Y: 0
        },
        Move: function (Position) {
            // Update position
            this.Position = Position;
            // Update background position based on camera
            $("#gameWrapper").css("background-position", -Position.X + "px " + -Position.Y + "px");
        },
        Follow: function (obj) {
            this.Following = obj.GUID;
        }
    }

    that.drawRotatedImage = function (image, angle, sx, sy, swidth, sheight, x, y, width, height) {
        // Check if the object that we're drawing is beyond our draw border
        if (!swidth) {
            if (calculateDistance({ X: sx, Y: sy }, that.Camera.Position) >= drawBoundary) {
                return;
            }
        }
        else {
            if (calculateDistance({ X: x, Y: y }, that.Camera.Position) >= drawBoundary) {
                return;
            }
        }

        if (that !== this && this.GUID === that.Camera.Following) // Check to see if this function has been applied, if so we need to check if camera is following it
        {
            that.Camera.Move(this.MovementController.Position);
        }

        canvasBufferContext.save();

        var halfSize,
            cameraOffset = { X: -that.Camera.Position.X + that.CanvasCenter.X, Y: -that.Camera.Position.Y + that.CanvasCenter.Y };

        if (!swidth) {
            halfSize = { width: image.width * .5, height: image.height * .5 };
            canvasBufferContext.translate(sx + halfSize.width + cameraOffset.X, sy + halfSize.height - that.Camera.Position.Y + that.CanvasCenter.Y);
            canvasBufferContext.rotate(angle * TO_RADIANS);
            canvasBufferContext.drawImage(image, -halfSize.width, -halfSize.height);
        }
        else {
            halfSize = { width: width * .5, height: height * .5 };
            canvasBufferContext.translate(x + halfSize.width + cameraOffset.X, y + halfSize.height + cameraOffset.Y);
            canvasBufferContext.rotate(angle * TO_RADIANS);
            canvasBufferContext.drawImage(image, sx, sy, swidth, sheight, -halfSize.width, -halfSize.height, width, height);
        }

        canvasBufferContext.restore();
    }

    that.clear = function () {
        canvasBufferContext.clearRect(0, 0, that.Width, that.Height);
    }

    that.Render = function () {
        drawContext.clearRect(0, 0, that.Width, that.Height);
        drawContext.drawImage(canvasBuffer, 0, 0);
    }

    that.Width = target.width();
    that.Height = target.height();
}

var CanvasContext = new CanvasRenderer($("#game"));

CanvasContext.IMAGE_ASSETS = {
    INIT: function () {
        this.Ship.src = "/Images/Ship.png";
        this.Explosion.src = "Images/SpriteSheets/explosion_1.png";
        this.Laser.src = "/Images/Laser.png";
    },
    Ship: new Image(),
    Explosion: new Image(),
    Laser: new Image()
};

CanvasContext.IMAGE_ASSETS.INIT();
