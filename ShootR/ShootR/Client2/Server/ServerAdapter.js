var ShootR;
(function (ShootR) {
    /// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
    /// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
    /// <reference path="IPayloadDefinitions.ts" />
    /// <reference path="PayloadDecompressor.ts" />
    /// <reference path="ServerConnectionManager.ts" />
    /// <reference path="IUserInformation.ts" />
    /// <reference path="IClientInitialization.ts" />
    (function (Server) {
        var ServerAdapter = (function () {
            function ServerAdapter(_connection, Proxy, authCookieName) {
                var _this = this;
                this._connection = _connection;
                this.Proxy = Proxy;
                var savedProxyInvoke = this.Proxy.invoke;

                this.OnPayload = new eg.EventHandler1();
                this.OnLeaderboardUpdate = new eg.EventHandler1();
                this.OnForcedDisconnct = new eg.EventHandler();
                this.OnControlTransferred = new eg.EventHandler();
                this.OnPingRequest = new eg.EventHandler();

                this._connectionManager = new Server.ServerConnectionManager(authCookieName);

                (this.Proxy.invoke) = function () {
                    if ((_this._connection).state === $.signalR.connectionState.connected) {
                        return savedProxyInvoke.apply(_this.Proxy, arguments);
                    }
                };
            }
            ServerAdapter.prototype.Negotiate = function () {
                var _this = this;
                var userInformation = this._connectionManager.PrepareRegistration(), result = $.Deferred();

                this.Wire();

                this._connection.start().done(function () {
                    _this.TryInitialize(userInformation, function (initialization) {
                        initialization.UserInformation = userInformation;
                        _this._payloadDecompressor = new Server.PayloadDecompressor(initialization.CompressionContracts);

                        result.resolve(initialization);

                        _this.Proxy.invoke("readyForPayloads");
                    });
                });

                return result.promise();
            };

            ServerAdapter.prototype.Stop = function () {
                this._connection.stop();
            };

            ServerAdapter.prototype.TryInitialize = function (userInformation, onComplete, count) {
                if (typeof count === "undefined") { count = 0; }
                var _this = this;
                this.Proxy.invoke("initializeClient", userInformation.RegistrationID).done(function (initialization) {
                    if (!initialization) {
                        if (count >= ServerAdapter.NEGOTIATE_RETRIES) {
                            alert("Could not negotiate with server, please refresh the page.");
                        } else {
                            setTimeout(function () {
                                _this.TryInitialize(userInformation, onComplete, count + 1);
                            }, ServerAdapter.RETRY_DELAY.Milliseconds);
                        }
                    } else {
                        onComplete(initialization);
                    }
                });
            };

            ServerAdapter.prototype.Wire = function () {
                var _this = this;
                this.Proxy.on("d", function (payload) {
                    _this.OnPayload.Trigger(_this._payloadDecompressor.Decompress(payload));
                });

                this.Proxy.on("l", function (leaderboardUpdate) {
                    _this.OnLeaderboardUpdate.Trigger(_this._payloadDecompressor.DecompressLeaderboard(leaderboardUpdate));
                });

                this.Proxy.on("disconnect", function () {
                    _this.OnForcedDisconnct.Trigger();
                });

                this.Proxy.on("controlTransferred", function () {
                    _this.OnControlTransferred.Trigger();
                });

                this.Proxy.on("pingBack", function () {
                    _this.OnPingRequest.Trigger();
                });
            };
            ServerAdapter.NEGOTIATE_RETRIES = 3;
            ServerAdapter.RETRY_DELAY = eg.TimeSpan.FromSeconds(1);
            return ServerAdapter;
        })();
        Server.ServerAdapter = ServerAdapter;
    })(ShootR.Server || (ShootR.Server = {}));
    var Server = ShootR.Server;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ServerAdapter.js.map
