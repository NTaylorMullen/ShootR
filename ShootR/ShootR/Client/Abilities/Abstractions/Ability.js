var Ability = (function () {
    function Ability(Name) {
        this.Name = Name;
        this.Active = false;
        this.ActivatedAt = null;
    }
    Ability.prototype.Activate = function () {
        this.Active = true;
        this.ActivatedAt = new Date().getTime();
    };

    Ability.prototype.Deactivate = function () {
        this.Active = false;
        this.ActivatedAt = null;
    };

    // Meant to be overriden
    Ability.prototype.Update = function (now) {
    };
    return Ability;
})();
//# sourceMappingURL=Ability.js.map
