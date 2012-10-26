function EnvironmentMonitor(MyShip) {
    var that = this,
        targets = $("#Targets"),
        worldTargets = $("#WorldTargets"),
        worldBullets = $("#WorldBullets"),
        area = $("#Area"),
        areaLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    that.Update = function (payload) {
        var count = -1, // -1 because we will always be on the screen, hence 1
            mapSize = Map.prototype.WIDTH, // It's square so height is same
            areaSize = Math.max(Math.round( mapSize / 26), 1000);

        for (var key in payload.ShipsOnScreen) {
            count++;
        }

        targets.html(count);
        worldBullets.html(payload.BulletsInWorld);
        worldTargets.html(payload.ShipsInWorld);
        var letterSector = areaLetters[Math.max(Math.floor(MyShip.MovementController.Position.X / areaSize), 0)],
            sectorNumber = Math.max(Math.ceil(MyShip.MovementController.Position.Y / areaSize), 1);

        area.html(letterSector  + sectorNumber);
    }
}