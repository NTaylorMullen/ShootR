function CanvasRenderer(target) {
    var that = this,
        drawContext = target[0].getContext("2d"),
        canvasBuffer = document.createElement("canvas"),
        canvasBufferContext = canvasBuffer.getContext("2d"),
        drawBoundary = 707, // Will not draw objects more then X pixels away from the camera    
        textFont = "15px verdana",
        textColor = "white";

    var TO_RADIANS = Math.PI / 180;

    that.CanvasSize = { width: $(target).width(), height: $(target).height() }
    that.CanvasCenter = { X: .5 * that.CanvasSize.width, Y: .5 * that.CanvasSize.height }

    canvasBuffer.width = that.CanvasSize.width;
    canvasBuffer.height = that.CanvasSize.height;

    that.Width = target.width();
    that.Height = target.height();

    function calculateDistance(A, B) {
        return Math.sqrt(Math.pow(A.X - B.X, 2) + Math.pow(A.Y - B.Y, 2));
    }

    that.Camera = new Camera();

    that.drawMapBoundary = function (width, height) {
        var cameraOffset = { X: -that.Camera.Position.X + that.CanvasCenter.X, Y: -that.Camera.Position.Y + that.CanvasCenter.Y };

        canvasBufferContext.save();

        canvasBufferContext.translate(cameraOffset.X, cameraOffset.Y);
        canvasBufferContext.lineWidth = "5";
        canvasBufferContext.strokeStyle = "#f00";
        canvasBufferContext.strokeRect(0, 0, width, height);

        canvasBufferContext.restore();

    }

    that.drawSquare = function (x, y, width, height) {
        var cameraOffset = { X: x - that.Camera.Position.X + that.CanvasCenter.X, Y: y - that.Camera.Position.Y + that.CanvasCenter.Y };

        canvasBufferContext.save();

        canvasBufferContext.translate(cameraOffset.X, cameraOffset.Y);
        canvasBufferContext.lineWidth = "1";
        canvasBufferContext.strokeStyle = "#f00";
        canvasBufferContext.strokeRect(0, 0, width, height);

        canvasBufferContext.restore();
    }

    that.drawText = function (text, x, y) {
        var cameraOffset = { X: -that.Camera.Position.X + that.CanvasCenter.X, Y: -that.Camera.Position.Y + that.CanvasCenter.Y };

        canvasBufferContext.save();

        canvasBufferContext.translate(cameraOffset.X + x, y + cameraOffset.Y);
        canvasBufferContext.textAlign = "center";
        canvasBufferContext.font = textFont;
        canvasBufferContext.strokeStyle = textColor;

        canvasBufferContext.strokeText(text, 0, 0);

        canvasBufferContext.restore();
    }

    that.drawRotatedImage = function (image, angle, sx, sy, swidth, sheight, x, y, width, height) {

        if (that !== this && this.GUID === that.Camera.Following) // Check to see if this function has been applied, if so we need to check if camera is following it
        {
            that.Camera.Move({ X: this.MovementController.Position.X + this.WIDTH * .5, Y: this.MovementController.Position.Y + this.HEIGHT * .5 });
        }

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
