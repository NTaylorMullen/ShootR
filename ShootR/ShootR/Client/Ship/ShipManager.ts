/// <reference path="ShipController.ts" />
/// <reference path="Ship.ts" />
/// <reference path="../Interfaces/PayloadDefinitions.d.ts" />
/// <reference path="../Utilities/ImageAssets.ts" />
/// <reference path="../Utilities/GameTime.ts" />
/// <reference path="../Space/CanvasRenderer.ts" />

class ShipManager {
    public DrawDetails: bool;
    public Ships: { [s: number]: Ship; };
    public MyShip: ShipController;

    constructor (private myShipID: number) {
        this.DrawDetails = true;
        this.Ships = <{ [s: number]: Ship; }>{};
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

            var abilities: IAbilityData = currentShip.Abilities,
                movementController: IShipMovementControllerData = currentShip.MovementController;

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

            // Check if the ship still exists
            if (this.Ships[id].Disposed) {
                this.Ships[id].Destroy();

                if (id !== this.MyShip.ID) {
                    this.RemoveShip(id);
                }
            }
            else {
                this.Ships[id].Update();
                this.Ships[id].ShipAbilityHandler.UpdateAbilities(abilities);
                this.Ships[id].MovementController.UpdateMovementController(movementController);
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
            else if (this.myShipID !== this.Ships[key].ID) { // Ship is not in view, so remove it from our ship list if its not our ship
                delete this.Ships[key];
            }
        }
    }
}