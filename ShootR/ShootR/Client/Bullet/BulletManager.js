function BulletManager(connection, payloadManager) {
    var that = this;

    that.bulletsInAir = {};

    that.UpdateBullets = function (bulletList) {
        var activeBullets = {}
        for (var i = 0; i < bulletList.length; i++) {
            var currentBullet = payloadManager.DecompressBullet(bulletList[i]);
            var id = currentBullet.ID;

            // If bullet exists then we need to move it, aka update it.
            if ($(that.bulletsInAir[id]).length > 0) {
                that.bulletsInAir[id].UpdateProperties(currentBullet);
                that.bulletsInAir[id].Draw();
            }
            else {
                that.bulletsInAir[id] = new Bullet(currentBullet);
            }

            activeBullets[id] = true;
        }

        for (var key in that.bulletsInAir) {
            if (!activeBullets[key]) {
                that.bulletsInAir[key].Destroy();
                delete that.bulletsInAir[key];
            }
        }
    }

    that.Update = function (gameTime) {
        for (var key in that.bulletsInAir) {
            that.bulletsInAir[key].Update(gameTime);
        }
    }
}