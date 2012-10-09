function TouchAdapter(HandleStart, HandleMove, HandleStop) {
    var that = this;

    that.Start = function (e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            HandleStart(touch);
        }
    }

    that.Move = function (e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            HandleMove(touch);
        }
    }

    that.Stop = function (e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            HandleStop(touch)
        }
    }
}