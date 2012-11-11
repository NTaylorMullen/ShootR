/// <reference path="Camera.ts" />

class CanvasRenderer {
    static TO_RADIANS: number = Math.PI / 180;

    private _drawContext: CanvasRenderingContext2D;
    private _canvasBuffer: HTMLCanvasElement;
    private _canvasBufferContext: CanvasRenderingContext2D;
    private _textFont: string = "15px SegoeUISemibold";
    private _textColor: string = "rgba(255, 255, 255, 1)";

    public CanvasSize: Size;
    public CanvasCenter: Vector2;
    public Camera: Camera = new Camera();

    constructor (target: JQuery) {
        this._drawContext = (<HTMLCanvasElement>target[0]).getContext("2d");
        this._canvasBuffer = <HTMLCanvasElement>document.createElement("canvas");
        this._canvasBufferContext = this._canvasBuffer.getContext("2d");
    }

    public UpdateSize(size: Size): void {
        this.CanvasSize = size;
        this.CanvasCenter = new Vector2(.5 * this.CanvasSize.Width, .5 * this.CanvasSize.Height);

        this._canvasBuffer.width = this.CanvasSize.Width;
        this._canvasBuffer.height = this.CanvasSize.Height;
    }

    public drawMapBoundary(boundarySize: Size): void {
        var cameraOffset = { X: -this.Camera.Position.X + this.CanvasCenter.X, Y: -this.Camera.Position.Y + this.CanvasCenter.Y };

        this._canvasBufferContext.save();

        this._canvasBufferContext.translate(cameraOffset.X, cameraOffset.Y);
        this._canvasBufferContext.lineWidth = 5;
        this._canvasBufferContext.strokeStyle = "#3fa9f5";
        this._canvasBufferContext.strokeRect(0, 0, boundarySize.Width, boundarySize.Height);

        this._canvasBufferContext.restore();
    }

    public strokeSquare(position: Vector2, size: Size, customColor: string): void {
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
    }

    public drawRectangle(x: number, y: number, width: number, height: number, color: string): void {
        var cameraOffset = new Vector2(x - this.Camera.Position.X + this.CanvasCenter.X, y - this.Camera.Position.Y + this.CanvasCenter.Y);

        this._canvasBufferContext.save();

        this._canvasBufferContext.translate(cameraOffset.X, cameraOffset.Y);
        this._canvasBufferContext.fillStyle = color;
        this._canvasBufferContext.fillRect(0, 0, width, height);

        this._canvasBufferContext.restore();
    }

    public drawCircle(x: number, y: number, radius: number, lineWidth: number, color: string): void {
        this._canvasBufferContext.beginPath();
        this._canvasBufferContext.strokeStyle = color;
        this._canvasBufferContext.lineWidth = lineWidth;
        this._canvasBufferContext.arc(x, y, radius, 0, Math.PI * 2, true);
        this._canvasBufferContext.stroke();
    }

    public drawLine(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, color: string): void {
        this._canvasBufferContext.save();

        this._canvasBufferContext.beginPath();
        this._canvasBufferContext.strokeStyle = color;
        this._canvasBufferContext.lineWidth = lineWidth;
        this._canvasBufferContext.moveTo(fromX, fromY);
        this._canvasBufferContext.lineTo(toX, toY);
        this._canvasBufferContext.stroke();

        this._canvasBufferContext.restore();
    }

    public drawText(text: string, x: number, y: number, customColor?: any, customFont?: any, textAlign?: any, textBaseline?: any): void {
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
            textAlign = "center"
        }

        this._canvasBufferContext.textAlign = textAlign;

        if (textBaseline) {
            this._canvasBufferContext.textBaseline = textBaseline;
        }

        this._canvasBufferContext.font = customFont;
        this._canvasBufferContext.fillStyle = customColor;

        this._canvasBufferContext.fillText(text, 0, 0);

        this._canvasBufferContext.restore();
    }

    public drawRotatedImage(image: any, angle: number, sx: number, sy: number, swidth?: number, sheight?: number, x?: number, y?: number, width?: number, height?: number): void {
        this._canvasBufferContext.save();

        var halfSize,
            cameraOffset = new Vector2(-this.Camera.Position.X + this.CanvasCenter.X, -this.Camera.Position.Y + this.CanvasCenter.Y);

        if (!swidth) {
            halfSize = { width: image.width * .5, height: image.height * .5 };
            this._canvasBufferContext.translate(sx + halfSize.width + cameraOffset.X, sy + halfSize.height - this.Camera.Position.Y + this.CanvasCenter.Y);
            this._canvasBufferContext.rotate(angle * CanvasRenderer.TO_RADIANS);
            this._canvasBufferContext.drawImage(image, -halfSize.width, -halfSize.height);
        }
        else {
            halfSize = { width: width * .5, height: height * .5 };
            this._canvasBufferContext.translate(x + halfSize.width + cameraOffset.X, y + halfSize.height + cameraOffset.Y);
            this._canvasBufferContext.rotate(angle * CanvasRenderer.TO_RADIANS);
            this._canvasBufferContext.drawImage(image, sx, sy, swidth, sheight, -halfSize.width, -halfSize.height, width, height);
        }

        this._canvasBufferContext.restore();
    }

    public clear(): void {
        this._canvasBufferContext.clearRect(0, 0, this.CanvasSize.Width, this.CanvasSize.Height);
    }

    public Render(): void {
        this._drawContext.clearRect(0, 0, this.CanvasSize.Width, this.CanvasSize.Height);
        this._drawContext.drawImage(this._canvasBuffer, 0, 0);
    }
}

var CanvasContext = new CanvasRenderer($("#game"));