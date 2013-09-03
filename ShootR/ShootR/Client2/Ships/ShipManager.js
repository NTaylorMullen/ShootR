/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="Ship.ts" />
/// <reference path="UserShipManager.ts" />
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
            this._userShipManager = userShipManager;
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
            var shipPayload = payload.Ships, ship;

            for (var i = 0; i < shipPayload.length; i++) {
                ship = shipPayload[i];

                if (!this._ships[ship.ID]) {
                    this._ships[ship.ID] = new ShootR.Ship(ship, this._contentManager);
                    this._collisionManager.Monitor(this._ships[ship.ID]);
                    this._scene.Add(this._ships[ship.ID].Graphic);
                } else {
                    this._ships[ship.ID].LoadPayload(ship);
                }

                if (ship.Disposed) {
                    console.log("Disposed: " + ship.ID);
                    this._ships[ship.ID].Destroy();
                    delete this._ships[ship.ID];
                }
            }

            this._userShipManager.LoadPayload(payload);
        };

        ShipManager.prototype.Update = function (gameTime) {
            for (var id in this._ships) {
                this._ships[id].Update(gameTime);
            }

            this._userShipManager.Update(gameTime);

            for (var id in this._ships) {
                if (!this._ships[id].Bounds.IntersectsRectangle(this._viewport)) {
                    console.log("No longer in view: " + id);
                    this._ships[id].Destroy();
                    delete this._ships[id];
                }
            }
        };
        return ShipManager;
    })();
    ShootR.ShipManager = ShipManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipManager.js.map
