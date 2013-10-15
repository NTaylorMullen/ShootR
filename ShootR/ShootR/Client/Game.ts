/// <reference path="../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="Debug/DebugManager.ts" />
/// <reference path="Server/ServerAdapter.ts" />
/// <reference path="Ships/ShipManager.ts" />
/// <reference path="Bullets/BulletManager.ts" />
/// <reference path="Powerups/PowerupManager.ts" />
/// <reference path="User/UserShipManager.ts" />
/// <reference path="Configuration/ConfigurationManager.ts" />
/// <reference path="Space/Map.ts" />
/// <reference path="GameScreen.ts" />
/// <reference path="HUD/HUDManager.ts" />
/// <reference path="Ships/Graphics/ShipBodyGraphic.ts" />

module ShootR {

    export class Game extends eg.Game {
        public static GameConfiguration: ConfigurationManager;

        private _shipManager: ShipManager;
        private _bulletManager: BulletManager;
        private _powerupManager: PowerupManager;
        private _debugManager: Debug.DebugManager;
        private _bufferedViewport: eg.Bounds.BoundingRectangle;
        private _map: Map;
        private _hud: HUDManager;

        constructor(gameCanvas: HTMLCanvasElement, gameScreen: GameScreen, serverAdapter: Server.ServerAdapter, initializationData: Server.IClientInitialization) {
            super(gameCanvas);

            Game.GameConfiguration = new ConfigurationManager(initializationData.Configuration);

            this.Configuration.CollisionConfiguration.MinQuadTreeNodeSize = new eg.Size2d(75); // Size of a ship
            this.Configuration.CollisionConfiguration.InitialQuadTreeSize = new eg.Size2d(10125); // Initial Map Size x 2

            this._bufferedViewport = new eg.Bounds.BoundingRectangle(this.Scene.Camera.Position, this.Scene.Camera.Size.Add(GameScreen.SCREEN_BUFFER_AREA));
            this._shipManager = new ShipManager(this._bufferedViewport, this.Scene, this.CollisionManager, this.Content);
            this._shipManager.Initialize(new UserShipManager(initializationData.ShipID, this._shipManager, this.CollisionManager, this.Input, this.Scene.Camera, serverAdapter));
            this._bulletManager = new BulletManager(this._bufferedViewport, this.Scene, this.Content);
            this._powerupManager = new PowerupManager(this._bufferedViewport, this.Scene, this.Content);
            this._map = new Map(this.Scene, this.CollisionManager, this.Content, this.Input.Keyboard, serverAdapter);
            this._debugManager = new Debug.DebugManager(initializationData.ShipID, this, serverAdapter);
            this._hud = new HUDManager(initializationData, this._shipManager, this._map.AreaRenderer, this.Input.Keyboard, serverAdapter);

            serverAdapter.OnPayload.Bind((payload: Server.IPayloadData) => {
                this._shipManager.LoadPayload(payload);
                this._bulletManager.LoadPayload(payload);
                this._powerupManager.LoadPayload(payload);
                this._hud.LoadPayload(payload);
                this._debugManager.LoadPayload(payload);
            });

            gameScreen.OnResize.Bind((newSize: eg.Size2d) => {
                this._hud.OnScreenResize(newSize);
                this._bufferedViewport.Size = newSize.Add(GameScreen.SCREEN_BUFFER_AREA);
            });
        }

        public LoadContent(): void {
            this.Content.LoadImage("StarBackground", "/Images/bg_stars.png", 1000, 1000);
            this.Content.LoadImage("BulletExplosion", "/Images/SpriteSheets/explosion_1.png", 320, 320);
            this.Content.LoadImage("ShipExplosion", "/Images/SpriteSheets/explosion_2.png", 768, 640);
            this.Content.LoadImage("Bullet", "/Images/Laser.png", 13, 13);
            this.Content.LoadImage("Ship1", "/Images/Ships/ship_lvl1.png", 75, 75);
            this.Content.LoadImage("Ship3", "/Images/Ships/ship_lvl3.png", 75, 75);
            this.Content.LoadImage("Ship5", "/Images/Ships/ship_lvl5.png", 75, 75);
            this.Content.LoadImage("Ship7", "/Images/Ships/ship_lvl7.png", 75, 75);
            this.Content.LoadImage("Ship8", "/Images/Ships/ship_lvl8.png", 75, 75);
            this.Content.LoadImage("Ship9", "/Images/Ships/ship_lvl9.png", 75, 75);
            this.Content.LoadImage("Ship10", "/Images/Ships/ship_lvl10.png", 75, 75);
            this.Content.LoadImage("Ship12", "/Images/Ships/LaserCat.png", 75, 75);
            this.Content.LoadImage("Thrust", "/Images/SpriteSheets/thrust_basic.png", 468, 100);
            this.Content.LoadImage("ThrustStart", "/Images/SpriteSheets/thrust_start.png", 468, 100);
            this.Content.LoadImage("Boost", "/Images/SpriteSheets/thrusters-BOOST.png", 400, 150);
            this.Content.LoadImage("HealthPack", "/Images/SpriteSheets/health_pack.png", 450, 100);
            this.Content.LoadImage("ShipDamage1", "/Images/Ships/Damage/damage_1.png", 75, 75);
            this.Content.LoadImage("ShipDamage3", "/Images/Ships/Damage/damage_2.png", 75, 75);
            this.Content.LoadImage("ShipDamage5", "/Images/Ships/Damage/damage_3.png", 75, 75);
            this.Content.LoadImage("ShipDamage7", "/Images/Ships/Damage/damage_4.png", 75, 75);

            ShipBodyGraphic.LoadShipBodies(this.Content);
        }

        public Update(gameTime: eg.GameTime): void {
            this._bufferedViewport.Position = this.Scene.Camera.Position;

            this._shipManager.Update(gameTime);
            this._bulletManager.Update(gameTime);
            this._powerupManager.Update(gameTime);
            this._hud.Update(gameTime);
            this._debugManager.Update(gameTime);            
        }

        // Most drawing takes place via the Scene.
        // This method can be used to draw items to the game screen with raw canvas API's.
        // I don't do this because there's no need :), i only update the debug manager in order to track the draw rate.
        public Draw(context: CanvasRenderingContext2D): void {
            this._debugManager.Draw(context);
        }
    }

}