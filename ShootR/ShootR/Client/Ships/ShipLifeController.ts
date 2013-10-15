/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Common/LifeController.ts" />

module ShootR {

    export class ShipLifeController extends LifeController {
        public static START_LIFE: number = 100;
        public static BAD_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#ED1E79");
        public static HURT_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#FF931E");
        public static GOOD_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#7AC943");
        public static BAD_THRESHOLD: number = .3;
        public static HURT_THRESHOLD: number = .6;

        public Alive: boolean;
        public Health: number;
        public MaxHealth: number;

        constructor(payload: Server.IShipData) {
            super(payload.LifeController.Health, payload.MaxLife);
        }
    }

}