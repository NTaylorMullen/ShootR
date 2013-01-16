function CalculatePO(from, time) {
    return ((new Date().getTime() - from.getTime()) / time);
}
function CalculatePOS(from) {
    return CalculatePO(from, 1000);
}
function CalculateLength(A, B) {
    return Math.sqrt(Math.pow(A.X - B.X, 2) + Math.pow(A.Y - B.Y, 2));
}
function CalculateDistance(A, B) {
    return new Vector2(Math.abs(B.X - A.X), Math.abs(B.Y - A.Y));
}
function CalculateAngle(A, B) {
    var deltas = Vector2.SubtractV(A, B), angle = Math.atan2(deltas.Y, deltas.X) * -180 / Math.PI;
    if(angle < 0) {
        angle += 360;
    }
    return angle;
}
function StandardDeviation(arr) {
    var average = Average(arr), sum = 0;
    for(var i = 0; i < arr.length; i++) {
        sum += Math.pow(arr[i] - average, 2);
    }
    return Math.sqrt(sum / (arr.length - 1));
}
function Average(arr) {
    var sum = 0;
    for(var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    }
})();
jQuery.fn.flash = function (color, duration) {
    this.stop(true);
    var current = this.css('backgroundColor');
    this.animate({
        backgroundColor: 'rgb(' + color + ')'
    }, duration / 2).animate({
        backgroundColor: current
    }, duration / 2);
};
//@ sourceMappingURL=UtilityFunctions.js.map
