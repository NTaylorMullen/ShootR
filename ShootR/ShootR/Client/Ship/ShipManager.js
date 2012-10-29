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

            currentShip.Visible = true;
            var shipImage = Math.min(currentShip.Level, 10);
            currentShip.Vehicle = IMAGE_ASSETS["Ship" + shipImage];
            // Create a GUID on the ship object.  This allows the camera to follow a GUID based object
            currentShip.GUID = currentShip.ID;

            var abilities = currentShip.Abilities,
                movementController = currentShip.MovementController;

            // Remove them from the currentShip so we don't update them as properties
            delete currentShip.Abilities;
            delete currentShip.MovementController;

            // If we don't have a ship by that ID create a new ship
            if (!that.Ships[id]) {
                that.Ships[id] = new ShipVehicle(currentShip);
            }
            else { // We already have a ship on the screen by that ID, update it
                that.Ships[id].UpdateProperties(currentShip);
            }

            that.Ships[id].ShipAbilityHandler.UpdateAbilities(abilities);
            that.Ships[id].MovementController.UpdateMovementController(movementController);

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
                    }
                }
            }
            else {
                that.Ships[id].Update();
            }
        }
    }

    that.Update = function (gameTime) {
        // Always update "myship" first.  This will get the camera in the right place
        var myShip = that.Ships[myShipID];
        if (myShip) {
            myShip.Update(gameTime);
            myShip.Draw();
        }

        for (var key in that.Ships) {
            // Ensure that the Ship is in view
            if (CanvasContext.Camera.InView(that.Ships[key]) && myShipID !== that.Ships[key].ID) {
                that.Ships[key].Update(gameTime);
                that.Ships[key].Draw();

                if (that.Ships[key].LifeController.Alive && that.DrawDetails) {
                    that.Ships[key].DrawHealthBar();
                    that.Ships[key].DrawName(10);
                }
            }
            else if (myShipID !== that.Ships[key].ID) { // Ship is not in view, so remove it from our ship list
                delete that.Ships[key];
            }
        }
    }
}