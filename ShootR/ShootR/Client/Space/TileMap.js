function TileMap(image, position, size) {
    var that = this,
        canvasBuffer = document.createElement("canvas"),
        canvasBufferContext = canvasBuffer.getContext("2d"),
        XOffset = 0,
        YOffset = 0;

    function PrepareDraw() {
        for (var i = 0; i < size.width / image.width; i++) {
            for (var j = 0; j < size.height / image.height; j++) {
                canvasBufferContext.drawImage(image, i * image.width, j * image.height);
            }
        }
    }

    that.BackgroundPosition = function (pos) {
    }

    that.Draw = function () {

    }
}