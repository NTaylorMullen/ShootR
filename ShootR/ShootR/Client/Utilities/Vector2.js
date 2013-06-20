var Vector2 = (function () {
    function Vector2(X, Y) {
        if (!isNaN(X) && Y === false) {
            var radians = X * Math.PI / 180;
            this.X = Math.cos(radians);
            this.Y = Math.sin(radians);
        } else {
            this.X = X || 0;
            this.Y = Y || 0;
        }
    }
    Vector2.prototype.Length = function () {
        return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
    };

    Vector2.prototype.Abs = function () {
        return new Vector2(Math.abs(this.X), Math.abs(this.Y));
    };

    Vector2.prototype.DistanceTo = function (to) {
        return Math.sqrt(Math.pow(to.X - this.X, 2) + Math.pow(to.Y - this.Y, 2));
    };

    Vector2.prototype.ZeroOut = function () {
        this.X = 0;
        this.Y = 0;
    };

    Vector2.MultiplyV = function (v1, v2) {
        return new Vector2(v1.X * v2.X, v1.Y * v2.Y);
    };

    Vector2.MultiplyN = function (v1, num) {
        return new Vector2(v1.X * num, v1.Y * num);
    };

    Vector2.AddV = function (v1, v2) {
        return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
    };

    Vector2.AddN = function (v1, num) {
        return new Vector2(v1.X + num, v1.Y + num);
    };

    Vector2.SubtractV = function (v1, v2) {
        return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
    };

    Vector2.SubtractVFromN = function (v1, num) {
        return new Vector2(v1.X - num, v1.Y - num);
    };

    Vector2.SubtractNFromV = function (num, v1) {
        return new Vector2(num - v1.X, num - v1.Y);
    };

    Vector2.DivideV = function (v1, v2) {
        return new Vector2(v1.X / v2.X, v1.Y / v2.Y);
    };

    Vector2.DivideVByN = function (v1, num) {
        return new Vector2(v1.X / num, v1.Y / num);
    };

    Vector2.DivideNByV = function (num, v1) {
        return new Vector2(num / v1.X, num / v1.Y);
    };
    return Vector2;
})();
//@ sourceMappingURL=Vector2.js.map
