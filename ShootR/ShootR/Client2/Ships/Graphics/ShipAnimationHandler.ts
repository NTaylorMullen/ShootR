/// <reference path="../../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Utilities/Animation.ts" />
/// <reference path="../ShipMovementController.ts" />
/// <reference path="ShipGraphic.ts" />
/// <reference path="ShipThrustAnimation.ts" />

module ShootR {

    export class ShipAnimationHandler {
        public static FULL_THRUST_AFTER: eg.TimeSpan = eg.TimeSpan.FromMilliseconds(400);

        private _thrustAnimation: ShipThrustAnimation;

        constructor(private _movementController: ShipMovementController, private _graphic: ShipGraphic, private _contentManager: eg.Content.ContentManager) {
            var thrustSpriteSheet: eg.Graphics.ImageSource = this._contentManager.GetImage("Thrust"),
                thrustStartSpriteSheet: eg.Graphics.ImageSource = this._contentManager.GetImage("ThrustStart");

            this._thrustAnimation = new ShipThrustAnimation(this._contentManager);

            this._graphic.AddChild(this._thrustAnimation);

            this._movementController.OnMove.Bind((event: eg.MovementControllers.IMoveEvent) => {
                if (event.Direction === "Forward") {
                    if (event.StartMoving) {
                        this._thrustAnimation.Play();
                    } else {
                        this._thrustAnimation.Stop();
                    }
                }
            });
        }

        public StopAllAnimations(): void {
            this._thrustAnimation.Stop();
        }

        public Update(gameTime: eg.GameTime): void {
            this._thrustAnimation.Update(gameTime);
        }
    }

}