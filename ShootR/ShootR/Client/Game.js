var Game = (function () {
    function Game(_connection, _latencyResolver, myShipID) {
        this._connection = _connection;
        this._latencyResolver = _latencyResolver;
        this.GameTime = new GameTime();
        this.BulletManager = new BulletManager();
        this.ShipManager = new ShipManager(myShipID);
        this.PowerupManager = new PowerupManager();
        this.ShipManager.InitializeMyShip(this._connection);
        this._map = new Map();
        this._myShip = this.ShipManager.MyShip;
        this.HUDManager = new HUDManager(this._myShip, this._connection);
    }
    Game.prototype.Update = function (lastPayload) {
        this.GameTime.Update();
        CanvasContext.clear();
        this._map.CheckBoundaryCollisions(this.ShipManager.Ships, this.BulletManager.Bullets);
        this.HUDManager.Update(lastPayload);
        this.ShipManager.Update(this.GameTime);
        this.PowerupManager.Update(this.GameTime);
        this.BulletManager.Update(this.GameTime);
        GAME_GLOBALS.AnimationManager.Update();
        this._map.Draw();
        this.ShipManager.MyShip.DrawHUD();
        CanvasContext.Render();
    };
    return Game;
})();
//@ sourceMappingURL=Game.js.map
