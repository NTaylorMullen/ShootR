/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="BulletGraphic.ts" />
/// <reference path="BulletMovementController.ts" />

module ShootR {

    export class Bullet extends eg.Collision.Collidable {
        public static SIZE: eg.Size2d = new eg.Size2d(13);
        public static BULLET_DIE_AFTER: eg.TimeSpan = eg.TimeSpan.FromSeconds(2);

        public ID: number;
        public Graphic: BulletGraphic;
        public MovementController: BulletMovementController;
        public AnimationHandler: BulletAnimationHandler;

        private _spawnedAt: number;
        private _destroyed: boolean;

        constructor(payload: Server.IBulletData, contentManager: eg.Content.ContentManager) {
            // Going to use the rectangle to "hold" all the other graphics
            this.Graphic = new BulletGraphic(payload.MovementController.Position, Bullet.SIZE, contentManager);

            super(this.Graphic.GetDrawBounds());

            this.OnExplosion = new eg.EventHandler();
            this.MovementController = new BulletMovementController(new Array<eg.IMoveable>(this.Bounds, this.Graphic), payload.MovementController);
            this.AnimationHandler = new BulletAnimationHandler(this, contentManager);            

            this._spawnedAt = new Date().getTime();
            this._destroyed = false;

            this.LoadPayload(payload);
        }

        public OnExplosion: eg.EventHandler;

        public Update(gameTime: eg.GameTime): void {
            this.MovementController.Update(gameTime);
            this.AnimationHandler.Update(gameTime);

            // Bullets been alive too long
            if ((new Date().getTime() - this._spawnedAt) >= Bullet.BULLET_DIE_AFTER.Milliseconds) {
                this.Destroy(false);
            }
        }

        public LoadPayload(payload: Server.IBulletData): void {
            this.ID = payload.ID;            
            this.MovementController.LoadPayload(payload.MovementController);

            // Ensure that our position matches the movement controllers position
            this.Bounds.Position = this.Graphic.Position = this.MovementController.Position;
        }

        public Destroy(explode: boolean = true): void {
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