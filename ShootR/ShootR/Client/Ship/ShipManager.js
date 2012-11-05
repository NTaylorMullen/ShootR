var ShipManager = (function () {
    function ShipManager(myShipID) {
        this.myShipID = myShipID;
        this.DrawDetails = true;
        this.Ships = {
        };
    }
    ShipManager.prototype.InitializeMyShip = function (connection) {
        this.MyShip = new ShipController([
            "a", 
            "left"
        ], [
            "w", 
            "up"
        ], [
            "d", 
            "right"
        ], [
            "s", 
            "down"
        ], "Space", connection);
        this.MyShip.ID = this.myShipID;
        this.Ships[this.myShipID] = this.MyShip;
    };
    ShipManager.prototype.RemoveShip = function (connectionID) {
        this.Ships[connectionID].Destroy();
        delete this.Ships[connectionID];
    };
    ShipManager.prototype.UpdateShips = function (shipList) {
        var shipCount = shipList.length;
        for(var i = 0; i < shipCount; i++) {
            var currentShip = shipList[i];
            var id = currentShip.ID;

            currentShip.Visible = true;
            var shipImage = Math.min(currentShip.Level, 13);
            currentShip.Vehicle = IMAGE_ASSETS["Ship" + shipImage];
            currentShip.GUID = currentShip.ID;
            var abilities = currentShip.Abilities;
            var movementController = currentShip.MovementController;

            delete currentShip.Abilities;
            delete currentShip.MovementController;
            if(!this.Ships[id]) {
                this.Ships[id] = new Ship(currentShip);
            } else {
                this.Ships[id].UpdateProperties(currentShip);
            }
            this.Ships[id].ShipAbilityHandler.UpdateAbilities(abilities);
            this.Ships[id].MovementController.UpdateMovementController(movementController);
            if(this.Ships[id].Disposed) {
                this.Ships[id].Destroy();
                if(id !== this.MyShip.ID) {
                    this.RemoveShip(id);
                }
            } else {
                this.Ships[id].Update();
            }
        }
    };
    ShipManager.prototype.Update = function (gameTime) {
        var myShip = this.Ships[this.myShipID];
        if(myShip) {
            myShip.Update(gameTime);
            myShip.Draw();
        }
        for(var key in this.Ships) {
            if(CanvasContext.Camera.InView(this.Ships[key]) && this.myShipID !== this.Ships[key].ID) {
                this.Ships[key].Update(gameTime);
                this.Ships[key].Draw();
                if(this.Ships[key].LifeController.Alive && this.DrawDetails) {
                    this.Ships[key].DrawHealthBar();
                    this.Ships[key].DrawName(10);
                }
            } else {
                if(this.myShipID !== this.Ships[key].ID) {
                    delete this.Ships[key];
                }
            }
        }
    };
    return ShipManager;
})();
//@ sourceMappingURL=ShipManager.js.map
