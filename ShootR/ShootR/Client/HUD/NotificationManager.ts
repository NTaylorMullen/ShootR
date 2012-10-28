declare var $;

class NotificationManager {
    private controlsNCredits = $("#ControlsNCredits");
    private showInfoButton = $("#ShowInfo");
    private notificationHolder = $("#NotificationHolder");
    private initialControlsShowFor = 7000; // Show the controls info for X milliseconds

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
        setTimeout(function () { that.showInfoButton.click(); }, this.initialControlsShowFor);
    }

    private showInfo() {
        this.notificationHolder.css("display", "block");
        this.controlsNCredits.stop(true);
        this.controlsNCredits.fadeIn(1000);
    }

    private hideInfo() {   
        var that = this;
        this.controlsNCredits.stop(true);
        this.controlsNCredits.fadeOut(1000, function () {
            that.notificationHolder.css("display", "none");
        });
    }

    public Notify(message: string) {

    }
}