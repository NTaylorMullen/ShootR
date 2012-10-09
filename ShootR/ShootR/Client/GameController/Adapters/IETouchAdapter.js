function IETouchAdapter(HandleStart, HandleMove, HandleStop) {
    var that = this;

    function StopAndConvert(e) {
        e.preventDefault();

        var touch = e;

        touch.identifier = e.pointerId;

        return touch;
    }

    that.Start = function (e) {
        HandleStart(StopAndConvert(e));
    }

    that.Move = function (e) {
        HandleMove(StopAndConvert(e));
    }

    that.Stop = function (e) {
        HandleStop(StopAndConvert(e))
    }
}