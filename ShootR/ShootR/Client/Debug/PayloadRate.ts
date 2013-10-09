/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="GameInformer.ts" />
/// <reference path="../Game.ts" />
/// <reference path="RateMonitor.ts" />

module ShootR.Debug {

    export class PayloadRate extends RateMonitor {
        public static TITLE: string = "Payload Rate"

        constructor(informer: GameInformer) {
            super(PayloadRate.TITLE, informer, 1000 / Game.GameConfiguration.gameConfig.DRAW_INTERVAL);
        }

        public LoadPayload(payload: Server.IPayloadData): void {
            this.MarkRate();
        }
    }

}