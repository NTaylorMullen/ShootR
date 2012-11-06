function EnvironmentMonitor(MyShip) {
    var that = this,
        latency = $("#Latency"),
        worldTargets = $("#WorldTargets"),
        worldBullets = $("#WorldBullets"),
        area = $("#Area"),
        areaLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    that.Update = function (payload) {
        var mapSize = Map.WIDTH, // It's square so height is same
            areaSize = Math.max(Math.round( mapSize / 26), 1000);

        latency.html(MyShip.LatencyResolver.Latency);
        worldBullets.html(payload.BulletsInWorld);
        worldTargets.html(payload.ShipsInWorld);
        
    }
}