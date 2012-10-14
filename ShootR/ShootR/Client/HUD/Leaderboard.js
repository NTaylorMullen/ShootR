function Leaderboard(gameHUD, connection) {
    var that = this,
        leaderboardViewModel = {
        leaderboard: ko.observable()
    };

    // Create shortcuts
    function ApplyKeyboardShortcuts() {
        shortcut.add("Tab", function () {
            $("#popUpHolder").css("display", "block");
            $("#leaderboardHolder").fadeIn(350);
            connection.readyForLeaderboardPayloads();
        }, { 'disable_in_input': true, 'type': 'keydown' });

        shortcut.add("Tab", function () {
            $("#leaderboardHolder").fadeOut(200, function () {
                $("#popUpHolder").css("display", "none");
            });
            connection.stopLeaderboardPayloads();
        }, { 'disable_in_input': true, 'type': 'keyup' });
    }

    ko.applyBindings(leaderboardViewModel, $("#leaderboard table")[0]);
    ApplyKeyboardShortcuts();

    that.Load = function (data) {
        $("#leaderboardHolder").css("height", (data.length + 2) * 37 + 25);

        leaderboardViewModel.leaderboard(data);
    }
}