function Ability(Name) {
    if (Name) {
        var that = this;

        that.Active = false;
        that.Name = Name;
        that.ActivatedAt = false;

        that.Activate = function () {
            that.Active = true;
            that.ActivatedAt = new Date().getTime();
        }

        that.Deactivate = function () {
            that.ActivatedAt = false;
            that.Active = false;
        }
    }
}