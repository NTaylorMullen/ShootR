function GameTime() {
    var that = this,
        lastUpdated = new Date();

    that.PercentOfSecond = 0;
    that.Now = new Date();

    that.Update = function () {
        that.PercentOfSecond = CalculatePOS(lastUpdated);

        that.Now = new Date();
        lastUpdated = that.Now;
    }
}