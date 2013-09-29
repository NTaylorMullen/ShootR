/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="Abilities/AbilityHandlers/ShipAbilityHandler.ts" />
/// <reference path="Graphics/ShipGraphic.ts" />
/// <reference path="Animations/ShipAnimationHandler.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="ShipLifeController.ts" />
/// <reference path="Levels/ShipLevelManager.ts" />

module ShootR {

    export class Ship extends eg.Collision.Collidable {
        public static SIZE: eg.Size2d = new eg.Size2d(75);
        public static DAMAGE_INCREASE_RATE: number = .1;

        public ID: number;
        public Graphic: ShipGraphic;
        public MovementController: ShipMovementController;
        public AbilityHandler: ShipAbilityHandler;
        public AnimationHandler: ShipAnimationHandler;
        public LifeController: ShipLifeController;
        public LevelManager: ShipLevelManager;

        private _destroyed: boolean;

        constructor(payload: Server.IShipData, contentManager: eg.Content.ContentManager) {
            this._destroyed = false;
            this.OnExplosion = new eg.EventHandler();

            this.LifeController = new ShipLifeController();
            this.LevelManager = new ShipLevelManager(payload);

            this.Graphic = new ShipGraphic(this.LevelManager, this.LifeController, payload.MovementController.Position, Ship.SIZE, contentManager);

            // Going to use the rectangle to "hold" all the other graphics
            super(this.Graphic.GetDrawBounds());

            this.MovementController = new ShipMovementController(new Array<eg.IMoveable>(this.Bounds, this.Graphic));
            this.AbilityHandler = new ShipAbilityHandler(this);
            this.AnimationHandler = new ShipAnimationHandler(this, contentManager);

            this.LoadPayload(payload);
        }

        public OnExplosion: eg.EventHandler;

        public Update(gameTime: eg.GameTime): void {
            this.AbilityHandler.Update(gameTime);
            this.MovementController.Update(gameTime);
            this.AnimationHandler.Update(gameTime);

            // Updates rotation
            this.Graphic.RotateShip(this.MovementController.Rotation);
        }

        public LoadPayload(payload: Server.IShipData): void {
            this.ID = payload.ID;
            this.MovementController.LoadPayload(payload.MovementController);
            this.LifeController.LoadPayload(payload);
            this.LevelManager.LoadPayload(payload);
        }

        public Destroy(explode: boolean = false): void {
            if (!this._destroyed) {
                this._destroyed = true;

                this.MovementController.Dispose();

                if (!explode) {
                    this.Graphic.Dispose();
                    this.Dispose();
                } else {
                    // We rely on the completion of the explosion to finish disposing the bounds and graphic
                    this.OnExplosion.Trigger();
                }
            }
        }
    }

}