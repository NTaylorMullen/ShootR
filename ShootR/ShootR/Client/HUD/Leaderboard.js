function Leaderboard(gameHUD, MyShip, connection) {
    var that = this,    
    leaderboardHolder = $("#leaderboardHolder, #doublePopupHolder"),
    leaderboard = $("#leaderboard"),
    popUpHolder = $("#popUpHolder"),
    gameCover = $("#GameCover"),
    myRanking = $("#myRanking"),
    leaderboardRows = [];

    that.LeaderboardUp = false;

    var tempRow = $("#leaderboard .row");

    leaderboardRows.push(tempRow);

    for (var i = 0; i < that.LEADERBOARD_SIZE - 1; i++) {
        var rowCopy = tempRow.clone();
        leaderboardRows.push(rowCopy);
        leaderboard.append(rowCopy);
    }
    
    function BindToLeaderboard(data) {
        for (var i = 0; i < data.length; i++) {
            var row = $(leaderboardRows[i]);

            if (data[i].ID === MyShip.ID) {
                if (data[i].Photo.length === 0) {
                    data[i].Photo = "Images/HUD/You_Default.png";
                }
                row.addClass("highlight");
            }
            else {
                row.removeClass("highlight");
            }

            // Bind photo separately becase it's bound to the src
            var photoEle = row.find(".lbPhoto");
            if (data[i].Photo.length === 0) {
                data[i].Photo = "Images/HUD/KilledBy_Default.png";
            }

            if (photoEle.attr("src") !== data[i].Photo) {
                photoEle.attr("src", data[i].Photo);
            }            

            // Delete the photo and ID from the data because we don't want them to be bound with the rest of the data
            delete data[i].Photo;
            delete data[i].ID;

            for (var key in data[i]) {
                row.find(".lb" + key).html(data[i][key]);
            }
        }
    }

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
        if (!that.LeaderboardUp) {
            ShowLeaderboard();
        }
        else {
            HideLeaderboard();
        }
    }

    function ShowLeaderboard() {
        // Go left is turned on when the ship dies.  We want the Leaderboard to float along side the death
        // screen when we're in the "dead" state.
        if (!leaderboard.hasClass('goLeft')) {
            that.LeaderboardUp = true;
            MyShip.ResetTouchController();
            leaderboardHolder.css("display", "block");
            popUpHolder.fadeIn(350);
            gameCover.fadeIn(350);
            connection.server.readyForLeaderboardPayloads();
        }
    }

    function HideLeaderboard() {
        if (!leaderboard.hasClass('goLeft')) {
            that.LeaderboardUp = false;
            popUpHolder.fadeOut(200, function () {
                leaderboardHolder.css("display", "none");
            });
            gameCover.fadeOut(200);
            connection.server.stopLeaderboardPayloads();
        }
    }

    ApplyKeyboardShortcuts();

    that.Load = function (data) {
        BindToLeaderboard(data);
    }
}