/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../Utilities/Vector2.ts" />

function CalculatePO(from: Date, time: number): number {
    return ((new Date().getTime() - from.getTime()) / time);
}

function CalculatePOS(from: Date): number {
    return CalculatePO(from, 1000);
}

function CalculateLength(A: Vector2, B: Vector2): number {
    return Math.sqrt(Math.pow(A.X - B.X, 2) + Math.pow(A.Y - B.Y, 2));
}

function CalculateDistance(A: Vector2, B: Vector2): Vector2 {
    return new Vector2(Math.abs(B.X - A.X), Math.abs(B.Y - A.Y));
}

function CalculateAngle(A: Vector2, B: Vector2): number {
    var deltas: Vector2 = Vector2.SubtractV(A, B),
        angle: number = Math.atan2(deltas.Y, deltas.X) * -180 / Math.PI;

    if (angle < 0) {
        angle += 360;
    }

    return angle;
}

function StandardDeviation(arr: number[]): number {
    var average: number = Average(arr),
        sum: number = 0;

    for (var i = 0; i < arr.length; i++) {
        sum += Math.pow(arr[i] - average, 2);
    }

    return Math.sqrt(sum / (arr.length - 1));
}

function Average(arr: number[]): number {
    var sum: number = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum / arr.length;
}

var delay = (function () {
    var timer: number = 0;
    return function (callback: Function, ms: number) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

jQuery.fn.flash = function (color: string, duration: number) {
    this.stop(true);
    var current = this.css('backgroundColor');
    this.animate({ backgroundColor: 'rgb(' + color + ')' }, duration / 2)
        .animate({ backgroundColor: current }, duration / 2);
}