function BulletManager(connection, payloadManager) {
    var that = this;

    that.bulletsInAir = {};

    that.UpdateBullets = function (bulletList) {
        var activeBullets = {},
            bulletCount = bulletList.length;

        for (var i = 0; i < bulletCount; i++) {
            var currentBullet = bulletList[i],
                id = currentBullet.ID;

            // If bullet exists then we need to move it, aka update it.
            if (that.bulletsInAir[id]) {
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