/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />

class NotificationManager {
    private controlsNCredits: JQuery = $("#ControlsNCredits");
    private showInfoButton: JQuery = $("#ShowInfo");
    private notificationHolder: JQuery = $("#NotificationHolder");
    private notificationBase: JQuery = $(".Notification");
    private notifications: JQuery = $("#Notifications");
    private notificationBaseHeight: number = $(".Notification").height() + parseInt($(".Notification").css("margin-bottom"));
    private controlsNCreditsHeight: number = $("#ControlsNCredits").height();
    private notificationHalfHeight: number = 50;
    private initialControlsShowFor: number = 7000; // Show the controls info for X milliseconds
    private notifyTime: number = 4000;

    constructor () {
        var that: NotificationManager = this;

        this.showInfoButton.click(function () {
            var $this: JQuery = $(this);
            if ($this.hasClass("active")) {
                that.hideInfo();
                $(this).removeClass("active");
            }
            else {
                that.showInfo();
                $(this).addClass("active");
            }
        });

        this.showInfoButton.click();
        setTimeout(function () {
            // Only hide if it hasn't been hidden already
            if (that.showInfoButton.hasClass("active")) {
                that.showInfoButton.click();
            }
        }, this.initialControlsShowFor);
    }

    private showInfo(): void {
        this.notificationHolder.css("display", "block");
        this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.controlsNCreditsHeight);
        this.controlsNCredits.fadeIn(1000);
    }

    private hideInfo(): void {
        var that: NotificationManager = this;
        this.controlsNCredits.fadeOut(1000, function () {
            that.notificationHolder.css("top", parseInt(that.notificationHolder.css("top")) + that.controlsNCreditsHeight);
            that.notificationHolder.css("display", "none");
        });
    }

    public Notify(message: string, stayUp: bool): void {
        var newNotification: JQuery = this.notificationBase.clone(),
        notificationText: JQuery = newNotification.find("p"),
        that: NotificationManager = this;

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
                }, that.notifyTime)
            }
        });

        var textHeightHalf: number = notificationText.height() / 2;

        notificationText.css("top", this.notificationHalfHeight - textHeightHalf);
    }
}