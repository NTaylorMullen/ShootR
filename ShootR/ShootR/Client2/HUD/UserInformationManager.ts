/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IUserInformation.ts" />

module ShootR {

    export class UserInformationManager {
        private _displayName: JQuery = $("#DisplayName");
        private _displayNameLB: JQuery = $("#DisplayNameLB");
        private _you: JQuery = $("#You");
        private _youLB: JQuery = $("#YouLB");

        constructor(userInformation: Server.IUserInformation) {
            this._displayName.text(userInformation.Name);
            this._displayNameLB.text(userInformation.Name);
            this._you.attr("src", userInformation.Photo);
            this._youLB.attr("src", userInformation.Photo);
        }
    }

}