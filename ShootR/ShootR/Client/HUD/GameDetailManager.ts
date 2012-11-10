/// <reference path="../GameGlobals.ts" />

declare var shortcut;

class GameDetailManager {
    constructor () {
        this.applyKeyboardShortcuts();
    }

    private applyKeyboardShortcuts() {
        shortcut.add("X", function () {
            GAME_GLOBALS.Game.ShipManager.DrawDetails = !GAME_GLOBALS.Game.ShipManager.DrawDetails;
        }, { 'disable_in_input': true, 'type': 'keyup' });
    }
}