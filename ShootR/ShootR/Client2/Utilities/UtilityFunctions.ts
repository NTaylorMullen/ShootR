/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />

module ShootR {
    export function StandardDeviation(arr: number[]): number {
        var average: number = Average(arr),
            sum: number = 0;

        for (var i = 0; i < arr.length; i++) {
            sum += Math.pow(arr[i] - average, 2);
        }

        return Math.sqrt(sum / (arr.length - 1));
    }

    export function Average(arr: number[]): number {
        var sum: number = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }

        return sum / arr.length;
    }

    export var delay = (function () {
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

}