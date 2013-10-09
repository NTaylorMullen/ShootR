var ShootR;
(function (ShootR) {
    /// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
    /// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
    /// <reference path="../Server/ServerAdapter.ts" />
    /// <reference path="GameInformer.ts" />
    (function (Debug) {
        var ConnectionState;
        (function (ConnectionState) {
            ConnectionState[ConnectionState["Connecting"] = 0] = "Connecting";
            ConnectionState[ConnectionState["Connected"] = 1] = "Connected";
            ConnectionState[ConnectionState["Reconnecting"] = 2] = "Reconnecting";
            ConnectionState[ConnectionState["Disconnected"] = 4] = "Disconnected";
        })(ConnectionState || (ConnectionState = {}));

        var ConnectionMonitor = (function () {
            function ConnectionMonitor(informer, serverAdapter) {
                var _this = this;
                this._textNode = informer.AddTextualInformation(ConnectionMonitor.TITLE);
                this._textNode.FontSettings.FontWeight = "bold";

                this._connection = serverAdapter.Connection;

                this.UpdateText();

                this._connection.stateChanged(function (stateChange) {
                    _this.UpdateText();
                });
            }
            ConnectionMonitor.prototype.UpdateText = function () {
                this._textNode.Color = this.DetermineColor();
                this._textNode.Text = this.GetStateText();
            };

            ConnectionMonitor.prototype.DetermineColor = function () {
                return ConnectionMonitor.STATE_MAP[this.GetStateText()];
            };

            ConnectionMonitor.prototype.GetStateText = function () {
                return ConnectionState[(this._connection).state];
            };
            ConnectionMonitor.TITLE = "Connection State";
            ConnectionMonitor.STATE_MAP = {
                Connecting: eg.Graphics.Color.Gray,
                Connected: eg.Graphics.Color.LightGreen,
                Reconnecting: eg.Graphics.Color.LightGoldenRodYellow,
                Disconnected: eg.Graphics.Color.Red
            };
            return ConnectionMonitor;
        })();
        Debug.ConnectionMonitor = ConnectionMonitor;
    })(ShootR.Debug || (ShootR.Debug = {}));
    var Debug = ShootR.Debug;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ConnectionMonitor.js.map
