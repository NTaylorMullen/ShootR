/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
var ShootR;
(function (ShootR) {
    var Ability = (function () {
        function Ability(Name) {
            this.Name = Name;
            this.Active = false;
            this.ActivatedAt = null;
        }
        Ability.prototype.Activate = function () {
            this.Active = true;
            this.ActivatedAt = new Date();
        };

        Ability.prototype.Deactivate = function () {
            this.Active = false;
            this.ActivatedAt = null;
        };

        // Meant to be overridden
        Ability.prototype.Update = function (gameTime) {
        };
        return Ability;
    })();
    ShootR.Ability = Ability;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Ability.js.map
