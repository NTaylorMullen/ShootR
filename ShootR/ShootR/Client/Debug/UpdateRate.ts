/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="GameInformer.ts" />
/// <reference path="RateMonitor.ts" />

module ShootR.Debug {

    export class UpdateRate extends RateMonitor {
        public static TITLE: string = "Update Rate"

        constructor(informer: GameInformer, game: eg.Game) {
            super(UpdateRate.TITLE, informer, game.Configuration.UpdateRate);
        }

        public Update(gameTime: eg.GameTime): void {
            this.MarkRate();

            super.Update(gameTime);
        }
    }

}