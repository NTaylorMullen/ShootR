/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Common/Animation.ts" />
/// <reference path="../Ship.ts" />
/// <reference path="ShipThrustAnimation.ts" />
/// <reference path="ShipBoostAnimation.ts" />

module ShootR {

    export class ShipAnimationHandler {
        public static FULL_THRUST_AFTER: eg.TimeSpan = eg.TimeSpan.FromMilliseconds(400);

        private _thrustAnimation: ShipThrustAnimation;
        private _boostAnimation: ShipBoostAnimation;
        private _deathAnimation: ShipDeathAnimation;

        constructor(private _ship: Ship, private _contentManager: eg.Content.ContentManager) {
            var thrustSpriteSheet: eg.Graphics.ImageSource = this._contentManager.GetImage("Thrust"),
                thrustStartSpriteSheet: eg.Graphics.ImageSource = this._contentManager.GetImage("ThrustStart");

            this._thrustAnimation = new ShipThrustAnimation(this._contentManager);
            this._boostAnimation = new ShipBoostAnimation(this._contentManager);
            this._deathAnimation = new ShipDeathAnimation(this._contentManager);

            this._ship.Graphic.AddChildToShip(this._thrustAnimation);
            this._ship.Graphic.AddChildToShip(this._boostAnimation);
            this._ship.Graphic.AddChild(this._deathAnimation);

            this._ship.AbilityHandler.Boost.OnStart.Bind(() => {
                this._thrustAnimation.Stop();
                this._boostAnimation.Play();
            });

            this._ship.AbilityHandler.Boost.OnStop.Bind(() => {
                this._boostAnimation.Stop();
            });

            this._ship.OnExplosion.Bind(() => {
                this._thrustAnimation.Visible = false;
                this._boostAnimation.Visible = false;
                this._ship.Graphic.HideShip();

                this._deathAnimation.Play();    
            });

            this._deathAnimation.OnComplete.Bind(() => {
                this._ship.Dispose();
                this._ship.Graphic.Dispose();
            });
        }

        public StopAllAnimations(): void {
            this._thrustAnimation.Stop();
            this._boostAnimation.Stop();
        }

        public Update(gameTime: eg.GameTime): void {
            var thrustIsPlaying: boolean = this._thrustAnimation.IsPlaying();

            if (!thrustIsPlaying && this._ship.MovementController.IsMovingInDirection("Forward") && !this._ship.AbilityHandler.Boost.Active) {
                this._thrustAnimation.Play();
            } else if (thrustIsPlaying && !this._ship.MovementController.IsMovingInDirection("Forward")) {
                this._thrustAnimation.Stop();
            }

            this._thrustAnimation.Update(gameTime);
            this._boostAnimation.Update(gameTime);
            this._deathAnimation.Update(gameTime);
        }
    }

}