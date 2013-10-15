/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Levels/ShipLevelManager.ts" />
/// <reference path="../ShipLifeController.ts" />
/// <reference path="StatusText.ts" />

module ShootR {

    export class ShipStatusTextGraphic extends eg.Graphics.Circle {
        public static HEALTH_INCREASE_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromRGB(122, 201, 67);
        public static HEALTH_DECREASE_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromRGB(237, 30, 121);
        public static EXPERIENCE_CHANGE_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromRGB(250, 182, 250);
        public static HEALTH_INCREASE_SIZE: number = 40;
        public static HEALTH_DECREASE_SIZE: number = 30;
        public static EXPERIENCE_INCREASE_SIZE: number = 40;
        public static EXPERIENCE_DECREASE_SIZE: number = 40;
        public static EXPERIENCE_FADE_DURATION: eg.TimeSpan = eg.TimeSpan.FromSeconds(3);

        private static _statusRemoval: (id: number, statuses: { [id: number]: StatusText }) => void = (id: number, statuses: { [id: number]: StatusText }) => {
            statuses[id].Dispose();
            delete statuses[id];
        };

        private _statuses: { [id: number]: StatusText };
        private _statusIds: number;
        private _lastHealth: number;
        private _lastLevel: number;
        private _lastExperience: number;
        private _lastExperienceToNextLevel: number;

        constructor(levelManager: ShipLevelManager, lifeController: ShipLifeController) {
            super(0, 0, 0, eg.Graphics.Color.Transparent);

            this._statusIds = 0;
            this._statuses = {};

            this._lastHealth = lifeController.Health;
            this._lastLevel = levelManager.Level;
            this._lastExperience = levelManager.Experience;
            this._lastExperienceToNextLevel = levelManager.ExperienceToNextLevel;

            lifeController.OnLifeChange.Bind((health: number, maxHealth: number) => {
                var diff = health - this._lastHealth;

                if (levelManager.Level === this._lastLevel && diff !== 0) {
                    if (diff < 0) {
                        this.Status(diff.toString(), ShipStatusTextGraphic.HEALTH_DECREASE_SIZE, ShipStatusTextGraphic.HEALTH_DECREASE_COLOR);
                    } else {
                        this.Status("+" + diff.toString(), ShipStatusTextGraphic.HEALTH_INCREASE_SIZE, ShipStatusTextGraphic.HEALTH_INCREASE_COLOR);
                    }

                    this._lastHealth = health;
                }
            });

            levelManager.OnExperienceChange.Bind((experience) => {
                if (typeof this._lastExperience === "undefined") {
                    this._lastExperience = experience;
                    this._lastExperienceToNextLevel = levelManager.ExperienceToNextLevel;
                } else {
                    var experienceChange: number = experience - this._lastExperience;;

                    if (levelManager.Level !== this._lastLevel) {
                        experienceChange += this._lastExperienceToNextLevel;
                        this._lastLevel = levelManager.Level;
                    }

                    if (experienceChange < 0) {
                        this.Status(experienceChange.toString() + " xp", ShipStatusTextGraphic.EXPERIENCE_DECREASE_SIZE, ShipStatusTextGraphic.EXPERIENCE_CHANGE_COLOR, ShipStatusTextGraphic.EXPERIENCE_FADE_DURATION, true);
                    } else {
                        this.Status("+" + experienceChange.toString() + " xp", ShipStatusTextGraphic.EXPERIENCE_INCREASE_SIZE, ShipStatusTextGraphic.EXPERIENCE_CHANGE_COLOR, ShipStatusTextGraphic.EXPERIENCE_FADE_DURATION, true);
                    }

                    this._lastExperience = experience;
                    this._lastExperienceToNextLevel = levelManager.ExperienceToNextLevel;
                }
            });
        }

        public Status(text: string, size: number, color: eg.Graphics.Color, fadeDuration?: eg.TimeSpan, reverseDirection?: boolean): void {
            var status: StatusText = new StatusText(text, size, color, fadeDuration, reverseDirection),
                id: number = this._statusIds++;

            status.OnDisposed.Bind((status: StatusText) => {
                status.Dispose();
                delete this._statuses[id];
            });

            this._statuses[id] = status;
            this.AddChild(status);
        }

        public Update(gameTime: eg.GameTime): void {
            for (var id in this._statuses) {
                this._statuses[id].Update(gameTime);
            }
        }

        public Dispose(): void {
            this._statuses = null;
            this._statusIds = null;
        }
    }

}