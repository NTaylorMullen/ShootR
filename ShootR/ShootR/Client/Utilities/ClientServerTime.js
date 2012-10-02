function ClientServerTime() {
    var that = this;

    that.Delta = 0;

    that.GetServerTime = function (ServerTime) {
        return ServerTime + that.Delta;
    }
}