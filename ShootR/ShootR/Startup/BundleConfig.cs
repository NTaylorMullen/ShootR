using System.Web.Optimization;

namespace ShootR
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jqueryjs")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/jquery.cookie.js")
                .Include("~/Scripts/jquery.animate-colors-min.js")
                .Include("~/Scripts/jquery-ui-{version}.js")
                .Include("~/Scripts/shortcut.js"));
            bundles.Add(new StyleBundle("~/bundles/jquerycss")
                .Include("~/Styles/jquery-ui-{version}.css"));

            bundles.Add(new ScriptBundle("~/bundles/signalr")
                .Include("~/Scripts/jquery.signalr-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrapjs")
                .Include("~/Scripts/bootstrap.min.js"));
            bundles.Add(new StyleBundle("~/bundles/bootstrapcss")
                .Include("~/Styles/bootstrap.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/gamejs")
                .Include("~/Scripts/endgate-{version}.js")
                .Include("~/Client/Utilities/UtilityFunctions.js")
                .Include("~/Client/Common/Animation.js")
                .Include("~/Client/Common/LifeController.js")
                .Include("~/Client/Server/PayloadDecompressor.js")
                .Include("~/Client/Server/ServerConnectionManager.js")
                .Include("~/Client/Server/ServerAdapter.js")
                .Include("~/Client/Configuration/ConfigurationManager.js")
                .Include("~/Client/GameScreen.js")
                .Include("~/Client/Space/MapBoundary.js")
                .Include("~/Client/Space/Area.js")
                .Include("~/Client/Space/AreaRenderer.js")
                .Include("~/Client/Space/Map.js")
                .Include("~/Client/Powerups/Graphics/HealthPackGraphic.js")
                .Include("~/Client/Powerups/Powerup.js")
                .Include("~/Client/Powerups/HealthPack.js")
                .Include("~/Client/Powerups/PowerupManager.js")
                .Include("~/Client/Bullets/BulletGraphic.js")
                .Include("~/Client/Bullets/BulletMovementController.js")
                .Include("~/Client/Bullets/Animations/BulletAnimationHandler.js")
                .Include("~/Client/Bullets/Animations/BulletExplosionAnimation.js")
                .Include("~/Client/Bullets/Bullet.js")
                .Include("~/Client/Bullets/BulletManager.js")
                .Include("~/Client/Ships/Abilities/Ability.js")
                .Include("~/Client/Ships/Abilities/MovementAbility.js")
                .Include("~/Client/Ships/Abilities/Boost.js")
                .Include("~/Client/Ships/Abilities/AbilityHandlers/AbilityHandler.js")
                .Include("~/Client/Ships/Abilities/AbilityHandlers/ShipAbilityHandler.js")
                .Include("~/Client/Ships/Graphics/ShipLifeGraphic.js")
                .Include("~/Client/Ships/Graphics/ShipDamageGraphic.js")
                .Include("~/Client/Ships/Graphics/ShipBodyGraphic.js")
                .Include("~/Client/Ships/Graphics/ShipNameGraphic.js")
                .Include("~/Client/Ships/Graphics/ShipGraphic.js")
                .Include("~/Client/Ships/Graphics/StatusText.js")
                .Include("~/Client/Ships/Graphics/ShipStatusTextGraphic.js")
                .Include("~/Client/Ships/Animations/ShipAnimationHandler.js")
                .Include("~/Client/Ships/Animations/ShipBoostAnimation.js")
                .Include("~/Client/Ships/Animations/ShipThrustAnimation.js")
                .Include("~/Client/Ships/Animations/ShipDeathAnimation.js")
                .Include("~/Client/Ships/ShipInterpolationManager.js")
                .Include("~/Client/Ships/ShipMovementController.js")
                .Include("~/Client/Ships/ShipFireController.js")
                .Include("~/Client/Ships/ShipInputController.js")
                .Include("~/Client/Ships/ShipLifeController.js")
                .Include("~/Client/Ships/Levels/ShipLevelManager.js")
                .Include("~/Client/Ships/Ship.js")
                .Include("~/Client/User/UserCameraController.js")
                .Include("~/Client/User/LatencyResolver.js")
                .Include("~/Client/User/UserShipManager.js")
                .Include("~/Client/Ships/ShipManager.js")
                .Include("~/Client/Debug/RateMonitor.js")
                .Include("~/Client/Debug/UpdateRate.js")
                .Include("~/Client/Debug/DrawRate.js")
                .Include("~/Client/Debug/PayloadRate.js")
                .Include("~/Client/Debug/GameInformer.js")
                .Include("~/Client/Debug/ServerGhost.js")
                .Include("~/Client/Debug/ConnectionMonitor.js")
                .Include("~/Client/Debug/DebugManager.js")
                .Include("~/Client/HUD/UserInformationManager.js")
                .Include("~/Client/HUD/NotificationManager.js")
                .Include("~/Client/HUD/DeathScreen.js")
                .Include("~/Client/HUD/LeaderboardManager.js")
                .Include("~/Client/HUD/EnvironmentMonitor.js")
                .Include("~/Client/HUD/RankingsManager.js")
                .Include("~/Client/HUD/ExperienceMonitor.js")
                .Include("~/Client/HUD/HealthMonitor.js")
                .Include("~/Client/HUD/ShipStatMonitor.js")
                .Include("~/Client/HUD/HUDManager.js")
                .Include("~/Client/HUD/Chat.js")
                .Include("~/Client/Game.js")
                .Include("~/Client/Main.js"));

            bundles.Add(new StyleBundle("~/bundles/gamecss")
                .Include("~/Styles/game.css")
                .Include("~/Styles/chat.css")
                .Include("~/Styles/gameHUD.css")
                .Include("~/Styles/popups.css"));
        }
    }
}