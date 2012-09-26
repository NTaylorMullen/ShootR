/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Ship.js" />
/// <reference path="lib/shortcut.js" />
/// <reference path="BulletManager.js" />
/// <reference path="Configuration/CanvasRenderer.js" />

var GAME_GLOBALS = {
    AnimationManager: new AnimationManager()
};

function Game(conn) {
    var that = this;
    var payloadManager = new PayloadManager();
    var bulletManager = new BulletManager(conn, payloadManager);
    var ship = new Ship("a", "w", "d", "s", "Space", bulletManager, conn);
    var shipStats = new ShipStatRecorder(ship);    
    var ships = {};
    var gameTime = new GameTime();
    var map = new Map();

    ships[conn._.proxy.connection.id] = ship;
    CanvasContext.Camera.Follow(ship);

    that.DrawName = true;

    // This will update all ship positions on the screen.  Including in correcting the client side ship movement
    that.LoadMultiplayerShips = function (ship_list) {
        var activeShips = {};
        for (var connectionID in ship_list) {
            var currentShip = payloadManager.DecompressShip(ship_list[connectionID]);
            if (!ships[connectionID]) {
                ships[connectionID] = new ShipVehicle({ x: currentShip.MovementController.Position.X, y: currentShip.MovementController.Position.Y });
            }
            activeShips[connectionID] = true;
            ships[connectionID].UpdateProperties(currentShip);
            ships[connectionID].Draw();
        }

        for (var key in ships) {
            if (!activeShips[key]) {
                delete ships[key];
            }
        }
    }

    that.LoadBullets = function (bullet_list) {
        bulletManager.UpdateBullets(bullet_list);
    }

    that.RemoveShip = function (connectionID) {
        ships[connectionID].Destroy();
        delete ships[connectionID];
    }

    that.InitializeCompressionContracts = function (contracts) {
        payloadManager.LoadContracts(contracts);
    }

    that.Update = function (payload) {
        gameTime.Update();
        CanvasContext.clear();

        CanvasContext.Camera.Move({ X: ship.MovementController.Position.X + ship.Width * .5, Y: ship.MovementController.Position.Y + ship.Height * .5 });

        // Move the ships on the client
        for (var key in ships) {
            ships[key].Update(gameTime);
            if (that.DrawName) {
                ships[key].DrawName();
            }
        }

        // Move the bullets on the client
        bulletManager.Update(gameTime);

        GAME_GLOBALS.AnimationManager.Update(gameTime);

        map.CheckBoundaryCollisions(ships, bulletManager.bulletsInAir);

        map.Draw();
        CanvasContext.Render();
        shipStats.Update(payload);
    }
}