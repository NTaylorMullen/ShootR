function GameTime() {
    var that = this;
    var lastUpdated = new Date();

    that.PercentOfSecond = 0;

    that.Update = function () {
        that.PercentOfSecond = CalculatePOS(lastUpdated);

        lastUpdated = new Date();
    }
}