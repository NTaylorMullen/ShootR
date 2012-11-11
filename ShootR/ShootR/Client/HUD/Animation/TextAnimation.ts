/// <reference path="../../Utilities/Vector2.ts" />
/// <reference path="../../Space/CanvasRenderer.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />

class TextAnimation {
    public Destroyed: bool = false;

    private _currentOpacity: number = 1;
    private _lastUpdated: number = new Date().getTime();

    constructor (private _text: string, private _position: Vector2, private _options: any) {
        this._options = $.extend({
            duration: 500,
            color: [255, 0, 0],
            fontSize: "17px SegoeUISemibold"
        }, this._options);
    }

    public Draw(): void {
        this._currentOpacity = 1 - (new Date().getTime() - this._lastUpdated) / this._options.duration;

        CanvasContext.drawText(this._text, this._position.X, this._position.Y, "rgba(" + this._options.color[0] + "," + this._options.color[1] + "," + this._options.color[2] + "," + this._currentOpacity + ")", this._options.fontSize);

        if (this._currentOpacity <= 0) {
            this.Destroyed = true;
        }
    }
}