function CanvasRenderer(target) {
    var that = this,
        drawContext = target[0].getContext("2d"),
        canvasBuffer = document.createElement("canvas"),
        canvasBufferContext = canvasBuffer.getContext("2d"),
        drawBoundary = 707, // Will not draw objects more then X pixels away from the camera    
        textFont = "15px verdana",
        textColor = "rgba(255, 255, 255, 1)";

    var TO_RADIANS = Math.PI / 180;

    that.UpdateSize = function (size) {
        that.CanvasSize = size;
        that.CanvasCenter = { X: .5 * that.CanvasSize.Width, Y: .5 * that.CanvasSize.Height }

        canvasBuffer.width = that.CanvasSize.Width;
        canvasBuffer.height = that.CanvasSize.Height;
    }

    that.CanvasSize;
    that.CanvasCenter;

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

    that.strokeSquare = function (x, y, width, height) {
        var cameraOffset = { X: x - that.Camera.Position.X + that.CanvasCenter.X, Y: y - that.Camera.Position.Y + that.CanvasCenter.Y };

        canvasBufferContext.save();

        canvasBufferContext.translate(cameraOffset.X, cameraOffset.Y);
        canvasBufferContext.lineWidth = "1";
        canvasBufferContext.strokeStyle = "#f00";
        canvasBufferContext.strokeRect(0, 0, width, height);

        canvasBufferContext.restore();
    }

    that.drawRectangle = function (x, y, width, height, color) {
        var cameraOffset = { X: x - that.Camera.Position.X + that.CanvasCenter.X, Y: y - that.Camera.Position.Y + that.CanvasCenter.Y };

        canvasBufferContext.save();

        canvasBufferContext.translate(cameraOffset.X, cameraOffset.Y);
        canvasBufferContext.fillStyle = color;
        canvasBufferContext.fillRect(0, 0, width, height);

        canvasBufferContext.restore();
    }

    that.drawCircle = function (x, y, radius, lineWidth, color) {
        canvasBufferContext.beginPath();
        canvasBufferContext.strokeStyle = color;
        canvasBufferContext.lineWidth = lineWidth;
        canvasBufferContext.arc(x, y, radius, 0, Math.PI * 2, true);
        canvasBufferContext.stroke();
    }

    that.drawLine = function (fromX, fromY, toX, toY, lineWidth, color) {
        canvasBufferContext.save();

        canvasBufferContext.beginPath();
        canvasBufferContext.strokeStyle = color;
        canvasBufferContext.lineWidth = lineWidth;
        canvasBufferContext.moveTo(fromX, fromY);
        canvasBufferContext.lineTo(toX, toY);
        canvasBufferContext.stroke();

        canvasBufferContext.restore();
    }

    that.drawText = function (text, x, y, customColor, customFont) {
        var cameraOffset = { X: -that.Camera.Position.X + that.CanvasCenter.X, Y: -that.Camera.Position.Y + that.CanvasCenter.Y };

        if (!customColor) {
            customColor = textColor;
        }

        if (!customFont) {
            customFont = textFont;
        }

        canvasBufferContext.save();

        canvasBufferContext.translate(cameraOffset.X + x, y + cameraOffset.Y);
        canvasBufferContext.textAlign = "center";
        canvasBufferContext.font = customFont;
        canvasBufferContext.strokeStyle = customColor;

        canvasBufferContext.strokeText(text, 0, 0);

        canvasBufferContext.restore();
    }

    that.drawRotatedImage = function (image, angle, sx, sy, swidth, sheight, x, y, width, height) {

        if (that !== this && this.ID === that.Camera.Following) // Check to see if this function has been applied, if so we need to check if camera is following it
        {
            that.Camera.Move({ X: this.MovementController.Position.X + this.WIDTH * .5, Y: this.MovementController.Position.Y + this.HEIGHT * .5 });
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
        canvasBufferContext.clearRect(0, 0, that.CanvasSize.Width, that.CanvasSize.Height);
    }

    that.Render = function () {
        drawContext.clearRect(0, 0, that.CanvasSize.Width, that.CanvasSize.Height);
        drawContext.drawImage(canvasBuffer, 0, 0);
    }
}

var CanvasContext = new CanvasRenderer($("#game"));