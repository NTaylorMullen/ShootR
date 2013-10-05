/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IUserInformation.ts" />
var ShootR;
(function (ShootR) {
    var UserInformationManager = (function () {
        function UserInformationManager(userInformation) {
            this._displayName = $("#DisplayName");
            this._displayNameLB = $("#DisplayNameLB");
            this._you = $("#You");
            this._youLB = $("#YouLB");
            this._displayName.text(userInformation.Name);
            this._displayNameLB.text(userInformation.Name);
            this._you.attr("src", userInformation.Photo);
            this._youLB.attr("src", userInformation.Photo);
        }
        return UserInformationManager;
    })();
    ShootR.UserInformationManager = UserInformationManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UserInformationManager.js.map
