/// <reference path="../GameGlobals.ts" />

declare var shortcut;

class GameDetailManager {
    constructor () {
        this.ApplyKeyboardShortcuts();
    }

    private ApplyKeyboardShortcuts() {
        shortcut.add("X", function () {
            GAME_GLOBALS.Game.ShipManager.DrawDetails = !GAME_GLOBALS.Game.ShipManager.DrawDetails;
        }, { 'disable_in_input': true, 'type': 'keyup' });
    }    
}