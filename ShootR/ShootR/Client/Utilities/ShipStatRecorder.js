function ShipStatRecorder(ship) {
    var that = this;
    var holder = $("<div id='shipStats'></div>");
    var MovementColumn = $("<div class='column'><h3>Movement</h3></div>");
    var RenderedColumn = $("<div class='column wide'><h3>Rendered</h3></div>");
    var WorldColumn = $("<div class='column wide'><h3>World</h3></div>");

    var shipPosition = $("<div id='shipPosition'></div>"),
        shipSpeed = $("<div id='shipSpeed'></div>"),
        shipVelocity = $("<div id='shipVelocity'></div>");

    var bulletsOnScreen = $("<div id='bulletsOnScreen'></div>"),
        shipsOnScreen = $("<div id='shipsOnScreen'></div>"),
        collisionsOnScreen = $("<div id='collisionsOnScreen'></div>");

    var shipsInWorld = $("<div id='shipsInWorld'></div>"),
        bulletsInWorld = $("<div id='bulletsInWorld'></div>"),
        collisionsInWorld = $("<div id='collisionsInWorld'></div>");

    MovementColumn.append(shipPosition, shipSpeed, shipVelocity);
    RenderedColumn.append(bulletsOnScreen, shipsOnScreen, collisionsOnScreen);
    WorldColumn.append(shipsInWorld, bulletsInWorld, collisionsInWorld);
    holder.append(MovementColumn, RenderedColumn, WorldColumn);

    $("body").prepend(holder);

    that.Update = function (payload) {
        var speed = Math.round(Math.sqrt(Math.pow(ship.MovementController.Velocity.X, 2) + Math.pow(ship.MovementController.Velocity.Y, 2)));

        // Movement Column
        shipPosition.html("Position: ( " + Math.round(ship.MovementController.Position.X) + " , " + Math.round(ship.MovementController.Position.Y) + " )");
        shipSpeed.html("Speed: " + speed);
        shipVelocity.html("Velocity: ( " + Math.round(ship.MovementController.Velocity.X) + " , " + Math.round(ship.MovementController.Velocity.Y) + " )");

        // Rendered Column
        var i = 0;
        for (var key in payload.Ships) {
            i++;
        }
        shipsOnScreen.html("Ships On Screen: " + i);
        bulletsOnScreen.html("Bullets On Screen: " + payload.Bullets.length);
        collisionsOnScreen.html("Collisions On Screen: " + payload.Collisions.length);

        // World Column
        shipsInWorld.html("Ships In World: " + payload.ShipsInWorld);
        bulletsInWorld.html("Bullets In World: " + payload.BulletsInWorld);
        collisionsInWorld.html("Collisions In World: " + payload.CollisionsInWorld);
    }
}