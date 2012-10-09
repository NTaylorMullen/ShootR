function MouseAdapter(HandleStart, HandleMove, HandleStop) {
    var that = this,
        GUID = 0,
        currentGUID = 0;

    that.Start = function (e) {
        e.preventDefault();

        var touch = e;

        e.identifier = currentGUID = GUID++;
        HandleStart(e);
    }

    that.Move = function (e) {
        e.preventDefault();

        var touch = e;

        e.identifier = currentGUID;
        HandleMove(e);
    }

    that.Stop = function (e) {
        e.preventDefault();

        var touch = e;

        e.identifier = currentGUID;
        HandleStop(e);
    }
}