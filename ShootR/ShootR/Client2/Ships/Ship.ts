/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="ShipGraphic.ts" />
/// <reference path="ShipMovementController.ts" />

module ShootR {

    export class Ship extends eg.Collision.Collidable {
        public static SIZE: eg.Size2d = new eg.Size2d(75, 75);

        public ID: number;
        public Graphic: ShipGraphic;
        public MovementController: ShipMovementController;

        constructor(payload: Server.IShipData, contentManager: eg.Content.ContentManager) {
            // Going to use the rectangle to "hold" all the other graphics
            this.Graphic = new ShipGraphic(payload.MovementController.Position, Ship.SIZE, contentManager);            

            super(this.Graphic.GetDrawBounds());

            this.MovementController = new ShipMovementController(new Array<eg.IMoveable>(this.Bounds, this.Graphic));

            this.LoadPayload(payload);
        }

        public Update(gameTime: eg.GameTime): void {
            this.MovementController.Update(gameTime);
        }

        public LoadPayload(payload: Server.IShipData): void {
            this.ID = payload.ID;
            this.Graphic.Rotation = payload.MovementController.Rotation * .0174532925;
            this.MovementController.LoadPayload(payload.MovementController);
        }

        public Destroy(): void {
            this.Graphic.Dispose();
            this.Dispose();
        }
    }

}