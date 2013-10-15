/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="GameInformer.ts" />

module ShootR.Debug {

    enum ConnectionState {
        Connecting = 0,
        Connected = 1,
        Reconnecting = 2,
        Disconnected = 4
    }

    export class ConnectionMonitor {
        public static TITLE: string = "Connection State";
        public static STATE_MAP: { [state: string]: eg.Graphics.Color } = {
            Connecting: eg.Graphics.Color.Gray,
            Connected: eg.Graphics.Color.LightGreen,
            Reconnecting: eg.Graphics.Color.LightGoldenRodYellow,
            Disconnected: eg.Graphics.Color.Red
        };

        private _connection: HubConnection;
        private _textNode: eg.Graphics.Text2d;

        constructor(informer: GameInformer, serverAdapter: Server.ServerAdapter) {
            this._textNode = informer.AddTextualInformation(ConnectionMonitor.TITLE);
            this._textNode.FontSettings.FontWeight = "bold";

            this._connection = serverAdapter.Connection;

            this.UpdateText();

            this._connection.stateChanged((stateChange: SignalRStateChange) => {
                this.UpdateText();
            });
        }

        private UpdateText(): void {
            this._textNode.Color = this.DetermineColor();
            this._textNode.Text = this.GetStateText();
        }

        private DetermineColor(): eg.Graphics.Color {
            return ConnectionMonitor.STATE_MAP[this.GetStateText()];
        }

        private GetStateText(): string {
            return ConnectionState[(<any>this._connection).state]
        }
    }

}