function TextAnimation(text, x, y, options) {
    var that = this,
        currentOpacity = 1,
        lastUpdated = new Date().getTime();

    options = $.extend({
        duration: 500,
        color: [255, 0, 0],
        fontSize: "17px verdana"
    }, options);

    that.Destroyed = false;

    that.Draw = function () {
        currentOpacity = 1 - (new Date().getTime() - lastUpdated) / options.duration;

        CanvasContext.drawText(text, x, y, "rgba(" + options.color[0] + "," + options.color[1] + "," + options.color[2] + "," + currentOpacity + ")", options.fontSize);

        if (currentOpacity <= 0) {
            that.Destroyed = true;
        }
    }
}