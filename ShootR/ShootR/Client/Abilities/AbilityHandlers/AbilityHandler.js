function AbilityHandler(aList) {
    if (aList) {
        var that = this,
            abilityList = {};

        for (var i = aList.length - 1; i >= 0; i--) {
            abilityList[aList[i].Name] = aList[i];
        }

        that.Abilities = function () {
            return abilityList;
        }

        that.Ability = function (abilityName) {
            return abilityList[abilityName];
        }

        that.AddAbility = function (ability) {
            abilityList[ability.Name] = ability;
        }

        that.Activate = function (abilityName) {
            if (abilityList[abilityName] && !abilityList[abilityName].Active) {
                abilityList[abilityName].Activate();
                return true;
            }
            return false;
        }

        that.Deactivate = function (abilityName) {
            if (abilityList[abilityName] && abilityList[abilityName].Active) {
                abilityList[abilityName].Deactivate();
                return true;
            }
            return false;
        }

        that.UpdateAbilities = function (aList) {
            for (var abilityName in aList) {
                var dataActive = aList[abilityName],
                    myActive = abilityList[abilityName].Active;

                if (dataActive && !myActive) {
                    that.Activate(abilityName);
                }
                else if (!dataActive && myActive) {
                    that.Deactivate(abilityName);
                }
            }
        }

        that.Update = function (now) {
            for (var key in abilityList) {
                abilityList[key].Update(now);
            }
        }
    }
}