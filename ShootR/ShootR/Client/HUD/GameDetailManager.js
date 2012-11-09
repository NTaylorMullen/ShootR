var GameDetailManager = (function () {
    function GameDetailManager() {
        this.ApplyKeyboardShortcuts();
    }
    GameDetailManager.prototype.ApplyKeyboardShortcuts = function () {
        shortcut.add("X", function () {
            GAME_GLOBALS.Game.ShipManager.DrawDetails = !GAME_GLOBALS.Game.ShipManager.DrawDetails;
        }, {
            'disable_in_input': true,
            'type': 'keyup'
        });
    };
    return GameDetailManager;
})();
//@ sourceMappingURL=GameDetailManager.js.map
