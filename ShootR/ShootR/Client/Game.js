/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Ship.js" />
/// <reference path="lib/shortcut.js" />
/// <reference path="BulletManager.js" />
/// <reference path="Configuration/CanvasRenderer.js" />

function Game(connection, latencyResolver, myShipID) {
    var that = this,
        map = new Map();

    that.GameTime = new GameTime();
    that.BulletManager = new BulletManager();
    that.ShipManager = new ShipManager(myShipID, that.GameTime);
    that.ShipManager.InitializeMyShip(that.BulletManager, connection);
    that.PowerupManager = new PowerupManager();

    var myShip = that.ShipManager.MyShip;

    CanvasContext.Camera.Follow(myShip);

    that.HUDManager = new HUDManager(myShip, connection);

    that.Update = function (payload) {
        that.GameTime.Update();
        CanvasContext.clear();

        map.CheckBoundaryCollisions(that.ShipManager.Ships, that.BulletManager.Bullets);

        // Move the ships on the client
        that.ShipManager.Update(that.GameTime);

        that.PowerupManager.Update(that.GameTime);

        // Move the bullets on the client
        that.BulletManager.Update(that.GameTime);

        GAME_GLOBALS.AnimationManager.Update(that.GameTime);

        map.Draw();
        that.ShipManager.MyShip.DrawHUD();

        CanvasContext.Render();
//        shipStats.Update(payload, latencyResolver.Latency, that.ShipManager.Ships, that.BulletManager.Bullets);

        that.HUDManager.Update(payload);
    }
}