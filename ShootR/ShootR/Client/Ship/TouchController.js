function TouchController(StartMovement, StopMovement) {
    var that = this,
        canvas = $("#game");
    
    function onTouchStart() {
        $("input[type='text']").val("Touch Start");
    }

    function onTouchMove() {
        $("input[type='text']").val("Touch Moved");
    }

    function onTouchEnd() {
        $("input[type='text']").val("Touch End");
    }

    canvas.on('touchstart', onTouchStart);
    canvas.on('touchmove', onTouchMove);
    canvas.on('touchend', onTouchEnd);

    that.Draw = function () {

    }
}