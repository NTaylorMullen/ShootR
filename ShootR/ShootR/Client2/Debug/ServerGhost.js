var ShootR;
(function (ShootR) {
    /// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
    /// <reference path="../Ships/Ship.ts" />
    /// <reference path="../Server/IPayloadDefinitions.ts" />
    (function (Debug) {
        var ServerGhost = (function () {
            function ServerGhost(_myShipId, _scene, _content) {
                this._myShipId = _myShipId;
                this._scene = _scene;
                this._content = _content;
            }
            ServerGhost.prototype.LoadPayload = function (payload) {
                var shipPayload;

                for (var i = 0; i < payload.length; i++) {
                    shipPayload = payload[i];

                    if (shipPayload.ID === this._myShipId) {
                        if (!this._ghost) {
                            this._ghost = new ShootR.Ship(shipPayload, this._content);
                            this._ghost.MovementController.UserControlled = false;
                            this._ghost.Graphic.Body.Opacity = .5;
                            this._scene.Add(this._ghost.Graphic);
                        } else {
                            this._ghost.LoadPayload(shipPayload);
                        }
                    }
                }
            };

            ServerGhost.prototype.Update = function (gameTime) {
                if (this._ghost) {
                    this._ghost.Update(gameTime);
                }
            };
            return ServerGhost;
        })();
        Debug.ServerGhost = ServerGhost;
    })(ShootR.Debug || (ShootR.Debug = {}));
    var Debug = ShootR.Debug;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ServerGhost.js.map
