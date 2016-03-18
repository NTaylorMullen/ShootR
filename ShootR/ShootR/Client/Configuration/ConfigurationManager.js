/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../Ships/ShipFireController.ts" />
/// <reference path="../Ships/ShipMovementController.ts" />
/// <reference path="../Server/IConfigurationDefinitions.ts" />
/// <reference path="../Ships/Abilities/Boost.ts" />
/// <reference path="../User/UserShipManager.ts" />
/// <reference path="../User/LatencyResolver.ts" />
/// <reference path="../Bullets/Bullet.ts" />
/// <reference path="../Ships/ShipLifeController.ts" />
/// <reference path="../HUD/LeaderboardManager.ts" />
/// <reference path="../HUD/DeathScreen.ts" />
/// <reference path="../GameScreen.ts" />
/// <reference path="../Powerups/HealthPack.ts" />
/// <reference path="../Game.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
var ShootR;
(function (ShootR) {
    var ConfigurationManager = (function () {
        function ConfigurationManager(configuration) {
            // Update the prototypes from the config
            ShootR.Ship.SIZE = new eg.Size2d(configuration.shipConfig.WIDTH, configuration.shipConfig.HEIGHT);
            ShootR.Ship.DAMAGE_INCREASE_RATE = configuration.shipConfig.DAMAGE_INCREASE_RATE;

            ShootR.ShipFireController.MIN_FIRE_RATE = eg.TimeSpan.FromMilliseconds(configuration.shipConfig.MIN_FIRE_RATE);

            ShootR.ShipMovementController.DRAG_AREA = configuration.shipMovementControllerConfig.DRAG_AREA;
            ShootR.ShipMovementController.DRAG_COEFFICIENT = configuration.shipMovementControllerConfig.DRAG_COEFFICIENT;
            ShootR.ShipMovementController.ENGINE_POWER = configuration.shipMovementControllerConfig.ENGINE_POWER;
            ShootR.ShipMovementController.MASS = configuration.shipMovementControllerConfig.MASS;
            ShootR.ShipMovementController.ROTATE_SPEED = configuration.shipMovementControllerConfig.ROTATE_SPEED * .0174532925;

            ShootR.ShipLifeController.START_LIFE = configuration.shipConfig.START_LIFE;

            ShootR.Boost.DURATION = eg.TimeSpan.FromMilliseconds(configuration.abilityConfig.BOOST_DURATION);
            ShootR.Boost.SPEED_INCREASE = configuration.abilityConfig.BOOST_SPEED_INCREASE;

            ShootR.Map.SIZE = new eg.Size2d(configuration.mapConfig.WIDTH, configuration.mapConfig.HEIGHT);
            ShootR.Map.BARRIER_DEPRECATION = configuration.mapConfig.BARRIER_DEPRECATION;

            ShootR.GameScreen.MAX_SCREEN_HEIGHT = configuration.screenConfig.MAX_SCREEN_HEIGHT;
            ShootR.GameScreen.MAX_SCREEN_WIDTH = configuration.screenConfig.MAX_SCREEN_WIDTH;
            ShootR.GameScreen.MIN_SCREEN_HEIGHT = configuration.screenConfig.MIN_SCREEN_HEIGHT;
            ShootR.GameScreen.MIN_SCREEN_WIDTH = configuration.screenConfig.MIN_SCREEN_WIDTH;
            ShootR.GameScreen.SCREEN_BUFFER_AREA = configuration.screenConfig.SCREEN_BUFFER_AREA;

            ShootR.Bullet.BULLET_DIE_AFTER = eg.TimeSpan.FromMilliseconds(configuration.gameConfig.BULLET_DIE_AFTER);
            ShootR.Bullet.SIZE = new eg.Size2d(configuration.bulletConfig.WIDTH, configuration.bulletConfig.HEIGHT);

            ShootR.HealthPack.SIZE = new eg.Size2d(configuration.healthPackConfig.WIDTH, configuration.healthPackConfig.HEIGHT);
            ShootR.HealthPack.LIFE_SPAN = eg.TimeSpan.FromMilliseconds(configuration.healthPackConfig.LIFE_SPAN);

            ShootR.LeaderboardManager.LEADERBOARD_SIZE = configuration.leaderboardConfig.LEADERBOARD_SIZE;

            ShootR.DeathScreen.RESPAWN_TIMER = eg.TimeSpan.FromSeconds(configuration.gameConfig.RESPAWN_TIMER);

            $.extend(this, configuration);
            ShootR.LatencyResolver.REQUEST_PING_EVERY = configuration.gameConfig.REQUEST_PING_EVERY;
        }
        return ConfigurationManager;
    })();
    ShootR.ConfigurationManager = ConfigurationManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ConfigurationManager.js.map
