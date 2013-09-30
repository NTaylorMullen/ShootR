/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
var ShootR;
(function (ShootR) {
    var NotificationManager = (function () {
        function NotificationManager(serverAdapter) {
            var _this = this;
            this.controlsNCredits = $("#ControlsNCredits");
            this.showInfoButton = $("#ShowInfo");
            this.notificationHolder = $("#NotificationHolder");
            this.notificationBase = $(".Notification");
            this.notifications = $("#Notifications");
            this.notificationBaseHeight = $(".Notification").height() + parseInt($(".Notification").css("margin-bottom"));
            this.controlsNCreditsHeight = $("#ControlsNCredits").height();
            this.notificationHalfHeight = 50;
            this.initialControlsShowFor = 7000;
            this.notifyTime = 4000;
            this.showInfoButton.click(function () {
                if (_this.showInfoButton.hasClass("active")) {
                    _this.hideInfo();
                    _this.showInfoButton.removeClass("active");
                } else {
                    _this.showInfo();
                    _this.showInfoButton.addClass("active");
                }
            });

            this.showInfoButton.click();
            setTimeout(function () {
                if (_this.showInfoButton.hasClass("active")) {
                    _this.showInfoButton.click();
                }
            }, this.initialControlsShowFor);

            serverAdapter.OnForcedDisconnct.Bind(function () {
                _this.Notify("You have been disconnected for being Idle too long.  Refresh the page to play again.", true);

                serverAdapter.Stop();
            });

            serverAdapter.OnControlTransferred.Bind(function () {
                _this.Notify("You have been disconnected!  The control for your ship has been transferred to your other login.", true);

                serverAdapter.Stop();
            });
        }
        NotificationManager.prototype.showInfo = function () {
            this.notificationHolder.css("display", "block");
            this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.controlsNCreditsHeight);
            this.controlsNCredits.fadeIn(1000);
        };

        NotificationManager.prototype.hideInfo = function () {
            var _this = this;
            this.controlsNCredits.fadeOut(1000, function () {
                _this.notificationHolder.css("top", parseInt(_this.notificationHolder.css("top")) + _this.controlsNCreditsHeight);
                _this.notificationHolder.css("display", "none");
            });
        };

        NotificationManager.prototype.LoadPayload = function (payload) {
            if (payload.Notification) {
                this.Notify(payload.Notification, false);
            }
        };

        NotificationManager.prototype.Notify = function (message, stayUp) {
            var _this = this;
            var newNotification = this.notificationBase.clone(), notificationText = newNotification.find("p");

            notificationText[0].innerHTML = message;

            this.notifications.append(newNotification);

            this.notificationHolder.css("display", "block");

            this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.notificationBaseHeight);

            newNotification.fadeIn(1000, function () {
                if (!stayUp) {
                    setTimeout(function () {
                        newNotification.fadeOut(1000, function () {
                            newNotification.remove();
                            _this.notificationHolder.css("top", parseInt(_this.notificationHolder.css("top")) + _this.notificationBaseHeight);
                            _this.notificationHolder.css("display", "none");
                        });
                    }, _this.notifyTime);
                }
            });

            var textHeightHalf = notificationText.height() / 2;

            notificationText.css("top", this.notificationHalfHeight - textHeightHalf);
        };
        return NotificationManager;
    })();
    ShootR.NotificationManager = NotificationManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=NotificationManager.js.map
