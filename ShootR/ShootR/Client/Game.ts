/// <reference path="Utilities/GameTime.ts" />
/// <reference path="Bullet/BulletManager.ts" />
/// <reference path="Powerups/PowerupManager.ts" />
/// <reference path="HUD/HUDManager.ts" />
/// <reference path="Ship/ShipManager.ts" />
/// <reference path="Utilities/LatencyResolver.ts" />
/// <reference path="Space/Map.ts" />
/// <reference path="Ship/ShipController.ts" />

declare var $;

class Game {
    public GameTime: GameTime;
    public BulletManager: BulletManager;
    public ShipManager: ShipManager;
    public PowerupManager: PowerupManager;
    public HUDManager: HUDManager;

    private _map: Map;
    private _myShip: ShipController;

    constructor (private _connection: any, private _latencyResolver: LatencyResolver, myShipID: number) {
        this.GameTime = new GameTime();
        this.BulletManager = new BulletManager();
        this.ShipManager = new ShipManager(myShipID);
        this.PowerupManager = new PowerupManager();
        this.ShipManager.InitializeMyShip(this._connection);        

        this._map = new Map();
        this._myShip = this.ShipManager.MyShip;

        this.HUDManager = new HUDManager(this._myShip, this._connection);
    }

    public Update(payload: any): void {
        this.GameTime.Update();
        CanvasContext.clear();

        this._map.CheckBoundaryCollisions(this.ShipManager.Ships, this.BulletManager.Bullets);

        this.HUDManager.Update(payload);

        // Move the ships on the client
        this.ShipManager.Update(this.GameTime);

        this.PowerupManager.Update(this.GameTime);

        // Move the bullets on the client
        this.BulletManager.Update(this.GameTime);

        GAME_GLOBALS.AnimationManager.Update();

        this._map.Draw();
        this.ShipManager.MyShip.DrawHUD();

        CanvasContext.Render();
    }
}