/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
var ShootR;
(function (ShootR) {
    var ChatMessage = (function () {
        function ChatMessage(From, Message, Type) {
            this.From = From;
            this.Message = Message;
            this.Type = Type;
        }
        return ChatMessage;
    })();
    ShootR.ChatMessage = ChatMessage;

    var Chat = (function () {
        function Chat(serverAdapter) {
            var _this = this;
            this.document = $(document);
            this.chatContainer = $("#chat");
            this.chatBox = $("<input>").attr("id", "chatbox").attr("type", "input").attr("autocomplete", "off");
            this.chatBoxContainer = $("<li>");
            this.colors = [
                eg.Graphics.Color.Red,
                eg.Graphics.Color.Orange,
                eg.Graphics.Color.Yellow,
                eg.Graphics.Color.Green,
                eg.Graphics.Color.Blue,
                eg.Graphics.Color.Purple,
                eg.Graphics.Color.White,
                eg.Graphics.Color.Cyan
            ];
            var self = this;
            serverAdapter.OnMessageReceived.Bind(function (chat) {
                console.log(chat);
                self.AddMessage(chat);
            });

            this.chatBoxContainer.append(this.chatBox);
            this.document.keydown(function (key) {
                switch (key.keyCode) {
                    case 13:
                        if (_this.chatBoxContainer.is(":visible")) {
                            var message = _this.chatBox.val();
                            if (message) {
                                serverAdapter.Proxy.invoke("sendMessage", message);
                            }
                            _this.HideChatBox();
                        } else {
                            _this.ShowChatBox();
                        }

                        key.preventDefault();
                        key.stopPropagation();
                        break;

                    case 84:
                        if (!_this.chatBoxContainer.is(":visible")) {
                            _this.ShowChatBox();

                            key.preventDefault();
                            key.stopPropagation();
                        }

                        break;

                    case 27:
                        if (_this.chatBoxContainer.is(":visible")) {
                            _this.HideChatBox();
                            key.preventDefault();
                            key.stopPropagation();
                        }
                        break;
                }
            });
        }
        Chat.prototype.ShowChatBox = function () {
            this.chatContainer.append(this.chatBoxContainer);
            this.chatBoxContainer.show();
            this.chatBox.focus();
        };

        Chat.prototype.HideChatBox = function () {
            this.chatBox.val("");
            this.chatBoxContainer.remove();
        };

        Chat.prototype.AddMessage = function (chatMessage) {
            if (chatMessage.Type == 0) {
                var color = this.colors[this.GetHashCode(chatMessage.From) % this.colors.length];

                var playerName = $("<span>").text(chatMessage.From).css("color", color.toString());
                var message = $("<span>").append($("<div/>").text(chatMessage.Message).text());

                var li = $("<li>").append(playerName).append($("<span>").text(": ")).append(message);

                this.chatContainer.append(li);
            }

            if (chatMessage.Type === 1) {
                var li = $("<li>").append(chatMessage.Message).css("color", eg.Graphics.Color.Yellow.toString());

                this.chatContainer.append(li);
            }

            if (this.chatContainer.children.length > 100) {
                this.chatContainer.children[0].remove();
            }
        };

        Chat.prototype.GetHashCode = function (name) {
            var hash = 0, i, c, l;
            if (name.length == 0)
                return hash;
            for (i = 0, l = name.length; i < l; i++) {
                c = name.charCodeAt(i);
                hash = ((hash << 5) - hash) + c;
                hash |= 0;
            }
            return hash;
        };
        return Chat;
    })();
    ShootR.Chat = Chat;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Chat.js.map
