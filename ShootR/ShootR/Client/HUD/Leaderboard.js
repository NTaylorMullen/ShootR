function Leaderboard(gameHUD, connection) {
    var that = this
        leaderboardViewModel = {
            leaderboard: ko.observable()
        },
        leaderboardUp = false;

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
        $("#popUpHolder").css("display", "block");
        $("#leaderboardHolder").fadeIn(350);
        connection.server.readyForLeaderboardPayloads();
    }

    function HideLeaderboard() {
        leaderboardUp = false;
        $("#leaderboardHolder").fadeOut(200, function () {
            $("#popUpHolder").css("display", "none");
        });
        connection.server.stopLeaderboardPayloads();
    }

    ko.applyBindings(leaderboardViewModel, $("#leaderboard table")[0]);
    ApplyKeyboardShortcuts();

    that.Load = function (data) {
        $("#leaderboardHolder").css("height", (data.length + 2) * 37 + 25);

        leaderboardViewModel.leaderboard(data);
    }
}