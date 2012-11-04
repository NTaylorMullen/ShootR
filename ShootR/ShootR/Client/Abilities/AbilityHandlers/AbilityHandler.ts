/// <reference path="../Abstractions/Ability.ts" />

class AbilityHandler {
    private abilityList: any = {};

    constructor (aList: Ability[]) {
        for (var i = aList.length - 1; i >= 0; i--) {
            this.abilityList[aList[i].Name] = aList[i];
        }
    }

    public Abilities(): any {
        return this.abilityList;
    }

    public Ability(abilityName: string): Ability {
        return this.abilityList[abilityName];
    }

    public AddAbility(ability: Ability): void {
        this.abilityList[ability.Name] = ability;
    }

    public Activate(abilityName: string): bool {
        if (this.abilityList[abilityName] && !this.abilityList[abilityName].Active) {
            this.abilityList[abilityName].Activate();
            return true;
        }
        return false;
    }

    public Deactivate(abilityName: string): bool {
        if (this.abilityList[abilityName] && this.abilityList[abilityName].Active) {
            this.abilityList[abilityName].Deactivate();
            return true;
        }
        return false;
    }

    public UpdateAbilities(aList: any): void {
        for (var abilityName in aList) {
            var dataActive = aList[abilityName],
                myActive = this.abilityList[abilityName].Active;

            if (dataActive && !myActive) {
                this.Activate(abilityName);
            }
            else if (!dataActive && myActive) {
                this.Deactivate(abilityName);
            }
        }
    }

    public Update(now: Date): void {
        for (var key in this.abilityList) {
            this.abilityList[key].Update(now);
        }
    }
}