/// <reference path="Bullet.ts" />
var ShootR;
(function (ShootR) {
    var BulletManager = (function () {
        function BulletManager(_viewport, _scene, _contentManager) {
            this._viewport = _viewport;
            this._scene = _scene;
            this._contentManager = _contentManager;
            this._bullets = {};
        }
        BulletManager.prototype.UpdateViewport = function (viewport) {
            this._viewport.Size = viewport;
        };

        BulletManager.prototype.LoadPayload = function (payload) {
            var _this = this;
            var bulletPayload = payload.Bullets, bullet;

            for (var i = 0; i < bulletPayload.length; i++) {
                bullet = bulletPayload[i];

                if (!this._bullets[bullet.ID]) {
                    this._bullets[bullet.ID] = new ShootR.Bullet(bullet, this._contentManager);
                    this._scene.Add(this._bullets[bullet.ID].Graphic);

                    this._bullets[bullet.ID].OnDisposed.Bind(function (bullet) {
                        delete _this._bullets[(bullet).ID];
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
        };

        BulletManager.prototype.Update = function (gameTime) {
            for (var id in this._bullets) {
                this._bullets[id].Update(gameTime);
            }

            for (var id in this._bullets) {
                if (!this._bullets[id].Bounds.IntersectsRectangle(this._viewport)) {
                    this._bullets[id].Destroy(false);
                }
            }
        };
        return BulletManager;
    })();
    ShootR.BulletManager = BulletManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=BulletManager.js.map
