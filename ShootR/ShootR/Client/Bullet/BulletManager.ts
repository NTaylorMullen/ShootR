///<reference path="Bullet.ts" />

class BulletManager {
    public Bullets: any;

    constructor () {
        this.Bullets = {};
    }

    public UpdateBullets(bulletList: any[]): void {
        for (var i = 0; i < bulletList.length; i++) {
            var currentBullet: any = bulletList[i],
            id: number = currentBullet.ID;

            var movementController = currentBullet.MovementController;

            delete currentBullet.MovementController;

            // If bullet exists then we need to move it, aka update it.
            if (this.Bullets[id]) {
                this.Bullets[id].UpdateProperties(currentBullet);
            }
            else {
                this.Bullets[id] = new Bullet(currentBullet);
            }

            this.Bullets[id].MovementController.UpdateMovementController(movementController);

            // Ensure that the bullet has not yet been disposed
            if (this.Bullets[id].Disposed) {
                this.Bullets[id].Destroy();
                delete this.Bullets[id];
            }
            else {
                this.Bullets[id].Update();
            }
        }
    }

    public Update(gameTime: GameTime): void {
        for (var key in this.Bullets) {
            // Ensure that the Ship is in view
            if (CanvasContext.Camera.InView(this.Bullets[key]) && !this.Bullets[key].Disposed && !this.Bullets[key].ShouldDispose()) {
                this.Bullets[key].Update(gameTime);
                this.Bullets[key].Draw();
            }
            else { // Bullet is not in view
                this.Bullets[key].Destroy();
                delete this.Bullets[key];
            }
        }
    }
}