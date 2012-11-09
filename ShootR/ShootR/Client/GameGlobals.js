var GameGlobals = (function () {
    function GameGlobals(AnimationManager, Colors, Game) {
        this.AnimationManager = AnimationManager;
        this.Colors = Colors;
        this.Game = Game;
    }
    return GameGlobals;
})();
var GAME_GLOBALS = new GameGlobals(new AnimationManager(), {
    ShipBad: "#ED1E79",
    ShipHurt: "#FF931E",
    ShipGood: "#7AC943"
}, false);
//@ sourceMappingURL=GameGlobals.js.map
