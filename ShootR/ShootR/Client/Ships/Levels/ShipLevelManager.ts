/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class ShipLevelManager {
        public Level: number;
        public Experience: number;
        public ExperienceToNextLevel: number;

        constructor(payload: Server.IShipData) {
            this.Level = payload.Level;
            this.OnLevelChange = new eg.EventHandler1<number>();
            this.OnExperienceChange = new eg.EventHandler2<number, number>();
        }

        public OnLevelChange: eg.EventHandler1<number>;
        public OnExperienceChange: eg.EventHandler2<number, number>;

        public LoadPayload(payload: Server.IShipData): void {
            if (payload.Level != this.Level) {
                this.Level = payload.Level;
                this.OnLevelChange.Trigger(this.Level);
            }
        }

        public UpdateExperience(experience: number, experienceToNextLevel: number): void {
            if (experience !== this.Experience || experienceToNextLevel !== this.ExperienceToNextLevel) {
                this.Experience = experience;
                this.ExperienceToNextLevel = experienceToNextLevel;
                this.OnExperienceChange.Trigger(experience, experienceToNextLevel);
            }
        }
    }

}