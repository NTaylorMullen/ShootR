function GameTime() {
    var that = this;
    var lastUpdated = new Date();        
    
    that.PercentOfSecond = 0;

    that.Update = function()
    {
        var diff = new Date();
        diff.setTime(diff - lastUpdated);
        that.PercentOfSecond = (diff.getTime() / 1000);

        lastUpdated = new Date();
    }
}