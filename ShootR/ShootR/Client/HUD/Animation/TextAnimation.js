var TextAnimation = (function () {
    function TextAnimation(_text, _position, _options) {
        this._text = _text;
        this._position = _position;
        this._options = _options;
        this.Destroyed = false;
        this._currentOpacity = 1;
        this._lastUpdated = new Date().getTime();
        this._options = $.extend({
            duration: 500,
            color: [
                255, 
                0, 
                0
            ],
            fontSize: "17px SegoeUISemibold"
        }, this._options);
    }
    TextAnimation.prototype.Draw = function () {
        this._currentOpacity = 1 - (new Date().getTime() - this._lastUpdated) / this._options.duration;
        CanvasContext.drawText(this._text, this._position.X, this._position.Y, "rgba(" + this._options.color[0] + "," + this._options.color[1] + "," + this._options.color[2] + "," + this._currentOpacity + ")", this._options.fontSize);
        if(this._currentOpacity <= 0) {
            this.Destroyed = true;
        }
    };
    return TextAnimation;
})();
//@ sourceMappingURL=TextAnimation.js.map
