/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Server/IPayloadDefinitions.ts" />
var ShootR;
(function (ShootR) {
    var ShipLevelManager = (function () {
        function ShipLevelManager(payload) {
            this.Level = payload.Level;
            this.OnLevelChange = new eg.EventHandler1();
            this.OnExperienceChange = new eg.EventHandler2();
        }
        ShipLevelManager.prototype.LoadPayload = function (payload) {
            if (payload.Level != this.Level) {
                this.Level = payload.Level;
                this.OnLevelChange.Trigger(this.Level);
            }
        };

        ShipLevelManager.prototype.UpdateExperience = function (experience, experienceToNextLevel) {
            if (experience !== this.Experience || experienceToNextLevel !== this.ExperienceToNextLevel) {
                this.Experience = experience;
                this.ExperienceToNextLevel = experienceToNextLevel;
                this.OnExperienceChange.Trigger(experience, experienceToNextLevel);
            }
        };
        return ShipLevelManager;
    })();
    ShootR.ShipLevelManager = ShipLevelManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipLevelManager.js.map
