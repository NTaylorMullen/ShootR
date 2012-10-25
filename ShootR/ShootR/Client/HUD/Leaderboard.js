function Leaderboard(gameHUD, connection) {
    var that = this
    leaderboardViewModel = {
        leaderboard: ko.observable()
    },
    leaderboardUp = false,
    leaderboardHolder = $("#leaderboardHolder"),
    leaderboard = $("#leaderboard"),
    popUpHolder = $("#popUpHolder"),
    gameCover = $("#GameCover"),
    myRanking = $("#myRanking");

    // Create shortcuts
    function ApplyKeyboardShortcuts() {
        shortcut.add("Tab", function () {
            ToggleLeaderboard();
        }, { 'disable_in_input': true });

        $("#GlobalRanking").click(function () {
            ToggleLeaderboard();
        });
    }
    function ToggleLeaderboard() {
        if (!leaderboardUp) {
            ShowLeaderboard();
        }
        else {
            HideLeaderboard();
        }
    }

    function ShowLeaderboard() {
        leaderboardUp = true;
        popUpHolder.css("display", "block");
        leaderboardHolder.fadeIn(350);
        gameCover.fadeIn(350);
        connection.server.readyForLeaderboardPayloads();
    }

    function HideLeaderboard() {
        leaderboardUp = false;
        leaderboardHolder.fadeOut(200, function () {
            popUpHolder.css("display", "none");
        });
        gameCover.fadeOut(200);
        connection.server.stopLeaderboardPayloads();
    }

    ko.applyBindings(leaderboardViewModel, leaderboard[0]);
    ApplyKeyboardShortcuts();

    that.Load = function (data) {
        leaderboardViewModel.leaderboard(data);
    }
}