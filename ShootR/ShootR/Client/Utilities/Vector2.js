function Vector2(first, second) {
    var that = this;

    that.IsVector2 = true;
    that.X = 0;
    that.Y = 0;

    Initialize();

    that.ZeroOut = function () {
        that.X = 0;
        that.Y = 0;
    }

    that.Length = function() {
        return Math.sqrt(Math.pow(that.X, 2) + Math.pow(that.Y, 2));
    }

    that.Normalized = function() {
        var length = that.Length();
        return new Vector2(that.X / length, that.Y / length);
    }
   
    that.Abs = function() {
        return new Vector2(Math.abs(that.X), Math.abs(that.Y));
    }

    // To is a Vector2
    that.DistanceTo = function(to) {
        return Math.sqrt(Math.pow(to.X - that.X, 2) + Math.pow(to.Y - that.Y, 2));
    }

    that.Multiply = function (by) {
        if(by.IsVector2) {
            return new Vector2(by.X * that.X, by.Y * that.Y);
        }
        else {
            return new Vector2(that.X * by, that.Y * by);
        }
    }

    that.Add = function (by) {
        if (by.IsVector2) {
            return new Vector2(by.X + that.X, by.Y + that.Y);
        }
        else {
            return new Vector2(that.X + by, that.Y + by);
        }
    }

    that.SubtractFrom = function (by) {
        if (by.IsVector2) {
            return new Vector2(by.X - that.X, by.Y - that.Y);
        }
        else {
            return new Vector2(by - that.X, by - that.Y);
        }
    }

    that.SubtractBy = function (by) {
        if (by.IsVector2) {
            return new Vector2(that.X - by.X, that.Y - by.Y);
        }
        else {
            return new Vector2(that.X - by, that.Y - by);
        }
    }

    that.DivideFrom = function (by) {
        if (by.IsVector2) {
            return new Vector2(by.X / that.X, by.Y / that.Y);
        }
        else {
            return new Vector2(by / that.X, by / that.Y);
        }
    }

    that.DivideBy = function (by) {
        if (by.IsVector2) {
            return new Vector2(that.X / by.X, that.Y / by.Y);
        }
        else {
            return new Vector2(that.X / by, that.Y / by);
        }
    }

    function Initialize() {
        // Single parameter
        if (!second) {
            if (first && first.IsVector2) {
                that.X = first.X;
                that.Y = first.Y;
            }
            else if(first) { // Rotation
                var radians = first * Math.PI / 180;
                that.X = Math.cos(radians);
                that.Y = Math.sin(radians);
            }
        }
        else {
            that.X = first;
            that.Y = second;
        }
    }
}