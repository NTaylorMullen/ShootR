function Powerup(properties) {
    Collidable.call(this);
    var that = this;

    that.UpdateProperties(properties);

    that.Update = function (gameTime) {
    }

    that.Destroy = function () {
        that.Visible = false;
    }
}

Powerup.prototype = new Collidable();
