function Movement(from, to, dir, originCrossOver) {
    var that = this;

    that.ValidMove = function (angle) {
        if (!originCrossOver) {
            return angle >= from && angle <= to;
        }
        else {
            return (angle >= to) || (angle <= from && angle >= 0);
        }
    }

    that.Direction = dir;
    that.Active = false;
};

function TouchController(StartMovement, StopMovement, StopAndStartMovement, ResetMovement, ShipFire) {
    var that = this,
        canvas = document.getElementById("game"),
        shootPosition = false,
        shootDrawStart = false,
        topOffset = HeightOffset($("#shipStats")),
        lengthOffset = 22,
        drawShotsFor = 100;

    var Forward = new Movement(20, 160, "Forward"),
        Backward = new Movement(200, 340, "Backward"),
        RotatingLeft = new Movement(125, 235, "RotatingLeft"),
        RotatingRight = new Movement(55, 305, "RotatingRight", true);

    var leftJoyStick = new JoyStick(lengthOffset, [Forward, Backward], StartMovement, StopMovement, StopAndStartMovement, ResetMovement),
        rightJoyStick = new JoyStick(lengthOffset, [RotatingLeft, RotatingRight], StartMovement, StopMovement, StopAndStartMovement, ResetMovement);

    that.Enabled = true;

    function HandleStart(touch) {
        if (that.Enabled) {
            if (touch.clientX <= middle) { // leftJoyStick
                if (!leftJoyStick.InAction) {
                    leftJoyStick.TouchStart(touch);
                }
            }
            else { // Right side of the screen, so rotate or shoot
                if (!rightJoyStick.InAction) {
                    rightJoyStick.TouchStart(touch);                    
                }
            }
        }
    }

    function HandleMove(touch) {
        if (that.Enabled) {
            leftJoyStick.TouchMove(touch);
            rightJoyStick.TouchMove(touch);
        }
    }

    function HandleStop(touch) {
        if (that.Enabled) {
            // Check if we need to fire
            if ((leftJoyStick.InAction && leftJoyStick.Traveled() < lengthOffset && leftJoyStick.TimeSinceTouch() <= 1000) ||
                (rightJoyStick.InAction && rightJoyStick.Traveled() < lengthOffset && rightJoyStick.TimeSinceTouch() <= 1000)) {
                shootPosition = {
                    X: touch.clientX,
                    Y: touch.clientY - topOffset
                };
                shootDrawStart = new Date().getTime();
                ShipFire();
            }

            leftJoyStick.TouchStop(touch);
            rightJoyStick.TouchStop(touch);
        }
    }

    var mouseAdapter = new MouseAdapter(HandleStart, HandleMove, HandleStop),
        touchAdapter = new TouchAdapter(HandleStart, HandleMove, HandleStop),
        ieTouchAdapter = new IETouchAdapter(HandleStart, HandleMove, HandleStop);    

    that.Initialize = function (screen) {
        if (navigator.msPointerEnabled) {
            // Setup the css on the game canvas
            $(canvas).css("-ms-touch-action", "none");

            // Initialize regular touch movements
            canvas.addEventListener('MSPointerDown', ieTouchAdapter.Start, false);
            canvas.addEventListener('MSPointerMove', ieTouchAdapter.Move, false);
            canvas.addEventListener('MSPointerUp', ieTouchAdapter.Stop, false);

            // Initialize gesture touches
            canvas.addEventListener("MSPointerCancel", function (e) { e.preventDefault(); }, false);
            canvas.addEventListener("MSGestureInit", function (e) { if (e.preventManipulation) e.preventManipulation(); }, false);
            canvas.addEventListener("MSHoldVisual", function (e) { e.preventDefault(); }, false);
        }
        else if ('createTouch' in document) {
            canvas.addEventListener('touchstart', touchAdapter.Start, false);
            canvas.addEventListener('touchmove', touchAdapter.Move, false);
            canvas.addEventListener('touchend', touchAdapter.Stop, false);
        }
        else {
            canvas.addEventListener('mousedown', mouseAdapter.Start, false);
            canvas.addEventListener('mousemove', mouseAdapter.Move, false);
            canvas.addEventListener('mouseup', mouseAdapter.Stop, false);
        }   

        middle = screen.Viewport.Width / 2;

        $(screen).on("UpdateScreen", function () {
            middle = screen.Viewport.Width / 2;
        });
    }

    that.Draw = function () {
        leftJoyStick.Draw();
        rightJoyStick.Draw();

        if (shootDrawStart !== false) {
            if (new Date().getTime() - shootDrawStart >= drawShotsFor) {
                shootDrawStart = false;
                shootPosition = false;
            }
            else {
                CanvasContext.drawCircle(shootPosition.X, shootPosition.Y, 40, 6, "#FA6400");
                CanvasContext.drawCircle(shootPosition.X, shootPosition.Y, 50, 2, "#FA6400");
            }
        }
    }
}