/// <reference path="Bullet.ts" />
/// <reference path="../Utilities/GameTime.ts" />
/// <reference path="../Space/CanvasRenderer.ts" />
/// <reference path="../Interfaces/PayloadDefinitions.d.ts" />
var BulletManager = (function () {
    function BulletManager() {
        this.Bullets = {};
    }
    BulletManager.prototype.UpdateBullets = function (bulletList) {
        for (var i = 0; i < bulletList.length; i++) {
            var currentBullet = bulletList[i], id = currentBullet.ID;

            var movementController = currentBullet.MovementController;

            delete currentBullet.MovementController;

            if (this.Bullets[id]) {
                this.Bullets[id].UpdateProperties(currentBullet);
            } else {
                this.Bullets[id] = new Bullet(currentBullet);
            }

            this.Bullets[id].MovementController.UpdateMovementController(movementController);

            if (this.Bullets[id].Disposed) {
                this.Bullets[id].Destroy();
                delete this.Bullets[id];
            } else {
                this.Bullets[id].Update();
            }
        }
    };

    BulletManager.prototype.Update = function (gameTime) {
        for (var key in this.Bullets) {
            if (CanvasContext.Camera.InView(this.Bullets[key]) && !this.Bullets[key].Disposed && !this.Bullets[key].ShouldDispose()) {
                this.Bullets[key].Update(gameTime);
                this.Bullets[key].Draw();
            } else {
                this.Bullets[key].Destroy();
                delete this.Bullets[key];
            }
        }
    };
    return BulletManager;
})();
//# sourceMappingURL=BulletManager.js.map
