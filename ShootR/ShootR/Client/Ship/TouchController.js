function TouchController(StartMovement, StopMovement) {
    var that = this,
        canvas = $("#game");
    
    function onTouchStart() {
        alert("Touch Start!");
    }

    function onTouchMove() {
        alert("Touch moved!");
    }

    function onTouchEnd() {
        alert("Touch End!");
    }

    canvas.on('touchstart', onTouchStart);
    canvas.on('touchmove', onTouchMove);
    canvas.on('touchend', onTouchEnd);

    that.Draw = function () {

    }
}