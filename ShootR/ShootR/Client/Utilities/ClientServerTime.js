function ClientServerTime() {
    var that = this;

    that.Delta = 0;

    that.GetServerTime = function (ServerTime) {
        return ServerTime + that.Delta;
    }

    that.ToServerTime = function (time) {
        return time - that.Delta;
    }
}