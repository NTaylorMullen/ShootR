/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Levels/ShipLevelManager.ts" />
/// <reference path="../ShipLifeController.ts" />
/// <reference path="StatusText.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var ShipStatusTextGraphic = (function (_super) {
        __extends(ShipStatusTextGraphic, _super);
        function ShipStatusTextGraphic(levelManager, lifeController) {
            var _this = this;
            _super.call(this, 0, 0, 0, eg.Graphics.Color.Transparent);

            this._statusIds = 0;
            this._statuses = {};

            this._lastHealth = lifeController.Health;
            this._lastLevel = levelManager.Level;
            this._lastExperience = levelManager.Experience;
            this._lastExperienceToNextLevel = levelManager.ExperienceToNextLevel;

            lifeController.OnLifeChange.Bind(function (health, maxHealth) {
                var diff = health - _this._lastHealth;

                if (levelManager.Level === _this._lastLevel && diff !== 0) {
                    if (diff < 0) {
                        _this.Status(diff.toString(), ShipStatusTextGraphic.HEALTH_DECREASE_SIZE, ShipStatusTextGraphic.HEALTH_DECREASE_COLOR);
                    } else {
                        _this.Status("+" + diff.toString(), ShipStatusTextGraphic.HEALTH_INCREASE_SIZE, ShipStatusTextGraphic.HEALTH_INCREASE_COLOR);
                    }

                    _this._lastHealth = health;
                }
            });

            levelManager.OnExperienceChange.Bind(function (experience) {
                if (typeof _this._lastExperience === "undefined") {
                    _this._lastExperience = experience;
                    _this._lastExperienceToNextLevel = levelManager.ExperienceToNextLevel;
                } else {
                    var experienceChange = experience - _this._lastExperience;
                    ;

                    if (levelManager.Level !== _this._lastLevel) {
                        experienceChange += _this._lastExperienceToNextLevel;
                        _this._lastLevel = levelManager.Level;
                    }

                    if (experienceChange < 0) {
                        _this.Status(experienceChange.toString() + " xp", ShipStatusTextGraphic.EXPERIENCE_DECREASE_SIZE, ShipStatusTextGraphic.EXPERIENCE_CHANGE_COLOR, ShipStatusTextGraphic.EXPERIENCE_FADE_DURATION, true);
                    } else {
                        _this.Status("+" + experienceChange.toString() + " xp", ShipStatusTextGraphic.EXPERIENCE_INCREASE_SIZE, ShipStatusTextGraphic.EXPERIENCE_CHANGE_COLOR, ShipStatusTextGraphic.EXPERIENCE_FADE_DURATION, true);
                    }

                    _this._lastExperience = experience;
                    _this._lastExperienceToNextLevel = levelManager.ExperienceToNextLevel;
                }
            });
        }
        ShipStatusTextGraphic.prototype.Status = function (text, size, color, fadeDuration, reverseDirection) {
            var _this = this;
            var status = new ShootR.StatusText(text, size, color, fadeDuration, reverseDirection), id = this._statusIds++;

            status.OnDisposed.Bind(function (status) {
                status.Dispose();
                delete _this._statuses[id];
            });

            this._statuses[id] = status;
            this.AddChild(status);
        };

        ShipStatusTextGraphic.prototype.Update = function (gameTime) {
            for (var id in this._statuses) {
                this._statuses[id].Update(gameTime);
            }
        };

        ShipStatusTextGraphic.prototype.Dispose = function () {
            this._statuses = null;
            this._statusIds = null;
        };
        ShipStatusTextGraphic.HEALTH_INCREASE_COLOR = eg.Graphics.Color.FromRGB(122, 201, 67);
        ShipStatusTextGraphic.HEALTH_DECREASE_COLOR = eg.Graphics.Color.FromRGB(237, 30, 121);
        ShipStatusTextGraphic.EXPERIENCE_CHANGE_COLOR = eg.Graphics.Color.FromRGB(250, 182, 250);
        ShipStatusTextGraphic.HEALTH_INCREASE_SIZE = 40;
        ShipStatusTextGraphic.HEALTH_DECREASE_SIZE = 30;
        ShipStatusTextGraphic.EXPERIENCE_INCREASE_SIZE = 40;
        ShipStatusTextGraphic.EXPERIENCE_DECREASE_SIZE = 40;
        ShipStatusTextGraphic.EXPERIENCE_FADE_DURATION = eg.TimeSpan.FromSeconds(3);

        ShipStatusTextGraphic._statusRemoval = function (id, statuses) {
            statuses[id].Dispose();
            delete statuses[id];
        };
        return ShipStatusTextGraphic;
    })(eg.Graphics.Circle);
    ShootR.ShipStatusTextGraphic = ShipStatusTextGraphic;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipStatusTextGraphic.js.map
