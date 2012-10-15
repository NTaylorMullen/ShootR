function Leaderboard(gameHUD, connection) {
    var that = this,
        myPosition = false, // Initially set to a very high value so we flash green on leaderboard position first update
        leaderboardPosition = $("#leaderboardPosition"),
        leaderboardPositionNumber = $("#positionNumber"),
        leaderboardViewModel = {
            leaderboard: ko.observable()
        },
        lastViewport;

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

    function MoveToBottomRight() {
        leaderboardPosition.css("left", lastViewport.Width - leaderboardPosition.width() - 4);
        leaderboardPosition.css("top", lastViewport.Height - leaderboardPosition.height() - 4);
    }

    ko.applyBindings(leaderboardViewModel, $("#leaderboard table")[0]);
    ApplyKeyboardShortcuts();

    that.OnScreenResize = function (newViewport) {
        lastViewport = newViewport;
        MoveToBottomRight();
    }

    that.LoadPosition = function (newPosition) {
        if (myPosition != newPosition) {
            if (myPosition) {
                // We've gone up the ranks!
                if (newPosition < myPosition) {
                    $(leaderboardPosition).flash("#00FF00", 2000);
                }
                else if (newPosition > myPosition) {
                    $(leaderboardPosition).flash("#FF0000", 2000);
                }
            }

            myPosition = newPosition;

            if (myPosition <= that.LEADERBOARD_SIZE) {
                leaderboardPosition.addClass("topten");
            }
            else {
                leaderboardPosition.removeClass("topten");
            }

            leaderboardPositionNumber.html(myPosition);
            MoveToBottomRight();
        }
    }

    that.Load = function (data) {
        $("#leaderboardHolder").css("height", (data.length + 2) * 37 + 25);

        leaderboardViewModel.leaderboard(data);
    }
}