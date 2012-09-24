function BulletManager(connection) {
    var that = this;

    that.bulletsInAir = {};

    that.UpdateBullets = function (bullet_list) {
        var activeBullets = {}
        for (var i = 0; i < bullet_list.length; i++) {
            var id = bullet_list[i].ID;

            // If bullet exists then we need to move it, aka update it.
            if ($(that.bulletsInAir[id]).length > 0) {
                that.bulletsInAir[id].UpdateProperties(bullet_list[i]);
                that.bulletsInAir[id].Draw();
            }
            else {
                that.bulletsInAir[id] = new Bullet(bullet_list[i]);
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