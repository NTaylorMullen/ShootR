function EnvironmentMonitor() {
    var that = this,
        targets = $("#Targets"),
        worldTargets = $("#WorldTargets"),
        worldBullets = $("#WorldBullets");

    that.Update = function (payload) {
        var count = 0;
        for (var key in payload.ShipsOnScreen) {
            count++;
        }

        targets.html(count);
        worldBullets.html(payload.BulletsInWorld);
        worldTargets.html(payload.ShipsInWorld);
    }
}