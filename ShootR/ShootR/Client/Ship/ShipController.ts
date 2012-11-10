/// <reference path="Ship.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Utilities/LatencyResolver.ts" />
/// <reference path="../GameController/TouchController.ts" />

declare var shortcut;

class ShipController extends Ship {
    static REQUEST_PING_EVERY: number = 5;
    static DOUBLE_TAP_AFTER: number = 175;

    public TryInterpolate: bool = true;
    public TryInterpolateRotation: bool = false;
    public LatencyResolver: LatencyResolver;
    public Experience: number;
    public ExperienceToNextLevel: number;
    public Level: number;

    private _lastShot: number;
    private _keyMapping: KeyMapping[];
    private _movementCount: number = 0;
    private _touchController: TouchController;
    private _commandList: any[][] = [];
    private _currentCommand: number = 0;
    private _lastPayloadReceivedAt: number;
    private _payloadsEvery: number;
    private _lastCommandStartAt: number;
    private _lastCommandStart: string;
    private _wasDead: bool = false;

    constructor (rotateLeft: string[], forward: string[], rotateRight: string[], backward: string[], private fire: string, private connection: any) {       
        super();

        this._keyMapping = [];
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

    private registerPayload(): void {
        // Calculate how often we receive payloads so we can interpolate between them
        var now: number = new Date().getTime();
        if (this._lastPayloadReceivedAt) {
            this._payloadsEvery = now - this._lastPayloadReceivedAt
        }

        this._lastPayloadReceivedAt = now;
    }

    private checkInterpolation(serverShip: any, axis: string, distance: Vector2): void {
        if (distance[axis] > ShipMovementController.INTERPOLATE_POSITION_THRESHOLD) {
            this.MovementController.InterpolateOver[axis] = Math.max(this._payloadsEvery, 50);
            this.MovementController.Smoothing[axis] = true;
            this.MovementController.Target[axis] = serverShip.MovementController.Position[axis];
            serverShip.MovementController.Position[axis] = this.MovementController.Position[axis];
        }
    }

    private checkRotationInterpolation(serverShip: any): void {
        var rotationDistance: number = Math.abs(this.MovementController.Rotation - serverShip.MovementController.Rotation);

        if (rotationDistance > ShipMovementController.INTERPOLATE_ROTATION_THRESHOLD) {
            this.MovementController.InterpolateRotationOver = Math.max(this._payloadsEvery, 35);
            this.MovementController.SmoothingRotation = true;
            this.MovementController.TargetRotation = serverShip.MovementController.Rotation;
            serverShip.MovementController.Rotation = this.MovementController.Rotation;
        }
    }

    private determineInterpolation(serverShip: any): void {
        if (this._payloadsEvery) {
            if (!this.LifeController.Alive) {
                this.MovementController.Smoothing.X = false;
                this.MovementController.Smoothing.Y = false;
                this._wasDead = true;
            }

            if (!this._wasDead) {
                if (this.TryInterpolate) {
                    super.Update(null);
                    var distance: Vector2 = CalculateDistance(this.MovementController.Position, serverShip.MovementController.Position);

                    this.checkInterpolation(serverShip, "X", distance);
                    this.checkInterpolation(serverShip, "Y", distance);
                }

                if (this.TryInterpolateRotation) {
                    this.checkRotationInterpolation(serverShip);
                }
            }

            if (this.LifeController.Alive) {
                this._wasDead = false;
            }
        }
    }

    private doubleTap(dir: string): bool {
        if (dir === "Forward") {
            this.startAbility("Boost");
            return true;
        }

        return false;
    }

    private startAbility(name: string): void {
        if (this.Controllable.Value && this.ShipAbilityHandler.Activate(name) && this.LifeController.Alive) {           
            this._commandList.push([++this._currentCommand, name, true, true]);
            this.connection.server.registerAbilityStart(name, false, this._currentCommand);

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
        }
    }

    private stopAbility(name: string): void {
        if (this.Controllable.Value && this.ShipAbilityHandler.Deactivate(name) && this.LifeController.Alive) {
            var pingBack: bool = false;

            this._commandList.push([++this._currentCommand, name, false, true]);
            this.connection.server.registerAbilityStop(name, false, this._currentCommand);

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
        }
    }

    private startMovement(dir: string): void {
        if (this.Controllable.Value && !this.MovementController.Moving[dir] && this.LifeController.Alive) {
            var pingBack: bool = false,
                now: number = new Date().getTime();

            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (this._movementCount === 0) {
                pingBack = true;
                this.LatencyResolver.RequestedPingBack();
            }

            var successfulDoubleTap: bool = false;
            // Double tap
            if (now - this._lastCommandStartAt <= ShipController.DOUBLE_TAP_AFTER && this._lastCommandStart === dir) {
                successfulDoubleTap = this.doubleTap(dir);
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

    private stopMovement(dir: string): void {
        if (this.Controllable.Value && this.LifeController.Alive) {
            var pingBack: bool = false;
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

    private stopAndStartMovement(toStop: string, toStart: string): void {
        if (this.Controllable.Value && this.LifeController.Alive) {
            var pingBack: bool = false,
                now: number = new Date().getTime();

            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (this._movementCount === 0) {
                pingBack = true;
                this.LatencyResolver.RequestedPingBack();
            }

            var successfulDoubleTap: bool = false;
            // Double tap
            if (now - this._lastCommandStartAt <= ShipController.DOUBLE_TAP_AFTER && this._lastCommandStart === toStart) {
                successfulDoubleTap = this.doubleTap(toStart);
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

    private resetMovement(MovementList: string[]): void {
        if (this.Controllable.Value && this.LifeController.Alive) {
            var pingBack: bool = false;
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

    private applyKeyboardMappings(): void {
        var timeFirePressed: number,
            singleFireMode: bool = true,
            autoFireTimeout: number,
            that: ShipController = this;

        // Mapping each hot key to its corresponding movement direction
        for (var k = 0; k < this._keyMapping.length; k++) {
            for (var z = 0; z < this._keyMapping[k].key.length; z++) {
                shortcut.add(that._keyMapping[k].key[z], (function (k) {
                    return function () {
                        that.startMovement(that._keyMapping[k].dir);
                    };
                })(k), { 'disable_in_input': true, 'type': 'keydown' });

                shortcut.add(that._keyMapping[k].key[z], (function (k) {
                    return function () {
                        that.stopMovement(that._keyMapping[k].dir);
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
            var timeFireReleased: number;
            
            clearTimeout(autoFireTimeout);
            timeFireReleased = new Date().getTime();

            if (!singleFireMode) {
                that._lastShot = timeFireReleased;
                that.connection.server.stopFire();
            }
           
            singleFireMode = timeFireReleased - timeFirePressed < Ship.MIN_FIRE_RATE;
        }, { 'disable_in_input': true, 'type': 'keyup' });

        $(window).blur(function () {
            that.resetMovement(["Forward", "Backward", "RotatingLeft", "RotatingRight"]);
            that.connection.server.stopFire();
        });
    }

    public PayloadReceived (info: any): void {
        this.registerPayload();

        // Find my ship in the payload
        for (var i = 0; i < info.Ships.length; i++) {
            // Found my ship
            if (this.ID === info.Ships[i].ID) {
                this.determineInterpolation(info.Ships[i]);
                break;
            }
        }
    }

    public ReplayCommands (serverCommand: number): void {
        if (this._commandList.length >= 1) {
            var serverCommandIndex: number = this._commandList.length - (this._currentCommand - serverCommand);

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

    public Initialize (screen: GameScreen): void {
        // Touch is enabled
        if ('createTouch' in document || navigator.msMaxTouchPoints) {
            this._touchController = new TouchController(this.startMovement, this.stopMovement, this.stopAndStartMovement, this.resetMovement, this.shoot);
            this._touchController.Initialize(screen);
        }

        this.applyKeyboardMappings();
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

interface KeyMapping {
    key: string[];
    dir: string;
}