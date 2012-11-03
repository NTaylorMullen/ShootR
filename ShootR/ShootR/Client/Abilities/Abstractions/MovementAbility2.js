function MovementAbility(Name, MovementController) {
    if (Name && MovementController) {
        Ability.apply(this, [Name]);
        var that = this,
            initialPower = MovementController.Power;

        that.IncreaseSpeedBy = function (amount) {
            MovementController.Power += amount;
        }

        that.MultiplySpeedBy = function (amount) {
            MovementController.Power *= amount;
        }

        that.DecreaseSpeedBy = function (amount) {
            MovementController.Power -= amount;
        }

        that.ResetSpeed = function () {
            MovementController.Power = initialPower;
        }
    }
}

MovementAbility.prototype = new Ability();