/// <reference path="ShipController.ts" />

class ShipManager {
    public DrawDetails: bool;
    public Ships: { [s: any]: Ship; };
    public MyShip: ShipController;

    constructor (private myShipID: number) {
        this.DrawDetails = true;
        this.Ships = {};
    }

    public InitializeMyShip(connection: any) {
        this.MyShip = new ShipController(["a", "left"], ["w", "up"], ["d", "right"], ["s", "down"], "Space", connection);
        this.MyShip.ID = this.myShipID;
        this.Ships[this.myShipID] = this.MyShip;
    }

    public RemoveShip (shipID: number): void {
        this.Ships[shipID].Destroy();
        delete this.Ships[shipID];
    }

    public UpdateShips (shipList: IShipData[]): void {
        for (var i = 0; i < shipList.length; i++) {
            var currentShip: any = shipList[i],
                id: number = currentShip.ID;

            currentShip.Visible = true;
            var shipImage = Math.min(currentShip.Level, 13);

            currentShip.Vehicle = IMAGE_ASSETS["Ship" + shipImage];

            // Create a GUID on the ship object.  This allows the camera to follow a GUID based object
            currentShip.GUID = currentShip.ID;

            var abilities = currentShip.Abilities,
                movementController = currentShip.MovementController;

            // Remove them from the currentShip so we don't update them as properties
            delete currentShip.Abilities;
            delete currentShip.MovementController;

            // If we don't have a ship by that ID create a new ship
            if (!this.Ships[id]) {
                this.Ships[id] = new Ship(currentShip);
            }
            else { // We already have a ship on the screen by that ID, update it
                this.Ships[id].UpdateProperties(currentShip);
            }

            this.Ships[id].ShipAbilityHandler.UpdateAbilities(abilities);
            this.Ships[id].MovementController.UpdateMovementController(movementController);

            // Check if the ship still exists
            if (this.Ships[id].Disposed) {
                this.Ships[id].Destroy();

                if (id !== this.MyShip.ID) {
                    this.RemoveShip(id);
                }
            }
            else {
                this.Ships[id].Update();
            }
        }
    }

    public Update (gameTime: GameTime): void {
        // Always update "myship" first.  This will get the camera in the right place
        var myShip = this.Ships[this.myShipID];
        if (myShip) {
            myShip.Update(gameTime);
            CanvasContext.Camera.Move(new Vector2(myShip.MovementController.Position.X + myShip.WIDTH * .5, myShip.MovementController.Position.Y + myShip.HEIGHT * .5))
            myShip.Draw();            
        }

        for (var key in this.Ships) {
            // Ensure that the Ship is in view
            if (CanvasContext.Camera.InView(this.Ships[key]) && this.myShipID !== this.Ships[key].ID) {
                this.Ships[key].Update(gameTime);
                this.Ships[key].Draw();

                if (this.Ships[key].LifeController.Alive && this.DrawDetails) {
                    this.Ships[key].DrawHealthBar();
                    this.Ships[key].DrawName(10);
                }
            }
            else if (this.myShipID !== this.Ships[key].ID) { // Ship is not in view, so remove it from our ship list
                delete this.Ships[key];
            }
        }
    }
}