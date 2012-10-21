function ShipManager(myShipID) {
    var that = this;

    that.DrawDetails = true;
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
        var shipCount = shipList.length;

        for (var i = 0; i < shipCount; i++) {
            var currentShip = shipList[i],
                id = currentShip.ID;

            if (!that.Ships[id]) {
                that.Ships[id] = new ShipVehicle({ x: currentShip.MovementController.Position.X, y: currentShip.MovementController.Position.Y });
            }

            currentShip.Visible = true;

            var shipImage = currentShip.Level;
            if (shipImage >= 8) {
                shipImage = "Final"
            }

            currentShip.Vehicle = CanvasContext.IMAGE_ASSETS["Ship" + shipImage];

            that.Ships[id].UpdateProperties(currentShip);

            // Check if the ship still exists
            if (that.Ships[id].Disposed) {
                that.Ships[id].Destroy();

                if (id !== that.MyShip.ID) {
                    that.RemoveShip(id);
                }
                else {
                    if (!that.Ships[id].LifeController.Alive) {
                        that.SmoothX = false;
                        that.SmoothY = false;
                        $(that).triggerHandler("Respawn");
                    }
                }
            }
            else {
                that.Ships[id].Update();
                that.Ships[id].Draw();
            }
        }
    }

    that.Update = function (gameTime) {
        for (var key in that.Ships) {
            // Ensure that the Ship is in view
            if (CanvasContext.Camera.InView(that.Ships[key]) && that.MyShip.ID === that.Ships[key].ID) {
                that.Ships[key].Update(gameTime);                

                if (that.Ships[key].LifeController.Alive && that.DrawDetails) {
                    if (that.Ships[key].ID !== that.MyShip.ID) {
                        that.Ships[key].DrawHealthBar();
                        that.Ships[key].DrawName(10);
                    }
                    else {
                        that.Ships[key].DrawName(0);
                    }

                }
            }
            else { // Ship is not in view, so remove it from our ship list
                //delete that.Ships[key];
            }

            that.Ships[key].Draw();
        }
    }
}