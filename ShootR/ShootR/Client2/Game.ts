/// <reference path="../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="Server/ServerAdapter.ts" />
/// <reference path="Ships/ShipManager.ts" />
/// <reference path="Bullets/BulletManager.ts" />
/// <reference path="Ships/UserShipManager.ts" />
/// <reference path="Configuration/ConfigurationManager.ts" />
/// <reference path="Space/Map.ts" />
/// <reference path="GameScreen.ts" />

module ShootR {

    export class Game extends eg.Game {
        private _payloads: Array<Server.IPayloadData>;
        private _configuration: ConfigurationManager;
        private _shipManager: ShipManager;
        private _bulletManager: BulletManager;
        private _map: Map;

        constructor(gameCanvas: HTMLCanvasElement, gameScreen: GameScreen, serverAdapter: Server.ServerAdapter, initializationData: Server.IClientInitialization) {
            super(gameCanvas);

            this.Configuration.UpdateRate = 1000 / initializationData.Configuration.gameConfig.UPDATE_INTERVAL;

            this._payloads = new Array<Server.IPayloadData>();
            this._configuration = new ConfigurationManager(initializationData.Configuration);
            this._shipManager = new ShipManager(this.Scene.Camera, this.Scene, this.CollisionManager, this.Content);
            this._shipManager.Initialize(new UserShipManager(initializationData.ShipID, this._shipManager, this.Input, this.Scene.Camera, serverAdapter));
            this._bulletManager = new BulletManager(this.Scene.Camera, this.Scene, this.Content);
            this._map = new Map(this.Scene, this.CollisionManager);

            serverAdapter.OnPayload.Bind((payload: Server.IPayloadData) => {
                this._shipManager.LoadPayload(payload);
                this._bulletManager.LoadPayload(payload);
            });

            /*this._shipManager.LoadPayload([<any>{
                ID: initializationData.ShipID,
                Level: 1,
                MovementController: {
                    Moving: {
                        Forward: false,
                        Backward: false,
                        RotatingLeft: false,
                        RotatingRight: false
                    },
                    Forces: eg.Vector2d.Zero,
                    Mass: ShipMovementController.MASS,
                    Rotation: 0,
                    Position: new eg.Vector2d(500, 500),
                    Velocity: eg.Vector2d.Zero
                },
                Abilities: null,
                Collided: null,
                CollidedAt: null,
                Disposed: false,
                MaxLife: 10000,
                LifeController: null,
                Name: "Taylor"
            }]);*/
        }

        public LoadContent(): void {
            this.Content.LoadImage("BulletExplosion", "/Images/SpriteSheets/explosion_1.png", 320, 320);
            this.Content.LoadImage("BigExplosion", "/Images/SpriteSheets/explosion_2.png", 768, 640);
            this.Content.LoadImage("Bullet", "/Images/Laser.png", 13, 13);
            this.Content.LoadImage("Ship1", "/Images/Ships/ship_lvl1.png", 75, 75);
            this.Content.LoadImage("Ship2", "/Images/Ships/ship_lvl2.png", 75, 75);
            this.Content.LoadImage("Ship3", "/Images/Ships/ship_lvl3.png", 75, 75);
            this.Content.LoadImage("Ship4", "/Images/Ships/ship_lvl4.png", 75, 75);
            this.Content.LoadImage("Ship5", "/Images/Ships/ship_lvl5.png", 75, 75);
            this.Content.LoadImage("Ship6", "/Images/Ships/ship_lvl6.png", 75, 75);
            this.Content.LoadImage("Ship7", "/Images/Ships/ship_lvl7.png", 75, 75);
            this.Content.LoadImage("Ship8", "/Images/Ships/ship_lvl8.png", 75, 75);
            this.Content.LoadImage("Ship9", "/Images/Ships/ship_lvl9.png", 75, 75);
            this.Content.LoadImage("Ship10", "/Images/Ships/ship_lvl10.png", 75, 75);
            this.Content.LoadImage("Ship11", "/Images/Ships/ship_lvl11.png", 75, 75);
            this.Content.LoadImage("Ship12", "/Images/Ships/LaserCat.png", 75, 75);
            this.Content.LoadImage("Ship13", "/Images/Ships/ship_lvl13.png", 75, 75);
            this.Content.LoadImage("Thrust", "/Images/SpriteSheets/thrust_basic.png", 468, 100);
            this.Content.LoadImage("ThrustStart", "/Images/SpriteSheets/thrust_start.png", 468, 100);
            this.Content.LoadImage("Boost", "/Images/SpriteSheets/thrusters-BOOST.png", 400, 150);
            this.Content.LoadImage("HealthPack", "/Images/SpriteSheets/health_pack.png", 450, 100);
            this.Content.LoadImage("ShipDamage1", "/Images/Ships/Damage/damage_1.png", 75, 75);
            this.Content.LoadImage("ShipDamage3", "/Images/Ships/Damage/damage_2.png", 75, 75);
            this.Content.LoadImage("ShipDamage5", "/Images/Ships/Damage/damage_3.png", 75, 75);
            this.Content.LoadImage("ShipDamage7", "/Images/Ships/Damage/damage_4.png", 75, 75);
        }

        public Update(gameTime: eg.GameTime): void {
            this._shipManager.Update(gameTime);
            this._bulletManager.Update(gameTime);
        }
    }

}