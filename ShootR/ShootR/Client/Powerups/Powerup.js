var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Powerup = (function (_super) {
    __extends(Powerup, _super);
    function Powerup(properties) {
        _super.call(this);
        this.UpdateProperties(properties);
    }
    Powerup.prototype.Update = function (gameTime) {
    };
    Powerup.prototype.Destroy = function () {
        this.Visible = false;
    };
    return Powerup;
})(Collidable);
//@ sourceMappingURL=Powerup.js.map
