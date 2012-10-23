function GameDetailManager() {
    var that = this;

    function ApplyKeyboardShortcuts() {
        shortcut.add("X", function () {
            GAME_GLOBALS.Game.ShipManager.DrawDetails = !GAME_GLOBALS.Game.ShipManager.DrawDetails;
        }, { 'disable_in_input': true, 'type': 'keyup' });
    }

    ApplyKeyboardShortcuts();
}