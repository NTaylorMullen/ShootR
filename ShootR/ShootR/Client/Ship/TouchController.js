function TouchController(StartMovement, StopMovement) {
    var that = this,
        canvas = $("#game"),
        middle = $("#game").width() / 2,
        currentTouchID = false,
        movementTouchStart,
        movementTouch;
    
    function TouchStart(e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            if (!currentTouchID && touch.offsetX <= middle) {
                currentTouchID = touch.identifier;
                movementTouchStart = { X: touch.offsetX, Y: touch.offsetY };
                movementTouch = { X: touch.offsetX, Y: touch.offsetY };
            }
        }
    }

    function TouchMove(e) {
        e.preventDefault();
        
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
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            if (currentTouchID === touch.identifier) {
                currentTouchID = false;
                break;
            }
        }
    }

    canvas.on('touchstart', TouchStart);
    canvas.on('touchmove', TouchMove);
    canvas.on('touchend', TouchEnd);

    that.Draw = function () {
        if (currentTouchID) {
            CanvasContext.drawCircle(movementTouchStart.X, movementTouchStart.Y, 6, 40, "#1BFF27");
            CanvasContext.drawCircle(movementTouchStart.X, movementTouchStart.Y, 2, 60, "#1BFF27");
            CanvasContext.drawCircle(movementTouch.X, movementTouch.Y, 40, 2, "#1BFF27");
        }
    }
}