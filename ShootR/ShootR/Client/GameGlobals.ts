/// <reference path="Managers/AnimationManager.ts" />
/// <reference path="Interfaces/IGameColors.ts" />

class GameGlobals {
    constructor (public AnimationManager: AnimationManager, public Colors: GameColors, public Game: any) {
    }
}

var GAME_GLOBALS = new GameGlobals(
    new AnimationManager(),
    {
        ShipBad: "#ED1E79",
        ShipHurt: "#FF931E",
        ShipGood: "#7AC943"
    },
    false
);