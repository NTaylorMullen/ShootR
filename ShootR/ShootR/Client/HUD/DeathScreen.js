function DeathScreen(leaderboard) {
    var that = this,
        randomQuotes = [
            ["HAS LEFT A DENT IN YOUR EGO.", "(HOPE NOBODY SAW THAT)"],
            ["JUST DOMINATED YOU.", "OUCH!"],
            ["SUCKS TO BE YOU!", ""],
            ["...", "REALLY?"],
            ["YOU ALRIGHT?", "THAT MUST HAVE HURT."],
            ["SAID TO TELL YOUR MOTHER", "HELLO!"],
            ["TIS BUT A SCRATCH", ""],
            ["BOOM...", "HEADSHOT!"],
            ["CAN'T LET YOU DO THAT STARFOX",""],
            ["PLAYTIME IS OVER!",""],
            ["YOU MISSED!", "YOU MAY NEED GLASSES"],
            ["YOU'RE GOOD...", "BUT I'M BETTER."],
            ["TOO SLOW...", "MY GRAMAH DRIVES FASTER THAN THAT!"]
        ];

    var gameCanvas = $("#game"),
            fadeIns = $("#HUDBarCover, #GameCover, #popUpHolder"),
            respawnTime = $("#RespawnTime"),
            killedByName = $("#KilledByNameSmall, #KilledByNameLarge"),
            killedByPhoto = $("#KilledByPhotoSmall, #KilledByPhotoLarge"),
            doublePopupHolder = $("#doublePopupHolder"),
            popupWindows = $("#leaderboardHolder, #deathScreenHolder"),
            topLineQuote = $("#topLineQuote"),
            botLineQuote = $("#botLineQuote");

    that.YouDied = function (by, byPhoto) {
        var quote = Math.floor(Math.random() * randomQuotes.length);

        topLineQuote.html(randomQuotes[quote][0]);
        botLineQuote.html(randomQuotes[quote][1]);

        killedByName.html(by);
        killedByPhoto.attr("src", byPhoto);

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