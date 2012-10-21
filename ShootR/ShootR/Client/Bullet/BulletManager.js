function BulletManager(payloadManager) {
    var that = this;

    that.Bullets = {};

    that.UpdateBullets = function (bulletList) {
        var bulletCount = bulletList.length;

        for (var i = 0; i < bulletCount; i++) {
            var currentBullet = bulletList[i],
                id = currentBullet.ID;

            // If bullet exists then we need to move it, aka update it.
            if (that.Bullets[id]) {
                that.Bullets[id].UpdateProperties(currentBullet);                
            }
            else {
                that.Bullets[id] = new Bullet(currentBullet);
            }

            // Ensure that the bullet has not yet been disposed
            if (that.Bullets[id].Disposed) {
                that.Bullets[id].Destroy();
                delete that.Bullets[id];
            }
            else {
                that.Bullets[id].Update();
                that.Bullets[id].Draw();
            }            
        }
    }

    that.Update = function (gameTime) {
        for (var key in that.Bullets) {
            // Ensure that the Ship is in view
            if (CanvasContext.Camera.InView(that.Bullets[key]) && !that.Bullets[key].Disposed && !that.Bullets[key].ShouldDispose()) {
                that.Bullets[key].Update(gameTime);
                that.Bullets[key].Draw();
            }
            else { // Bullet is not in view
                that.Bullets[key].Destroy();
                delete that.Bullets[key];
            }
        }
    }
}