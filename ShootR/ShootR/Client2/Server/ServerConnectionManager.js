var ShootR;
(function (ShootR) {
    /// <reference path="../../Scripts/typings/jquery.cookie/jquery.cookie.d.ts" />
    /// <reference path="IUserInformation.ts" />
    (function (Server) {
        var ServerConnectionManager = (function () {
            function ServerConnectionManager(_authCookieName) {
                this._authCookieName = _authCookieName;
            }
            ServerConnectionManager.prototype.PrepareRegistration = function () {
                var stateCookie = $.cookie(this._authCookieName), state = stateCookie ? JSON.parse((stateCookie)) : {}, registrationID = state.RegistrationID;

                if (registrationID) {
                    delete state.RegistrationID;

                    // Re-update the registration cookie
                    $.cookie(this._authCookieName, JSON.stringify(state), { path: '/', expires: 30 });

                    return {
                        Name: state.DisplayName,
                        Photo: state.Photo,
                        RegistrationID: registrationID
                    };
                } else {
                    throw new Error("Registration ID not available.");
                }
            };
            return ServerConnectionManager;
        })();
        Server.ServerConnectionManager = ServerConnectionManager;
    })(ShootR.Server || (ShootR.Server = {}));
    var Server = ShootR.Server;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ServerConnectionManager.js.map
