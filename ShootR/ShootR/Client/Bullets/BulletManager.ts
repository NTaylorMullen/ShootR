/// <reference path="Bullet.ts" />

module ShootR {

    export class BulletManager {
        private _bullets: { [id: number]: Bullet };

        constructor(private _viewport: eg.Bounds.BoundingRectangle, private _scene: eg.Rendering.Scene2d, private _contentManager: eg.Content.ContentManager) {
            this._bullets = {};
        }

        public UpdateViewport(viewport: eg.Size2d): void {
            this._viewport.Size = viewport;
        }

        public LoadPayload(payload: Server.IPayloadData): void {
            var bulletPayload: Array<Server.IBulletData> = payload.Bullets,
                bullet: Server.IBulletData;

            for (var i = 0; i < bulletPayload.length; i++) {
                bullet = bulletPayload[i];

                if (!this._bullets[bullet.ID]) {
                    this._bullets[bullet.ID] = new Bullet(bullet, this._contentManager);
                    this._scene.Add(this._bullets[bullet.ID].Graphic);

                    this._bullets[bullet.ID].OnDisposed.Bind((bullet) => {
                        delete this._bullets[(<Bullet>bullet).ID];
                    });
                } else {
                    this._bullets[bullet.ID].LoadPayload(bullet);
                }

                if (bullet.Disposed) {
                    if (bullet.Collided) {
                        this._bullets[bullet.ID].MovementController.Position = bullet.CollidedAt;
                    }

                    this._bullets[bullet.ID].Destroy(bullet.Collided);
                }
            }
        }

        public Update(gameTime: eg.GameTime): void {
            // Update positions first
            for (var id in this._bullets) {
                this._bullets[id].Update(gameTime);
            }

            // Update positions first
            for (var id in this._bullets) {
                // Check for "in-bounds" to see what bullets we should destroy
                if (!this._bullets[id].Bounds.IntersectsRectangle(this._viewport)) {
                    this._bullets[id].Destroy(false);
                }
            }
        }
    }

}