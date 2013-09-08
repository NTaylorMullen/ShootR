/// <reference path="../../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Utilities/Animation.ts" />
/// <reference path="../Ship.ts" />
/// <reference path="ShipThrustAnimation.ts" />
/// <reference path="ShipBoostAnimation.ts" />

module ShootR {

    export class ShipAnimationHandler {
        public static FULL_THRUST_AFTER: eg.TimeSpan = eg.TimeSpan.FromMilliseconds(400);

        private _thrustAnimation: ShipThrustAnimation;
        private _boostAnimation: ShipBoostAnimation;

        constructor(private _ship: Ship, private _contentManager: eg.Content.ContentManager) {
            var thrustSpriteSheet: eg.Graphics.ImageSource = this._contentManager.GetImage("Thrust"),
                thrustStartSpriteSheet: eg.Graphics.ImageSource = this._contentManager.GetImage("ThrustStart");

            this._thrustAnimation = new ShipThrustAnimation(this._contentManager);
            this._boostAnimation = new ShipBoostAnimation(this._contentManager);

            this._ship.Graphic.AddChild(this._thrustAnimation);
            this._ship.Graphic.AddChild(this._boostAnimation);

            this._ship.MovementController.OnMove.Bind((event: eg.MovementControllers.IMoveEvent) => {
                if (event.Direction === "Forward") {
                    if (event.StartMoving) {
                        this._thrustAnimation.Play();
                    } else {
                        this._thrustAnimation.Stop();
                    }
                }
            });

            this._ship.AbilityHandler.Boost.OnStart.Bind(() => {
                this._boostAnimation.Play();
            });

            this._ship.AbilityHandler.Boost.OnStop.Bind(() => {
                this._boostAnimation.Stop();
            });
        }

        public StopAllAnimations(): void {
            this._thrustAnimation.Stop();
            this._boostAnimation.Stop();
        }

        public Update(gameTime: eg.GameTime): void {
            this._thrustAnimation.Update(gameTime);
            this._boostAnimation.Update(gameTime);
        }
    }

}