var GameDetailManager = (function () {
    function GameDetailManager() {
        this.applyKeyboardShortcuts();
    }
    GameDetailManager.prototype.applyKeyboardShortcuts = function () {
        shortcut.add("X", function () {
            GAME_GLOBALS.Game.ShipManager.DrawDetails = !GAME_GLOBALS.Game.ShipManager.DrawDetails;
        }, { 'disable_in_input': true, 'type': 'keyup' });
    };
    return GameDetailManager;
})();
//# sourceMappingURL=GameDetailManager.js.map
