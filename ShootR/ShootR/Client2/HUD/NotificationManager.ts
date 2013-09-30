/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class NotificationManager {
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

        constructor(serverAdapter: Server.ServerAdapter) {
            this.showInfoButton.click(() => {
                if (this.showInfoButton.hasClass("active")) {
                    this.hideInfo();
                    this.showInfoButton.removeClass("active");
                } else {
                    this.showInfo();
                    this.showInfoButton.addClass("active");
                }
            });

            this.showInfoButton.click();
            setTimeout(() => {
                // Only hide if it hasn't been hidden already
                if (this.showInfoButton.hasClass("active")) {
                    this.showInfoButton.click();
                }
            }, this.initialControlsShowFor);

            serverAdapter.OnForcedDisconnct.Bind(() => {
                this.Notify("You have been disconnected for being Idle too long.  Refresh the page to play again.", true);

                serverAdapter.Stop();
            });

            serverAdapter.OnControlTransferred.Bind(() => {
                this.Notify("You have been disconnected!  The control for your ship has been transferred to your other login.", true);

                serverAdapter.Stop();
            });
        }

        private showInfo(): void {
            this.notificationHolder.css("display", "block");
            this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.controlsNCreditsHeight);
            this.controlsNCredits.fadeIn(1000);
        }

        private hideInfo(): void {
            this.controlsNCredits.fadeOut(1000, () => {
                this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) + this.controlsNCreditsHeight);
                this.notificationHolder.css("display", "none");
            });
        }

        public LoadPayload(payload: Server.IPayloadData): void {
            if (payload.Notification) {
                this.Notify(payload.Notification, false);
            }
        }

        public Notify(message: string, stayUp: boolean): void {
            var newNotification: JQuery = this.notificationBase.clone(),
                notificationText: JQuery = newNotification.find("p");

            notificationText[0].innerHTML = message;

            this.notifications.append(newNotification);

            this.notificationHolder.css("display", "block");

            this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) - this.notificationBaseHeight);

            newNotification.fadeIn(1000, () => {
                if (!stayUp) {
                    setTimeout(() => {
                        newNotification.fadeOut(1000, () => {
                            newNotification.remove();
                            this.notificationHolder.css("top", parseInt(this.notificationHolder.css("top")) + this.notificationBaseHeight);
                            this.notificationHolder.css("display", "none");
                        });
                    }, this.notifyTime)
            }
            });

            var textHeightHalf: number = notificationText.height() / 2;

            notificationText.css("top", this.notificationHalfHeight - textHeightHalf);
        }
    }

}