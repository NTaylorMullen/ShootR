/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Ship.js" />
/// <reference path="lib/shortcut.js" />
/// <reference path="BulletManager.js" />
/// <reference path="Configuration/CanvasRenderer.js" />

function Game(conn, myShipID) {
    var that = this,
        gameTime,
        map = new Map();

    that.InitializeGameTime = function (timeDelta) {
        gameTime = new GameTime(timeDelta);
    }

    that.BulletManager = new BulletManager(conn);
    that.ShipManager = new ShipManager(myShipID, gameTime);
    that.ShipManager.InitializeMyShip(that.BulletManager, conn);

    var shipStats = new ShipStatRecorder(that.ShipManager.MyShip),
        myShip = that.ShipManager.MyShip;

    CanvasContext.Camera.Follow(myShip);

    that.Update = function (payload) {
        gameTime.Update();
        CanvasContext.clear();

        // Move the ships on the client
        that.ShipManager.Update(gameTime);

        // Move the bullets on the client
        that.BulletManager.Update(gameTime);

        GAME_GLOBALS.AnimationManager.Update(gameTime);

        map.CheckBoundaryCollisions(that.ShipManager.Ships, that.BulletManager.Bullets);

        map.Draw();
        CanvasContext.Render();
        shipStats.Update(payload, myShip, that.ShipManager.Ships, that.BulletManager.Bullets);
    }
}