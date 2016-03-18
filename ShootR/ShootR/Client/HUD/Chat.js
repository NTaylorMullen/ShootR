/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
var ShootR;
(function (ShootR) {
    (function (ChatMessageType) {
        ChatMessageType[ChatMessageType["User"] = 0] = "User";
        ChatMessageType[ChatMessageType["System"] = 1] = "System";
    })(ShootR.ChatMessageType || (ShootR.ChatMessageType = {}));
    var ChatMessageType = ShootR.ChatMessageType;

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
        function Chat(_userInformation, serverAdapter) {
            var _this = this;
            this._userInformation = _userInformation;
            this._document = $(document);
            this._chatContainer = $("#chat");
            this._chatBox = $("<input>").attr("id", "chatbox").attr("type", "input").attr("autocomplete", "off");
            this._chatBoxContainer = $("<li>");
            this._chatBoxVisible = false;
            this._colors = [
                eg.Graphics.Color.Red.toString(),
                eg.Graphics.Color.Orange.toString(),
                eg.Graphics.Color.Yellow.toString(),
                eg.Graphics.Color.Green.toString(),
                eg.Graphics.Color.Blue.toString(),
                eg.Graphics.Color.Purple.toString(),
                eg.Graphics.Color.White.toString(),
                eg.Graphics.Color.Cyan.toString()
            ];
            this._systemMessageColor = eg.Graphics.Color.Yellow.toString();
            serverAdapter.OnMessageReceived.Bind(function (chat) {
                _this.AddMessage(chat);
            });

            this._chatBoxContainer.append(this._chatBox);
            this._document.keydown(function (key) {
                switch (key.keyCode) {
                    case 13:
                        if (_this._chatBoxVisible) {
                            var message = _this._chatBox.val();
                            if (message) {
                                _this.AddMessage(new ChatMessage(_this._userInformation.Name, message, ChatMessageType.User));
                                serverAdapter.Proxy.invoke("sendMessage", message);
                            }
                            _this.HideChatBox();
                        } else {
                            _this.ShowChatBox();
                        }

                        _this.StopPropogation(key);
                        break;

                    case 84:
                        if (!_this._chatBoxVisible) {
                            _this.ShowChatBox();
                            _this.StopPropogation(key);
                        }

                        break;

                    case 27:
                        if (_this._chatBoxVisible) {
                            _this.HideChatBox();
                            _this.StopPropogation(key);
                        }
                        break;
                }
            });
        }
        Chat.prototype.StopPropogation = function (key) {
            key.preventDefault();
            key.stopPropagation();
        };

        Chat.prototype.ShowChatBox = function () {
            this._chatContainer.append(this._chatBoxContainer);
            this._chatBoxContainer.show();
            this._chatBox.focus();
            this._chatBoxVisible = true;
        };

        Chat.prototype.HideChatBox = function () {
            this._chatBox.val("");
            this._chatBoxContainer.remove();
            this._chatBoxVisible = false;
        };

        Chat.prototype.AddMessage = function (chatMessage) {
            if (chatMessage.Type === ChatMessageType.User) {
                var color = this._colors[this.GetHashCode(chatMessage.From) % this._colors.length], playerName = $("<span>").text(chatMessage.From).css("color", color), message = $("<span>").append($("<div/>").text(chatMessage.Message).html().replace(/\"/g, "&quot;"));

                if (this._chatBoxVisible) {
                    $("<li>").append(playerName).append($("<span>").text(": ")).append(message).insertBefore(this._chatBoxContainer);
                } else {
                    this._chatContainer.append($("<li>").append(playerName).append($("<span>").text(": ")).append(message));
                }
            }

            if (chatMessage.Type === ChatMessageType.System) {
                this._chatContainer.append($("<li>").append(chatMessage.Message).css("color", this._systemMessageColor));
            }

            if (this._chatContainer.children.length > 100) {
                this._chatContainer.children[0].remove();
            }
        };

        Chat.prototype.GetHashCode = function (name) {
            var hash = 0, i, c, l;
            if (name.length === 0)
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
