function ShipStatRecorder(ship) {
    var that = this;
    var holder = $("#shipStats"),
        MovementColumn = $("<div class='column' style='margin-left:177px;'><h3>Movement</h3></div>"),
        RenderedColumn = $("<div class='column'><h3>Rendered</h3></div>"),
        WorldColumn = $("<div class='column'><h3>World</h3></div>"),
        ControlColumn = $("<div class='column'><h3>Controls</h3></div>");

    var shipPosition = $("<div id='shipPosition'></div>"),
        shipSpeed = $("<div id='shipSpeed'></div>"),
        shipVelocity = $("<div id='shipVelocity'></div>");

    var bulletsOnScreen = $("<div id='bulletsOnScreen'></div>"),
        shipsOnScreen = $("<div id='shipsOnScreen'></div>")

    var shipsInWorld = $("<div id='shipsInWorld'></div>"),
        bulletsInWorld = $("<div id='bulletsInWorld'></div>");

    var moveControls = $("<div id='moveControls'><strong>Movement: </strong>w, a, s, d</div>"),
        shootControls = $("<div id='shootControls'><strong>Shoot: </strong>space</div>"),
        latency = $("<div id='latencyIndicator'></div>");

    MovementColumn.append(shipPosition, shipSpeed, shipVelocity);
    RenderedColumn.append(bulletsOnScreen, shipsOnScreen);
    WorldColumn.append(shipsInWorld, bulletsInWorld);
    ControlColumn.append(moveControls, shootControls, latency);
    holder.append(MovementColumn, RenderedColumn, WorldColumn, ControlColumn);

    that.Update = function (payload, gameLatency, ships, bullets) {
        var speed = Math.round(Math.sqrt(Math.pow(ship.MovementController.Velocity.X, 2) + Math.pow(ship.MovementController.Velocity.Y, 2)));

        // Movement Column
        shipPosition.html("Position: ( " + Math.round(ship.MovementController.Position.X) + " , " + Math.round(ship.MovementController.Position.Y) + " )");
        //shipSpeed.html("Speed: " + speed);
        shipVelocity.html("Velocity: ( " + Math.round(ship.MovementController.Velocity.X) + " , " + Math.round(ship.MovementController.Velocity.Y) + " )");

        var shipCount = 0,
            bulletCount = 0;
        for (var key in ships) {
            shipCount++;
        }

        for (var key in bullets) {
            bulletCount++;
        }

        shipsOnScreen.html("Ships On Screen: " + shipCount);
        bulletsOnScreen.html("Bullets On Screen: " + bulletCount);

        // World Column
        shipsInWorld.html("Ships In World: " + payload.ShipsInWorld);
        bulletsInWorld.html("Bullets In World: " + payload.BulletsInWorld);

        // Controls Column
        latency.html("<strong>Latency:</strong> " + gameLatency);
    }
}