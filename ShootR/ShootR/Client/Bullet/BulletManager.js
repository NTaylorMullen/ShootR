function BulletManager(connection) {
    var that = this;
    var bulletsInAir = {};

    that.UpdateBullets = function (bullet_list) {
        var activeBullets = {}
        for (var i = 0; i < bullet_list.length; i++) {
            var id = bullet_list[i].ID;

            // If bullet exists then we need to move it, aka update it.
            if ($(bulletsInAir[id]).length > 0) {
                bulletsInAir[id].UpdateProperties(bullet_list[i]);
                bulletsInAir[id].Draw();
            }
            else {
                bulletsInAir[id] = new Bullet(bullet_list[i]);
            }

            activeBullets[id] = true;
        }

        for (var key in bulletsInAir) {
            if (!activeBullets[key]) {
                bulletsInAir[key].Destroy();
                delete bulletsInAir[key];
            }
        }
    }

    that.Update = function (gameTime) {
        for (var key in bulletsInAir) {
            bulletsInAir[key].Update(gameTime);
        }
    }
}