var NotificationManager = (function () {
    function NotificationManager() {
        this.controlsNCredits = $("#ControlsNCredits");
        this.showInfoButton = $("#ShowInfo");
        this.notificationHolder = $("#NotificationHolder");
        this.initialControlsShowFor = 7000;
        var that = this;
        this.showInfoButton.click(function () {
            var $this = $(this);
            if($this.hasClass("active")) {
                that.hideInfo();
                $(this).removeClass("active");
            } else {
                that.showInfo();
                $(this).addClass("active");
            }
        });
        this.showInfoButton.click();
        setTimeout(function () {
            that.showInfoButton.click();
        }, this.initialControlsShowFor);
    }
    NotificationManager.prototype.showInfo = function () {
        this.notificationHolder.css("display", "block");
        this.controlsNCredits.stop(true);
        this.controlsNCredits.fadeIn(1000);
    };
    NotificationManager.prototype.hideInfo = function () {
        var that = this;
        this.controlsNCredits.stop(true);
        this.controlsNCredits.fadeOut(1000, function () {
            that.notificationHolder.css("display", "none");
        });
    };
    NotificationManager.prototype.Notify = function (message) {
    };
    return NotificationManager;
})();
//@ sourceMappingURL=NotificationManager.js.map
