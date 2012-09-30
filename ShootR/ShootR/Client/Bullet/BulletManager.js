function BulletManager(connection, payloadManager) {
    var that = this;

    that.bulletsInAir = {};

    that.UpdateBullets = function (bulletList) {
        var bulletCount = bulletList.length;

        for (var i = 0; i < bulletCount; i++) {
            var currentBullet = bulletList[i],
                id = currentBullet.ID;

            // If bullet exists then we need to move it, aka update it.
            if (that.bulletsInAir[id]) {
                that.bulletsInAir[id].UpdateProperties(currentBullet);                
            }
            else {
                that.bulletsInAir[id] = new Bullet(currentBullet);
            }

            // Ensure that the bullet has not yet been disposed
            if (that.bulletsInAir[id].Disposed) {
                that.bulletsInAir[id].Destroy();
                delete that.bulletsInAir[key];
            }
            else {
                that.bulletsInAir[id].Draw();
            }            
        }
    }

    that.Update = function (gameTime) {
        for (var key in that.bulletsInAir) {
            // Ensure that the Ship is in view
            if (CanvasContext.Camera.InView(that.bulletsInAir[key])) {
                that.bulletsInAir[key].Update(gameTime);
            }
            else { // Bullet is not in view
                delete that.bulletsInAir[key];
            }
        }
    }
}