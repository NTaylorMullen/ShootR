/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
module ShootR {
    export class ChatMessage {
        constructor(public From: string, public Message: string, public Type: number) { }
    }

    export class Chat {
        private document: JQuery = $(document);
        private chatContainer: JQuery = $("#chat");
        private chatBox: JQuery = $("<input>").attr("id", "chatbox").attr("type", "input").attr("autocomplete", "off");
        private chatBoxContainer: JQuery = $("<li>");
        private colors: eg.Graphics.Color[] = [
            eg.Graphics.Color.Red,
            eg.Graphics.Color.Orange,
            eg.Graphics.Color.Yellow,
            eg.Graphics.Color.Green,
            eg.Graphics.Color.Blue,
            eg.Graphics.Color.Purple,
            eg.Graphics.Color.White,
            eg.Graphics.Color.Cyan
        ];

        constructor(serverAdapter: Server.ServerAdapter) {
            var self = this;
            serverAdapter.OnMessageReceived.Bind(function (chat: ChatMessage) {
                console.log(chat);
                self.AddMessage(chat);
            });

            this.chatBoxContainer.append(this.chatBox);
            this.document.keydown((key) => {
                switch (key.keyCode) {
                    //if they press enter
                    case 13:
                        if (this.chatBoxContainer.is(":visible")) {
                            var message = this.chatBox.val();
                            if (message) {
                                serverAdapter.Proxy.invoke("sendMessage", message);
                            }
                            this.HideChatBox();
                        } else {
                            this.ShowChatBox();
                        }

                        key.preventDefault();
                        key.stopPropagation();
                        break;

                    //the letter 't'
                    case 84:
                        if (!this.chatBoxContainer.is(":visible")) {
                            this.ShowChatBox();

                            key.preventDefault();
                            key.stopPropagation();
                        }
                        //determine status of chat box
                        break;

                    case 27: //close the chat box if open
                        if (this.chatBoxContainer.is(":visible")) {
                            this.HideChatBox();
                            key.preventDefault();
                            key.stopPropagation();
                        }
                        break;
                }
            });
        }

        private ShowChatBox() : void {
            this.chatContainer.append(this.chatBoxContainer);
            this.chatBoxContainer.show();
            this.chatBox.focus();
        }

        private HideChatBox(): void {
            this.chatBox.val("");
            this.chatBoxContainer.remove();
        }

        private AddMessage(chatMessage: ShootR.ChatMessage): void {

            //User message
            if (chatMessage.Type == 0) {
                var color = this.colors[this.GetHashCode(chatMessage.From) % this.colors.length];

                var playerName = $("<span>").text(chatMessage.From).css("color", color.toString());
                var message = $("<span>").append($("<div/>").text(chatMessage.Message).text());

                var li = $("<li>")
                    .append(playerName)
                    .append($("<span>").text(": "))
                    .append(message);

                this.chatContainer.append(li);
            }

            //System message
            if (chatMessage.Type === 1) {
                var li = $("<li>")
                    .append(chatMessage.Message)
                    .css("color", eg.Graphics.Color.Yellow.toString());

                this.chatContainer.append(li);
            }

            if (this.chatContainer.children.length > 100) {
                this.chatContainer.children[0].remove();
            }
        }

        private GetHashCode(name: string): number {
            var hash = 0, i, c, l;
            if (name.length == 0) return hash;
            for (i = 0, l = name.length; i < l; i++) {
                c = name.charCodeAt(i);
                hash = ((hash << 5) - hash) + c;
                hash |= 0;
            }
            return hash;
        }
    }
}