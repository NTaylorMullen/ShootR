/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="Ship.ts" />
/// <reference path="../User/UserShipManager.ts" />
var ShootR;
(function (ShootR) {
    var ShipManager = (function () {
        function ShipManager(_viewport, _scene, _collisionManager, _contentManager) {
            this._viewport = _viewport;
            this._scene = _scene;
            this._collisionManager = _collisionManager;
            this._contentManager = _contentManager;
            this._ships = {};
        }
        ShipManager.prototype.Initialize = function (userShipManager) {
            this.UserShipManager = userShipManager;
        };

        ShipManager.prototype.UpdateViewport = function (viewport) {
            this._viewport.Size = viewport;
        };

        ShipManager.prototype.GetShip = function (id) {
            return this._ships[id];
        };

        ShipManager.prototype.RemoveShip = function (shipID) {
            delete this._ships[shipID];
        };

        ShipManager.prototype.LoadPayload = function (payload) {
            var _this = this;
            var shipPayload = payload.Ships, ship;

            for (var i = 0; i < shipPayload.length; i++) {
                ship = shipPayload[i];

                if (!this._ships[ship.ID]) {
                    if (ship.ID === this.UserShipManager.ControlledShipId) {
                        ship.UserControlled = true;
                    } else {
                        ship.UserControlled = false;
                    }

                    this._ships[ship.ID] = new ShootR.Ship(ship, this._contentManager);
                    this._collisionManager.Monitor(this._ships[ship.ID]);
                    this._scene.Add(this._ships[ship.ID].Graphic);

                    this._ships[ship.ID].OnDisposed.Bind(function (ship) {
                        delete _this._ships[(ship).ID];
                    });
                } else {
                    this._ships[ship.ID].LoadPayload(ship);
                }

                if (ship.Disposed) {
                    this._ships[ship.ID].Destroy(!ship.LifeController.Alive);
                }
            }

            this.UserShipManager.LoadPayload(payload);
        };

        ShipManager.prototype.Update = function (gameTime) {
            for (var id in this._ships) {
                this._ships[id].Update(gameTime);
            }

            this.UserShipManager.Update(gameTime);

            for (var id in this._ships) {
                if (!this._ships[id].Bounds.IntersectsRectangle(this._viewport)) {
                    this._ships[id].Destroy();
                }
            }
        };
        return ShipManager;
    })();
    ShootR.ShipManager = ShipManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipManager.js.map
