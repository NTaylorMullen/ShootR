declare var $;

class NotificationManager {
    private controlsNCredits = $("#ControlsNCredits");
    private showInfoButton = $("#ShowInfo");
    private controlsNCreditsHeight = $("#ControlsNCredits").height();
    private notificationHolder = $("#NotificationHolder");
    private notificationHalfHeight = 50;
    private notificationBase = $(".Notification");
    private notificationBaseHeight = $(".Notification").height() + parseInt($(".Notification").css("margin-bottom"));
    private notifications = $("#Notifications");
    private initialControlsShowFor = 7000; // Show the controls info for X milliseconds
    private notifyTime = 4000;

    constructor () {
        var that = this;

        this.showInfoButton.click(function () {
            var $this = $(this);
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

    private showInfo() {        
        this.notificationHolder.css("display", "block");
        this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.controlsNCreditsHeight);
        this.controlsNCredits.fadeIn(1000);
    }

    private hideInfo() {
        var that = this;        
        this.controlsNCredits.fadeOut(1000, function () {
            that.notificationHolder.css("top", parseInt(that.notificationHolder.css("top")) + that.controlsNCreditsHeight);
            that.notificationHolder.css("display", "none");
        });
    }

    public Notify(message: string, stayUp: bool) {
        var newNotification = this.notificationBase.clone(),
            notificationText = newNotification.find("p"),
            that = this;

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

        var textHeightHalf = notificationText.height() / 2;

        notificationText.css("top", this.notificationHalfHeight - textHeightHalf);
    }
}