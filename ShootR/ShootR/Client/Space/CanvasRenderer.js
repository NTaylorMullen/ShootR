/// <reference path="../Utilities/Size.ts" />
/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="Camera.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
var CanvasRenderer = (function () {
    function CanvasRenderer(target) {
        this._textFont = "15px SegoeUISemibold";
        this._textColor = "rgba(255, 255, 255, 1)";
        this.Camera = new Camera();
        this._drawContext = (target[0]).getContext("2d");
        this._canvasBuffer = document.createElement("canvas");
        this._canvasBufferContext = this._canvasBuffer.getContext("2d");
    }
    CanvasRenderer.prototype.UpdateSize = function (size) {
        this.CanvasSize = size;
        this.CanvasCenter = new Vector2(.5 * this.CanvasSize.Width, .5 * this.CanvasSize.Height);

        this._canvasBuffer.width = this.CanvasSize.Width;
        this._canvasBuffer.height = this.CanvasSize.Height;
    };

    CanvasRenderer.prototype.drawMapBoundary = function (boundarySize) {
        var cameraOffset = { X: -this.Camera.Position.X + this.CanvasCenter.X, Y: -this.Camera.Position.Y + this.CanvasCenter.Y };

        this._canvasBufferContext.save();

        this._canvasBufferContext.translate(cameraOffset.X, cameraOffset.Y);
        this._canvasBufferContext.lineWidth = 5;
        this._canvasBufferContext.strokeStyle = "#3fa9f5";
        this._canvasBufferContext.strokeRect(0, 0, boundarySize.Width, boundarySize.Height);

        this._canvasBufferContext.restore();
    };

    CanvasRenderer.prototype.strokeSquare = function (position, size, customColor) {
        var cameraOffset = new Vector2(position.X - this.Camera.Position.X + this.CanvasCenter.X, position.Y - this.Camera.Position.Y + this.CanvasCenter.Y);

        this._canvasBufferContext.save();

        this._canvasBufferContext.translate(cameraOffset.X, cameraOffset.Y);
        this._canvasBufferContext.lineWidth = 1;

        if (!customColor) {
            customColor = "#f00";
        }

        this._canvasBufferContext.strokeStyle = customColor;
        this._canvasBufferContext.strokeRect(0, 0, size.Width, size.Height);

        this._canvasBufferContext.restore();
    };

    CanvasRenderer.prototype.drawRectangle = function (x, y, width, height, color) {
        var cameraOffset = new Vector2(x - this.Camera.Position.X + this.CanvasCenter.X, y - this.Camera.Position.Y + this.CanvasCenter.Y);

        this._canvasBufferContext.save();

        this._canvasBufferContext.translate(cameraOffset.X, cameraOffset.Y);
        this._canvasBufferContext.fillStyle = color;
        this._canvasBufferContext.fillRect(0, 0, width, height);

        this._canvasBufferContext.restore();
    };

    CanvasRenderer.prototype.drawCircle = function (x, y, radius, lineWidth, color) {
        this._canvasBufferContext.beginPath();
        this._canvasBufferContext.strokeStyle = color;
        this._canvasBufferContext.lineWidth = lineWidth;
        this._canvasBufferContext.arc(x, y, radius, 0, Math.PI * 2, true);
        this._canvasBufferContext.stroke();
    };

    CanvasRenderer.prototype.drawLine = function (fromX, fromY, toX, toY, lineWidth, color) {
        this._canvasBufferContext.save();

        this._canvasBufferContext.beginPath();
        this._canvasBufferContext.strokeStyle = color;
        this._canvasBufferContext.lineWidth = lineWidth;
        this._canvasBufferContext.moveTo(fromX, fromY);
        this._canvasBufferContext.lineTo(toX, toY);
        this._canvasBufferContext.stroke();

        this._canvasBufferContext.restore();
    };

    CanvasRenderer.prototype.drawText = function (text, x, y, customColor, customFont, textAlign, textBaseline) {
        var cameraOffset = new Vector2(-this.Camera.Position.X + this.CanvasCenter.X, -this.Camera.Position.Y + this.CanvasCenter.Y);

        if (!customColor) {
            customColor = this._textColor;
        }

        if (!customFont) {
            customFont = this._textFont;
        }

        this._canvasBufferContext.save();

        this._canvasBufferContext.translate(cameraOffset.X + x, y + cameraOffset.Y);
        if (!textAlign) {
            textAlign = "center";
        }

        this._canvasBufferContext.textAlign = textAlign;

        if (textBaseline) {
            this._canvasBufferContext.textBaseline = textBaseline;
        }

        this._canvasBufferContext.font = customFont;
        this._canvasBufferContext.fillStyle = customColor;

        this._canvasBufferContext.fillText(text, 0, 0);

        this._canvasBufferContext.restore();
    };

    CanvasRenderer.prototype.drawRotatedImage = function (image, angle, sx, sy, swidth, sheight, x, y, width, height) {
        this._canvasBufferContext.save();

        var halfSize, cameraOffset = new Vector2(-this.Camera.Position.X + this.CanvasCenter.X, -this.Camera.Position.Y + this.CanvasCenter.Y);

        if (!swidth) {
            halfSize = { width: image.width * .5, height: image.height * .5 };
            this._canvasBufferContext.translate(sx + halfSize.width + cameraOffset.X, sy + halfSize.height - this.Camera.Position.Y + this.CanvasCenter.Y);
            this._canvasBufferContext.rotate(angle * CanvasRenderer.TO_RADIANS);
            this._canvasBufferContext.drawImage(image, -halfSize.width, -halfSize.height);
        } else {
            halfSize = { width: width * .5, height: height * .5 };
            this._canvasBufferContext.translate(x + halfSize.width + cameraOffset.X, y + halfSize.height + cameraOffset.Y);
            this._canvasBufferContext.rotate(angle * CanvasRenderer.TO_RADIANS);
            this._canvasBufferContext.drawImage(image, sx, sy, swidth, sheight, -halfSize.width, -halfSize.height, width, height);
        }

        this._canvasBufferContext.restore();
    };

    CanvasRenderer.prototype.clear = function () {
        this._canvasBufferContext.clearRect(0, 0, this.CanvasSize.Width, this.CanvasSize.Height);
    };

    CanvasRenderer.prototype.Render = function () {
        this._drawContext.clearRect(0, 0, this.CanvasSize.Width, this.CanvasSize.Height);
        this._drawContext.drawImage(this._canvasBuffer, 0, 0);
    };
    CanvasRenderer.TO_RADIANS = Math.PI / 180;
    return CanvasRenderer;
})();

var CanvasContext = new CanvasRenderer($("#game"));
//# sourceMappingURL=CanvasRenderer.js.map
