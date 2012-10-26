function DeathScreen(leaderboard) {
    var that = this,
        topLineQuotes = [],
        botLineQuotes = [];

    that.YouDied = function (by, byPhoto) {
        var gameCanvas = $("#game"),
            fadeIns = $("#HUDBarCover, #GameCover, #popUpHolder"),
            respawnTime = $("#RespawnTime"),
            killedByName = $("#KilledByNameSmall, #KilledByNameLarge"),
            killedByPhoto = $("#KilledByPhotoSmall, #KilledByPhotoLarge"),
            doublePopupHolder = $("#doublePopupHolder"),
            popupWindows = $("#leaderboardHolder, #deathScreenHolder");

        killedByName.html(by);
        killedByPhoto.attr("src",byPhoto);

        popupWindows.css("display", "block");
        doublePopupHolder.css("display", "block");

        popupWindows.addClass("goLeft");

        fadeIns.fadeIn(1000);

        respawnTime.html(that.RESPAWN_TIMER);

        var interval = setInterval(function () {
            var left = parseInt(respawnTime.html()) - 1;
            respawnTime.html(left);

            if (left === 0) {
                clearInterval(interval);
                fadeIns.fadeOut(1000, function () {
                    popupWindows.css("display", "none");
                    doublePopupHolder.css("display", "none");
                    popupWindows.removeClass("goLeft");
                });
            }
        }, 1000);
    }
}