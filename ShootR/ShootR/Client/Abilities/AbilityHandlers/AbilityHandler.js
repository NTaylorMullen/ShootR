var AbilityHandler = (function () {
    function AbilityHandler(aList) {
        this.abilityList = {
        };
        for(var i = aList.length - 1; i >= 0; i--) {
            this.abilityList[aList[i].Name] = aList[i];
        }
    }
    AbilityHandler.prototype.Abilities = function () {
        return this.abilityList;
    };
    AbilityHandler.prototype.Ability = function (abilityName) {
        return this.abilityList[abilityName];
    };
    AbilityHandler.prototype.AddAbility = function (ability) {
        this.abilityList[ability.Name] = ability;
    };
    AbilityHandler.prototype.Activate = function (abilityName) {
        if(this.abilityList[abilityName] && !this.abilityList[abilityName].Active) {
            this.abilityList[abilityName].Activate();
            return true;
        }
        return false;
    };
    AbilityHandler.prototype.Deactivate = function (abilityName) {
        if(this.abilityList[abilityName] && this.abilityList[abilityName].Active) {
            this.abilityList[abilityName].Deactivate();
            return true;
        }
        return false;
    };
    AbilityHandler.prototype.UpdateAbilities = function (aList) {
        for(var abilityName in aList) {
            var dataActive = aList[abilityName];
            var myActive = this.abilityList[abilityName].Active;

            if(dataActive && !myActive) {
                this.Activate(abilityName);
            } else {
                if(!dataActive && myActive) {
                    this.Deactivate(abilityName);
                }
            }
        }
    };
    AbilityHandler.prototype.Update = function (now) {
        for(var key in this.abilityList) {
            this.abilityList[key].Update(now);
        }
    };
    return AbilityHandler;
})();
//@ sourceMappingURL=AbilityHandler.js.map
