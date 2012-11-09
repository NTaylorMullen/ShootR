/// <reference path="Managers/AnimationManager.ts" />

interface GameColors {
    ShipBad: string;
    ShipHurt: string;
    ShipGood: string;
}

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