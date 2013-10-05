/// <reference path="IUserInformation.ts" />
/// <reference path="IConfigurationDefinitions.ts" />

module ShootR.Server {

    export interface IClientInitialization {
        Configuration: IConfigurationManager;
        ServerFull: boolean;
        CompressionContracts: any;
        ShipID: number;
        ShipName: string;
        UserInformation: IUserInformation;
    }

}
