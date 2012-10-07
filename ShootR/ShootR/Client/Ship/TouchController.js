function TouchController(StartMovement, StopMovement) {
    var that = this,
        canvas = document.getElementById("game"),
        currentTouchID = false,
        movementTouchStart,
        movementTouch;
    
    function TouchStart(e) {
        e.preventDefault();
        if (!e.changedTouches) {
            e.identifier = 1;
            e.changedTouches = [e];
        }

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            if (!currentTouchID && touch.offsetX <= ($("#game").width() / 2)) {
                currentTouchID = touch.identifier;
                movementTouchStart = { X: touch.offsetX, Y: touch.offsetY };
                movementTouch = { X: touch.offsetX, Y: touch.offsetY };
            }
        }
    }

    function TouchMove(e) {
        e.preventDefault();
        if (!e.changedTouches) {
            e.identifier = 1;
            e.changedTouches = [e];
        }

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            
            if (currentTouchID === touch.identifier) {
                movementTouch.X = touch.offsetX;
                movementTouch.Y = touch.offsetY;
                break;
            }
        }
    }

    function TouchEnd(e) {
        e.preventDefault();
        if (!e.changedTouches) {
            e.identifier = 1;
            e.changedTouches = [e];
        }

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            if (currentTouchID === touch.identifier) {
                currentTouchID = false;
                break;
            }
        }
    }

    canvas.addEventListener('touchstart', TouchStart, false);
    canvas.addEventListener('touchmove', TouchMove, false);
    canvas.addEventListener('touchend', TouchEnd, false);

    canvas.addEventListener('mousedown', TouchStart, false);
    canvas.addEventListener('mousemove', TouchMove, false);
    canvas.addEventListener('mouseup', TouchEnd, false);

    that.Draw = function () {
        if (currentTouchID) {
            CanvasContext.drawCircle(movementTouchStart.X, movementTouchStart.Y, 40, 6, "#1BFF27");
            CanvasContext.drawCircle(movementTouchStart.X, movementTouchStart.Y, 60, 2, "#1BFF27");
            CanvasContext.drawCircle(movementTouch.X, movementTouch.Y, 40, 2, "#1BFF27");
        }
    }
}