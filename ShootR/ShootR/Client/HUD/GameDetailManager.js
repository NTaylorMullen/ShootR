function GameDetailManager(initialShipName, connection) {
    var that = this,
        shipName = $("#ShipName");

    shipName.val(initialShipName);

    function ApplyKeyboardShortcuts() {
        shipName.keyup(function (e) {
            if (e.keyCode == 13) {
                connection.server.changeName(shipName.val());
            }
        });

        shortcut.add("X", function () {
            GAME_GLOBALS.Game.ShipManager.DrawDetails = !GAME_GLOBALS.Game.ShipManager.DrawDetails;
        }, { 'disable_in_input': true, 'type': 'keyup' });
    }

    ApplyKeyboardShortcuts();

    $("#ChangeShipName").click(function () {
        connection.server.changeName(shipName.val());
    });
}