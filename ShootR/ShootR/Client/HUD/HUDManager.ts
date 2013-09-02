/// <reference path="../Ship/ShipController.ts" />
/// <reference path="Leaderboard.ts" />
/// <reference path="DeathScreen.ts" />
/// <reference path="NotificationManager.ts" />
/// <reference path="GameDetailManager.ts" />
/// <reference path="HealthMonitor.ts" />
/// <reference path="ExperienceMonitor.ts" />
/// <reference path="MyRankings.ts" />
/// <reference path="EnvironmentMonitor.ts" />
/// <reference path="../Space/AreaRenderer.ts" />
/// <reference path="../Space/Map.ts" />
/// <reference path="ShipStatMonitor.ts" />
/// <reference path="../Utilities/Size.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />

class HUDManager {
    public GameDetailManager: GameDetailManager;
    public HealthMonitor: HealthMonitor;
    public ExperienceMonitor: ExperienceMonitor;
    public MyRankings: MyRankings;
    public Leaderboard: Leaderboard;
    public DeathScreen: DeathScreen;
    public ShipStatMonitor: ShipStatMonitor;
    public EnvironmentMonitor: EnvironmentMonitor;
    public NotificationManager: NotificationManager;
    public AreaRenderer: AreaRenderer;

    private _gameHUD: JQuery = $("#gameHUD");
    private _doublePopupHolder: JQuery = $("#doublePopupHolder");
    private _gameHUDHeight: number;
    private _locationStats: JQuery = $("#LocationStatisticsHolder");
    private _shipStats: JQuery = $("#StatisticHolder");

    constructor (public MyShip: ShipController, private _connection: any) {
        this.GameDetailManager;
        this.HealthMonitor = new HealthMonitor(MyShip);
        this.ExperienceMonitor = new ExperienceMonitor(this._gameHUD, this.MyShip);
        this.MyRankings = new MyRankings();
        this.Leaderboard = new Leaderboard(this._gameHUD, this.MyShip, this._connection);
        this.DeathScreen = new DeathScreen(this.Leaderboard, this.MyShip);
        this.ShipStatMonitor = new ShipStatMonitor(this.MyShip);
        this.EnvironmentMonitor = new EnvironmentMonitor(this.MyShip);
        this.NotificationManager = new NotificationManager();
        this.AreaRenderer = new AreaRenderer(this.MyShip, Map2.WIDTH);

        this._gameHUDHeight = this._gameHUD.height();
    }


    public CenterDoublePopup(newViewport: Size): void {
        // The left is handled by the css
        this._doublePopupHolder.css("top", ((newViewport.Height - this._gameHUDHeight) / 2) - this._doublePopupHolder.height() / 2);
    }

    public OnMapResize (newMapSize: Size) {
        this.AreaRenderer.OnMapResize(newMapSize.Width);
    }
    
    public OnScreenResize (newViewport: Size) {
        this._gameHUD.css("width", newViewport.Width);
        this._gameHUD.css("height", this._gameHUDHeight);
        this._gameHUD.css("top", newViewport.Height - this._gameHUDHeight);
        this.HealthMonitor.OnScreenResize();
        this.CenterDoublePopup(newViewport);

        // Remove or Add HUD objects
        if (newViewport.Width <= 1370) {
            this._locationStats.css("display", "none");
        }
        else {
            this._locationStats.css("display", "block");
        }

        // Remove or Add HUD objects
        if (newViewport.Width <= 1177) {
            this._shipStats.css("display", "none");
        }
        else {
            this._shipStats.css("display", "block");
        }
    }

    public Initialize () {
        this.GameDetailManager = new GameDetailManager();
    }

    public Update (payload: any) {
        this.HealthMonitor.Update();
        this.ExperienceMonitor.Update();
        this.MyRankings.Update(payload.Kills, payload.Deaths);
        this.ShipStatMonitor.Update();
        this.EnvironmentMonitor.Update(payload);
        this.AreaRenderer.Update();
    }
}