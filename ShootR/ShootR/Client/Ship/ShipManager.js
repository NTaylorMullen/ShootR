function ShipManager(myShipID) {
    var that = this;

    that.DrawName = true;
    that.Ships = {};
    that.MyShip;

    that.InitializeMyShip = function (bulletManager, connection) {
        that.MyShip = new Ship("a", "w", "d", "s", "Space", bulletManager, connection);
        that.MyShip.ID = myShipID;
        that.Ships[myShipID] = that.MyShip;
    }

    that.RemoveShip = function (connectionID) {
        that.Ships[connectionID].Destroy();
        delete that.Ships[connectionID];
    }

    that.UpdateShips = function (shipList) {
        var activeShips = {},
            shipCount = shipList.length;

        for (var i = 0; i < shipCount; i++) {
            var currentShip = shipList[i],
                id = currentShip.ID;

            if (!that.Ships[id]) {
                that.Ships[id] = new ShipVehicle({ x: currentShip.MovementController.Position.X, y: currentShip.MovementController.Position.Y });
            }

            activeShips[id] = true;
            that.Ships[id].UpdateProperties(currentShip);
            that.Ships[id].Draw();
        }

        for (var key in that.Ships) {
            if (!activeShips[key]) {
                delete that.Ships[key];
            }
        }
    }

    that.Update = function (gameTime) {
        for (var key in that.Ships) {
            that.Ships[key].Update(gameTime);
            if (that.DrawName) {
                that.Ships[key].DrawName();
            }
        }
    }
}