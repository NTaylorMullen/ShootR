/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
module ShootR {
    export enum ChatMessageType {
        User = 0,
        System = 1
    }

    export class ChatMessage {
        constructor(public From: string, public Message: string, public Type: ChatMessageType) { }
    }

    export class Chat {
        private _myShipId: number;
        private _document: JQuery = $(document);
        private _chatContainer: JQuery = $("#chat");
        private _chatBox: JQuery = $("<input>").attr("id", "chatbox").attr("type", "input").attr("autocomplete", "off");
        private _chatBoxContainer: JQuery = $("<li>");
        private _chatBoxVisible: boolean = false;
        private _colors: string[] = [
            eg.Graphics.Color.Red.toString(),
            eg.Graphics.Color.Orange.toString(),
            eg.Graphics.Color.Yellow.toString(),
            eg.Graphics.Color.Green.toString(),
            eg.Graphics.Color.Blue.toString(),
            eg.Graphics.Color.Purple.toString(),
            eg.Graphics.Color.White.toString(),
            eg.Graphics.Color.Cyan.toString()
        ];

        private _systemMessageColor: string = eg.Graphics.Color.Yellow.toString();

        constructor(private _userInformation: Server.IUserInformation, serverAdapter: Server.ServerAdapter) {
            serverAdapter.OnMessageReceived.Bind((chat: ChatMessage) => {
                this.AddMessage(chat);
            });

            this._chatBoxContainer.append(this._chatBox);
            this._document.keydown((key) => {
                switch (key.keyCode) {
                    //if they press enter
                    case 13:
                        if (this._chatBoxVisible) {
                            var message = this._chatBox.val();
                            if (message) {
                                this.AddMessage(new ChatMessage(this._userInformation.Name, message, ChatMessageType.User));
                                serverAdapter.Proxy.invoke("sendMessage", message);
                            }
                            this.HideChatBox();
                        } else {
                            this.ShowChatBox();
                        }

                        this.StopPropogation(key);
                        break;

                    //the letter 't'
                    case 84:
                        if (!this._chatBoxVisible) {
                            this.ShowChatBox();
                            this.StopPropogation(key);
                        }
                        //determine status of chat box
                        break;

                    //escape key
                    case 27: //close the chat box if open
                        if (this._chatBoxVisible) {
                            this.HideChatBox();
                            this.StopPropogation(key);
                        }
                        break;
                }
            });
        }

        private StopPropogation(key): void {
            key.preventDefault();
            key.stopPropagation();
        }

        private ShowChatBox() : void {
            this._chatContainer.append(this._chatBoxContainer);
            this._chatBoxContainer.show();
            this._chatBox.focus();
            this._chatBoxVisible = true;
        }

        private HideChatBox(): void {
            this._chatBox.val("");
            this._chatBoxContainer.remove();
            this._chatBoxVisible = false;
        }

        private AddMessage(chatMessage: ShootR.ChatMessage): void {

            //User message
            if (chatMessage.Type === ChatMessageType.User) {
                var color = this._colors[this.GetHashCode(chatMessage.From) % this._colors.length],
                    playerName = $("<span>").text(chatMessage.From).css("color", color),
                    message = $("<span>").append($("<div/>").text(chatMessage.Message).html().replace(/\"/g, "&quot;"));

                //only insert new items before the chat box so that the chat box stays at the
                //bottom of the screen and doesn't scroll up.
                if (this._chatBoxVisible) {
                    $("<li>")
                        .append(playerName)
                        .append($("<span>").text(": "))
                        .append(message)
                        .insertBefore(this._chatBoxContainer);
                } else {
                    this._chatContainer.append($("<li>")
                        .append(playerName)
                        .append($("<span>").text(": "))
                        .append(message));
                }
            }

            //System message
            if (chatMessage.Type === ChatMessageType.System) {
                this._chatContainer.append($("<li>")
                    .append(chatMessage.Message)
                    .css("color", this._systemMessageColor));
            }

            if (this._chatContainer.children.length > 100) {
                this._chatContainer.children[0].remove();
            }
        }

        private GetHashCode(name: string): number {
            var hash = 0, i, c, l;
            if (name.length === 0) return hash;
            for (i = 0, l = name.length; i < l; i++) {
                c = name.charCodeAt(i);
                hash = ((hash << 5) - hash) + c;
                hash |= 0;
            }
            return hash;
        }
    }
}