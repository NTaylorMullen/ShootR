function Boost(MovementController, Controllable) {
    if (MovementController) {
        MovementAbility.apply(this, ["Boost", MovementController]);
        var that = this,
            base = {};

        base.Activate = that.Activate;
        base.Deactivate = that.Deactivate;

        that.Activate = function () {
            that.MultiplySpeedBy(that.BOOST_SPEED_INCREASE);
            base.Activate();
            Controllable.Value = false;
        }

        that.Deactivate = function () {
            that.ResetSpeed();
            base.Deactivate();
            Controllable.Value = true;            
        }

        that.Update = function (now) {
            if (that.Active && now.getTime() - that.ActivatedAt >= that.BOOST_DURATION) {
                that.Deactivate();
            }
        }
    }
}

Boost.prototype = new MovementAbility();