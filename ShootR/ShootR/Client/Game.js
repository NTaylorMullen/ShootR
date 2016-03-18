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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(gameCanvas, gameScreen, serverAdapter, initializationData) {
            var _this = this;
            _super.call(this, gameCanvas);

            Game.GameConfiguration = new ShootR.ConfigurationManager(initializationData.Configuration);

            this.Configuration.CollisionConfiguration.MinQuadTreeNodeSize = new eg.Size2d(75);
            this.Configuration.CollisionConfiguration.InitialQuadTreeSize = new eg.Size2d(10125);

            this._bufferedViewport = new eg.Bounds.BoundingRectangle(this.Scene.Camera.Position, this.Scene.Camera.Size.Add(ShootR.GameScreen.SCREEN_BUFFER_AREA));
            this._shipManager = new ShootR.ShipManager(this._bufferedViewport, this.Scene, this.CollisionManager, this.Content);
            this._shipManager.Initialize(new ShootR.UserShipManager(initializationData.ShipID, this._shipManager, this.CollisionManager, this.Input, this.Scene.Camera, serverAdapter));
            this._bulletManager = new ShootR.BulletManager(this._bufferedViewport, this.Scene, this.Content);
            this._powerupManager = new ShootR.PowerupManager(this._bufferedViewport, this.Scene, this.Content);
            this._map = new ShootR.Map(this.Scene, this.CollisionManager, this.Content, this.Input.Keyboard, serverAdapter);
            this._debugManager = new ShootR.Debug.DebugManager(initializationData.ShipID, this, serverAdapter);
            this._hud = new ShootR.HUDManager(initializationData, this._shipManager, this._map.AreaRenderer, this.Input.Keyboard, serverAdapter);

            serverAdapter.OnPayload.Bind(function (payload) {
                _this._shipManager.LoadPayload(payload);
                _this._bulletManager.LoadPayload(payload);
                _this._powerupManager.LoadPayload(payload);
                _this._hud.LoadPayload(payload);
                _this._debugManager.LoadPayload(payload);
            });

            gameScreen.OnResize.Bind(function (newSize) {
                _this._hud.OnScreenResize(newSize);
                _this._bufferedViewport.Size = newSize.Add(ShootR.GameScreen.SCREEN_BUFFER_AREA);
            });
        }
        Game.prototype.LoadContent = function () {
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

            ShootR.ShipBodyGraphic.LoadShipBodies(this.Content);
        };

        Game.prototype.Update = function (gameTime) {
            this._bufferedViewport.Position = this.Scene.Camera.Position;

            this._shipManager.Update(gameTime);
            this._bulletManager.Update(gameTime);
            this._powerupManager.Update(gameTime);
            this._hud.Update(gameTime);
            this._debugManager.Update(gameTime);
        };

        // Most drawing takes place via the Scene.
        // This method can be used to draw items to the game screen with raw canvas API's.
        // I don't do this because there's no need :), i only update the debug manager in order to track the draw rate.
        Game.prototype.Draw = function (context) {
            this._debugManager.Draw(context);
        };
        return Game;
    })(eg.Game);
    ShootR.Game = Game;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Game.js.map
