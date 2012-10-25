function DeathScreen() {
    var that = this;

    that.YouDied = function (by, byPhoto) {
        var gameCanvas = $("#game"),
            fadeIns = $("#HUDBarCover, #GameCover"),
            respawnTime = $("#RespawnTime"),
            killedByNameSmall = $("#KilledByNameSmall"),
            killedByPhotoSmall = $("#KilledByPhotoSmall");

        killedByNameSmall.html(by);
        killedByPhotoSmall.attr("src",byPhoto);

        fadeIns.fadeIn(1000);
        respawnTime.html(that.RESPAWN_TIMER);

        var interval = setInterval(function () {
            var left = parseInt(respawnTime.html()) - 1;
            respawnTime.html(left);

            if (left === 0) {
                clearInterval(interval);
                fadeIns.fadeOut(1000);
            }
        }, 1000);
    }
}