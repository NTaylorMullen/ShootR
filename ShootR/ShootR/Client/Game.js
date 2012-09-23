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
    var bullet_manager = new BulletManager(conn);
    var ship = new Ship("a", "w", "d", "s", "Space", bullet_manager, conn);
    var shipStats = new ShipStatRecorder(ship);
    var ships = {};
    var gameTime = new GameTime();

    ships[conn._.proxy.connection.id] = ship;
    CanvasContext.Camera.Follow(ship);

    // This will update all ship positions on the screen.  Including in correcting the client side ship movement
    that.LoadMultiplayerShips = function (ship_list) {
        var activeShips = {};
        for (var connectionID in ship_list) {
            if ($(ships[connectionID]).length === 0) {//Need to add the ship
                ships[connectionID] = new ShipVehicle({ x: ship_list[connectionID].MovementController.Position.X, y: ship_list[connectionID].MovementController.Position.Y });
            }
            activeShips[connectionID] = true;
            ships[connectionID].UpdateProperties(ship_list[connectionID]);
            ships[connectionID].Draw();
        }

        for (var key in ships) {
            if (!activeShips[key]) {
                delete ships[key];
            }
        }
    }

    that.LoadBullets = function (bullet_list) {
        bullet_manager.UpdateBullets(bullet_list);
    }

    that.RemoveShip = function (connectionID) {
        ships[connectionID].Destroy();
        delete ships[connectionID];
    }

    that.Update = function (payload) {
        gameTime.Update();
        CanvasContext.clear();

        //CanvasContext.Camera.Move({ X: ship.MovementController.Position.X + ship.Width * .5, Y: ship.MovementController.Position.Y + ship.Height * .5 });

        // Move the ships on the client
        for (var key in ships) {
            ships[key].Update(gameTime);
        }

        // Move the bullets on the client
        bullet_manager.Update(gameTime);

        GAME_GLOBALS.AnimationManager.Update(gameTime);

        CanvasContext.Render();
        shipStats.Update(payload);
    }
}