/// <reference path="../../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ability.ts" />
var ShootR;
(function (ShootR) {
    var AbilityHandler = (function () {
        function AbilityHandler(aList) {
            this._abilityList = {};
            for (var i = aList.length - 1; i >= 0; i--) {
                this._abilityList[aList[i].Name] = aList[i];
            }
        }
        AbilityHandler.prototype.Abilities = function () {
            return this._abilityList;
        };

        AbilityHandler.prototype.Ability = function (abilityName) {
            return this._abilityList[abilityName];
        };

        AbilityHandler.prototype.AddAbility = function (ability) {
            this._abilityList[ability.Name] = ability;
        };

        AbilityHandler.prototype.Activate = function (abilityName) {
            if (this._abilityList[abilityName]) {
                this._abilityList[abilityName].Activate();
                return true;
            }
            return false;
        };

        AbilityHandler.prototype.Deactivate = function (abilityName) {
            if (this._abilityList[abilityName] && this._abilityList[abilityName].Active) {
                this._abilityList[abilityName].Deactivate();
                return true;
            }
            return false;
        };

        AbilityHandler.prototype.UpdateAbilities = function (aList) {
            for (var abilityName in aList) {
                var dataActive = aList[abilityName], myActive = this._abilityList[abilityName].Active;

                if (dataActive && !myActive) {
                    this.Activate(abilityName);
                } else if (!dataActive && myActive) {
                    this.Deactivate(abilityName);
                }
            }
        };

        AbilityHandler.prototype.Update = function (gameTime) {
            for (var key in this._abilityList) {
                this._abilityList[key].Update(gameTime);
            }
        };
        return AbilityHandler;
    })();
    ShootR.AbilityHandler = AbilityHandler;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=AbilityHandler.js.map
