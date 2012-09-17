function ShipStatRecorder(ship) {
    var that = this;
    var holder = $("<div id='shipStats'></div>");
    var shipPosition = $("<div id='shipPosition'></div>");
    var shipSpeed = $("<div id='shipSpeed'></div>");
    var shipVelocity = $("<div id='shipVelocity'></div>");

    holder.append(shipPosition, shipSpeed, shipVelocity);

    $("body").prepend(holder);

    that.Update = function () {
        var speed = Math.round(Math.sqrt(Math.pow(ship.MovementController.Velocity.X, 2) + Math.pow(ship.MovementController.Velocity.Y, 2)));

        shipPosition.html("Position: ( " + Math.round(ship.MovementController.Position.X) + " , " + Math.round(ship.MovementController.Position.Y) + " )");
        shipSpeed.html("Speed: " + speed);
        shipVelocity.html("Velocity: ( " + Math.round(ship.MovementController.Velocity.X) + " , " + Math.round(ship.MovementController.Velocity.Y) + " )");
    }
}