/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
var NotificationManager = (function () {
    function NotificationManager() {
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
        var that = this;

        this.showInfoButton.click(function () {
            var $this = $(this);
            if ($this.hasClass("active")) {
                that.hideInfo();
                $(this).removeClass("active");
            } else {
                that.showInfo();
                $(this).addClass("active");
            }
        });

        this.showInfoButton.click();
        setTimeout(function () {
            if (that.showInfoButton.hasClass("active")) {
                that.showInfoButton.click();
            }
        }, this.initialControlsShowFor);
    }
    NotificationManager.prototype.showInfo = function () {
        this.notificationHolder.css("display", "block");
        this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.controlsNCreditsHeight);
        this.controlsNCredits.fadeIn(1000);
    };

    NotificationManager.prototype.hideInfo = function () {
        var that = this;
        this.controlsNCredits.fadeOut(1000, function () {
            that.notificationHolder.css("top", parseInt(that.notificationHolder.css("top")) + that.controlsNCreditsHeight);
            that.notificationHolder.css("display", "none");
        });
    };

    NotificationManager.prototype.Notify = function (message, stayUp) {
        var newNotification = this.notificationBase.clone(), notificationText = newNotification.find("p"), that = this;

        notificationText.html(message);

        this.notifications.append(newNotification);

        this.notificationHolder.css("display", "block");

        this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.notificationBaseHeight);

        newNotification.fadeIn(1000, function () {
            if (!stayUp) {
                setTimeout(function () {
                    newNotification.fadeOut(1000, function () {
                        newNotification.remove();
                        that.notificationHolder.css("top", parseInt(that.notificationHolder.css("top")) + that.notificationBaseHeight);
                        that.notificationHolder.css("display", "none");
                    });
                }, that.notifyTime);
            }
        });

        var textHeightHalf = notificationText.height() / 2;

        notificationText.css("top", this.notificationHalfHeight - textHeightHalf);
    };
    return NotificationManager;
})();
//# sourceMappingURL=NotificationManager.js.map
