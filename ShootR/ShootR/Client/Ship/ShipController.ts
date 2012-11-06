/// <reference path="Ship.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Utilities/LatencyResolver.ts" />

declare var shortcut, TouchController;

class ShipController extends Ship {
    static REQUEST_PING_EVERY: number = 5;
    static DOUBLE_TAP_AFTER: number = 175;

    public TryInterpolate: bool = true;
    public TryInterpolateRotation: bool = false;
    public LatencyResolver: LatencyResolver;

    private _lastShot: number;
    private _keyMapping: any[] = [];
    private _movementCount: number = 0;
    private _touchController: any;
    private _commandList: any[][] = [];
    private _currentCommand: number = 0;
    private _lastPayloadReceivedAt: number;
    private _payloadsEvery: number;
    private _lastCommandStartAt: number;
    private _lastCommandStart: string;
    private _wasDead: bool = false;

    constructor (rotateLeft: string[], forward: string[], rotateRight: string[], backward: string[], private fire: string, private connection: any) {
        super();

        this._keyMapping.push({ key: rotateLeft, dir: "RotatingLeft" });
        this._keyMapping.push({ key: rotateRight, dir: "RotatingRight" });
        this._keyMapping.push({ key: forward, dir: "Forward" });
        this._keyMapping.push({ key: backward, dir: "Backward" });

        this.LifeController.Health = this.MaxLife;        

        // Initiate Interpollation
        this.MovementController.Smoothing = {
            X: false,
            Y: false
        };
        this.MovementController.Target = Vector2.Zero();
        this.MovementController.InterpolateOver = Vector2.Zero();
        this.MovementController.InterpolateRotationOver = 0;
        this.MovementController.SmoothingRotation = false;
        this.MovementController.TargetRotation = 0;
    }

    private RegisterPayload(): void {
        // Calculate how often we receive payloads so we can interpolate between them
        var now = new Date().getTime();
        if (this._lastPayloadReceivedAt) {
            this._payloadsEvery = now - this._lastPayloadReceivedAt
        }

        this._lastPayloadReceivedAt = now;
    }

    private CheckInterpolation(serverShip: any, axis: string, distance: any): void {
        if (distance[axis] > ShipMovementController.INTERPOLATE_POSITION_THRESHOLD) {
            this.MovementController.InterpolateOver[axis] = Math.max(this._payloadsEvery, 50);
            this.MovementController.Smoothing[axis] = true;
            this.MovementController.Target[axis] = serverShip.MovementController.Position[axis];
            serverShip.MovementController.Position[axis] = this.MovementController.Position[axis];
        }
    }

    private CheckRotationInterpolation(serverShip: any): void {
        var distance = Math.abs(this.MovementController.Rotation - serverShip.MovementController.Rotation);

        if (distance > ShipMovementController.INTERPOLATE_ROTATION_THRESHOLD) {
            this.MovementController.InterpolateRotationOver = Math.max(this._payloadsEvery, 35);
            this.MovementController.SmoothingRotation = true;
            this.MovementController.TargetRotation = serverShip.MovementController.Rotation;
            serverShip.MovementController.Rotation = this.MovementController.Rotation;
        }
    }

    private DetermineInterpolation(serverShip: any): void {
        if (this._payloadsEvery) {
            if (!this.LifeController.Alive) {
                this.MovementController.Smoothing.X = false;
                this.MovementController.Smoothing.Y = false;
                this._wasDead = true;
            }

            if (!this._wasDead) {
                if (this.TryInterpolate) {
                    super.Update(null);
                    var distance = CalculateDistance(this.MovementController.Position, serverShip.MovementController.Position);

                    this.CheckInterpolation(serverShip, "X", distance);
                    this.CheckInterpolation(serverShip, "Y", distance);
                }

                if (this.TryInterpolateRotation) {
                    this.CheckRotationInterpolation(serverShip);
                }
            }

            if (this.LifeController.Alive) {
                this._wasDead = false;
            }
        }
    }

    private DoubleTap(dir: string): bool {
        if (dir === "Forward") {
            this.StartAbility("Boost");
            return true;
        }

        return false;
    }

    private StartAbility(name: string): void {
        if (this.Controllable.Value && this.ShipAbilityHandler.Activate(name) && this.LifeController.Alive) {           
            this._commandList.push([++this._currentCommand, name, true, true]);
            this.connection.server.registerAbilityStart(name, false, this._currentCommand);

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
        }
    }

    private StopAbility(name: string): void {
        if (this.Controllable.Value && this.ShipAbilityHandler.Deactivate(name) && this.LifeController.Alive) {
            var pingBack = false;

            this._commandList.push([++this._currentCommand, name, false, true]);
            this.connection.server.registerAbilityStop(name, false, this._currentCommand);

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
        }
    }

    private StartMovement(dir: string): void {
        if (this.Controllable.Value && !this.MovementController.Moving[dir] && this.LifeController.Alive) {
            var pingBack = false,
                now = new Date().getTime();

            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (this._movementCount === 0) {
                pingBack = true;
                this.LatencyResolver.RequestedPingBack();
            }

            var successfulDoubleTap = false;
            // Double tap
            if (now - this._lastCommandStartAt <= ShipController.DOUBLE_TAP_AFTER && this._lastCommandStart === dir) {
                successfulDoubleTap = this.DoubleTap(dir);
            }
            
            if(!successfulDoubleTap) {
                this._lastCommandStartAt = now;
                this._lastCommandStart = dir;

                this._commandList.push([++this._currentCommand, dir, true]);
                this.connection.server.registerMoveStart(dir, pingBack, this._currentCommand);

                this.UpdateFromSecond(CalculatePOS(this.LastUpdated));                
            }

            this.MovementController.Moving[dir] = true;
        }
    }

    private StopMovement(dir: string): void {
        if (this.Controllable.Value && this.LifeController.Alive) {
            var pingBack = false;
            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (this._movementCount === 0) {
                pingBack = true;
                this.LatencyResolver.RequestedPingBack();
            }
            this._commandList.push([++this._currentCommand, dir, false]);
            this.connection.server.registerMoveStop(dir, pingBack, this._currentCommand);

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
            this.MovementController.Moving[dir] = false;
        }
    }

    private StopAndStartMovement(toStop: string, toStart: string): void {
        if (this.Controllable.Value && this.LifeController.Alive) {
            var pingBack = false,
                now = new Date().getTime();

            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (this._movementCount === 0) {
                pingBack = true;
                this.LatencyResolver.RequestedPingBack();
            }

            var successfulDoubleTap = false;
            // Double tap
            if (now - this._lastCommandStartAt <= ShipController.DOUBLE_TAP_AFTER && this._lastCommandStart === toStart) {
                successfulDoubleTap = this.DoubleTap(toStart);
            }

            if (!successfulDoubleTap) {
                this._lastCommandStartAt = now;
                this._lastCommandStart = toStart;

                this._commandList.push([++this._currentCommand, toStop, false]);
                this._commandList.push([++this._currentCommand, toStart, true]);

                this.connection.server.startAndStopMovement(toStop, toStart, pingBack, this._currentCommand);

                this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
                this.MovementController.Moving[toStop] = false;
                this.MovementController.Moving[toStart] = true;
            }
        }
    }

    private ResetMovement(MovementList: string[]): void {
        if (this.Controllable.Value && this.LifeController.Alive) {
            var pingBack = false;
            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (this._movementCount === 0) {
                pingBack = true;
            }

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));

            // Reset all movement
            for (var i = 0; i < MovementList.length; i++) {
                this.MovementController.Moving[MovementList[i]] = false;
                this._commandList.push([++this._currentCommand, MovementList[i], false]);
            }

            this.connection.server.resetMovement(MovementList, pingBack, this._currentCommand);
        }
    }

    private shoot(now: number): void {
        var timeSinceFired = now - this._lastShot;

        if (this.Controllable.Value && timeSinceFired > Ship.MIN_FIRE_RATE) {
            this._lastShot = now;
           this.connection.server.fire();
        }
    }

    private ApplyKeyboardMappings(): void {
        var timeFirePressed,
            singleFireMode = true,
            autoFireTimeout,
            that = this;

        // Mapping each hot key to its corresponding movement direction
        for (var k = 0; k < this._keyMapping.length; k++) {
            for (var z = 0; z < this._keyMapping[k].key.length; z++) {
                shortcut.add(that._keyMapping[k].key[z], (function (k) {
                    return function () {
                        that.StartMovement(that._keyMapping[k].dir);
                    };
                })(k), { 'disable_in_input': true, 'type': 'keydown' });

                shortcut.add(that._keyMapping[k].key[z], (function (k) {
                    return function () {
                        that.StopMovement(that._keyMapping[k].dir);
                    };
                })(k), { 'disable_in_input': true, 'type': 'keyup' });
            }
        }

        shortcut.add(this.fire, function () {
            timeFirePressed = new Date().getTime();

            if (singleFireMode) {
                that.shoot(timeFirePressed);
                autoFireTimeout = setTimeout(function() {
                    singleFireMode = false;
                    that.connection.server.startFire();
                }, Ship.MIN_FIRE_RATE);
            } else {
                that.connection.server.startFire();
            }
        },  { 'disable_in_input': true, 'type': 'keydown' });

        shortcut.add(this.fire, function () {
            var timeFireReleased;
            
            clearTimeout(autoFireTimeout);
            timeFireReleased = new Date().getTime();

            if (!singleFireMode) {
                that._lastShot = timeFireReleased;
                that.connection.server.stopFire();
            }
           
            singleFireMode = timeFireReleased - timeFirePressed < Ship.MIN_FIRE_RATE;
        }, { 'disable_in_input': true, 'type': 'keyup' });

        $(window).blur(function () {
            that.ResetMovement(["Forward", "Backward", "RotatingLeft", "RotatingRight"]);
            that.connection.server.stopFire();
        });
    }

    public PayloadReceived (info: any): void {
        this.RegisterPayload();

        // Find my ship in the payload
        for (var i = 0; i < info.Ships.length; i++) {
            // Found my ship
            if (this.ID === info.Ships[i].ID) {
                this.DetermineInterpolation(info.Ships[i]);
                break;
            }
        }
    }

    public ReplayCommands (serverCommand: number): void {
        if (this._commandList.length >= 1) {
            var serverCommandIndex = this._commandList.length - (this._currentCommand - serverCommand);

            for (var i = serverCommandIndex; i < this._commandList.length; i++) {
                if (this._commandList[i][3]) { // Checking if the command is an ability
                    if (this._commandList[i][2]) {
                        this.ShipAbilityHandler.Activate(this._commandList[i][1])
                    }
                    else {
                        this.ShipAbilityHandler.Deactivate(this._commandList[i][1])
                    }
                }
                else {
                    this.MovementController.Moving[this._commandList[i][1]] = this._commandList[i][2];
                }
            }

            this._commandList.splice(0, serverCommandIndex);
        }
    }

    public Initialize (screen: any): void {
        // Touch is enabled
        if ('createTouch' in document || navigator.msMaxTouchPoints) {
            this._touchController = new TouchController(this.StartMovement, this.StopMovement, this.StopAndStartMovement, this.ResetMovement, this.shoot);
            this._touchController.Initialize(screen);
        }

        this.ApplyKeyboardMappings();
    }

    public DrawHUD (): void {
        if (this._touchController) {
            this._touchController.Draw();
        }
    }

    public ResetTouchController (): void {
        if (this._touchController) {
            this._touchController.Reset();
        }
    }
}