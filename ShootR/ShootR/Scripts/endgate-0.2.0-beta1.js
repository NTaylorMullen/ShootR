var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    var TimeSpan = (function () {
        function TimeSpan(milliseconds, seconds, minutes) {
            if (typeof seconds === "undefined") { seconds = 0; }
            if (typeof minutes === "undefined") { minutes = 0; }
            this._type = "TimeSpan";
            this.Milliseconds = milliseconds + seconds * TimeSpan._secondsMultiplier + minutes * TimeSpan._minutesMultiplier;
        }
        Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
            get: function () {
                return this._milliseconds;
            },
            set: function (val) {
                this._milliseconds = val;
                this._seconds = val / TimeSpan._secondsMultiplier;
                this._minutes = val / TimeSpan._minutesMultiplier;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "Seconds", {
            get: function () {
                return this._seconds;
            },
            set: function (val) {
                this._seconds = val;
                this._milliseconds = val * TimeSpan._secondsMultiplier;
                this._minutes = this._milliseconds / TimeSpan._minutesMultiplier;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "Minutes", {
            get: function () {
                return this._minutes;
            },
            set: function (val) {
                this._minutes = val;
                this._seconds = val * 60;
                this._milliseconds = this._seconds * TimeSpan._secondsMultiplier;
            },
            enumerable: true,
            configurable: true
        });

        TimeSpan.prototype.Add = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds + val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds + val);
            }
        };

        TimeSpan.prototype.Multiply = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds * val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds * val);
            }
        };

        TimeSpan.prototype.Subtract = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds - val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds - val);
            }
        };

        TimeSpan.prototype.SubtractFrom = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds - this.Milliseconds);
            } else {
                return new TimeSpan(val - this.Milliseconds);
            }
        };

        TimeSpan.prototype.Divide = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds / val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds / val);
            }
        };

        TimeSpan.prototype.DivideFrom = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds / this.Milliseconds);
            } else {
                return new TimeSpan(val / this.Milliseconds);
            }
        };

        TimeSpan.prototype.Equivalent = function (timeSpan) {
            return this.Milliseconds === timeSpan.Milliseconds;
        };

        TimeSpan.prototype.Clone = function () {
            return new TimeSpan(this.Milliseconds);
        };

        TimeSpan.prototype.toString = function () {
            return this.Milliseconds + ":" + this.Seconds + ":" + this.Minutes;
        };

        TimeSpan.FromMilliseconds = function (val) {
            return new TimeSpan(val);
        };

        TimeSpan.FromSeconds = function (val) {
            return new TimeSpan(0, val);
        };

        TimeSpan.FromMinutes = function (val) {
            return new TimeSpan(0, 0, val);
        };

        TimeSpan.DateSpan = function (from, to) {
            return new TimeSpan(to.getTime() - from.getTime());
        };

        Object.defineProperty(TimeSpan, "Zero", {
            get: function () {
                return new TimeSpan(0);
            },
            enumerable: true,
            configurable: true
        });
        TimeSpan._secondsMultiplier = 1000;
        TimeSpan._minutesMultiplier = TimeSpan._secondsMultiplier * 60;
        return TimeSpan;
    })();
    EndGate.TimeSpan = TimeSpan;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var GameTime = (function () {
        function GameTime() {
            this._type = "GameTime";
            this._start = this._lastUpdate = new Date();

            this.Update();
        }
        Object.defineProperty(GameTime.prototype, "Elapsed", {
            get: function () {
                return this._elapsed;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameTime.prototype, "Now", {
            get: function () {
                return this._lastUpdate;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameTime.prototype, "Total", {
            get: function () {
                return EndGate.TimeSpan.DateSpan(this._start, new Date());
            },
            enumerable: true,
            configurable: true
        });

        GameTime.prototype.Update = function () {
            var now = new Date();

            this._elapsed = new EndGate.TimeSpan(now.getTime() - this._lastUpdate.getTime());
            this._lastUpdate = now;
        };
        return GameTime;
    })();
    EndGate.GameTime = GameTime;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var Size2d = (function () {
        function Size2d(first, second) {
            this._type = "Size2d";
            this.Width = first || 0;
            this.Height = typeof second !== "undefined" ? second : this.Width;
        }
        Object.defineProperty(Size2d, "Zero", {
            get: function () {
                return new Size2d(0, 0);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d, "One", {
            get: function () {
                return new Size2d(1, 1);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "Radius", {
            get: function () {
                return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "HalfWidth", {
            get: function () {
                return this.Width / 2;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "HalfHeight", {
            get: function () {
                return this.Height / 2;
            },
            enumerable: true,
            configurable: true
        });

        Size2d.prototype.Apply = function (action) {
            this.Width = action(this.Width);
            this.Height = action(this.Height);
        };

        Size2d.prototype.Trigger = function (action) {
            action(this.Width);
            action(this.Height);
        };

        Size2d.prototype.Add = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width + val.Width, this.Height + val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width + val.X, this.Height + val.Y);
            } else {
                return new Size2d(this.Width + val, this.Height + val);
            }
        };

        Size2d.prototype.Multiply = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width * val.Width, this.Height * val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width * val.X, this.Height * val.Y);
            } else {
                return new Size2d(this.Width * val, this.Height * val);
            }
        };

        Size2d.prototype.Subtract = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width - val.Width, this.Height - val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width - val.X, this.Height - val.Y);
            } else {
                return new Size2d(this.Width - val, this.Height - val);
            }
        };

        Size2d.prototype.SubtractFrom = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(val.Width - this.Width, val.Height - this.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(val.X - this.Width, val.Y - this.Height);
            } else {
                return new Size2d(val - this.Width, val - this.Height);
            }
        };

        Size2d.prototype.Divide = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width / val.Width, this.Height / val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width / val.X, this.Height / val.Y);
            } else {
                return new Size2d(this.Width / val, this.Height / val);
            }
        };

        Size2d.prototype.DivideFrom = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(val.Width / this.Width, val.Height / this.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(val.X / this.Width, val.Y / this.Height);
            } else {
                return new Size2d(val / this.Width, val / this.Height);
            }
        };

        Size2d.prototype.Negate = function () {
            return new Size2d(this.Width * -1, this.Height * -1);
        };

        Size2d.prototype.Equivalent = function (size) {
            return this.Width === size.Width && this.Height === size.Height;
        };

        Size2d.prototype.Clone = function () {
            return new Size2d(this.Width, this.Height);
        };

        Size2d.prototype.toString = function () {
            return "(" + this.Width + ", " + this.Height + ")";
        };
        return Size2d;
    })();
    EndGate.Size2d = Size2d;
})(EndGate || (EndGate = {}));

Math.roundTo = function (val, decimals) {
    var multiplier = Math.pow(10, decimals);

    return Math.round(val * multiplier) / multiplier;
};

(Math).twoPI = Math.PI * 2;

var EndGate;
(function (EndGate) {
    var Vector2d = (function () {
        function Vector2d(x, y) {
            this._type = "Vector2d";
            this.X = x || 0;
            this.Y = y || 0;
        }
        Object.defineProperty(Vector2d, "Zero", {
            get: function () {
                return new Vector2d(0, 0);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Vector2d, "One", {
            get: function () {
                return new Vector2d(1, 1);
            },
            enumerable: true,
            configurable: true
        });

        Vector2d.prototype.Reflect = function (normal) {
            var normalUnit = normal.Unit(), num = this.Dot(normalUnit) * 2;

            return new Vector2d(this.X - num * normalUnit.X, this.Y - num * normalUnit.Y);
        };

        Vector2d.prototype.ProjectOnto = function (vector) {
            return vector.Multiply(this.Dot(vector) / vector.Dot(vector));
        };

        Vector2d.prototype.RotateAround = function (point, angle, precision) {
            if (typeof precision === "undefined") { precision = 2; }
            var ca = Math.cos(angle);
            var sa = Math.sin(angle);

            return new Vector2d(Math.roundTo(ca * (this.X - point.X) - sa * (this.Y - point.Y) + point.X, precision), Math.roundTo(sa * (this.X - point.X) + ca * (this.Y - point.Y) + point.Y, precision));
        };

        Vector2d.prototype.Apply = function (action) {
            this.X = action(this.X);
            this.Y = action(this.Y);
        };

        Vector2d.prototype.Trigger = function (action) {
            action(this.X);
            action(this.Y);
        };

        Vector2d.prototype.Normalized = function () {
            var magnitude = this.Magnitude();
            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        };

        Vector2d.prototype.Magnitude = function () {
            return Math.sqrt(this.X * this.X + this.Y * this.Y);
        };

        Vector2d.prototype.Length = function () {
            return this.Magnitude();
        };

        Vector2d.prototype.Dot = function (vector) {
            return vector.X * this.X + vector.Y * this.Y;
        };

        Vector2d.prototype.Abs = function () {
            return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
        };

        Vector2d.prototype.Sign = function () {
            return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
        };

        Vector2d.prototype.Unit = function () {
            var magnitude = this.Magnitude();

            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        };

        Vector2d.prototype.Distance = function (vector) {
            return new Vector2d(Math.abs(vector.X - this.X), Math.abs(vector.Y - this.Y));
        };

        Vector2d.prototype.Add = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X + val.X, this.Y + val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X + val.Width, this.Y + val.Height);
            } else {
                return new Vector2d(this.X + val, this.Y + val);
            }
        };

        Vector2d.prototype.Multiply = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X * val.X, this.Y * val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X * val.Width, this.Y * val.Height);
            } else {
                return new Vector2d(this.X * val, this.Y * val);
            }
        };

        Vector2d.prototype.Subtract = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X - val.X, this.Y - val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X - val.Width, this.Y - val.Height);
            } else {
                return new Vector2d(this.X - val, this.Y - val);
            }
        };

        Vector2d.prototype.SubtractFrom = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X - this.X, val.Y - this.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(val.Width - this.X, val.Height = this.Y);
            } else {
                return new Vector2d(val - this.X, val - this.Y);
            }
        };

        Vector2d.prototype.Divide = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X / val.X, this.Y / val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X / val.Width, this.Y / val.Height);
            } else {
                return new Vector2d(this.X / val, this.Y / val);
            }
        };

        Vector2d.prototype.DivideFrom = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X / this.X, val.Y / this.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(val.Width / this.X, val.Height / this.Y);
            } else {
                return new Vector2d(val / this.X, val / this.Y);
            }
        };

        Vector2d.prototype.IsZero = function () {
            return this.X === 0 && this.Y === 0;
        };

        Vector2d.prototype.Negate = function () {
            return new Vector2d(this.X * -1, this.Y * -1);
        };

        Vector2d.prototype.Equivalent = function (vector) {
            return this.X === vector.X && this.Y === vector.Y;
        };

        Vector2d.prototype.Clone = function () {
            return new Vector2d(this.X, this.Y);
        };

        Vector2d.prototype.toString = function () {
            return "(" + this.X + ", " + this.Y + ")";
        };
        return Vector2d;
    })();
    EndGate.Vector2d = Vector2d;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Bounds) {
        var Bounds2d = (function () {
            function Bounds2d(position, rotation) {
                this._boundsType = "Bounds2d";
                this.Position = position;
                this.Rotation = rotation || 0;
            }
            Bounds2d.prototype.Scale = function (x, y) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.ContainsPoint = function (point) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.ContainsCircle = function (circle) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.ContainsRectangle = function (rectangle) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.Contains = function (obj) {
                if (obj._boundsType === "BoundingCircle") {
                    return this.ContainsCircle(obj);
                } else if (obj._boundsType === "BoundingRectangle") {
                    return this.ContainsRectangle(obj);
                } else if (obj._type === "Vector2d") {
                    return this.ContainsPoint(obj);
                } else {
                    throw new Error("Cannot try and check contains with an unidentifiable object, must be a Vector2d, BoundingCircle or BoundingRectangle.");
                }
            };

            Bounds2d.prototype.Intersects = function (obj) {
                if (obj._boundsType === "BoundingCircle") {
                    return this.IntersectsCircle(obj);
                } else if (obj._boundsType === "BoundingRectangle") {
                    return this.IntersectsRectangle(obj);
                } else {
                    throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle.");
                }
            };

            Bounds2d.prototype.IntersectsCircle = function (circle) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.IntersectsRectangle = function (rectangle) {
                throw new Error("This method is abstract!");
            };
            return Bounds2d;
        })();
        Bounds.Bounds2d = Bounds2d;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var LooperCallback = (function () {
                function LooperCallback(callback) {
                    this._type = "LooperCallback";
                    this.Callback = callback;
                    this.ID = LooperCallback._ids++;
                }
                LooperCallback._ids = 0;
                return LooperCallback;
            })();
            Loopers.LooperCallback = LooperCallback;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var TimedCallback = (function (_super) {
                __extends(TimedCallback, _super);
                function TimedCallback(fps, callback) {
                    _super.call(this, callback);
                    this._type = "TimedCallback";

                    this.Fps = fps;
                    this.TimeoutID = 0;
                    this.Active = false;
                }
                return TimedCallback;
            })(Loopers.LooperCallback);
            Loopers.TimedCallback = TimedCallback;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var Looper = (function () {
                function Looper() {
                    this._type = "Looper";
                    this._running = false;
                    this._callbacks = [];
                }
                Looper.prototype.AddCallback = function (timedCallback) {
                    var _this = this;
                    this._callbacks.push(timedCallback);
                    timedCallback.Active = true;

                    if (this._running) {
                        window.setTimeout(function () {
                            _this.Loop(timedCallback);
                        }, 0);
                    }
                };

                Looper.prototype.RemoveCallback = function (timedCallback) {
                    for (var i = 0; i < this._callbacks.length; i++) {
                        if (this._callbacks[i].ID === timedCallback.ID) {
                            window.clearTimeout(timedCallback.TimeoutID);
                            timedCallback.Active = false;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };

                Looper.prototype.Start = function () {
                    this._running = true;

                    this.Run();
                };

                Looper.prototype.Run = function () {
                    var _this = this;
                    for (var i = 0; i < this._callbacks.length; i++) {
                        window.setTimeout((function (index) {
                            return function () {
                                _this.Loop(_this._callbacks[index]);
                            };
                        })(i), 0);
                    }
                };

                Looper.prototype.Loop = function (timedCallback) {
                    var that = this, msTimer = 1000 / timedCallback.Fps;

                    timedCallback.Callback();

                    if (timedCallback.Active) {
                        timedCallback.TimeoutID = window.setTimeout(function () {
                            that.Loop(timedCallback);
                        }, msTimer);
                    }
                };

                Looper.prototype.Dispose = function () {
                    for (var i = this._callbacks.length - 1; i >= 0; i--) {
                        this.RemoveCallback(this._callbacks[i]);
                    }

                    this._callbacks = [];
                    this._running = false;
                };
                return Looper;
            })();
            Loopers.Looper = Looper;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

window.OnRepaintCompleted = (function () {
    return (window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || (window).msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 0);
    });
})();

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var RepaintLooper = (function () {
                function RepaintLooper() {
                    this._type = "RepaintLooper";
                    this._running = false;
                    this._callbacksModified = false;
                    this._callbacks = [];
                }
                RepaintLooper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };

                RepaintLooper.prototype.Run = function () {
                    var _this = this;
                    if (this._running) {
                        this._callbacksModified = false;

                        for (var i = 0; i < this._callbacks.length; i++) {
                            this._callbacks[i].Callback();

                            if (this._callbacksModified) {
                                break;
                            }
                        }

                        window.OnRepaintCompleted(function () {
                            _this.Run();
                        });
                    }
                };

                RepaintLooper.prototype.AddCallback = function (looperCallback) {
                    this._callbacksModified = true;

                    this._callbacks.push(looperCallback);
                };

                RepaintLooper.prototype.RemoveCallback = function (looperCallback) {
                    for (var i = 0; i < this._callbacks.length; i++) {
                        if (this._callbacks[i].ID === looperCallback.ID) {
                            this._callbacksModified = true;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };

                RepaintLooper.prototype.Dispose = function () {
                    this._callbacksModified = true;
                    this._callbacks = [];
                    this._running = false;
                };
                return RepaintLooper;
            })();
            Loopers.RepaintLooper = RepaintLooper;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        var GameRunner = (function () {
            function GameRunner() {
                this._type = "GameRunner";
                this._updateCallbacks = {};
                this._drawCallbacks = {};
                this._updateLoop = null;
                this._drawLoop = null;
                this._callbackCount = 0;
            }
            GameRunner.prototype.Register = function (game) {
                var updateCallback = this.CreateAndCacheUpdateCallback(game);
                var drawCallback = this.CreateAndCacheDrawCallback(game);

                this._callbackCount++;

                this.TryLoopStart();

                this._updateLoop.AddCallback(updateCallback);
                this._drawLoop.AddCallback(drawCallback);

                return this.CreateUpdateRateSetter(updateCallback);
            };

            GameRunner.prototype.Unregister = function (game) {
                var updateCallback, drawCallback;

                if (this._updateCallbacks[game._ID]) {
                    updateCallback = this._updateCallbacks[game._ID];
                    drawCallback = this._drawCallbacks[game._ID];

                    this._updateLoop.RemoveCallback(updateCallback);
                    this._drawLoop.RemoveCallback(drawCallback);
                    delete this._updateCallbacks[game._ID];
                    delete this._drawCallbacks[game._ID];

                    this._callbackCount--;

                    this.TryLoopStop();
                }
            };

            GameRunner.prototype.TryLoopStart = function () {
                if (this._callbackCount === 1) {
                    this._updateLoop = new _.Loopers.Looper();
                    this._updateLoop.Start();
                    this._drawLoop = new _.Loopers.RepaintLooper();
                    this._drawLoop.Start();
                }
            };

            GameRunner.prototype.TryLoopStop = function () {
                if (this._callbackCount === 0 && this._updateLoop != null) {
                    this._updateLoop.Dispose();
                    this._updateLoop = null;
                    this._drawLoop.Dispose();
                    this._drawLoop = null;
                }
            };

            GameRunner.prototype.CreateAndCacheUpdateCallback = function (game) {
                var updateCallback = new _.Loopers.TimedCallback(0, function () {
                    game._PrepareUpdate();
                });

                this._updateCallbacks[game._ID] = updateCallback;

                return updateCallback;
            };

            GameRunner.prototype.CreateAndCacheDrawCallback = function (game) {
                var drawCallback = new _.Loopers.LooperCallback(function () {
                    game._PrepareDraw();
                });

                this._drawCallbacks[game._ID] = drawCallback;

                return drawCallback;
            };

            GameRunner.prototype.CreateUpdateRateSetter = function (callback) {
                return function (updateRate) {
                    callback.Fps = updateRate;
                };
            };
            return GameRunner;
        })();
        _.GameRunner = GameRunner;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var GameRunnerInstance = new EndGate._.GameRunner();

var EndGate;
(function (EndGate) {
    var EventHandler = (function () {
        function EventHandler() {
            this._type = "EventHandler";
            this._actions = [];
        }
        EventHandler.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        EventHandler.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        };

        EventHandler.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        EventHandler.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        EventHandler.prototype.Trigger = function () {
            var actions;

            if (this.HasBindings()) {
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i]();
                }
            }
        };

        EventHandler.prototype.Dispose = function () {
            this._actions = [];
        };
        return EventHandler;
    })();
    EndGate.EventHandler = EventHandler;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        var CollisionConfiguration = (function () {
            function CollisionConfiguration(initialQuadTreeSize) {
                this._initialQuadTreeSize = initialQuadTreeSize;
                this._minQuadTreeNodeSize = CollisionConfiguration._DefaultMinQuadTreeNodeSize;
                this._OnChange = new EndGate.EventHandler();
            }
            Object.defineProperty(CollisionConfiguration.prototype, "MinQuadTreeNodeSize", {
                get: function () {
                    return this._minQuadTreeNodeSize.Clone();
                },
                set: function (newSize) {
                    if (newSize.Width !== newSize.Height) {
                        throw new Error("MinQuadTreeNodeSize must be a square.  Width and height must be identical.");
                    }

                    this._minQuadTreeNodeSize = newSize;
                    this._OnChange.Trigger();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CollisionConfiguration.prototype, "InitialQuadTreeSize", {
                get: function () {
                    return this._initialQuadTreeSize;
                },
                set: function (newSize) {
                    if (newSize.Width !== newSize.Height) {
                        throw new Error("InitialQuadTreeSize must be a square.  Width and height must be identical.");
                    } else if (newSize.Width % this._minQuadTreeNodeSize.Width !== 0) {
                        throw new Error("InitialQuadTreeSize must be divisible by the MinQuadTreeNodeSize.");
                    }

                    this._initialQuadTreeSize = newSize;
                    this._OnChange.Trigger();
                },
                enumerable: true,
                configurable: true
            });
            CollisionConfiguration._DefaultMinQuadTreeNodeSize = new EndGate.Size2d(32);
            return CollisionConfiguration;
        })();
        Collision.CollisionConfiguration = CollisionConfiguration;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var GameConfiguration = (function () {
        function GameConfiguration(updateRateSetter, initialQuadTreeSize) {
            this._defaultUpdateRate = 40;
            this.DrawOnlyAfterUpdate = true;

            this._updateRateSetter = updateRateSetter;
            this._updateRate = this._defaultUpdateRate;
            this._collisionConfiguration = new EndGate.Collision.CollisionConfiguration(initialQuadTreeSize);
        }
        Object.defineProperty(GameConfiguration.prototype, "UpdateRate", {
            get: function () {
                return this._updateRate;
            },
            set: function (updateRate) {
                this._updateRate = updateRate;
                this._updateRateSetter(this._updateRate);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameConfiguration.prototype, "CollisionConfiguration", {
            get: function () {
                return this._collisionConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        return GameConfiguration;
    })();
    EndGate.GameConfiguration = GameConfiguration;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        var MinMax = (function () {
            function MinMax(min, max) {
                this.Min = min;
                this.Max = max;
            }
            return MinMax;
        })();
        _.MinMax = MinMax;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        var Vector2dHelpers = (function () {
            function Vector2dHelpers() {
            }
            Vector2dHelpers.GetMinMaxProjections = function (axis, vertices) {
                var min = vertices[0].ProjectOnto(axis).Dot(axis);
                var max = min;

                for (var i = 1; i < vertices.length; i++) {
                    var vertex = vertices[i];
                    var value = vertex.ProjectOnto(axis).Dot(axis);

                    if (value < min) {
                        min = value;
                    } else if (value > max) {
                        max = value;
                    }
                }

                return new _.MinMax(min, max);
            };
            return Vector2dHelpers;
        })();
        _.Vector2dHelpers = Vector2dHelpers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Bounds) {
        var BoundingCircle = (function (_super) {
            __extends(BoundingCircle, _super);
            function BoundingCircle(position, radius) {
                _super.call(this, position);
                this._type = "BoundingCircle";
                this._boundsType = "BoundingCircle";

                this.Radius = radius;
            }
            BoundingCircle.prototype.Scale = function (scale) {
                this.Radius *= scale;
            };

            BoundingCircle.prototype.Area = function () {
                return Math.PI * this.Radius * this.Radius;
            };

            BoundingCircle.prototype.Circumference = function () {
                return 2 * Math.PI * this.Radius;
            };

            BoundingCircle.prototype.IntersectsCircle = function (circle) {
                return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
            };

            BoundingCircle.prototype.IntersectsRectangle = function (rectangle) {
                var translated = (rectangle.Rotation === 0) ? this.Position : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

                var circleDistance = translated.Distance(rectangle.Position);

                if (circleDistance.X > (rectangle.Size.HalfWidth + this.Radius)) {
                    return false;
                }
                if (circleDistance.Y > (rectangle.Size.HalfHeight + this.Radius)) {
                    return false;
                }

                if (circleDistance.X <= (rectangle.Size.HalfWidth)) {
                    return true;
                }
                if (circleDistance.Y <= (rectangle.Size.HalfHeight)) {
                    return true;
                }

                var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth, 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight, 2);

                return (cornerDistance_sq <= (this.Radius * this.Radius));
            };

            BoundingCircle.prototype.ContainsPoint = function (point) {
                return this.Position.Distance(point).Magnitude() < this.Radius;
            };

            BoundingCircle.prototype.ContainsCircle = function (circle) {
                return circle.Position.Distance(this.Position).Length() + circle.Radius <= this.Radius;
            };

            BoundingCircle.prototype.ContainsRectangle = function (rectangle) {
                var corners = rectangle.Corners();

                for (var i = 0; i < corners.length; i++) {
                    if (!this.ContainsPoint(corners[i])) {
                        return false;
                    }
                }

                return true;
            };
            return BoundingCircle;
        })(Bounds.Bounds2d);
        Bounds.BoundingCircle = BoundingCircle;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Bounds) {
        var BoundingRectangle = (function (_super) {
            __extends(BoundingRectangle, _super);
            function BoundingRectangle(position, size) {
                _super.call(this, position);
                this._type = "BoundingRectangle";
                this._boundsType = "BoundingRectangle";
                this.Size = size;
            }
            BoundingRectangle.prototype.Scale = function (x, y) {
                this.Size.Width *= x;
                this.Size.Height *= y;
            };

            Object.defineProperty(BoundingRectangle.prototype, "TopLeft", {
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "TopRight", {
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "BotLeft", {
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "BotRight", {
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            BoundingRectangle.prototype.Corners = function () {
                return [this.TopLeft, this.TopRight, this.BotLeft, this.BotRight];
            };

            BoundingRectangle.prototype.IntersectsCircle = function (circle) {
                return circle.IntersectsRectangle(this);
            };

            BoundingRectangle.prototype.IntersectsRectangle = function (rectangle) {
                if (this.Rotation === 0 && rectangle.Rotation === 0) {
                    var myTopLeft = this.TopLeft, myBotRight = this.BotRight, theirTopLeft = rectangle.TopLeft, theirBotRight = rectangle.BotRight;

                    return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
                } else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius + this.Size.Radius) {
                    var axisList = [this.TopRight.Subtract(this.TopLeft), this.TopRight.Subtract(this.BotRight), rectangle.TopLeft.Subtract(rectangle.BotLeft), rectangle.TopLeft.Subtract(rectangle.TopRight)];
                    var myVertices = this.Corners();
                    var theirVertices = rectangle.Corners();

                    for (var i = 0; i < axisList.length; i++) {
                        var axi = axisList[i];
                        var myProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                        var theirProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);

                        if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                            return false;
                        }
                    }

                    return true;
                }

                return false;
            };

            BoundingRectangle.prototype.ContainsPoint = function (point) {
                var savedRotation = this.Rotation;

                if (this.Rotation !== 0) {
                    this.Rotation = 0;
                    point = point.RotateAround(this.Position, -savedRotation);
                }

                var myTopLeft = this.TopLeft, myBotRight = this.BotRight;

                this.Rotation = savedRotation;

                return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
            };

            BoundingRectangle.prototype.ContainsCircle = function (circle) {
                return this.ContainsPoint(new EndGate.Vector2d(circle.Position.X - circle.Radius, circle.Position.Y)) && this.ContainsPoint(new EndGate.Vector2d(circle.Position.X, circle.Position.Y - circle.Radius)) && this.ContainsPoint(new EndGate.Vector2d(circle.Position.X + circle.Radius, circle.Position.Y)) && this.ContainsPoint(new EndGate.Vector2d(circle.Position.X, circle.Position.Y + circle.Radius));
            };

            BoundingRectangle.prototype.ContainsRectangle = function (rectangle) {
                var corners = rectangle.Corners();

                for (var i = 0; i < corners.length; i++) {
                    if (!this.ContainsPoint(corners[i])) {
                        return false;
                    }
                }

                return true;
            };
            return BoundingRectangle;
        })(Bounds.Bounds2d);
        Bounds.BoundingRectangle = BoundingRectangle;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var EventHandler1 = (function () {
        function EventHandler1() {
            this._type = "EventHandler1";
            this._actions = [];
        }
        EventHandler1.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        EventHandler1.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        };

        EventHandler1.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        EventHandler1.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        EventHandler1.prototype.Trigger = function (val) {
            var actions;

            if (this.HasBindings()) {
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i](val);
                }
            }
        };

        EventHandler1.prototype.Dispose = function () {
            this._actions = [];
        };
        return EventHandler1;
    })();
    EndGate.EventHandler1 = EventHandler1;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        var CollisionData = (function () {
            function CollisionData(w) {
                this.With = w;
            }
            return CollisionData;
        })();
        Collision.CollisionData = CollisionData;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        var Collidable = (function () {
            function Collidable(bounds) {
                this._type = "Collidable";
                this._disposed = false;
                this.Bounds = bounds;
                this._id = Collidable._collidableIDs++;

                this._onCollision = new EndGate.EventHandler1();
                this._onDisposed = new EndGate.EventHandler1();
            }
            Object.defineProperty(Collidable.prototype, "OnCollision", {
                get: function () {
                    return this._onCollision;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Collidable.prototype, "OnDisposed", {
                get: function () {
                    return this._onDisposed;
                },
                enumerable: true,
                configurable: true
            });

            Collidable.prototype.IsCollidingWith = function (other) {
                return this.Bounds.Intersects(other.Bounds);
            };

            Collidable.prototype.Collided = function (data) {
                this.OnCollision.Trigger(data);
            };

            Collidable.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;
                    this.OnDisposed.Trigger(this);
                    this.OnDisposed.Dispose();
                    this.OnCollision.Dispose();
                } else {
                    throw new Error("Cannot dispose collidable more than once.");
                }
            };
            Collidable._collidableIDs = 0;
            return Collidable;
        })();
        Collision.Collidable = Collidable;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        (function (Assets) {
            (function (_) {
                var QuadTreeNode = (function (_super) {
                    __extends(QuadTreeNode, _super);
                    function QuadTreeNode(position, size, minNodeSize, parent) {
                        _super.call(this, new EndGate.Bounds.BoundingRectangle(position, size));
                        this._minNodeSize = minNodeSize;
                        this._children = new Array();
                        this.Contents = new Array();
                        this.Parent = parent;
                        this._partitioned = false;
                    }
                    Object.defineProperty(QuadTreeNode.prototype, "Children", {
                        get: function () {
                            return this._children;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "TopLeftChild", {
                        get: function () {
                            return this._children[0];
                        },
                        set: function (newChild) {
                            this._children[0] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "TopRightChild", {
                        get: function () {
                            return this._children[1];
                        },
                        set: function (newChild) {
                            this._children[1] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "BotLeftChild", {
                        get: function () {
                            return this._children[2];
                        },
                        set: function (newChild) {
                            this._children[2] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "BotRightChild", {
                        get: function () {
                            return this._children[3];
                        },
                        set: function (newChild) {
                            this._children[3] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    QuadTreeNode.prototype.IsPartitioned = function () {
                        return this._partitioned;
                    };

                    QuadTreeNode.prototype.Partition = function () {
                        var partitionedSize = new EndGate.Size2d(Math.round((this.Bounds).Size.Width * .5)), boundsPosition = this.Bounds.Position;

                        this._partitioned = true;

                        if (partitionedSize.Width < this._minNodeSize.Width) {
                            return;
                        }

                        this._children.push(new QuadTreeNode(boundsPosition.Subtract(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
                        this._children.push(new QuadTreeNode(new EndGate.Vector2d(boundsPosition.X + partitionedSize.Width / 2, boundsPosition.Y - partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
                        this._children.push(new QuadTreeNode(new EndGate.Vector2d(boundsPosition.X - partitionedSize.Width / 2, boundsPosition.Y + partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
                        this._children.push(new QuadTreeNode(boundsPosition.Add(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
                    };

                    QuadTreeNode.prototype.Insert = function (obj) {
                        if (!this._partitioned) {
                            this.Partition();
                        }

                        for (var i = 0; i < this._children.length; i++) {
                            if (this._children[i].Bounds.Contains(obj.Bounds)) {
                                return this._children[i].Insert(obj);
                            }
                        }

                        this.Contents.push(obj);

                        return this;
                    };

                    QuadTreeNode.prototype.ReverseInsert = function (obj) {
                        if (!this.Bounds.Contains(obj.Bounds)) {
                            if (this.Parent != null) {
                                return this.Parent.ReverseInsert(obj);
                            }
                        }

                        return this.Insert(obj);
                    };

                    QuadTreeNode.prototype.Query = function (queryArea) {
                        var results = new Array(), child;

                        for (var i = 0; i < this.Contents.length; i++) {
                            if (queryArea.Intersects(this.Contents[i].Bounds)) {
                                results.push(this.Contents[i]);
                            }
                        }

                        for (var i = 0; i < this._children.length; i++) {
                            child = this._children[i];

                            if (child.Bounds.Contains(queryArea)) {
                                results = results.concat(child.Query(queryArea));
                                break;
                            }

                            if (queryArea.Contains(child.Bounds)) {
                                results = results.concat(child.GetSubTreeContents());
                                continue;
                            }

                            if (child.Bounds.Intersects(queryArea)) {
                                results = results.concat(child.Query(queryArea));
                            }
                        }

                        return results;
                    };

                    QuadTreeNode.prototype.Remove = function (obj) {
                        var index = this.Contents.indexOf(obj);

                        if (index >= 0) {
                            this.Contents.splice(index, 1);
                        }
                    };

                    QuadTreeNode.prototype.GetSubTreeContents = function () {
                        var results = new Array();

                        for (var i = 0; i < this._children.length; i++) {
                            results = results.concat(this._children[i].GetSubTreeContents());
                        }

                        results = results.concat(this.Contents);

                        return results;
                    };
                    return QuadTreeNode;
                })(Collision.Collidable);
                _.QuadTreeNode = QuadTreeNode;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Collision.Assets || (Collision.Assets = {}));
        var Assets = Collision.Assets;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        (function (Assets) {
            (function (_) {
                var QuadTree = (function () {
                    function QuadTree(configuration) {
                        this._disposed = false;
                        this._minNodeSize = configuration.MinQuadTreeNodeSize;
                        this._collidableMap = {};
                        this._updateableCollidableMap = {};

                        this._root = new _.QuadTreeNode(new EndGate.Vector2d(configuration.InitialQuadTreeSize.HalfWidth, configuration.InitialQuadTreeSize.HalfHeight), configuration.InitialQuadTreeSize, configuration.MinQuadTreeNodeSize, null);
                    }
                    QuadTree.prototype.Insert = function (obj, staticPosition) {
                        if (typeof staticPosition === "undefined") { staticPosition = false; }
                        if (!this._root.Bounds.Contains(obj.Bounds)) {
                            this.Expand(obj);
                        }

                        this._collidableMap[obj._id] = {
                            Node: this._root.Insert(obj),
                            Collidable: obj,
                            StaticPosition: staticPosition
                        };

                        if (!staticPosition) {
                            this._updateableCollidableMap[obj._id] = this._collidableMap[obj._id];
                        }
                    };

                    QuadTree.prototype.Remove = function (obj) {
                        var node = this._collidableMap[obj._id].Node;

                        delete this._collidableMap[obj._id];
                        delete this._updateableCollidableMap[obj._id];

                        node.Remove(obj);
                    };

                    QuadTree.prototype.CollisionCandidates = function (obj) {
                        var node = this._collidableMap[obj._id].Node, results = node.GetSubTreeContents();

                        while (node.Parent !== null) {
                            results = results.concat(node.Parent.Contents);

                            node = node.Parent;
                        }

                        return results;
                    };

                    QuadTree.prototype.Query = function (queryArea) {
                        return this._root.Query(queryArea);
                    };

                    QuadTree.prototype.Expand = function (cause) {
                        var rootBounds = (this._root.Bounds), topLeftDistance = rootBounds.TopLeft.Distance(cause.Bounds.Position).Length(), topRightDistance = rootBounds.TopRight.Distance(cause.Bounds.Position).Length(), botLeftDistance = rootBounds.BotLeft.Distance(cause.Bounds.Position).Length(), botRightDistance = rootBounds.BotRight.Distance(cause.Bounds.Position).Length(), closestCornerDistance = Math.min(topLeftDistance, topRightDistance, botLeftDistance, botRightDistance), newSize = rootBounds.Size.Multiply(2), newRoot;

                        if (closestCornerDistance === topLeftDistance) {
                            newRoot = new _.QuadTreeNode(rootBounds.TopLeft, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.BotRightChild = this._root;
                        } else if (closestCornerDistance === topRightDistance) {
                            newRoot = new _.QuadTreeNode(rootBounds.TopRight, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.BotLeftChild = this._root;
                        } else if (closestCornerDistance === botLeftDistance) {
                            newRoot = new _.QuadTreeNode(rootBounds.BotLeft, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.TopRightChild = this._root;
                        } else if (closestCornerDistance === botRightDistance) {
                            newRoot = new _.QuadTreeNode(rootBounds.BotRight, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.TopLeftChild = this._root;
                        }

                        this._root.Parent = newRoot;
                        this._root = newRoot;
                    };

                    QuadTree.prototype.Update = function (gameTime) {
                        var node, lookup, collidable, newNode;

                        for (var id in this._updateableCollidableMap) {
                            lookup = this._updateableCollidableMap[id];
                            node = lookup.Node;
                            collidable = lookup.Collidable;

                            node.Remove(collidable);

                            if (!this._root.Bounds.Contains(collidable.Bounds)) {
                                this.Expand(collidable);
                                newNode = this._root.Insert(collidable);
                            } else {
                                if (!node.Bounds.Contains(collidable.Bounds) && node.Parent != null) {
                                    newNode = node.Parent.ReverseInsert(collidable);
                                } else {
                                    newNode = node.Insert(collidable);
                                }
                            }

                            this._updateableCollidableMap[id].Node = newNode;
                        }
                    };

                    QuadTree.prototype.Dispose = function () {
                        if (!this._disposed) {
                            this._disposed = true;
                        } else {
                            throw new Error("Cannot dispose collidable more than once.");
                        }
                    };
                    return QuadTree;
                })();
                _.QuadTree = QuadTree;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Collision.Assets || (Collision.Assets = {}));
        var Assets = Collision.Assets;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var EventHandler2 = (function () {
        function EventHandler2() {
            this._type = "EventHandler2";
            this._actions = [];
        }
        EventHandler2.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        EventHandler2.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        };

        EventHandler2.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        EventHandler2.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        EventHandler2.prototype.Trigger = function (val1, val2) {
            var actions;

            if (this.HasBindings()) {
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i](val1, val2);
                }
            }
        };

        EventHandler2.prototype.Dispose = function () {
            this._actions = [];
        };
        return EventHandler2;
    })();
    EndGate.EventHandler2 = EventHandler2;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        var CollisionManager = (function () {
            function CollisionManager(configuration) {
                this._type = "CollisionManager";
                this._collidables = [];
                this._nonStaticCollidables = [];
                this._quadTree = new Collision.Assets._.QuadTree(configuration);
                this._enabled = false;
                this._disposed = false;
                this._onCollision = new EndGate.EventHandler2();
            }
            Object.defineProperty(CollisionManager.prototype, "OnCollision", {
                get: function () {
                    return this._onCollision;
                },
                enumerable: true,
                configurable: true
            });

            CollisionManager.prototype.Monitor = function (obj, staticPosition) {
                if (typeof staticPosition === "undefined") { staticPosition = false; }
                var _this = this;
                var mapping = {
                    Collidable: obj,
                    Unmonitor: function (collidable) {
                        _this.Unmonitor(collidable);
                    }
                };

                this._enabled = true;

                obj.OnDisposed.Bind(mapping.Unmonitor);

                this._collidables.push(mapping);

                if (!staticPosition) {
                    this._nonStaticCollidables.push(obj);
                }

                this._quadTree.Insert(obj);
            };

            CollisionManager.prototype.Unmonitor = function (obj) {
                var index;

                for (var i = 0; i < this._collidables.length; i++) {
                    if (this._collidables[i].Collidable._id === obj._id) {
                        this._collidables[i].Collidable.OnDisposed.Unbind(this._collidables[i].Unmonitor);
                        this._collidables.splice(i, 1);
                        break;
                    }
                }

                index = this._nonStaticCollidables.indexOf(obj);

                if (index >= 0) {
                    this._nonStaticCollidables.splice(index, 1);
                }

                this._quadTree.Remove(obj);
            };

            CollisionManager.prototype.Update = function (gameTime) {
                var collidable, hash, candidates, cacheMap = {}, colliding = new Array();

                if (this._enabled) {
                    this._quadTree.Update(gameTime);

                    for (var i = 0; i < this._nonStaticCollidables.length; i++) {
                        collidable = this._nonStaticCollidables[i];
                        candidates = this._quadTree.CollisionCandidates(collidable);

                        for (var j = 0; j < candidates.length; j++) {
                            if (collidable._id !== candidates[j]._id && collidable.IsCollidingWith(candidates[j])) {
                                colliding.push([collidable, candidates[j]]);
                            }
                        }
                    }

                    for (var i = 0; i < colliding.length; i++) {
                        hash = this.HashIds(colliding[i][0], colliding[i][1]);

                        if (!cacheMap[hash]) {
                            cacheMap[hash] = true;

                            colliding[i][0].Collided(new Collision.CollisionData(colliding[i][1]));
                            colliding[i][1].Collided(new Collision.CollisionData(colliding[i][0]));

                            this.OnCollision.Trigger(colliding[i][0], colliding[i][1]);
                        }
                    }
                }
            };

            CollisionManager.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    for (var i = 0; i < this._collidables.length; i++) {
                        this.Unmonitor(this._collidables[i].Collidable);
                    }

                    this._collidables = [];
                    this._nonStaticCollidables = [];
                    this._onCollision.Dispose();
                    this._quadTree = null;
                } else {
                    throw new Error("CollisionManager cannot be disposed more than once");
                }
            };

            CollisionManager.prototype.HashIds = function (c1, c2) {
                return Math.min(c1._id, c2._id).toString() + Math.max(c2._id, c1._id).toString();
            };
            return CollisionManager;
        })();
        Collision.CollisionManager = CollisionManager;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (_) {
                var Graphic2dState = (function () {
                    function Graphic2dState() {
                        this._cachedState = {};
                    }
                    Object.defineProperty(Graphic2dState.prototype, "StrokeStyle", {
                        get: function () {
                            return this._cachedState["strokeStyle"];
                        },
                        set: function (value) {
                            this._cachedState["strokeStyle"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "FillStyle", {
                        get: function () {
                            return this._cachedState["fillStyle"];
                        },
                        set: function (value) {
                            this._cachedState["fillStyle"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "GlobalAlpha", {
                        get: function () {
                            return this._cachedState["globalAlpha"];
                        },
                        set: function (value) {
                            this._cachedState["globalAlpha"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineWidth", {
                        get: function () {
                            return this._cachedState["lineWidth"];
                        },
                        set: function (value) {
                            this._cachedState["lineWidth"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineCap", {
                        get: function () {
                            return this._cachedState["lineCap"];
                        },
                        set: function (value) {
                            this._cachedState["lineCap"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineJoin", {
                        get: function () {
                            return this._cachedState["lineJoin"];
                        },
                        set: function (value) {
                            this._cachedState["lineJoin"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "MiterLimit", {
                        get: function () {
                            return this._cachedState["miterLimit"];
                        },
                        set: function (value) {
                            this._cachedState["miterLimit"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetX", {
                        get: function () {
                            return this._cachedState["shadowOffsetX"];
                        },
                        set: function (value) {
                            this._cachedState["shadowOffsetX"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetY", {
                        get: function () {
                            return this._cachedState["shadowOffsetY"];
                        },
                        set: function (value) {
                            this._cachedState["shadowOffsetY"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowBlur", {
                        get: function () {
                            return this._cachedState["shadowBlur"];
                        },
                        set: function (value) {
                            this._cachedState["shadowBlur"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowColor", {
                        get: function () {
                            return this._cachedState["shadowColor"];
                        },
                        set: function (value) {
                            this._cachedState["shadowColor"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "GlobalCompositeOperation", {
                        get: function () {
                            return this._cachedState["globalCompositeOperation"];
                        },
                        set: function (value) {
                            this._cachedState["globalCompositeOperation"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "Font", {
                        get: function () {
                            return this._cachedState["font"];
                        },
                        set: function (value) {
                            this._cachedState["font"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "TextAlign", {
                        get: function () {
                            return this._cachedState["textAlign"];
                        },
                        set: function (value) {
                            this._cachedState["textAlign"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "TextBaseline", {
                        get: function () {
                            return this._cachedState["textBaseline"];
                        },
                        set: function (value) {
                            this._cachedState["textBaseline"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Graphic2dState.prototype.SetContextState = function (context) {
                        for (var key in this._cachedState) {
                            context[key] = this._cachedState[key];
                        }
                    };
                    return Graphic2dState;
                })();
                _.Graphic2dState = Graphic2dState;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Graphic2d = (function () {
            function Graphic2d(position) {
                this._type = "Graphic2d";
                this.Position = position;
                this.Rotation = 0;
                this.ZIndex = 0;
                this.Visible = true;
                this._State = new Graphics.Assets._.Graphic2dState();
                this.Opacity = 1;
                this._children = [];
                this._childrenRemovalBindings = [];
                this.Parent = null;
                this._disposed = false;
                this._onDisposed = new EndGate.EventHandler1();
            }
            Object.defineProperty(Graphic2d.prototype, "AbsolutePosition", {
                get: function () {
                    var position = this.Position, node = this;

                    while (node = node.Parent) {
                        position = position.Add(node.Position);
                    }

                    return position;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Graphic2d.prototype, "OnDisposed", {
                get: function () {
                    return this._onDisposed;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Graphic2d.prototype, "Opacity", {
                get: function () {
                    return this._State.GlobalAlpha;
                },
                set: function (alpha) {
                    this._State.GlobalAlpha = alpha;
                },
                enumerable: true,
                configurable: true
            });

            Graphic2d.prototype.GetChildren = function () {
                return this._children.slice(0);
            };

            Graphic2d.prototype.AddChild = function (graphic) {
                var _this = this;
                var removalBinding;

                if (graphic.Parent !== null) {
                    throw new Error("Graphic already has parent, cannot add it as a child.");
                }

                removalBinding = function (graphic) {
                    _this.RemoveChild(graphic);
                };

                graphic.Parent = this;
                graphic.OnDisposed.Bind(removalBinding);

                this._children.push(graphic);
                this._childrenRemovalBindings.push(removalBinding);
                this._children.sort(Graphic2d._zindexSort);
            };

            Graphic2d.prototype.RemoveChild = function (graphic) {
                var index = this._children.indexOf(graphic);

                if (index >= 0) {
                    this._children[index].Parent = null;
                    this._children[index].OnDisposed.Unbind(this._childrenRemovalBindings[index]);
                    this._children.splice(index, 1);
                    this._childrenRemovalBindings.splice(index, 1);
                    return true;
                }

                return false;
            };

            Graphic2d.prototype._StartDraw = function (context) {
                context.save();
                this._State.SetContextState(context);

                context.translate(this.Position.X, this.Position.Y);

                if (this.Rotation !== 0) {
                    context.rotate(this.Rotation);
                }
            };

            Graphic2d.prototype._EndDraw = function (context) {
                for (var i = 0; i < this._children.length; i++) {
                    if (this._children[i].Visible) {
                        this._children[i].Draw(context);
                    }
                }

                context.restore();
            };

            Graphic2d.prototype.Draw = function (context) {
                throw new Error("The Draw method is abstract on Graphic2d and should not be called.");
            };

            Graphic2d.prototype.GetDrawBounds = function () {
                throw new Error("GetDrawBounds is abstract, it must be implemented.");
            };

            Graphic2d.prototype.Scale = function (scale) {
                throw new Error("Scale is abstract, it must be implemented.");
            };

            Graphic2d.prototype.Clone = function () {
                throw new Error("Clone is abstract, it must be implemented.");
            };

            Graphic2d.prototype._Clone = function (graphic) {
                for (var i = 0; i < this._children.length; i++) {
                    graphic.AddChild(this._children[i].Clone());
                }

                graphic.Opacity = this.Opacity;
                graphic.Rotation = this.Rotation;
                graphic.Visible = this.Visible;
                graphic.ZIndex = this.ZIndex;
            };

            Graphic2d.prototype.Dispose = function () {
                var childrenClone;

                if (!this._disposed) {
                    this._disposed = true;

                    childrenClone = this._children.slice(0);

                    for (var i = 0; i < childrenClone.length; i++) {
                        childrenClone[i].Dispose();
                    }

                    this._children = null;
                    this.OnDisposed.Trigger(this);
                    this.OnDisposed.Dispose();
                } else {
                    throw new Error("Cannot dispose graphic more than once.");
                }
            };
            Graphic2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            return Graphic2d;
        })();
        Graphics.Graphic2d = Graphic2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Camera2d = (function (_super) {
            __extends(Camera2d, _super);
            function Camera2d(position, size) {
                _super.call(this, position, size);
                this._type = "Camera2d";

                this.Distance = Camera2d.DefaultDistance;
            }
            Camera2d.prototype.ToCameraRelative = function (position) {
                var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this._GetDistanceScale() * .5));
                return scaledTopLeft.Add(position.Multiply(this._GetDistanceScale()));
            };

            Camera2d.prototype._GetInverseDistanceScale = function () {
                return Camera2d.DefaultDistance / this.Distance;
            };

            Camera2d.prototype._GetDistanceScale = function () {
                return this.Distance / Camera2d.DefaultDistance;
            };
            Camera2d.DefaultDistance = 1000;
            return Camera2d;
        })(EndGate.Bounds.BoundingRectangle);
        Rendering.Camera2d = Camera2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Renderer2d = (function () {
            function Renderer2d(renderOnto) {
                this._visibleCanvas = renderOnto;
                this._visibleContext = renderOnto.getContext("2d");

                this._BufferCanvas = document.createElement("canvas");
                this._BufferContext = this._BufferCanvas.getContext("2d");
                this._onRendererSizeChange = new EndGate.EventHandler1();
                this.UpdateBufferSize();

                this._disposed = false;
            }
            Object.defineProperty(Renderer2d.prototype, "OnRendererSizeChange", {
                get: function () {
                    return this._onRendererSizeChange;
                },
                enumerable: true,
                configurable: true
            });

            Renderer2d.prototype.Render = function (renderables) {
                if (this._BufferCanvas.width !== this._visibleCanvas.width || this._BufferCanvas.height !== this._visibleCanvas.height) {
                    this.UpdateBufferSize();
                }

                this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
                this._visibleContext.drawImage(this._BufferCanvas, 0, 0);

                this._ClearBuffer();

                renderables.sort(Renderer2d._zindexSort);

                for (var i = 0; i < renderables.length; i++) {
                    renderables[i].Draw(this._BufferContext);
                }

                return this._BufferContext;
            };

            Renderer2d.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                    this._onRendererSizeChange.Dispose();
                }
            };

            Renderer2d.prototype._ClearBuffer = function () {
                this._BufferContext.clearRect(0, 0, this._BufferCanvas.width, this._BufferCanvas.height);
            };

            Renderer2d.prototype.UpdateBufferSize = function () {
                this._BufferCanvas.width = this._visibleCanvas.width;
                this._BufferCanvas.height = this._visibleCanvas.height;
                this.OnRendererSizeChange.Trigger(new EndGate.Size2d(this._visibleCanvas.width, this._visibleCanvas.height));
            };
            Renderer2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            return Renderer2d;
        })();
        Rendering.Renderer2d = Renderer2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        (function (_) {
            var Camera2dCanvasContextBuilder = (function () {
                function Camera2dCanvasContextBuilder(camera) {
                    this._camera = camera;
                    this._canvasCenter = this._camera.Position.Clone();
                    this._translated = false;
                    this._translationState = [];
                    this._translationState.push(this._translated);
                }
                Camera2dCanvasContextBuilder.prototype.Build = function (context) {
                    var that = this, savedCreateRadialGradient = context.createRadialGradient, savedTranslate = context.translate, savedSave = context.save, savedRestore = context.restore, savedDrawImage1 = this.BuildPositionReplacer(context.drawImage, 1), savedDrawImage2 = this.BuildPositionReplacer(context.drawImage, 5);

                    (context).unModifiedClearRect = context.clearRect;

                    context.arc = this.BuildPositionReplacer(context.arc);
                    context.arcTo = this.BuildPositionReplacer(context.arcTo, 0, 4);
                    context.bezierCurveTo = this.BuildPositionReplacer(context.bezierCurveTo, 0, 6);
                    context.clearRect = this.BuildPositionReplacer(context.clearRect);
                    context.createLinearGradient = this.BuildPositionReplacer(context.createLinearGradient, 0, 4);
                    context.createRadialGradient = function () {
                        var scale = that._camera._GetDistanceScale();
                        arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                        arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                        arguments[3] += -that._camera.Position.X + that._canvasCenter.X * scale;
                        arguments[4] += -that._camera.Position.Y + that._canvasCenter.Y * scale;

                        return savedCreateRadialGradient.apply(this, arguments);
                    };
                    context.drawImage = function () {
                        if (arguments.length <= 5) {
                            savedDrawImage1.apply(this, arguments);
                        } else {
                            savedDrawImage2.apply(this, arguments);
                        }
                    };
                    context.fillRect = this.BuildPositionReplacer(context.fillRect);
                    context.fillText = this.BuildPositionReplacer(context.fillText, 1);
                    context.getImageData = this.BuildPositionReplacer(context.getImageData);
                    context.isPointInPath = this.BuildPositionReplacer(context.isPointInPath);
                    context.lineTo = this.BuildPositionReplacer(context.lineTo);
                    context.moveTo = this.BuildPositionReplacer(context.moveTo);
                    context.putImageData = this.BuildPositionReplacer(context.putImageData, 1);
                    context.quadraticCurveTo = this.BuildPositionReplacer(context.quadraticCurveTo, 0, 4);
                    context.rect = this.BuildPositionReplacer(context.rect);
                    context.strokeRect = this.BuildPositionReplacer(context.strokeRect);
                    context.strokeText = this.BuildPositionReplacer(context.strokeText, 1);

                    context.save = function () {
                        that._translationState.push(that._translated);

                        savedSave.call(this);
                    };

                    context.restore = function () {
                        that._translated = that._translationState.pop();

                        savedRestore.call(this);
                    };

                    context.translate = function () {
                        var scale;

                        if (!that._translated) {
                            scale = that._camera._GetDistanceScale();

                            arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                            arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                        }

                        that._translated = true;

                        savedTranslate.apply(this, arguments);
                    };

                    return context;
                };

                Camera2dCanvasContextBuilder.prototype._UpdateCanvasCenter = function (newSize) {
                    this._canvasCenter.X = newSize.Width / 2;
                    this._canvasCenter.Y = newSize.Height / 2;
                };

                Camera2dCanvasContextBuilder.prototype.BuildPositionReplacer = function (replacee, positionArgOffset, argCount) {
                    if (typeof positionArgOffset === "undefined") { positionArgOffset = 0; }
                    if (typeof argCount === "undefined") { argCount = 2; }
                    var that = this, axiList = ["X", "Y"];

                    return function () {
                        var scale, axi;

                        if (!that._translated) {
                            scale = that._camera._GetDistanceScale();
                            for (var i = 0; i < argCount; i++) {
                                axi = axiList[i % 2];
                                arguments[positionArgOffset + i] += -that._camera.Position[axi] + that._canvasCenter[axi] * scale;
                            }
                        }

                        return replacee.apply(this, arguments);
                    };
                };
                return Camera2dCanvasContextBuilder;
            })();
            _.Camera2dCanvasContextBuilder = Camera2dCanvasContextBuilder;
        })(Rendering._ || (Rendering._ = {}));
        var _ = Rendering._;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Camera2dRenderer = (function (_super) {
            __extends(Camera2dRenderer, _super);
            function Camera2dRenderer(renderOnto, camera) {
                var that = this;

                _super.call(this, renderOnto);

                this._camera = camera;
                this._contextBuilder = new Rendering._.Camera2dCanvasContextBuilder(this._camera);

                this.OnRendererSizeChange.Bind(function () {
                    that._contextBuilder._UpdateCanvasCenter.apply(that._contextBuilder, arguments);
                });
                this._contextBuilder._UpdateCanvasCenter(new EndGate.Size2d(renderOnto.width, renderOnto.height));
                this._BufferContext = this._contextBuilder.Build(this._BufferContext);
            }
            Camera2dRenderer.prototype.Render = function (renderables) {
                var context, inverseScale = this._camera._GetInverseDistanceScale();

                this._BufferContext.save();
                this._BufferContext.scale(inverseScale, inverseScale);

                context = _super.prototype.Render.call(this, this.GetOnScreenRenderables(renderables));

                this._BufferContext.restore();

                return context;
            };

            Camera2dRenderer.prototype._ClearBuffer = function () {
                var cameraScale = this._camera._GetDistanceScale();
                (this._BufferContext).unModifiedClearRect(0, 0, this._BufferCanvas.width * cameraScale, this._BufferCanvas.height * cameraScale);
            };

            Camera2dRenderer.prototype.GetOnScreenRenderables = function (allRenderables) {
                var onscreen = [], scale = this._camera._GetDistanceScale(), unscale = 1 / scale;

                this._camera.Scale(scale, scale);

                for (var i = 0; i < allRenderables.length; i++) {
                    if (allRenderables[i].Visible && this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                        onscreen.push(allRenderables[i]);
                    }
                }

                this._camera.Scale(unscale, unscale);

                return onscreen;
            };
            return Camera2dRenderer;
        })(Rendering.Renderer2d);
        Rendering.Camera2dRenderer = Camera2dRenderer;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Scene2d = (function () {
            function Scene2d(onDraw, drawArea) {
                if (typeof onDraw === "undefined") { onDraw = function (_) {
                };
                }
                var _this = this;
                this._actorMappings = [];
                this._actors = [];

                if (typeof drawArea === "undefined") {
                    drawArea = this.CreateDefaultDrawArea();
                }

                this._onDraw = onDraw;

                this._drawArea = drawArea;
                this._camera = new Rendering.Camera2d(new EndGate.Vector2d(this._drawArea.width / 2, this._drawArea.height / 2), new EndGate.Size2d(this._drawArea.width, this._drawArea.height));
                this._renderer = new Rendering.Camera2dRenderer(this._drawArea, this._camera);
                (this._renderer).OnRendererSizeChange.Bind(function (newSize) {
                    _this._camera.Size = newSize;
                });
                this._disposed = false;
            }
            Object.defineProperty(Scene2d.prototype, "DrawArea", {
                get: function () {
                    return this._drawArea;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Scene2d.prototype, "Camera", {
                get: function () {
                    return this._camera;
                },
                enumerable: true,
                configurable: true
            });

            Scene2d.prototype.Add = function (actor) {
                var _this = this;
                var mapping = {
                    Actor: actor,
                    Remove: function (graphic) {
                        _this.Remove(graphic);
                    }
                };

                actor.OnDisposed.Bind(mapping.Remove);

                this._actorMappings.push(mapping);
                this._actors.push(actor);
            };

            Scene2d.prototype.Remove = function (actor) {
                for (var i = 0; i < this._actors.length; i++) {
                    if (this._actors[i] === actor) {
                        this._actors[i].OnDisposed.Unbind(this._actorMappings[i].Remove);
                        this._actors.splice(i, 1);
                        this._actorMappings.splice(i, 1);
                        return;
                    }
                }
            };

            Scene2d.prototype.Draw = function () {
                this._onDraw(this._renderer.Render(this._actors));
            };

            Scene2d.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    for (var i = 0; i < this._actors.length; i++) {
                        this.Remove(this._actors[i]);
                    }

                    this._actors = [];
                    this._actorMappings = [];
                    this._renderer.Dispose();
                } else {
                    throw new Error("Scene2d cannot be disposed more than once");
                }
            };

            Scene2d.prototype.CreateDefaultDrawArea = function () {
                var drawArea = document.createElement("canvas"), body = document.getElementsByTagName('body')[0];

                drawArea.width = document.documentElement.clientWidth;
                drawArea.height = document.documentElement.clientHeight - 5;

                body.appendChild(drawArea);
                body.style.margin = "0px";
                body.style.padding = "0px";

                return drawArea;
            };
            return Scene2d;
        })();
        Rendering.Scene2d = Scene2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (_) {
            var MouseButton = (function () {
                function MouseButton() {
                }
                MouseButton.Left = "Left";
                MouseButton.Middle = "Middle";
                MouseButton.Right = "Right";
                return MouseButton;
            })();
            _.MouseButton = MouseButton;
        })(Input._ || (Input._ = {}));
        var _ = Input._;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        var MouseHandler = (function () {
            function MouseHandler(target) {
                var _this = this;
                this._target = target;
                this._disposed = false;

                this._onClick = new EndGate.EventHandler1();
                this._onDoubleClick = new EndGate.EventHandler1();
                this._onDown = new EndGate.EventHandler1();
                this._onUp = new EndGate.EventHandler1();
                this._onMove = new EndGate.EventHandler1();
                this._onScroll = new EndGate.EventHandler1();

                this._leftIsDown = false;
                this._middleIsDown = false;
                this._rightIsDown = false;

                this.Wire();

                this.OnDown.Bind(function (e) {
                    _this._isDown = true;
                    _this[e.Button + "IsDown"] = true;
                });

                this.OnUp.Bind(function (e) {
                    _this._isDown = false;
                    _this[e.Button + "IsDown"] = false;
                });
            }
            Object.defineProperty(MouseHandler.prototype, "LeftIsDown", {
                get: function () {
                    return this._leftIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "MiddleIsDown", {
                get: function () {
                    return this._middleIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "RightIsDown", {
                get: function () {
                    return this._rightIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "IsDown", {
                get: function () {
                    return this._isDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnClick", {
                get: function () {
                    return this._onClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDoubleClick", {
                get: function () {
                    return this._onDoubleClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDown", {
                get: function () {
                    return this._onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnUp", {
                get: function () {
                    return this._onUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnMove", {
                get: function () {
                    return this._onMove;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnScroll", {
                get: function () {
                    return this._onScroll;
                },
                enumerable: true,
                configurable: true
            });

            MouseHandler.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this._onClick.Dispose();
                    this._onDoubleClick.Dispose();
                    this._onDown.Dispose();
                    this._onMove.Dispose();
                    this._onScroll.Dispose();
                    this._onUp.Dispose();

                    this.Unwire();

                    this._target = null;
                } else {
                    throw new Error("MouseHandler cannot be disposed more than once");
                }
            };

            MouseHandler.prototype.Wire = function () {
                var _this = this;
                this._clickWire = this._contextMenuWire = this.BuildEvent(this._onClick, this.BuildMouseClickEvent);
                this._dblClickWire = this.BuildEvent(this._onDoubleClick, this.BuildMouseClickEvent);
                this._mouseDownWire = this.BuildEvent(this._onDown, this.BuildMouseClickEvent);
                this._mouseUpWire = this.BuildEvent(this._onUp, this.BuildMouseClickEvent);
                this._mouseMoveWire = this.BuildEvent(this._onMove, this.BuildMouseEvent);

                if ((/MSIE/i.test(navigator.userAgent))) {
                    this._mouseWheelWireName = "wheel";
                    this._mouseWheelWire = this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = -e.deltaX;
                        e.wheelDeltaY = -e.deltaY;
                        return _this.BuildMouseScrollEvent(e);
                    });
                } else if ((/Firefox/i.test(navigator.userAgent))) {
                    this._mouseWheelWireName = "DOMMouseScroll";
                    this._mouseWheelWire = this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                        e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                        return _this.BuildMouseScrollEvent(e);
                    });
                } else {
                    this._mouseWheelWireName = "mousewheel";
                    this._mouseWheelWire = this.BuildEvent(this._onScroll, this.BuildMouseScrollEvent);
                }

                this._target.addEventListener("click", this._clickWire, false);
                this._target.addEventListener("contextmenu", this._contextMenuWire, false);
                this._target.addEventListener("dblclick", this._dblClickWire, false);
                this._target.addEventListener("mousedown", this._mouseDownWire, false);
                this._target.addEventListener("mouseup", this._mouseUpWire, false);
                this._target.addEventListener("mousemove", this._mouseMoveWire, false);
                this._target.addEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
            };

            MouseHandler.prototype.Unwire = function () {
                this._target.removeEventListener("click", this._clickWire, false);
                this._target.removeEventListener("contextmenu", this._contextMenuWire, false);
                this._target.removeEventListener("dblclick", this._dblClickWire, false);
                this._target.removeEventListener("mousedown", this._mouseDownWire, false);
                this._target.removeEventListener("mouseup", this._mouseUpWire, false);
                this._target.removeEventListener("mousemove", this._mouseMoveWire, false);
                this._target.removeEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
            };

            MouseHandler.prototype.BuildEvent = function (eventHandler, mouseEventBuilder, returnValue) {
                if (typeof returnValue === "undefined") { returnValue = false; }
                var _this = this;
                return function (e) {
                    if (eventHandler.HasBindings()) {
                        eventHandler.Trigger(mouseEventBuilder.call(_this, e));
                    }

                    e.preventDefault();

                    return returnValue;
                };
            };

            MouseHandler.prototype.BuildMouseScrollEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event),
                    Direction: this.GetMouseScrollDierction(event)
                };
            };

            MouseHandler.prototype.BuildMouseEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event)
                };
            };

            MouseHandler.prototype.BuildMouseClickEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event),
                    Button: this.GetMouseButton(event)
                };
            };

            MouseHandler.prototype.GetMousePosition = function (event) {
                return new EndGate.Vector2d(event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft, event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop);
            };

            MouseHandler.prototype.GetMouseButton = function (event) {
                if (event.which) {
                    return MouseHandler.MouseButtonArray[event.which];
                }

                return Input._.MouseButton.Right;
            };

            MouseHandler.prototype.GetMouseScrollDierction = function (event) {
                return new EndGate.Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
            };
            MouseHandler.MouseButtonArray = [null, Input._.MouseButton.Left, Input._.MouseButton.Middle, Input._.MouseButton.Right];
            return MouseHandler;
        })();
        Input.MouseHandler = MouseHandler;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Utilities) {
            var NoopTripInvoker = (function () {
                function NoopTripInvoker(action, tripped) {
                    if (typeof tripped === "undefined") { tripped = false; }
                    this._invoker = NoopTripInvoker._noop;
                    this._action = action;

                    if (tripped) {
                        this.Trip();
                    }
                }
                NoopTripInvoker.prototype.Invoke = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    this._invoker.apply(this, args);
                };

                NoopTripInvoker.prototype.InvokeOnce = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    this._invoker.apply(this, args);
                    this.Reset();
                };

                NoopTripInvoker.prototype.Trip = function () {
                    this._invoker = this._action;
                };

                NoopTripInvoker.prototype.Reset = function () {
                    this._invoker = NoopTripInvoker._noop;
                };
                NoopTripInvoker._noop = function () {
                };
                return NoopTripInvoker;
            })();
            Utilities.NoopTripInvoker = NoopTripInvoker;
        })(_.Utilities || (_.Utilities = {}));
        var Utilities = _.Utilities;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (Assets) {
            var KeyboardModifiers = (function () {
                function KeyboardModifiers(ctrl, alt, shift) {
                    this.Ctrl = ctrl;
                    this.Alt = alt;
                    this.Shift = shift;
                }
                KeyboardModifiers.prototype.Equivalent = function (modifier) {
                    return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
                };

                KeyboardModifiers.BuildFromCommandString = function (keyCommand) {
                    var ctrl = (keyCommand.toLowerCase().indexOf("ctrl+") >= 0) ? true : false, alt = (keyCommand.toLowerCase().indexOf("alt+") >= 0) ? true : false, shift = (keyCommand.toLowerCase().indexOf("shift+") >= 0) ? true : false;

                    return new KeyboardModifiers(ctrl, alt, shift);
                };
                return KeyboardModifiers;
            })();
            Assets.KeyboardModifiers = KeyboardModifiers;
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        var shiftValues = {
            "~": "`",
            "!": "1",
            "@": "2",
            "#": "3",
            "$": "4",
            "%": "5",
            "^": "6",
            "&": "7",
            "*": "8",
            "(": "9",
            ")": "0",
            "_": "-",
            "+": "=",
            ":": ";",
            "\"": "'",
            "<": ",",
            ">": ".",
            "?": "/",
            "|": "\\"
        }, specialKeys = {
            "27": "esc",
            "27": "escape",
            "9": "tab",
            "32": "space",
            "13": "return",
            "13": "enter",
            "8": "backspace",
            "45": "insert",
            "36": "home",
            "46": "delete",
            "35": "end",
            "37": "left",
            "38": "up",
            "39": "right",
            "40": "down",
            "112": "f1",
            "113": "f2",
            "114": "f3",
            "115": "f4",
            "116": "f5",
            "117": "f6",
            "118": "f7",
            "119": "f8",
            "120": "f9",
            "121": "f10",
            "122": "f11",
            "123": "f12"
        };

        var KeyboardCommandEvent = (function () {
            function KeyboardCommandEvent(keyEvent) {
                var code, character;

                this.Modifiers = new Input.Assets.KeyboardModifiers(keyEvent.ctrlKey, keyEvent.altKey, keyEvent.shiftKey);

                if (keyEvent.keyCode) {
                    code = keyEvent.keyCode;
                } else if (keyEvent.which) {
                    code = keyEvent.which;
                }

                if (!((character = String.fromCharCode(keyEvent.keyCode)) === keyEvent.key)) {
                    if (!(character = specialKeys[code])) {
                        character = String.fromCharCode(code).toLowerCase();

                        if (this.Modifiers.Shift && shiftValues[character]) {
                            character = shiftValues[character];
                        }
                    }
                }

                this.Key = character;
            }
            KeyboardCommandEvent.prototype.Matches = function (command) {
                return this.Key.toLowerCase() === command.Key.toLowerCase() && command.Modifiers.Equivalent(this.Modifiers);
            };
            return KeyboardCommandEvent;
        })();
        Input.KeyboardCommandEvent = KeyboardCommandEvent;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (_) {
            var KeyboardCommandHelper = (function () {
                function KeyboardCommandHelper() {
                }
                KeyboardCommandHelper.ParseKey = function (command) {
                    var arr = command.split("+");

                    if (arr.length > 1) {
                        return arr[arr.length - 1];
                    }

                    return arr[0];
                };
                return KeyboardCommandHelper;
            })();
            _.KeyboardCommandHelper = KeyboardCommandHelper;
        })(Input._ || (Input._ = {}));
        var _ = Input._;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (Assets) {
            var KeyboardCommand = (function () {
                function KeyboardCommand(command, action) {
                    var _this = this;
                    this.Action = action;
                    this.Modifiers = Input.Assets.KeyboardModifiers.BuildFromCommandString(command);
                    this.Key = Input._.KeyboardCommandHelper.ParseKey(command);

                    this._onDisposed = new EndGate.EventHandler();
                    this._onDisposeInvoker = new EndGate._.Utilities.NoopTripInvoker(function () {
                        _this._onDisposed.Trigger();
                    }, true);
                }
                Object.defineProperty(KeyboardCommand.prototype, "OnDispose", {
                    get: function () {
                        return this._onDisposed;
                    },
                    enumerable: true,
                    configurable: true
                });

                KeyboardCommand.prototype.Dispose = function () {
                    this._onDisposeInvoker.InvokeOnce();
                };
                return KeyboardCommand;
            })();
            Assets.KeyboardCommand = KeyboardCommand;
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        var KeyboardHandler = (function () {
            function KeyboardHandler() {
                this._onPressCommands = ({});
                this._onDownCommands = ({});
                this._onUpCommands = ({});

                this._onKeyPress = new EndGate.EventHandler1();
                this._onKeyDown = new EndGate.EventHandler1();
                this._onKeyUp = new EndGate.EventHandler1();

                this._disposed = false;

                this.Wire();
            }
            Object.defineProperty(KeyboardHandler.prototype, "OnKeyPress", {
                get: function () {
                    return this._onKeyPress;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyDown", {
                get: function () {
                    return this._onKeyDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyUp", {
                get: function () {
                    return this._onKeyUp;
                },
                enumerable: true,
                configurable: true
            });

            KeyboardHandler.prototype.OnCommandPress = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onPressCommands);
            };

            KeyboardHandler.prototype.OnCommandDown = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onDownCommands);
            };

            KeyboardHandler.prototype.OnCommandUp = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onUpCommands);
            };

            KeyboardHandler.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this._onKeyDown.Dispose();
                    this._onKeyPress.Dispose();
                    this._onKeyUp.Dispose();

                    for (var command in this._onDownCommands) {
                        this._onDownCommands[command].Dispose();
                    }

                    this._onDownCommands = null;

                    for (var command in this._onUpCommands) {
                        this._onUpCommands[command].Dispose();
                    }

                    this._onUpCommands = null;

                    for (var command in this._onPressCommands) {
                        this._onPressCommands[command].Dispose();
                    }

                    this._onPressCommands = null;

                    this.Unwire();
                } else {
                    throw new Error("KeyboardHandler cannot be disposed more than once");
                }
            };

            KeyboardHandler.prototype.UpdateCache = function (keyCommand, action, store) {
                var command = new Input.Assets.KeyboardCommand(keyCommand, action), commandId = KeyboardHandler._keyboardCommandIds++;

                command.OnDispose.Bind(function () {
                    delete store[commandId];
                });

                store[commandId] = command;

                return command;
            };

            KeyboardHandler.prototype.Wire = function () {
                this._keyPressWire = this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress);
                this._keyDownWire = this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown);
                this._keyUpWire = this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp);

                document.addEventListener("keypress", this._keyPressWire, false);

                document.addEventListener("keydown", this._keyDownWire, false);

                document.addEventListener("keyup", this._keyUpWire, false);
            };

            KeyboardHandler.prototype.Unwire = function () {
                document.removeEventListener("keypress", this._keyPressWire, false);
                document.removeEventListener("keydown", this._keyDownWire, false);
                document.removeEventListener("keyup", this._keyUpWire, false);
            };

            KeyboardHandler.prototype.FocusingTextArea = function (ke) {
                var element;

                if (ke.target) {
                    element = ke.target;
                } else if (ke.srcElement) {
                    element = ke.srcElement;
                }

                if (element.nodeType === 3) {
                    element = element.parentNode;
                }

                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    return true;
                }

                return false;
            };

            KeyboardHandler.prototype.BuildKeyEvent = function (store, eventHandler) {
                var _this = this;
                return function (ke) {
                    var keyboardCommandEvent, propogate = true;

                    if (_this.FocusingTextArea(ke)) {
                        return;
                    }

                    keyboardCommandEvent = new Input.KeyboardCommandEvent(ke);

                    eventHandler.Trigger(keyboardCommandEvent);

                    for (var keyboardCommandId in store) {
                        if (keyboardCommandEvent.Matches(store[keyboardCommandId])) {
                            store[keyboardCommandId].Action();
                            ke.preventDefault();
                            propogate = false;
                        }
                    }

                    return propogate;
                };
            };
            KeyboardHandler._keyboardCommandIds = 0;
            return KeyboardHandler;
        })();
        Input.KeyboardHandler = KeyboardHandler;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        var InputManager = (function () {
            function InputManager(target) {
                this._disposed = false;
                this.Mouse = new Input.MouseHandler(target);
                this.Keyboard = new Input.KeyboardHandler();
            }
            InputManager.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this.Mouse.Dispose();
                    this.Keyboard.Dispose();
                } else {
                    throw new Error("MouseHandler cannot be disposed more than once");
                }
            };
            return InputManager;
        })();
        Input.InputManager = InputManager;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var ImageSource = (function () {
            function ImageSource(image, width, height, clipX, clipY, clipWidth, clipHeight) {
                if (typeof clipX === "undefined") { clipX = 0; }
                if (typeof clipY === "undefined") { clipY = 0; }
                if (typeof clipWidth === "undefined") { clipWidth = width; }
                if (typeof clipHeight === "undefined") { clipHeight = height; }
                var _this = this;
                var sizeDefined = typeof width !== "undefined", imageLocation;

                this._onLoaded = new EndGate.EventHandler1();

                if (typeof image === "string") {
                    imageLocation = image;
                    this._loaded = false;
                    this.Source = new Image();

                    this.Source.onload = function () {
                        _this._loaded = true;

                        if (!sizeDefined) {
                            _this._size = new EndGate.Size2d(_this.Source.width, _this.Source.height);
                            _this.ClipLocation = EndGate.Vector2d.Zero;
                            _this.ClipSize = _this._size.Clone();
                        }

                        _this._onLoaded.Trigger(_this);
                    };

                    this.Source.src = imageLocation;
                    this._imageLocation = imageLocation;

                    if (sizeDefined) {
                        this._size = new EndGate.Size2d(width, height);
                        this.ClipLocation = new EndGate.Vector2d(clipX, clipY);
                        this.ClipSize = new EndGate.Size2d(clipWidth, clipHeight);
                    } else {
                        this.ClipSize = null;
                    }
                } else {
                    this._loaded = true;
                    this.Source = image;
                    this._imageLocation = image.src;
                    this._size = new EndGate.Size2d(image.width, image.height);

                    this.ClipLocation = new EndGate.Vector2d(clipX, clipY);
                    this.ClipSize = new EndGate.Size2d(clipWidth, clipHeight);
                }
            }
            Object.defineProperty(ImageSource.prototype, "OnLoaded", {
                get: function () {
                    return this._onLoaded;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ImageSource.prototype, "Size", {
                get: function () {
                    return this._size.Clone();
                },
                enumerable: true,
                configurable: true
            });

            ImageSource.prototype.IsLoaded = function () {
                return this._loaded;
            };

            ImageSource.prototype.Extract = function (clipX, clipY, clipWidth, clipHeight) {
                return new ImageSource(this._imageLocation, this._size.Width, this._size.Height, clipX, clipY, clipWidth, clipHeight);
            };

            ImageSource.prototype.Dispose = function () {
                this.Source = null;
                this._onLoaded.Dispose();
            };

            ImageSource.prototype.Clone = function () {
                return new ImageSource(this.Source, this.Size.Width, this.Size.Height, this.ClipLocation.X, this.ClipLocation.Y, this.ClipSize.Width, this.ClipSize.Height);
            };
            return ImageSource;
        })();
        Graphics.ImageSource = ImageSource;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Sound) {
        var AudioSettings = (function () {
            function AudioSettings(repeat, volume, autoplay, preload) {
                if (typeof repeat === "undefined") { repeat = false; }
                if (typeof volume === "undefined") { volume = 100; }
                if (typeof autoplay === "undefined") { autoplay = false; }
                if (typeof preload === "undefined") { preload = "auto"; }
                this.Repeat = repeat;
                this.Volume = volume;
                this.AutoPlay = autoplay;
                this.Preload = preload;
            }
            AudioSettings.prototype.Clone = function () {
                return new AudioSettings(this.Repeat, this.Volume, this.AutoPlay, this.Preload);
            };
            AudioSettings.Default = new AudioSettings();
            return AudioSettings;
        })();
        Sound.AudioSettings = AudioSettings;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Sound) {
        var supportedAudioTypes = {
            mp3: 'audio/mpeg',
            ogg: 'audio/ogg',
            wav: 'audio/wav',
            aac: 'audio/aac',
            m4a: 'audio/x-m4a'
        };

        var AudioClip = (function () {
            function AudioClip(source, settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                this._disposed = false;
                this._settings = settings.Clone();
                this._canPlayWires = [];

                if (source instanceof HTMLAudioElement) {
                    this._audio = source;
                } else {
                    this._audio = document.createElement("audio");
                    this.SetAudioSource(source);
                }

                this.ApplySettings();

                this._onComplete = new EndGate.EventHandler1();
            }
            Object.defineProperty(AudioClip.prototype, "OnComplete", {
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(AudioClip.prototype, "Volume", {
                get: function () {
                    return this._settings.Volume;
                },
                set: function (percent) {
                    this._settings.Volume = percent;
                    this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
                },
                enumerable: true,
                configurable: true
            });

            AudioClip.prototype.IsPlaying = function () {
                return !this._audio.paused;
            };

            AudioClip.prototype.IsComplete = function () {
                return this._audio.ended;
            };

            AudioClip.prototype.Play = function () {
                var _this = this;
                var wire;

                if (this._audio.readyState === 0) {
                    wire = function () {
                        _this._audio.play();
                    };
                    this._canPlayWires.push(wire);
                    this._audio.addEventListener("canplay", wire, true);
                } else {
                    this._audio.play();
                }
            };

            AudioClip.prototype.Pause = function () {
                this._audio.pause();
            };

            AudioClip.prototype.Seek = function (time) {
                var _this = this;
                var wire;

                if (this._audio.readyState === 0) {
                    wire = function () {
                        _this._audio.currentTime = time;
                    };

                    this._canPlayWires.push(wire);

                    this._audio.addEventListener("canplay", wire, true);
                } else {
                    this._audio.currentTime = time;
                }
            };

            AudioClip.prototype.Stop = function () {
                this.Seek(0);
                this._audio.pause();
            };

            AudioClip.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this._onComplete.Dispose();
                    for (var i = 0; i < this._canPlayWires.length; i++) {
                        this._audio.removeEventListener("canplay", this._canPlayWires[i], true);
                    }

                    this._audio.removeEventListener("ended", this._endedWire, true);
                    this._audio = null;
                    this._settings = null;
                } else {
                    throw new Error("Cannot dispose AudioClip more than once.");
                }
            };

            AudioClip.prototype.SetAudioSource = function (source) {
                var sourceHolder, sourceType;

                if (!(source instanceof Array)) {
                    source = [source];
                }

                for (var i = 0; i < source.length; i++) {
                    sourceHolder = document.createElement("source");
                    sourceHolder.src = source[i];

                    sourceType = supportedAudioTypes[source[i].split('.').pop()];

                    if (typeof sourceType !== "undefined") {
                        sourceHolder.type = sourceType;
                    }

                    this._audio.appendChild(sourceHolder);
                }
            };

            AudioClip.prototype.ApplySettings = function () {
                var _this = this;
                this._audio.loop = this._settings.Repeat;
                this._audio.autoplay = this._settings.AutoPlay;
                this._audio.preload = this._settings.Preload;
                this.Volume = this._settings.Volume;

                this._endedWire = function (e) {
                    _this.OnComplete.Trigger(e);
                };

                this._audio.addEventListener("ended", this._endedWire, true);
            };
            return AudioClip;
        })();
        Sound.AudioClip = AudioClip;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Sound) {
        var AudioPlayer = (function () {
            function AudioPlayer(source) {
                if (!(source instanceof Array)) {
                    this._source = [];
                    this._source.push(source);
                } else {
                    this._source = source;
                }
            }
            AudioPlayer.prototype.BuildClip = function (settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                return new Sound.AudioClip(this._source, settings);
            };

            AudioPlayer.prototype.Play = function (settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                var clip = new Sound.AudioClip(this._source, settings);

                clip.Play();

                return clip;
            };
            return AudioPlayer;
        })();
        Sound.AudioPlayer = AudioPlayer;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Content) {
        var ContentManager = (function () {
            function ContentManager() {
                this._images = {};
                this._audioPlayers = {};
            }
            ContentManager.prototype.LoadImage = function (name, src, width, height) {
                var imageSource = new EndGate.Graphics.ImageSource(src, width, height);

                this._images[name] = imageSource;

                return imageSource.Clone();
            };

            ContentManager.prototype.GetImage = function (name) {
                if (this._images[name]) {
                    return this._images[name].Clone();
                } else {
                    throw new Error("Image with name '" + name + "' was not found.");
                }
            };

            ContentManager.prototype.UnloadImage = function (name) {
                if (this._images[name]) {
                    delete this._images[name];

                    return true;
                }

                return false;
            };

            ContentManager.prototype.LoadAudio = function (name, src) {
                this._audioPlayers[name] = new EndGate.Sound.AudioPlayer(src);

                return this._audioPlayers[name];
            };

            ContentManager.prototype.GetAudio = function (name) {
                if (this._audioPlayers[name]) {
                    return this._audioPlayers[name];
                } else {
                    throw new Error("Audio with name '" + name + "' was not found.");
                }
            };

            ContentManager.prototype.UnloadAudio = function (name) {
                var player = this._audioPlayers[name];

                delete this._audioPlayers[name];

                return player;
            };
            return ContentManager;
        })();
        Content.ContentManager = ContentManager;
    })(EndGate.Content || (EndGate.Content = {}));
    var Content = EndGate.Content;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var Game = (function () {
        function Game(gameCanvas) {
            var _this = this;
            this._type = "Game";
            var initialQuadTreeSize, defaultMinQuadTreeSize = EndGate.Collision.CollisionConfiguration._DefaultMinQuadTreeNodeSize;

            this._updateRequired = true;
            this._gameTime = new EndGate.GameTime();
            this._ID = Game._gameIds++;

            this.Scene = new EndGate.Rendering.Scene2d(function (context) {
                _this.Draw(context);
            }, gameCanvas);

            this.Input = new EndGate.Input.InputManager(this.Scene.DrawArea);
            this.Content = new EndGate.Content.ContentManager();

            initialQuadTreeSize = this.Scene.Camera.Size;

            if (initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width !== 0) {
                initialQuadTreeSize = new EndGate.Size2d(initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width + initialQuadTreeSize.Width);
            }

            this.Configuration = new EndGate.GameConfiguration(GameRunnerInstance.Register(this), initialQuadTreeSize);
            this.CollisionManager = new EndGate.Collision.CollisionManager(this.Configuration.CollisionConfiguration);

            this.Configuration.CollisionConfiguration._OnChange.Bind(function () {
                _this.CollisionManager = new EndGate.Collision.CollisionManager(_this.Configuration.CollisionConfiguration);
            });

            this._PrepareLoadContent();
        }
        Game.prototype._PrepareUpdate = function () {
            this._gameTime.Update();

            this.Update(this._gameTime);
            this.CollisionManager.Update(this._gameTime);
            this._updateRequired = false;
        };

        Game.prototype._PrepareLoadContent = function () {
            this.LoadContent();
        };

        Game.prototype.LoadContent = function () {
        };

        Game.prototype.Update = function (gameTime) {
        };

        Game.prototype._PrepareDraw = function () {
            if (this.Configuration.DrawOnlyAfterUpdate && this._updateRequired) {
                return;
            }

            this.Scene.Draw();
            this._updateRequired = true;
        };

        Game.prototype.Draw = function (context) {
        };

        Game.prototype.Dispose = function () {
            this.Scene.Dispose();
            this.CollisionManager.Dispose();
            this.Input.Dispose();

            GameRunnerInstance.Unregister(this);
        };
        Game._gameIds = 0;
        return Game;
    })();
    EndGate.Game = Game;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        (function (Assets) {
            var LinearDirections = (function () {
                function LinearDirections() {
                    this.Left = false;
                    this.Right = false;
                    this.Up = false;
                    this.Down = false;
                }
                return LinearDirections;
            })();
            Assets.LinearDirections = LinearDirections;
        })(MovementControllers.Assets || (MovementControllers.Assets = {}));
        var Assets = MovementControllers.Assets;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        var MovementController = (function () {
            function MovementController(moveables) {
                this.Position = moveables.length > 0 ? moveables[0].Position : EndGate.Vector2d.Zero;
                this.Velocity = EndGate.Vector2d.Zero;
                this.Rotation = 0;
                this._frozen = false;

                this._moveables = moveables;
            }
            MovementController.prototype.Freeze = function () {
                this._frozen = true;
            };

            MovementController.prototype.Thaw = function () {
                this._frozen = false;
            };

            MovementController.prototype.IsMoving = function () {
                return !this._frozen && !this.Velocity.IsZero();
            };

            MovementController.prototype.Update = function (gameTime) {
                for (var i = 0; i < this._moveables.length; i++) {
                    this._moveables[i].Position = this.Position;
                    this._moveables[i].Rotation = this.Rotation;
                }
            };
            return MovementController;
        })();
        MovementControllers.MovementController = MovementController;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        var LinearMovementController = (function (_super) {
            __extends(LinearMovementController, _super);
            function LinearMovementController(movables, moveSpeed, rotateWithMovements, multiDirectional) {
                if (typeof rotateWithMovements === "undefined") { rotateWithMovements = true; }
                if (typeof multiDirectional === "undefined") { multiDirectional = true; }
                var _this = this;
                _super.call(this, movables);

                this._moveSpeed = moveSpeed;
                this._moving = new MovementControllers.Assets.LinearDirections();
                this.OnMove = new EndGate.EventHandler1();
                this._rotationUpdater = new EndGate._.Utilities.NoopTripInvoker(function () {
                    _this.UpdateRotation();
                }, rotateWithMovements);

                if (multiDirectional) {
                    this._velocityUpdater = this.UpdateVelocityWithMultiDirection;
                } else {
                    this._velocityUpdater = this.UpdateVelocityNoMultiDirection;
                }
            }
            LinearMovementController.prototype.IsMovingInDirection = function (direction) {
                return this._moving[direction] || false;
            };

            LinearMovementController.prototype.StartMoving = function (direction) {
                this.Move(direction, true);
            };

            LinearMovementController.prototype.StopMoving = function (direction) {
                this.Move(direction, false);
            };

            LinearMovementController.prototype.MoveSpeed = function (speed) {
                if (typeof speed !== "undefined") {
                    this._moveSpeed = speed;
                    this._velocityUpdater();
                }

                return this._moveSpeed;
            };

            LinearMovementController.prototype.Update = function (gameTime) {
                if (!this._frozen) {
                    this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds));

                    _super.prototype.Update.call(this, gameTime);
                }
            };

            LinearMovementController.prototype.Move = function (direction, startMoving) {
                if (typeof this._moving[direction] !== "undefined") {
                    this._moving[direction] = startMoving;
                    this._velocityUpdater();
                    this._rotationUpdater.Invoke();
                    this.OnMove.Trigger({
                        Direction: direction,
                        StartMoving: startMoving
                    });
                } else {
                    throw new Error(direction + " is an unknown direction.");
                }
            };

            LinearMovementController.prototype.UpdateVelocityNoMultiDirection = function () {
                var velocity = EndGate.Vector2d.Zero;

                if (velocity.IsZero()) {
                    if (this._moving.Up) {
                        velocity.Y -= this._moveSpeed;
                    }
                    if (this._moving.Down) {
                        velocity.Y += this._moveSpeed;
                    }

                    if (velocity.Y === 0) {
                        if (this._moving.Left) {
                            velocity.X -= this._moveSpeed;
                        }
                        if (this._moving.Right) {
                            velocity.X += this._moveSpeed;
                        }
                    }
                }

                this.Velocity = velocity;
            };

            LinearMovementController.prototype.UpdateVelocityWithMultiDirection = function () {
                var velocity = EndGate.Vector2d.Zero;

                if (this._moving.Up) {
                    velocity.Y -= this._moveSpeed;
                }
                if (this._moving.Down) {
                    velocity.Y += this._moveSpeed;
                }
                if (this._moving.Left) {
                    velocity.X -= this._moveSpeed;
                }
                if (this._moving.Right) {
                    velocity.X += this._moveSpeed;
                }

                this.Velocity = velocity;
            };

            LinearMovementController.prototype.UpdateRotation = function () {
                if (!this.Velocity.IsZero()) {
                    this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
                }
            };
            return LinearMovementController;
        })(MovementControllers.MovementController);
        MovementControllers.LinearMovementController = LinearMovementController;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (InputControllers) {
        var DirectionalInputController = (function () {
            function DirectionalInputController(keyboard, onMove, upKeys, rightKeys, downKeys, leftKeys) {
                if (typeof upKeys === "undefined") { upKeys = ["w", "Up"]; }
                if (typeof rightKeys === "undefined") { rightKeys = ["d", "Right"]; }
                if (typeof downKeys === "undefined") { downKeys = ["s", "Down"]; }
                if (typeof leftKeys === "undefined") { leftKeys = ["a", "Left"]; }
                this._keyboard = keyboard;
                this._onMove = onMove;
                this._directions = new EndGate.MovementControllers.Assets.LinearDirections();

                this.BindKeys(upKeys, "OnCommandDown", "Up", true);
                this.BindKeys(rightKeys, "OnCommandDown", "Right", true);
                this.BindKeys(downKeys, "OnCommandDown", "Down", true);
                this.BindKeys(leftKeys, "OnCommandDown", "Left", true);
                this.BindKeys(upKeys, "OnCommandUp", "Up", false);
                this.BindKeys(rightKeys, "OnCommandUp", "Right", false);
                this.BindKeys(downKeys, "OnCommandUp", "Down", false);
                this.BindKeys(leftKeys, "OnCommandUp", "Left", false);
            }
            DirectionalInputController.prototype.BindKeys = function (keyList, bindingAction, direction, startMoving) {
                var _this = this;
                for (var i = 0; i < keyList.length; i++) {
                    this._keyboard[bindingAction](keyList[i], function () {
                        if (_this._directions[direction] != startMoving) {
                            _this._directions[direction] = startMoving;
                            _this._onMove(direction, startMoving);
                        }
                    });
                }
            };
            return DirectionalInputController;
        })();
        InputControllers.DirectionalInputController = DirectionalInputController;
    })(EndGate.InputControllers || (EndGate.InputControllers = {}));
    var InputControllers = EndGate.InputControllers;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Color = (function () {
            function Color(r, g, b, a) {
                this._type = "Color";
                this._cached = undefined;
                this._onChange = new EndGate.EventHandler1();

                if (typeof (r) === 'string' && r.length > 0) {
                    this.InitializeColorFromString(r);
                } else {
                    this.A = a === undefined ? 1 : a;
                    this.R = r;
                    this.G = g;
                    this.B = b;
                }
            }
            Object.defineProperty(Color.prototype, "OnChange", {
                get: function () {
                    return this._onChange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "R", {
                get: function () {
                    return this._r;
                },
                set: function (r) {
                    this._cached = undefined;
                    this._r = Math.round(Math.min(Math.max(r, 0), 255));
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "G", {
                get: function () {
                    return this._g;
                },
                set: function (g) {
                    this._cached = undefined;
                    this._g = Math.round(Math.min(Math.max(g, 0), 255));
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "B", {
                get: function () {
                    return this._b;
                },
                set: function (b) {
                    this._cached = undefined;
                    this._b = Math.round(Math.min(Math.max(b, 0), 255));
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "A", {
                get: function () {
                    return this._a;
                },
                set: function (a) {
                    this._cached = undefined;
                    this._a = Math.min(Math.max(a, 0), 1);
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Color.FromRGB = function (r, g, b) {
                return new Color(r, g, b);
            };

            Color.FromRGBA = function (r, g, b, a) {
                return new Color(r, g, b, a);
            };

            Color.FromARGB = function (a, r, g, b) {
                return new Color(r, g, b, a);
            };

            Color.FromHex = function (hex) {
                return new Color(hex);
            };

            Color.FromName = function (name) {
                return new Color(name);
            };

            Color.ConvertShortHexToLong = function (hex) {
                if (hex.length === 3) {
                    hex = hex + 'f';
                }

                if (hex.length === 4) {
                    hex = hex.replace(Color.RgbaHexRegExp, function (m, a, r, g, b) {
                        return r + r + g + g + b + b + a + a;
                    });
                }

                return hex;
            };

            Color.prototype.InitializeColorFromString = function (color) {
                var namedColor = this.NamedColorToHex(color);
                var result = null;

                if (typeof (namedColor) === 'string') {
                    result = this.CreateColorObjectFromString(namedColor);
                } else {
                    result = namedColor;
                }

                this.A = result.A;
                this.B = result.B;
                this.R = result.R;
                this.G = result.G;
            };

            Color.prototype.CreateColorObjectFromString = function (hex) {
                if (hex.charAt(0) === '#') {
                    hex = hex.substr(1);
                }

                hex = Color.ConvertShortHexToLong(hex);

                if (hex.length === 6) {
                    hex = hex + 'ff';
                }

                if (hex.length === 8) {
                    return this.ParseAlphaHex(hex);
                }

                return this.ParseRGB(hex);
            };

            Color.prototype.ParseRGB = function (rgb) {
                var result = Color.RgbRegExp.exec(rgb);
                if (result) {
                    var name = result[1];

                    switch (name) {
                        case 'rgb':
                            return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
                        case 'argb':
                            return new Color(parseInt(result[3]), parseInt(result[4]), parseInt(result[5]), parseFloat(result[2]));
                        case 'rgba':
                            return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]), parseFloat(result[5]));
                    }
                }

                return Color.Magenta;
            };

            Color.prototype.ParseAlphaHex = function (hex) {
                var a, r, g, b;

                r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
                g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
                b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
                a = parseInt(hex.charAt(6) + hex.charAt(7), 16) / 255;

                return new Color(r, g, b, a);
            };

            Color.prototype.ParseHex = function (hex) {
                var r, g, b;

                r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
                g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
                b = parseInt(hex.charAt(4) + hex.charAt(5), 16);

                return new Color(r, g, b);
            };

            Color.prototype.NamedColorToHex = function (color) {
                if (color.substring(0, 1) === '#') {
                    return color;
                }
                if (typeof Color._namedColors[color.toLowerCase()] !== 'undefined') {
                    return Color._namedColors[color.toLowerCase()];
                }

                return color;
            };

            Object.defineProperty(Color, "Transparent", {
                get: function () {
                    return Color._namedColors.transparent.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "AliceBlue", {
                get: function () {
                    return Color._namedColors.aliceblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "AntiqueWhite", {
                get: function () {
                    return Color._namedColors.antiquewhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Aqua", {
                get: function () {
                    return Color._namedColors.aqua.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Aquamarine", {
                get: function () {
                    return Color._namedColors.aquamarine.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Azure", {
                get: function () {
                    return Color._namedColors.azure.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Beige", {
                get: function () {
                    return Color._namedColors.beige.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Bisque", {
                get: function () {
                    return Color._namedColors.bisque.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Black", {
                get: function () {
                    return Color._namedColors.black.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "BlanchedAlmond", {
                get: function () {
                    return Color._namedColors.blanchedalmond.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Blue", {
                get: function () {
                    return Color._namedColors.blue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "BlueViolet", {
                get: function () {
                    return Color._namedColors.blueviolet.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Brown", {
                get: function () {
                    return Color._namedColors.brown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "BurlyWood", {
                get: function () {
                    return Color._namedColors.burlywood.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "CadetBlue", {
                get: function () {
                    return Color._namedColors.cadetblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Chartreuse", {
                get: function () {
                    return Color._namedColors.chartreuse.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Chocolate", {
                get: function () {
                    return Color._namedColors.chocolate.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Coral", {
                get: function () {
                    return Color._namedColors.coral.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "CornflowerBlue", {
                get: function () {
                    return Color._namedColors.cornflowerblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Cornsilk", {
                get: function () {
                    return Color._namedColors.cornsilk.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Crimson", {
                get: function () {
                    return Color._namedColors.crimson.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Cyan", {
                get: function () {
                    return Color._namedColors.cyan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkBlue", {
                get: function () {
                    return Color._namedColors.darkblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkCyan", {
                get: function () {
                    return Color._namedColors.darkcyan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkGoldenRod", {
                get: function () {
                    return Color._namedColors.darkgoldenrod.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkGray", {
                get: function () {
                    return Color._namedColors.darkgray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkGreen", {
                get: function () {
                    return Color._namedColors.darkgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkKhaki", {
                get: function () {
                    return Color._namedColors.darkkhaki.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkMagenta", {
                get: function () {
                    return Color._namedColors.darkmagenta.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkOliveGreen", {
                get: function () {
                    return Color._namedColors.darkolivegreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkOrange", {
                get: function () {
                    return Color._namedColors.darkorange.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkOrchid", {
                get: function () {
                    return Color._namedColors.darkorchid.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkRed", {
                get: function () {
                    return Color._namedColors.darkred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSalmon", {
                get: function () {
                    return Color._namedColors.darksalmon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSeaGreen", {
                get: function () {
                    return Color._namedColors.darkseagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSlateBlue", {
                get: function () {
                    return Color._namedColors.darkslateblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSlateGray", {
                get: function () {
                    return Color._namedColors.darkslategray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkTurquoise", {
                get: function () {
                    return Color._namedColors.darkturquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkViolet", {
                get: function () {
                    return Color._namedColors.darkviolet.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DeepPink", {
                get: function () {
                    return Color._namedColors.deeppink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DeepSkyBlue", {
                get: function () {
                    return Color._namedColors.deepskyblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DimGray", {
                get: function () {
                    return Color._namedColors.dimgray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DodgerBlue", {
                get: function () {
                    return Color._namedColors.dodgerblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "FireBrick", {
                get: function () {
                    return Color._namedColors.firebrick.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "FloralWhite", {
                get: function () {
                    return Color._namedColors.floralwhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "ForestGreen", {
                get: function () {
                    return Color._namedColors.forestgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Fuchsia", {
                get: function () {
                    return Color._namedColors.fuchsia.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Gainsboro", {
                get: function () {
                    return Color._namedColors.gainsboro.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "GhostWhite", {
                get: function () {
                    return Color._namedColors.ghostwhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Gold", {
                get: function () {
                    return Color._namedColors.gold.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "GoldenRod", {
                get: function () {
                    return Color._namedColors.goldenrod.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Gray", {
                get: function () {
                    return Color._namedColors.gray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Green", {
                get: function () {
                    return Color._namedColors.green.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "GreenYellow", {
                get: function () {
                    return Color._namedColors.greenyellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "HoneyDew", {
                get: function () {
                    return Color._namedColors.honeydew.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "HotPink", {
                get: function () {
                    return Color._namedColors.hotpink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "IndianRed", {
                get: function () {
                    return Color._namedColors.indianred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Indigo", {
                get: function () {
                    return Color._namedColors.indigo.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Ivory", {
                get: function () {
                    return Color._namedColors.ivory.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Khaki", {
                get: function () {
                    return Color._namedColors.khaki.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Lavender", {
                get: function () {
                    return Color._namedColors.lavender.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LavenderBlush", {
                get: function () {
                    return Color._namedColors.lavenderblush.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LawnGreen", {
                get: function () {
                    return Color._namedColors.lawngreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LemonChiffon", {
                get: function () {
                    return Color._namedColors.lemonchiffon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightBlue", {
                get: function () {
                    return Color._namedColors.lightblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightCoral", {
                get: function () {
                    return Color._namedColors.lightcoral.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightCyan", {
                get: function () {
                    return Color._namedColors.lightcyan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGoldenRodYellow", {
                get: function () {
                    return Color._namedColors.lightgoldenrodyellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGray", {
                get: function () {
                    return Color._namedColors.lightgray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGrey", {
                get: function () {
                    return Color._namedColors.lightgrey.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGreen", {
                get: function () {
                    return Color._namedColors.lightgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightPink", {
                get: function () {
                    return Color._namedColors.lightpink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSalmon", {
                get: function () {
                    return Color._namedColors.lightsalmon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSeaGreen", {
                get: function () {
                    return Color._namedColors.lightseagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSkyBlue", {
                get: function () {
                    return Color._namedColors.lightskyblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSlateGray", {
                get: function () {
                    return Color._namedColors.lightslategray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSteelBlue", {
                get: function () {
                    return Color._namedColors.lightsteelblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightYellow", {
                get: function () {
                    return Color._namedColors.lightyellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Lime", {
                get: function () {
                    return Color._namedColors.lime.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LimeGreen", {
                get: function () {
                    return Color._namedColors.limegreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Linen", {
                get: function () {
                    return Color._namedColors.linen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Magenta", {
                get: function () {
                    return Color._namedColors.magenta.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Maroon", {
                get: function () {
                    return Color._namedColors.maroon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumAquaMarine", {
                get: function () {
                    return Color._namedColors.mediumaquamarine.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumBlue", {
                get: function () {
                    return Color._namedColors.mediumblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumOrchid", {
                get: function () {
                    return Color._namedColors.mediumorchid.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumPurple", {
                get: function () {
                    return Color._namedColors.mediumpurple.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumSeaGreen", {
                get: function () {
                    return Color._namedColors.mediumseagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumSlateBlue", {
                get: function () {
                    return Color._namedColors.mediumslateblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumSpringGreen", {
                get: function () {
                    return Color._namedColors.mediumspringgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumTurquoise", {
                get: function () {
                    return Color._namedColors.mediumturquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumVioletRed", {
                get: function () {
                    return Color._namedColors.mediumvioletred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MidnightBlue", {
                get: function () {
                    return Color._namedColors.midnightblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MintCream", {
                get: function () {
                    return Color._namedColors.mintcream.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MistyRose", {
                get: function () {
                    return Color._namedColors.mistyrose.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Moccasin", {
                get: function () {
                    return Color._namedColors.moccasin.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "NavajoWhite", {
                get: function () {
                    return Color._namedColors.navajowhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Navy", {
                get: function () {
                    return Color._namedColors.navy.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "OldLace", {
                get: function () {
                    return Color._namedColors.oldlace.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Olive", {
                get: function () {
                    return Color._namedColors.olive.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "OliveDrab", {
                get: function () {
                    return Color._namedColors.olivedrab.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Orange", {
                get: function () {
                    return Color._namedColors.orange.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "OrangeRed", {
                get: function () {
                    return Color._namedColors.orangered.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Orchid", {
                get: function () {
                    return Color._namedColors.orchid.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleGoldenRod", {
                get: function () {
                    return Color._namedColors.palegoldenrod.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleGreen", {
                get: function () {
                    return Color._namedColors.palegreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleTurquoise", {
                get: function () {
                    return Color._namedColors.paleturquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleVioletRed", {
                get: function () {
                    return Color._namedColors.palevioletred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PapayaWhip", {
                get: function () {
                    return Color._namedColors.papayawhip.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PeachPuff", {
                get: function () {
                    return Color._namedColors.peachpuff.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Peru", {
                get: function () {
                    return Color._namedColors.peru.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Pink", {
                get: function () {
                    return Color._namedColors.pink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Plum", {
                get: function () {
                    return Color._namedColors.plum.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PowderBlue", {
                get: function () {
                    return Color._namedColors.powderblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Purple", {
                get: function () {
                    return Color._namedColors.purple.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Red", {
                get: function () {
                    return Color._namedColors.red.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "RosyBrown", {
                get: function () {
                    return Color._namedColors.rosybrown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "RoyalBlue", {
                get: function () {
                    return Color._namedColors.royalblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SaddleBrown", {
                get: function () {
                    return Color._namedColors.saddlebrown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Salmon", {
                get: function () {
                    return Color._namedColors.salmon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SandyBrown", {
                get: function () {
                    return Color._namedColors.sandybrown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SeaGreen", {
                get: function () {
                    return Color._namedColors.seagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SeaShell", {
                get: function () {
                    return Color._namedColors.seashell.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Sienna", {
                get: function () {
                    return Color._namedColors.sienna.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Silver", {
                get: function () {
                    return Color._namedColors.silver.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SkyBlue", {
                get: function () {
                    return Color._namedColors.skyblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SlateBlue", {
                get: function () {
                    return Color._namedColors.slateblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SlateGray", {
                get: function () {
                    return Color._namedColors.slategray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Snow", {
                get: function () {
                    return Color._namedColors.snow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SpringGreen", {
                get: function () {
                    return Color._namedColors.springgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SteelBlue", {
                get: function () {
                    return Color._namedColors.steelblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Tan", {
                get: function () {
                    return Color._namedColors.tan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Teal", {
                get: function () {
                    return Color._namedColors.teal.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Thistle", {
                get: function () {
                    return Color._namedColors.thistle.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Tomato", {
                get: function () {
                    return Color._namedColors.tomato.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Turquoise", {
                get: function () {
                    return Color._namedColors.turquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Violet", {
                get: function () {
                    return Color._namedColors.violet.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Wheat", {
                get: function () {
                    return Color._namedColors.wheat.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "White", {
                get: function () {
                    return Color._namedColors.white.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "WhiteSmoke", {
                get: function () {
                    return Color._namedColors.whitesmoke.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Yellow", {
                get: function () {
                    return Color._namedColors.yellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "YellowGreen", {
                get: function () {
                    return Color._namedColors.yellowgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Color.prototype.Clone = function () {
                return new Color(this.R, this.G, this.B, this.A);
            };

            Color.prototype.Dispose = function () {
                this._onChange.Dispose();
            };

            Color.prototype.toString = function () {
                if (this._cached === undefined) {
                    this._cached = 'rgba(' + this.R + ',' + this.G + ',' + this.B + ',' + this.A + ')';
                }
                return this._cached;
            };
            Color.RgbaHexRegExp = /^([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;

            Color.RgbRegExp = /^(argb|rgb|rgba)\s*\(\s*([\d+(\.\d+)]{0,3})\s*,\s*([\d]{0,3})\s*,\s*([\d]{0,3})\s*(?:,\s*([\d+(\.\d+)]{0,3})\s*)?\s*\)$/i;

            Color.RgbaRegExp = /^([a-f\d])([a-f\d])([a-f\d])$/i;

            Color._namedColors = {
                "transparent": new Color(255, 255, 255, 0),
                "aliceblue": new Color("#f0f8ff"),
                "antiquewhite": new Color("#faebd7"),
                "aqua": new Color("#00ffff"),
                "aquamarine": new Color("#7fffd4"),
                "azure": new Color("#f0ffff"),
                "beige": new Color("#f5f5dc"),
                "bisque": new Color("#ffe4c4"),
                "black": new Color("#000000"),
                "blanchedalmond": new Color("#ffebcd"),
                "blue": new Color("#0000ff"),
                "blueviolet": new Color("#8a2be2"),
                "brown": new Color("#a52a2a"),
                "burlywood": new Color("#deb887"),
                "cadetblue": new Color("#5f9ea0"),
                "chartreuse": new Color("#7fff00"),
                "chocolate": new Color("#d2691e"),
                "coral": new Color("#ff7f50"),
                "cornflowerblue": new Color("#6495ed"),
                "cornsilk": new Color("#fff8dc"),
                "crimson": new Color("#dc143c"),
                "cyan": new Color("#00ffff"),
                "darkblue": new Color("#00008b"),
                "darkcyan": new Color("#008b8b"),
                "darkgoldenrod": new Color("#b8860b"),
                "darkgray": new Color("#a9a9a9"),
                "darkgreen": new Color("#006400"),
                "darkkhaki": new Color("#bdb76b"),
                "darkmagenta": new Color("#8b008b"),
                "darkolivegreen": new Color("#556b2f"),
                "darkorange": new Color("#ff8c00"),
                "darkorchid": new Color("#9932cc"),
                "darkred": new Color("#8b0000"),
                "darksalmon": new Color("#e9967a"),
                "darkseagreen": new Color("#8fbc8f"),
                "darkslateblue": new Color("#483d8b"),
                "darkslategray": new Color("#2f4f4f"),
                "darkturquoise": new Color("#00ced1"),
                "darkviolet": new Color("#9400d3"),
                "deeppink": new Color("#ff1493"),
                "deepskyblue": new Color("#00bfff"),
                "dimgray": new Color("#696969"),
                "dodgerblue": new Color("#1e90ff"),
                "firebrick": new Color("#b22222"),
                "floralwhite": new Color("#fffaf0"),
                "forestgreen": new Color("#228b22"),
                "fuchsia": new Color("#ff00ff"),
                "gainsboro": new Color("#dcdcdc"),
                "ghostwhite": new Color("#f8f8ff"),
                "gold": new Color("#ffd700"),
                "goldenrod": new Color("#daa520"),
                "gray": new Color("#808080"),
                "green": new Color("#008000"),
                "greenyellow": new Color("#adff2f"),
                "honeydew": new Color("#f0fff0"),
                "hotpink": new Color("#ff69b4"),
                "indianred": new Color("#cd5c5c"),
                "indigo": new Color("#4b0082"),
                "ivory": new Color("#fffff0"),
                "khaki": new Color("#f0e68c"),
                "lavender": new Color("#e6e6fa"),
                "lavenderblush": new Color("#fff0f5"),
                "lawngreen": new Color("#7cfc00"),
                "lemonchiffon": new Color("#fffacd"),
                "lightblue": new Color("#add8e6"),
                "lightcoral": new Color("#f08080"),
                "lightcyan": new Color("#e0ffff"),
                "lightgoldenrodyellow": new Color("#fafad2"),
                "lightgray": new Color("#d3d3d3"),
                "lightgrey": new Color("#d3d3d3"),
                "lightgreen": new Color("#90ee90"),
                "lightpink": new Color("#ffb6c1"),
                "lightsalmon": new Color("#ffa07a"),
                "lightseagreen": new Color("#20b2aa"),
                "lightskyblue": new Color("#87cefa"),
                "lightslategray": new Color("#778899"),
                "lightsteelblue": new Color("#b0c4de"),
                "lightyellow": new Color("#ffffe0"),
                "lime": new Color("#00ff00"),
                "limegreen": new Color("#32cd32"),
                "linen": new Color("#faf0e6"),
                "magenta": new Color("#ff00ff"),
                "maroon": new Color("#800000"),
                "mediumaquamarine": new Color("#66cdaa"),
                "mediumblue": new Color("#0000cd"),
                "mediumorchid": new Color("#ba55d3"),
                "mediumpurple": new Color("#9370d8"),
                "mediumseagreen": new Color("#3cb371"),
                "mediumslateblue": new Color("#7b68ee"),
                "mediumspringgreen": new Color("#00fa9a"),
                "mediumturquoise": new Color("#48d1cc"),
                "mediumvioletred": new Color("#c71585"),
                "midnightblue": new Color("#191970"),
                "mintcream": new Color("#f5fffa"),
                "mistyrose": new Color("#ffe4e1"),
                "moccasin": new Color("#ffe4b5"),
                "navajowhite": new Color("#ffdead"),
                "navy": new Color("#000080"),
                "oldlace": new Color("#fdf5e6"),
                "olive": new Color("#808000"),
                "olivedrab": new Color("#6b8e23"),
                "orange": new Color("#ffa500"),
                "orangered": new Color("#ff4500"),
                "orchid": new Color("#da70d6"),
                "palegoldenrod": new Color("#eee8aa"),
                "palegreen": new Color("#98fb98"),
                "paleturquoise": new Color("#afeeee"),
                "palevioletred": new Color("#d87093"),
                "papayawhip": new Color("#ffefd5"),
                "peachpuff": new Color("#ffdab9"),
                "peru": new Color("#cd853f"),
                "pink": new Color("#ffc0cb"),
                "plum": new Color("#dda0dd"),
                "powderblue": new Color("#b0e0e6"),
                "purple": new Color("#800080"),
                "red": new Color("#ff0000"),
                "rosybrown": new Color("#bc8f8f"),
                "royalblue": new Color("#4169e1"),
                "saddlebrown": new Color("#8b4513"),
                "salmon": new Color("#fa8072"),
                "sandybrown": new Color("#f4a460"),
                "seagreen": new Color("#2e8b57"),
                "seashell": new Color("#fff5ee"),
                "sienna": new Color("#a0522d"),
                "silver": new Color("#c0c0c0"),
                "skyblue": new Color("#87ceeb"),
                "slateblue": new Color("#6a5acd"),
                "slategray": new Color("#708090"),
                "snow": new Color("#fffafa"),
                "springgreen": new Color("#00ff7f"),
                "steelblue": new Color("#4682b4"),
                "tan": new Color("#d2b48c"),
                "teal": new Color("#008080"),
                "thistle": new Color("#d8bfd8"),
                "tomato": new Color("#ff6347"),
                "turquoise": new Color("#40e0d0"),
                "violet": new Color("#ee82ee"),
                "wheat": new Color("#f5deb3"),
                "white": new Color("#ffffff"),
                "whitesmoke": new Color("#f5f5f5"),
                "yellow": new Color("#ffff00"),
                "yellowgreen": new Color("#9acd32")
            };
            return Color;
        })();
        Graphics.Color = Color;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape(position, color) {
                var _this = this;
                _super.call(this, position);
                this._type = "Shape";

                this._fillChangeWire = function (color) {
                    _this._State.FillStyle = color.toString();
                };

                this._strokeChangeWire = function (color) {
                    _this._State.StrokeStyle = color.toString();
                };

                this._shadowChangeWire = function (color) {
                    _this._State.ShadowColor = color.toString();
                };

                this.ShadowColor = this._shadowColor = Graphics.Color.Black;
                this.BorderColor = this._strokeStyle = Graphics.Color.Black;

                if (typeof color !== "undefined") {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    this.Color = this._fillStyle = color;
                } else {
                    this.Color = this._fillStyle = Graphics.Color.Black;
                }
            }
            Object.defineProperty(Shape.prototype, "Color", {
                get: function () {
                    return this._fillStyle;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    this._fillStyle.OnChange.Unbind(this._fillChangeWire);
                    this._fillStyle = color;

                    this._fillStyle.OnChange.Bind(this._fillChangeWire);

                    this._fillChangeWire(color);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderThickness", {
                get: function () {
                    return this._State.LineWidth;
                },
                set: function (thickness) {
                    this._State.LineWidth = thickness;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderColor", {
                get: function () {
                    return this._strokeStyle;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
                    this._strokeStyle = color;

                    this._strokeStyle.OnChange.Bind(this._strokeChangeWire);

                    this._strokeChangeWire(color);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowColor", {
                get: function () {
                    return this._shadowColor;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
                    this._shadowColor = color;

                    this._shadowColor.OnChange.Bind(this._shadowChangeWire);

                    this._shadowChangeWire(color);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowX", {
                get: function () {
                    return this._State.ShadowOffsetX;
                },
                set: function (x) {
                    this._State.ShadowOffsetX = x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowY", {
                get: function () {
                    return this._State.ShadowOffsetY;
                },
                set: function (y) {
                    this._State.ShadowOffsetY = y;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowBlur", {
                get: function () {
                    return this._State.ShadowBlur;
                },
                set: function (blur) {
                    this._State.ShadowBlur = blur;
                },
                enumerable: true,
                configurable: true
            });

            Shape.prototype.Border = function (thickness, color) {
                this.BorderThickness = thickness;
                this.BorderColor = color;
            };

            Shape.prototype.Shadow = function (x, y, color, blur) {
                this.ShadowX = x;
                this.ShadowY = y;
                this.ShadowColor = color;
                this.ShadowBlur = blur;
            };

            Shape.prototype._StartDraw = function (context) {
                _super.prototype._StartDraw.call(this, context);
                context.beginPath();
            };

            Shape.prototype._EndDraw = function (context) {
                context.fill();

                if (this._State.LineWidth > 0) {
                    context.stroke();
                } else {
                    context.closePath();
                }

                _super.prototype._EndDraw.call(this, context);
            };

            Shape.prototype._BuildPath = function (context) {
            };

            Shape.prototype.Draw = function (context) {
                this._StartDraw(context);
                this._BuildPath(context);
                this._EndDraw(context);
            };

            Shape.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);

                this._fillStyle.OnChange.Unbind(this._fillChangeWire);
                this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
                this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
            };

            Shape.prototype._Clone = function (graphic) {
                graphic.Border(this.BorderThickness, this.BorderColor.Clone());
                graphic.Shadow(this.ShadowX, this.ShadowY, this.ShadowColor.Clone(), this.ShadowBlur);

                _super.prototype._Clone.call(this, graphic);
            };
            return Shape;
        })(Graphics.Graphic2d);
        Graphics.Shape = Shape;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (FontFamily) {
                FontFamily[FontFamily["Antiqua"] = 0] = "Antiqua";
                FontFamily[FontFamily["Arial"] = 1] = "Arial";
                FontFamily[FontFamily["Avqest"] = 2] = "Avqest";
                FontFamily[FontFamily["Blackletter"] = 3] = "Blackletter";
                FontFamily[FontFamily["Calibri"] = 4] = "Calibri";
                FontFamily[FontFamily["ComicSans"] = 5] = "ComicSans";
                FontFamily[FontFamily["Courier"] = 6] = "Courier";
                FontFamily[FontFamily["Decorative"] = 7] = "Decorative";
                FontFamily[FontFamily["Fraktur"] = 8] = "Fraktur";
                FontFamily[FontFamily["Frosty"] = 9] = "Frosty";
                FontFamily[FontFamily["Garamond"] = 10] = "Garamond";
                FontFamily[FontFamily["Georgia"] = 11] = "Georgia";
                FontFamily[FontFamily["Helvetica"] = 12] = "Helvetica";
                FontFamily[FontFamily["Impact"] = 13] = "Impact";
                FontFamily[FontFamily["Minion"] = 14] = "Minion";
                FontFamily[FontFamily["Modern"] = 15] = "Modern";
                FontFamily[FontFamily["Monospace"] = 16] = "Monospace";
                FontFamily[FontFamily["Palatino"] = 17] = "Palatino";
                FontFamily[FontFamily["Roman"] = 18] = "Roman";
                FontFamily[FontFamily["Script"] = 19] = "Script";
                FontFamily[FontFamily["Swiss"] = 20] = "Swiss";
                FontFamily[FontFamily["TimesNewRoman"] = 21] = "TimesNewRoman";

                FontFamily[FontFamily["Verdana"] = 22] = "Verdana";
            })(Assets.FontFamily || (Assets.FontFamily = {}));
            var FontFamily = Assets.FontFamily;
            ;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (FontVariant) {
                FontVariant[FontVariant["Normal"] = 0] = "Normal";

                FontVariant[FontVariant["SmallCaps"] = 1] = "SmallCaps";
            })(Assets.FontVariant || (Assets.FontVariant = {}));
            var FontVariant = Assets.FontVariant;
            ;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (FontStyle) {
                FontStyle[FontStyle["Normal"] = 0] = "Normal";
                FontStyle[FontStyle["Italic"] = 1] = "Italic";

                FontStyle[FontStyle["Oblique"] = 2] = "Oblique";
            })(Assets.FontStyle || (Assets.FontStyle = {}));
            var FontStyle = Assets.FontStyle;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            var FontSettings = (function () {
                function FontSettings() {
                    this._cachedState = {
                        fontSize: "10px",
                        fontFamily: Assets.FontFamily.TimesNewRoman,
                        fontVariant: Assets.FontVariant.Normal,
                        fontWeight: "",
                        fontStyle: Assets.FontStyle.Normal
                    };

                    this._refreshCache = true;
                    this._BuildFont();
                }
                Object.defineProperty(FontSettings.prototype, "FontSize", {
                    get: function () {
                        return this._cachedState["fontSize"];
                    },
                    set: function (size) {
                        this._refreshCache = true;
                        this._cachedState["fontSize"] = size;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontFamily", {
                    get: function () {
                        return this._cachedState["fontFamily"];
                    },
                    set: function (family) {
                        this._refreshCache = true;
                        this._cachedState["fontFamily"] = family;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontVariant", {
                    get: function () {
                        return this._cachedState["fontVariant"];
                    },
                    set: function (variant) {
                        this._refreshCache = true;
                        this._cachedState["fontVariant"] = variant;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontWeight", {
                    get: function () {
                        return this._cachedState["fontWeight"];
                    },
                    set: function (weight) {
                        this._refreshCache = true;
                        this._cachedState["fontWeight"] = weight;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontStyle", {
                    get: function () {
                        return this._cachedState["fontStyle"];
                    },
                    set: function (style) {
                        this._refreshCache = true;
                        this._cachedState["fontStyle"] = style;
                    },
                    enumerable: true,
                    configurable: true
                });

                FontSettings.prototype._BuildFont = function () {
                    var font;

                    if (this._refreshCache) {
                        font = this._cachedState["fontWeight"] + " " + Assets.FontStyle[this._cachedState["fontStyle"]].replace("Normal", "") + " " + Assets.FontVariant[this._cachedState["fontVariant"]].replace("Normal", "") + " " + this._cachedState["fontSize"];

                        if (this._cachedState["fontFamily"] !== undefined) {
                            font += " " + Assets.FontFamily[this._cachedState["fontFamily"]];
                        }

                        this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        this._refreshCache = false;
                    }

                    return this._cachedFont;
                };
                return FontSettings;
            })();
            Assets.FontSettings = FontSettings;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Text2d = (function (_super) {
            __extends(Text2d, _super);
            function Text2d(x, y, text, color) {
                if (typeof color === "undefined") { color = Graphics.Color.Black; }
                _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Text2d";

                this._text = text;

                this._drawBounds = new EndGate.Bounds.BoundingRectangle(this.Position, EndGate.Size2d.One);
                this._recalculateBoundsSize = true;

                this._fontSettings = new Graphics.Assets.FontSettings();
                this.Align = "center";
                this.Baseline = "middle";
            }
            Object.defineProperty(Text2d.prototype, "Align", {
                get: function () {
                    return this._State.TextAlign;
                },
                set: function (alignment) {
                    this._State.TextAlign = alignment;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Baseline", {
                get: function () {
                    return this._State.TextBaseline;
                },
                set: function (baseline) {
                    this._State.TextBaseline = baseline;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "FontSettings", {
                get: function () {
                    this._recalculateBoundsSize = true;

                    return this._fontSettings;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Text", {
                get: function () {
                    return this._text;
                },
                set: function (text) {
                    this._recalculateBoundsSize = true;
                    this._text = text;
                },
                enumerable: true,
                configurable: true
            });

            Text2d.prototype._StartDraw = function (context) {
                context.save();
                this._State.SetContextState(context);

                context.translate(this.Position.X, this.Position.Y);

                if (this.Rotation !== 0) {
                    context.rotate(this.Rotation);
                }
            };

            Text2d.prototype._EndDraw = function (context) {
                var children = this.GetChildren();

                for (var i = 0; i < children.length; i++) {
                    if (children[i].Visible) {
                        children[i].Draw(context);
                    }
                }

                context.restore();
            };

            Text2d.prototype.Draw = function (context) {
                var textSize;

                this._State.Font = this._fontSettings._BuildFont();

                this._StartDraw(context);

                context.fillText(this._text, 0, 0);
                if (this._State.LineWidth > 0) {
                    context.strokeText(this._text, 0, 0);
                }

                if (this._recalculateBoundsSize) {
                    this._recalculateBoundsSize = false;
                    textSize = context.measureText(this._text);
                    this._drawBounds.Size.Width = textSize.width;
                    this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
                }

                this._EndDraw(context);
            };

            Text2d.prototype.GetDrawBounds = function () {
                this._drawBounds.Rotation = this.Rotation;
                this._drawBounds.Position = this.Position;

                return this._drawBounds;
            };

            Text2d.prototype.Scale = function (scale) {
                var size = parseInt(this.FontSettings.FontSize);

                this.FontSettings.FontSize = this.FontSettings.FontSize.replace(size.toString(), (size * scale).toString());
            };

            Text2d.prototype.Clone = function () {
                var graphic = new Text2d(this.Position.X, this.Position.Y, this.Text, this.Color.Clone());

                graphic.Align = this.Align;
                graphic.Baseline = this.Baseline;
                graphic.FontSettings.FontFamily = this.FontSettings.FontFamily;
                graphic.FontSettings.FontSize = this.FontSettings.FontSize;
                graphic.FontSettings.FontStyle = this.FontSettings.FontStyle;
                graphic.FontSettings.FontVariant = this.FontSettings.FontVariant;
                graphic.FontSettings.FontWeight = this.FontSettings.FontWeight;

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };
            return Text2d;
        })(Graphics.Shape);
        Graphics.Text2d = Text2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Sprite2d = (function (_super) {
            __extends(Sprite2d, _super);
            function Sprite2d(x, y, image, width, height) {
                if (typeof width === "undefined") { width = image.ClipSize.Width; }
                if (typeof height === "undefined") { height = image.ClipSize.Height; }
                _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Sprite2d";

                this.Image = image;
                this.Size = new EndGate.Size2d(width, height);
            }
            Sprite2d.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, -this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);

                _super.prototype._EndDraw.call(this, context);
            };

            Sprite2d.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Sprite2d.prototype.Scale = function (scale) {
                this.Size.Width *= scale;
                this.Size.Height *= scale;
            };

            Sprite2d.prototype.Clone = function () {
                var graphic = new Sprite2d(this.Position.X, this.Position.Y, this.Image.Clone(), this.Size.Width, this.Size.Height);

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };
            return Sprite2d;
        })(Graphics.Graphic2d);
        Graphics.Sprite2d = Sprite2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var SpriteAnimation = (function () {
            function SpriteAnimation(imageSource, fps, frameSize, frameCount, startOffset) {
                if (typeof startOffset === "undefined") { startOffset = EndGate.Vector2d.Zero; }
                var _this = this;
                this._imageSource = imageSource;
                this._frameSize = frameSize;
                this._frameCount = frameCount;
                this._startOffset = startOffset;
                this._playing = false;
                this._repeating = false;
                this._currentFrame = 0;
                this._lastStepAt = 0;

                this._onComplete = new EndGate.EventHandler();

                this.Fps = fps;

                if (imageSource.ClipSize !== null || imageSource.IsLoaded()) {
                    this._framesPerRow = Math.min(Math.floor((imageSource.ClipSize.Width - startOffset.X) / frameSize.Width), frameCount);
                } else {
                    imageSource.OnLoaded.BindFor(function (image) {
                        _this._framesPerRow = Math.min(Math.floor((imageSource.ClipSize.Width - startOffset.X) / frameSize.Width), frameCount);
                    }, 1);

                    this._framesPerRow = 1;
                }
            }
            Object.defineProperty(SpriteAnimation.prototype, "OnComplete", {
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SpriteAnimation.prototype, "Fps", {
                get: function () {
                    return this._fps;
                },
                set: function (newFps) {
                    this._fps = newFps;
                    this._stepEvery = 1000 / this._fps;
                },
                enumerable: true,
                configurable: true
            });

            SpriteAnimation.prototype.IsPlaying = function () {
                return this._playing;
            };

            SpriteAnimation.prototype.CanPlay = function () {
                return this._imageSource.IsLoaded();
            };

            SpriteAnimation.prototype.Play = function (repeat) {
                if (typeof repeat === "undefined") { repeat = false; }
                if (!this._imageSource.ClipSize) {
                    throw new Error("Image source not loaded yet.");
                }

                this._lastStepAt = new Date().getTime();
                this._repeating = repeat;
                this._playing = true;
                this.UpdateImageSource();
            };

            SpriteAnimation.prototype.Pause = function () {
                this._playing = false;
            };

            SpriteAnimation.prototype.Step = function (count) {
                if (typeof count === "undefined") { count = 1; }
                this._currentFrame += count;

                if (this._currentFrame >= this._frameCount) {
                    if (this._repeating) {
                        this._currentFrame %= this._frameCount;
                    } else {
                        this._currentFrame = this._frameCount - 1;
                        this.OnComplete.Trigger();
                        this.Stop(false);
                    }
                }

                if (count !== 0) {
                    this.UpdateImageSource();
                }
            };

            SpriteAnimation.prototype.Stop = function (resetFrame) {
                if (typeof resetFrame === "undefined") { resetFrame = true; }
                this._playing = false;
                if (resetFrame) {
                    this.Reset();
                }
            };

            SpriteAnimation.prototype.Reset = function () {
                this._currentFrame = 0;
                this.UpdateImageSource();
            };

            SpriteAnimation.prototype.Update = function (gameTime) {
                var timeSinceStep = gameTime.Now.getTime() - this._lastStepAt, stepCount = 0;

                if (this._playing) {
                    stepCount = Math.floor(timeSinceStep / this._stepEvery);
                    if (stepCount > 0) {
                        this._lastStepAt = gameTime.Now.getTime();
                        this.Step(stepCount);
                    }
                }
            };

            SpriteAnimation.prototype.Dispose = function () {
                this._onComplete.Dispose();
            };

            SpriteAnimation.prototype.UpdateImageSource = function () {
                var row = this.GetFrameRow(), column = this.GetFrameColumn();

                this._imageSource.ClipLocation.X = this._startOffset.X + column * this._frameSize.Width;
                this._imageSource.ClipLocation.Y = this._startOffset.Y + row * this._frameSize.Height;
                this._imageSource.ClipSize = this._frameSize;
            };

            SpriteAnimation.prototype.GetFrameRow = function () {
                return Math.floor(this._currentFrame / this._framesPerRow);
            };

            SpriteAnimation.prototype.GetFrameColumn = function () {
                return Math.ceil(this._currentFrame % this._framesPerRow);
            };
            return SpriteAnimation;
        })();
        Graphics.SpriteAnimation = SpriteAnimation;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Circle = (function (_super) {
            __extends(Circle, _super);
            function Circle(x, y, radius, color) {
                _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Circle";

                this.Radius = radius;
            }
            Circle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingCircle(this.Position, this.Radius);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Circle.prototype.Scale = function (scale) {
                this.Radius *= scale;
            };

            Circle.prototype.Clone = function () {
                var graphic = new Circle(this.Position.X, this.Position.Y, this.Radius, this.Color.Clone());

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };

            Circle.prototype._BuildPath = function (context) {
                context.arc(0, 0, this.Radius, 0, (Math).twoPI);
            };
            return Circle;
        })(Graphics.Shape);
        Graphics.Circle = Circle;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(x, y, width, height, color) {
                _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Rectangle";

                this.Size = new EndGate.Size2d(width, height);
            }
            Rectangle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Rectangle.prototype.Scale = function (scale) {
                this.Size.Width *= scale;
                this.Size.Height *= scale;
            };

            Rectangle.prototype.Clone = function () {
                var graphic = new Rectangle(this.Position.X, this.Position.Y, this.Size.Width, this.Size.Height, this.Color.Clone());

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };

            Rectangle.prototype._BuildPath = function (context) {
                context.rect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
            };
            return Rectangle;
        })(Graphics.Shape);
        Graphics.Rectangle = Rectangle;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Line2d = (function (_super) {
            __extends(Line2d, _super);
            function Line2d(fromX, fromY, toX, toY, lineWidth, color) {
                if (typeof lineWidth === "undefined") { lineWidth = 1; }
                var _this = this;
                _super.call(this, EndGate.Vector2d.Zero);
                this._type = "Line2d";

                this._from = new EndGate.Vector2d(fromX, fromY);
                this._to = new EndGate.Vector2d(toX, toY);
                this.LineWidth = lineWidth;
                this.UpdatePosition();

                this._strokeChangeWire = function (color) {
                    _this._State.StrokeStyle = color.toString();
                };

                if (typeof color !== "undefined") {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }
                    this.Color = this._strokeStyle = color;
                } else {
                    this.Color = this._strokeStyle = Graphics.Color.Black;
                }
            }
            Object.defineProperty(Line2d.prototype, "From", {
                get: function () {
                    return this._from;
                },
                set: function (newPosition) {
                    this._from = newPosition;
                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "To", {
                get: function () {
                    return this._to;
                },
                set: function (newPosition) {
                    this._to = newPosition;
                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "Color", {
                get: function () {
                    return this._strokeStyle;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
                    this._strokeStyle = color;

                    this._strokeStyle.OnChange.Bind(this._strokeChangeWire);

                    this._strokeChangeWire(color);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "LineWidth", {
                get: function () {
                    return this._State.LineWidth;
                },
                set: function (width) {
                    this._State.LineWidth = width;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "LineCap", {
                get: function () {
                    return this._State.LineCap;
                },
                set: function (cap) {
                    this._State.LineCap = cap;
                },
                enumerable: true,
                configurable: true
            });

            Line2d.prototype.Draw = function (context) {
                if (this._strokeStyle.toString() !== this._State.StrokeStyle) {
                    this._State.StrokeStyle = this._strokeStyle.toString();
                }

                _super.prototype._StartDraw.call(this, context);

                if (!this._cachedPosition.Equivalent(this.Position)) {
                    this.RefreshCache();
                }

                context.beginPath();
                context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
                context.stroke();

                _super.prototype._EndDraw.call(this, context);
            };

            Line2d.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, new EndGate.Size2d(this._boundsWidth, this.LineWidth));

                bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

                return bounds;
            };

            Line2d.prototype.Scale = function (scale) {
                this.From = this.Position.Add(this.From.Subtract(this.Position).Multiply(scale));
                this.To = this.Position.Add(this.To.Subtract(this.Position).Multiply(scale));
            };

            Line2d.prototype.Clone = function () {
                var graphic = new Line2d(this.From.X, this.From.Y, this.To.X, this.To.Y, this.LineWidth, this.Color.Clone());

                graphic.LineCap = this.LineCap;

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };

            Line2d.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);

                this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
            };

            Line2d.prototype.UpdatePosition = function () {
                this.Position = ((this._from.Add(this._to)).Divide(2));
                this._difference = this._to.Subtract(this._from);
                this._boundsWidth = this._from.Distance(this._to).Length();
                this._cachedPosition = this.Position.Clone();
            };

            Line2d.prototype.RefreshCache = function () {
                var difference = this.Position.Subtract(this._cachedPosition);
                this._from.X += difference.X;
                this._from.Y += difference.Y;
                this._to.X += difference.X;
                this._to.Y += difference.Y;
                this._cachedPosition = this.Position.Clone();
            };
            return Line2d;
        })(Graphics.Graphic2d);
        Graphics.Line2d = Line2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Grid = (function (_super) {
            __extends(Grid, _super);
            function Grid(x, y, rows, columns, tileWidth, tileHeight, drawGridLines, gridLineColor) {
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                if (typeof gridLineColor === "undefined") { gridLineColor = new Graphics.Color("gray"); }
                _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Grid";

                this._size = new EndGate.Size2d(tileWidth * columns, tileHeight * rows);
                this._tileSize = new EndGate.Size2d(tileWidth, tileHeight);
                this._grid = [];
                this._rows = rows;
                this._columns = columns;
                this._gridLines = [];
                this.GridLineColor = gridLineColor;
                this.DrawGridLines = drawGridLines;

                for (var i = 0; i < this._rows; i++) {
                    this._grid[i] = [];

                    for (var j = 0; j < this._columns; j++) {
                        this._grid[i].push(null);
                    }
                }
            }
            Object.defineProperty(Grid.prototype, "DrawGridLines", {
                get: function () {
                    return this._drawGridLines;
                },
                set: function (shouldDraw) {
                    if (shouldDraw && this._gridLines.length === 0) {
                        this.BuildGridLines();
                    }

                    this._drawGridLines = shouldDraw;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "GridLineColor", {
                get: function () {
                    return this._gridLineColor;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }
                    this._gridLineColor = color;

                    for (var i = 0; i < this._gridLines.length; i++) {
                        this._gridLines[i].Color = color;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Size", {
                get: function () {
                    return this._size.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "TileSize", {
                get: function () {
                    return this._tileSize.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Rows", {
                get: function () {
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Columns", {
                get: function () {
                    return this._columns;
                },
                enumerable: true,
                configurable: true
            });

            Grid.prototype.Fill = function (row, column, graphic) {
                if (!graphic || !this.ValidRow(row) || !this.ValidColumn(column)) {
                    return;
                }

                graphic.Position = this.GetInsideGridPosition(row, column);

                this._grid[row][column] = graphic;
                this.AddChild(graphic);
            };

            Grid.prototype.FillRow = function (row, graphicList, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var graphic;

                for (var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(row, i + columnOffset);

                    this._grid[row][i + columnOffset] = graphic;
                    this.AddChild(graphic);
                }
            };

            Grid.prototype.FillColumn = function (column, graphicList, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var graphic;

                for (var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(i + rowOffset, column);

                    this._grid[i + rowOffset][column] = graphic;
                    this.AddChild(graphic);
                }
            };

            Grid.prototype.FillSpace = function (row, column, graphicList) {
                var graphic;

                for (var i = 0; i < graphicList.length; i++) {
                    for (var j = 0; j < graphicList[i].length; j++) {
                        graphic = graphicList[i][j];
                        if (graphic) {
                            graphic.Position = this.GetInsideGridPosition(i + row, j + column);

                            this._grid[i + row][j + column] = graphic;
                            this.AddChild(graphic);
                        }
                    }
                }
            };

            Grid.prototype.Get = function (row, column) {
                if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return null;
                }

                return this._grid[row][column];
            };

            Grid.prototype.GetRow = function (row, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var rowList = [];

                for (var i = columnOffset; i < this._columns; i++) {
                    rowList.push(this._grid[row][i]);
                }

                return rowList;
            };

            Grid.prototype.GetColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var columnList = [];

                for (var i = rowOffset; i < this._rows; i++) {
                    columnList.push(this._grid[i][column]);
                }

                return columnList;
            };

            Grid.prototype.GetSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

                for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                    if (i >= this._rows) {
                        break;
                    }

                    for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                        if (j >= this._columns) {
                            break;
                        }

                        space.push(this._grid[i][j]);
                    }
                }

                return space;
            };

            Grid.prototype.Clear = function (row, column) {
                if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return null;
                }

                var val = this._grid[row][column];

                this._grid[row][column] = null;
                this.RemoveChild(val);

                return val;
            };

            Grid.prototype.ClearRow = function (row, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var vals = [];

                for (var i = 0; i < this._columns; i++) {
                    vals.push(this._grid[row][i]);
                    this.RemoveChild(this._grid[row][i]);
                    this._grid[row][i] = null;
                }

                return vals;
            };

            Grid.prototype.ClearColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var vals = [];

                for (var i = 0; i < this._rows; i++) {
                    vals.push(this._grid[i][column]);
                    this.RemoveChild(this._grid[i][column]);
                    this._grid[i][column] = null;
                }

                return vals;
            };

            Grid.prototype.ClearSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

                for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                    if (i > this._rows) {
                        break;
                    }

                    for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                        if (j > this._columns) {
                            break;
                        }

                        space.push(this._grid[i][j]);
                        this.RemoveChild(this._grid[i][j]);
                        this._grid[i][j] = null;
                    }
                }

                return space;
            };

            Grid.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                context.save();
                _super.prototype._EndDraw.call(this, context);

                if (this.DrawGridLines) {
                    for (var i = 0; i < this._gridLines.length; i++) {
                        this._gridLines[i].Draw(context);
                    }
                }
                context.restore();
            };

            Grid.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this._size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Grid.prototype.Scale = function (scale) {
                throw new Error("Scale is not implemented for the Grid class.");
            };

            Grid.prototype.ConvertToRow = function (y) {
                return Math.floor((y - (this.Position.Y - this._size.HalfHeight)) / this._tileSize.Height);
            };

            Grid.prototype.ConvertToColumn = function (x) {
                return Math.floor((x - (this.Position.X - this._size.HalfWidth)) / this._tileSize.Width);
            };

            Grid.prototype.Clone = function () {
                var graphic = new Grid(this.Position.X, this.Position.Y, this._rows, this._columns, this._tileSize.Width, this._tileSize.Height, this._drawGridLines, this._gridLineColor.Clone());

                for (var i = 0; i < this._grid.length; i++) {
                    for (var j = 0; j < this._grid[i].length; j++) {
                        if (this._grid[i][j]) {
                            graphic.Fill(i, j, this._grid[i][j].Clone());
                        }
                    }
                }

                graphic.Opacity = this.Opacity;
                graphic.Rotation = this.Rotation;
                graphic.Visible = this.Visible;
                graphic.ZIndex = this.ZIndex;

                return graphic;
            };

            Grid.prototype.BuildGridLines = function () {
                var halfSize = this._size.Multiply(.5), topLeft = new EndGate.Vector2d(-halfSize.Width, -halfSize.Height), bottomRight = new EndGate.Vector2d(halfSize.Width, halfSize.Height);

                for (var i = 0; i < this._rows; i++) {
                    this._gridLines.push(new Graphics.Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1, this._gridLineColor));

                    if (i === 0) {
                        for (var j = 0; j < this._columns; j++) {
                            this._gridLines.push(new Graphics.Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1, this._gridLineColor));
                        }
                    }
                }

                this._gridLines.push(new Graphics.Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
                this._gridLines.push(new Graphics.Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));
            };

            Grid.prototype.GetInsideGridPosition = function (row, column) {
                return new EndGate.Vector2d(column * this._tileSize.Width - this._size.HalfWidth + this._tileSize.HalfWidth, row * this._tileSize.Height - this._size.HalfHeight + this._tileSize.HalfHeight);
            };

            Grid.prototype.ValidRow = function (row) {
                return row >= 0 && row < this._rows;
            };

            Grid.prototype.ValidColumn = function (column) {
                return column >= 0 && column < this._columns;
            };
            return Grid;
        })(Graphics.Graphic2d);
        Graphics.Grid = Grid;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var Matrix2x2 = (function () {
        function Matrix2x2(topLeft, topRight, botLeft, botRight) {
            if (typeof topLeft === "undefined") { topLeft = 0; }
            if (typeof topRight === "undefined") { topRight = 0; }
            if (typeof botLeft === "undefined") { botLeft = 0; }
            if (typeof botRight === "undefined") { botRight = 0; }
            this._type = "Matrix2x2";
            this.Values = [
                [topLeft, topRight],
                [botLeft, botRight]
            ];
        }
        Object.defineProperty(Matrix2x2, "Zero", {
            get: function () {
                return new Matrix2x2();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Matrix2x2, "Identity", {
            get: function () {
                return new Matrix2x2(1, 0, 0, 1);
            },
            enumerable: true,
            configurable: true
        });

        Matrix2x2.prototype.Apply = function (action) {
            this.Values[0][0] = action(this.Values[0][0]);
            this.Values[0][1] = action(this.Values[0][1]);
            this.Values[1][0] = action(this.Values[1][0]);
            this.Values[1][1] = action(this.Values[1][1]);
        };

        Matrix2x2.prototype.Trigger = function (action) {
            action(this.Values[0][0]);
            action(this.Values[0][1]);
            action(this.Values[1][0]);
            action(this.Values[1][1]);
        };

        Matrix2x2.prototype.Add = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] + val.Values[0][0], this.Values[0][1] + val.Values[0][1], this.Values[1][0] + val.Values[1][0], this.Values[1][1] + val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] + val, this.Values[0][1] + val, this.Values[1][0] + val, this.Values[1][1] + val);
            }
        };

        Matrix2x2.prototype.Multiply = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] * val.Values[0][0] + this.Values[0][1] * val.Values[1][0], this.Values[0][0] * val.Values[0][1] + this.Values[0][1] * val.Values[1][1], this.Values[1][0] * val.Values[0][0] + this.Values[1][1] * val.Values[1][0], this.Values[1][0] * val.Values[0][1] + this.Values[1][1] * val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] * val, this.Values[0][1] * val, this.Values[1][0] * val, this.Values[1][1] * val);
            }
        };

        Matrix2x2.prototype.Subtract = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] - val.Values[0][0], this.Values[0][1] - val.Values[0][1], this.Values[1][0] - val.Values[1][0], this.Values[1][1] - val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] - val, this.Values[0][1] - val, this.Values[1][0] - val, this.Values[1][1] - val);
            }
        };

        Matrix2x2.prototype.SubtractFrom = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] - this.Values[0][0], val.Values[0][1] - this.Values[0][1], val.Values[1][0] - this.Values[1][0], val.Values[1][1] - this.Values[1][1]);
            } else {
                return new Matrix2x2(val - this.Values[0][0], val - this.Values[0][1], val - this.Values[1][0], val - this.Values[1][1]);
            }
        };

        Matrix2x2.prototype.Divide = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] / val.Values[0][0], this.Values[0][1] / val.Values[0][1], this.Values[1][0] / val.Values[1][0], this.Values[1][1] / val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] / val, this.Values[0][1] / val, this.Values[1][0] / val, this.Values[1][1] / val);
            }
        };

        Matrix2x2.prototype.DivideFrom = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] / this.Values[0][0], val.Values[0][1] / this.Values[0][1], val.Values[1][0] / this.Values[1][0], val.Values[1][1] / this.Values[1][1]);
            } else {
                return new Matrix2x2(val / this.Values[0][0], val / this.Values[0][1], val / this.Values[1][0], val / this.Values[1][1]);
            }
        };

        Matrix2x2.prototype.Transform = function (vector) {
            return new EndGate.Vector2d(this.Values[0][0] * vector.X + this.Values[0][1] * vector.Y, this.Values[1][0] * vector.X + this.Values[1][1] * vector.Y);
        };

        Matrix2x2.prototype.Transpose = function () {
            return new Matrix2x2(this.Values[0][0], this.Values[1][0], this.Values[0][1], this.Values[1][1]);
        };

        Matrix2x2.prototype.Determinant = function () {
            return this.Values[0][0] * this.Values[1][1] - this.Values[0][1] * this.Values[1][0];
        };

        Matrix2x2.prototype.Inverse = function () {
            return new Matrix2x2(this.Values[1][1], -this.Values[0][1], -this.Values[1][0], this.Values[0][0]).Multiply(1 / this.Determinant());
        };

        Matrix2x2.prototype.Clone = function () {
            return new Matrix2x2(this.Values[0][0], this.Values[0][1], this.Values[1][0], this.Values[1][1]);
        };

        Matrix2x2.prototype.Equivalent = function (matrix) {
            return this.Values[0][0] === matrix.Values[0][0] && this.Values[0][1] === matrix.Values[0][1] && this.Values[1][0] === matrix.Values[1][0] && this.Values[1][1] === matrix.Values[1][1];
        };

        Matrix2x2.prototype.toString = function () {
            return this.Values[0].toString() + " " + this.Values[1].toString();
        };

        Matrix2x2.Scale = function (vector) {
            return new Matrix2x2(vector.X, 0, 0, vector.Y);
        };
        return Matrix2x2;
    })();
    EndGate.Matrix2x2 = Matrix2x2;
})(EndGate || (EndGate = {}));

function asyncLoop(action, count, onComplete) {
    ((function loop(index) {
        if (index < count) {
            action(function () {
                loop(index + 1);
            }, index);
        } else if (onComplete) {
            onComplete();
        }
    })(0));
}

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var TileMap = (function (_super) {
            __extends(TileMap, _super);
            function TileMap(x, y, resources) {
                _super.call(this, new EndGate.Vector2d(x, y));

                this._Resources = resources;
            }
            TileMap.prototype.Scale = function (scale) {
                throw new Error("Scale is not implemented for TileMaps.");
            };
            return TileMap;
        })(EndGate.Graphics.Graphic2d);
        Graphics.TileMap = TileMap;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            var SquareTile = (function (_super) {
                __extends(SquareTile, _super);
                function SquareTile(image, width, height) {
                    _super.call(this, 0, 0, image, width, height);
                }
                return SquareTile;
            })(EndGate.Graphics.Sprite2d);
            Assets.SquareTile = SquareTile;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var SquareTileMap = (function (_super) {
            __extends(SquareTileMap, _super);
            function SquareTileMap(x, y, tileWidth, tileHeight, resources, mappings, staticMap, drawGridLines) {
                if (typeof staticMap === "undefined") { staticMap = true; }
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                var _this = this;
                _super.call(this, x, y, resources);

                this._mappings = mappings;
                this._grid = new EndGate.Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
                this._staticMap = staticMap;
                this._onTileLoad = new EndGate.EventHandler2();
                this._onLoaded = new EndGate.EventHandler();
                this._loaded = false;
                this._tilesBuilt = 0;
                this._totalTiles = this._grid.Rows * this._grid.Columns;
                this.TileLoadDelay = EndGate.TimeSpan.Zero;
                this.RowLoadDelay = EndGate.TimeSpan.Zero;

                if (this._staticMap) {
                    this.BuildCache();
                }

                setTimeout(function () {
                    _this.FillGridWith(mappings, function () {
                        _this._loaded = true;
                        _this._onLoaded.Trigger();
                    });
                }, 0);
            }
            Object.defineProperty(SquareTileMap.prototype, "OnTileLoad", {
                get: function () {
                    return this._onTileLoad;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SquareTileMap.prototype, "OnLoaded", {
                get: function () {
                    return this._onLoaded;
                },
                enumerable: true,
                configurable: true
            });

            SquareTileMap.ExtractTiles = function (imageSource, tileWidth, tileHeight) {
                var resources = [], framesPerRow = Math.floor(imageSource.ClipSize.Width / tileWidth), rows = Math.floor(imageSource.ClipSize.Height / tileHeight);

                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < framesPerRow; j++) {
                        resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                    }
                }

                return resources;
            };

            SquareTileMap.prototype.IsLoaded = function () {
                return this._loaded;
            };

            SquareTileMap.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                if (!this._staticMap) {
                    this._grid.Draw(context);
                } else {
                    context.drawImage(this._mapCache, -this._mapCache.width / 2, -this._mapCache.height / 2);
                }

                _super.prototype._EndDraw.call(this, context);
            };

            SquareTileMap.prototype.GetDrawBounds = function () {
                var bounds = this._grid.GetDrawBounds();

                bounds.Position = this.Position;

                return bounds;
            };

            SquareTileMap.prototype.Dispose = function () {
                this._grid.Dispose();

                this._onLoaded.Dispose();
                this._onTileLoad.Dispose();
                _super.prototype.Dispose.call(this);
            };

            SquareTileMap.prototype.Clone = function () {
                var graphic = new SquareTileMap(this.Position.X, this.Position.Y, this._grid.TileSize.Width, this._grid.TileSize.Height, this._Resources, this._mappings);

                graphic.Opacity = this.Opacity;
                graphic.Rotation = this.Rotation;
                graphic.Visible = this.Visible;
                graphic.ZIndex = this.ZIndex;
                graphic.RowLoadDelay = this.RowLoadDelay.Clone();
                graphic.TileLoadDelay = this.TileLoadDelay.Clone();

                return graphic;
            };

            SquareTileMap.prototype.BuildCache = function () {
                var size = this._grid.Size, originalPosition = this._grid.Position;

                this._mapCache = document.createElement("canvas");
                this._mapCache.width = size.Width;
                this._mapCache.height = size.Height;
                this._mapCacheContext = this._mapCache.getContext("2d");
                this._mapCacheContext.translate(size.HalfWidth, size.HalfHeight);
            };

            SquareTileMap.prototype.CacheTile = function (tile) {
                tile.Draw(this._mapCacheContext);
            };

            SquareTileMap.prototype.FillGridWith = function (mappings, onComplete) {
                var _this = this;
                asyncLoop(function (next, rowsComplete) {
                    _this.AsyncBuildGridRow(rowsComplete, mappings, function () {
                        next();
                    });
                }, mappings.length, function () {
                    onComplete();
                });
            };

            SquareTileMap.prototype.AsyncBuildGridTile = function (row, column, resourceIndex, onComplete) {
                var _this = this;
                var action = function () {
                    var tile, tileGraphic = _this._Resources[resourceIndex];

                    tile = new Graphics.Assets.SquareTile(tileGraphic, _this._grid.TileSize.Width, _this._grid.TileSize.Height);

                    _this._grid.Fill(row, column, tile);

                    _this.OnTileLoad.Trigger({
                        Tile: tile,
                        Row: row,
                        Column: column,
                        ResourceIndex: resourceIndex,
                        Parent: _this
                    }, _this._tilesBuilt / _this._totalTiles);

                    if (_this._staticMap) {
                        _this.CacheTile(tile);
                    }

                    onComplete(tile);
                };

                if (this.TileLoadDelay.Milliseconds > 0) {
                    setTimeout(action, this.TileLoadDelay.Milliseconds);
                } else {
                    action();
                }
            };

            SquareTileMap.prototype.AsyncBuildGridRow = function (rowIndex, mappings, onComplete) {
                var _this = this;
                setTimeout(function () {
                    asyncLoop(function (next, tilesLoaded) {
                        _this._tilesBuilt++;

                        if (mappings[rowIndex][tilesLoaded] >= 0) {
                            _this.AsyncBuildGridTile(rowIndex, tilesLoaded, mappings[rowIndex][tilesLoaded], function (tile) {
                                next();
                            });
                        } else {
                            next();
                        }
                    }, mappings[rowIndex].length, function () {
                        onComplete();
                    });
                }, this.RowLoadDelay.Milliseconds);
            };
            return SquareTileMap;
        })(Graphics.TileMap);
        Graphics.SquareTileMap = SquareTileMap;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var eg = EndGate;

Number.prototype.Clone = function () {
    return this;
};

var EndGate;
(function (EndGate) {
    (function (MapLoaders) {
        (function (JSONFormat) {
            JSONFormat[JSONFormat["TMX"] = 0] = "TMX";
        })(MapLoaders.JSONFormat || (MapLoaders.JSONFormat = {}));
        var JSONFormat = MapLoaders.JSONFormat;
    })(EndGate.MapLoaders || (EndGate.MapLoaders = {}));
    var MapLoaders = EndGate.MapLoaders;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (MapLoaders) {
        (function (_) {
            (function (TMX) {
                var OrthogonalLoader = (function () {
                    function OrthogonalLoader() {
                    }
                    OrthogonalLoader.prototype.Load = function (data, propertyHooks, onComplete) {
                        var _this = this;
                        var percent = 0, tileCount = 0, onPartialLoad = new EndGate.EventHandler1();

                        this.LoadTilesetSources(data.tilesets, function (tileset) {
                            percent += (1 / data.tilesets.length) * OrthogonalLoader._imagePercentMax;

                            onPartialLoad.Trigger(percent);
                        }, function (tilesetSources) {
                            var resources = _this.ExtractTilesetTiles(data.tilesets, tilesetSources, propertyHooks), mappings, layers = new Array(), layerPercentValue = (1 - OrthogonalLoader._imagePercentMax) / data.layers.length;

                            percent = OrthogonalLoader._imagePercentMax;

                            asyncLoop(function (next, i) {
                                if (data.layers[i].type !== "tilelayer") {
                                    throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                                }

                                _this.AsyncBuildLayer(data, i, propertyHooks, resources, function (details, percentLoaded) {
                                    onPartialLoad.Trigger(percent + percentLoaded * layerPercentValue);
                                }, function (layer) {
                                    percent += layerPercentValue;

                                    onPartialLoad.Trigger(percent);

                                    layers.push(layer);

                                    next();
                                });
                            }, data.layers.length, function () {
                                onComplete({
                                    Layers: layers
                                });
                            });
                        });

                        for (var i = 0; i < data.layers.length; i++) {
                            tileCount += data.layers[i].data.length;
                        }

                        return {
                            TileCount: tileCount,
                            LayerCount: data.layers.length,
                            ResourceSheetCount: data.tilesets.length,
                            OnPercentLoaded: onPartialLoad
                        };
                    };

                    OrthogonalLoader.prototype.LoadTilesetSources = function (tilesets, onTilesetLoad, onComplete) {
                        var tilesetSources = {}, loadedCount = 0, onLoaded = function (source) {
                            onTilesetLoad(source);

                            if (++loadedCount === tilesets.length) {
                                onComplete(tilesetSources);
                            }
                        };

                        for (var i = 0; i < tilesets.length; i++) {
                            tilesetSources[tilesets[i].name] = new EndGate.Graphics.ImageSource(tilesets[i].image, tilesets[i].imagewidth, tilesets[i].imageheight);
                            tilesetSources[tilesets[i].name].OnLoaded.Bind(onLoaded);
                        }
                    };

                    OrthogonalLoader.prototype.ExtractTilesetTiles = function (tilesets, tilesetSources, propertyHooks) {
                        var tilesetTiles = new Array(), resourceHooks = new Array(), sources, index;

                        tilesets.sort(function (a, b) {
                            return a.firstgid - b.firstgid;
                        });

                        for (var i = 0; i < tilesets.length; i++) {
                            sources = EndGate.Graphics.SquareTileMap.ExtractTiles(tilesetSources[tilesets[i].name], tilesets[i].tilewidth, tilesets[i].tileheight);

                            for (var property in tilesets[i].properties) {
                                if (typeof propertyHooks.ResourceSheetHooks[property] !== "undefined") {
                                    for (var j = tilesets[i].firstgid - 1; j < tilesets[i].firstgid - 1 + sources.length; j++) {
                                        if (typeof resourceHooks[j] === "undefined") {
                                            resourceHooks[j] = new Array();
                                        }

                                        resourceHooks[j].push(this.BuildHookerFunction(tilesets[i].properties[property], propertyHooks.ResourceSheetHooks[property]));
                                    }
                                }
                            }

                            for (var tileIndex in tilesets[i].tileproperties) {
                                for (var property in tilesets[i].tileproperties[tileIndex])
                                    if (typeof propertyHooks.ResourceTileHooks[property] !== "undefined") {
                                        index = parseInt(tileIndex) + tilesets[i].firstgid - 1;

                                        if (typeof resourceHooks[index] === "undefined") {
                                            resourceHooks[index] = new Array();
                                        }

                                        resourceHooks[index].push(this.BuildHookerFunction(tilesets[i].tileproperties[tileIndex][property], propertyHooks.ResourceTileHooks[property]));
                                    }
                            }

                            tilesetTiles = tilesetTiles.concat(sources);
                        }

                        return {
                            Resources: tilesetTiles,
                            ResourceHooks: resourceHooks
                        };
                    };

                    OrthogonalLoader.prototype.AsyncBuildLayer = function (tmxData, layerIndex, propertyHooks, resources, onTileLoad, onComplete) {
                        var _this = this;
                        setTimeout(function () {
                            var tmxLayer = tmxData.layers[layerIndex], mappings = _this.NormalizeLayerData(tmxLayer.data, tmxData.width), layer = new EndGate.Graphics.SquareTileMap(tmxLayer.x, tmxLayer.y, tmxData.tilewidth, tmxData.tileheight, resources.Resources, mappings), layerHooks = new Array();

                            for (var property in tmxLayer.properties) {
                                if (typeof propertyHooks.LayerHooks[property] !== "undefined") {
                                    layerHooks.push(_this.BuildHookerFunction(tmxLayer.properties[property], propertyHooks.LayerHooks[property]));
                                }
                            }

                            layer.ZIndex = layerIndex;
                            layer.Visible = tmxLayer.visible;
                            layer.Opacity = tmxLayer.opacity;

                            layer.RowLoadDelay = EndGate.TimeSpan.FromMilliseconds(5);

                            layer.OnTileLoad.Bind(function (details, percentComplete) {
                                if (resources.ResourceHooks[details.ResourceIndex]) {
                                    for (var i = 0; i < resources.ResourceHooks[details.ResourceIndex].length; i++) {
                                        resources.ResourceHooks[details.ResourceIndex][i](details);
                                    }
                                }

                                for (var i = 0; i < layerHooks.length; i++) {
                                    layerHooks[i](details);
                                }

                                onTileLoad(details, percentComplete);
                            });

                            layer.OnLoaded.Bind(function () {
                                onComplete(layer);
                            });
                        }, 0);
                    };

                    OrthogonalLoader.prototype.BuildHookerFunction = function (propertyValue, fn) {
                        return function (details) {
                            return fn(details, propertyValue);
                        };
                    };

                    OrthogonalLoader.prototype.NormalizeLayerData = function (data, columns) {
                        var normalized = new Array(), index;

                        for (var i = 0; i < data.length; i++) {
                            index = Math.floor(i / columns);

                            if (!(normalized[index] instanceof Array)) {
                                normalized[index] = new Array();
                            }

                            normalized[index].push(data[i] - 1);
                        }

                        return normalized;
                    };
                    OrthogonalLoader._imagePercentMax = .2;
                    return OrthogonalLoader;
                })();
                TMX.OrthogonalLoader = OrthogonalLoader;
            })(_.TMX || (_.TMX = {}));
            var TMX = _.TMX;
        })(MapLoaders._ || (MapLoaders._ = {}));
        var _ = MapLoaders._;
    })(EndGate.MapLoaders || (EndGate.MapLoaders = {}));
    var MapLoaders = EndGate.MapLoaders;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (MapLoaders) {
        (function (_) {
            (function (TMX) {
                var TMXLoader = (function () {
                    function TMXLoader() {
                        this._orientationLoaders = {
                            orthogonal: new TMX.OrthogonalLoader()
                        };
                    }
                    TMXLoader.prototype.Load = function (data, propertyHooks, onComplete) {
                        if (!this._orientationLoaders[data.orientation]) {
                            throw new Error("Invalid orientation.  The orientation '" + data.orientation + "' is not supported.");
                        }

                        return this._orientationLoaders[data.orientation].Load(data, propertyHooks, onComplete);
                    };
                    return TMXLoader;
                })();
                TMX.TMXLoader = TMXLoader;
            })(_.TMX || (_.TMX = {}));
            var TMX = _.TMX;
        })(MapLoaders._ || (MapLoaders._ = {}));
        var _ = MapLoaders._;
    })(EndGate.MapLoaders || (EndGate.MapLoaders = {}));
    var MapLoaders = EndGate.MapLoaders;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (MapLoaders) {
        var JSONLoader = (function () {
            function JSONLoader() {
            }
            JSONLoader.Load = function (json, onComplete, propertyHooks, format) {
                if (typeof format === "undefined") { format = MapLoaders.JSONFormat.TMX; }
                if (!propertyHooks) {
                    propertyHooks = {
                        ResourceTileHooks: {},
                        ResourceSheetHooks: {},
                        LayerHooks: {}
                    };
                }

                return JSONLoader._loaders[MapLoaders.JSONFormat[format]].Load(json, propertyHooks, onComplete);
            };
            JSONLoader._loaders = {
                TMX: new MapLoaders._.TMX.TMXLoader()
            };
            return JSONLoader;
        })();
        MapLoaders.JSONLoader = JSONLoader;
    })(EndGate.MapLoaders || (EndGate.MapLoaders = {}));
    var MapLoaders = EndGate.MapLoaders;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Particles) {
        var Range = (function () {
            function Range(min, max) {
                if (typeof max === "undefined") { max = min; }
                this.Min = min;
                this.Max = max;
            }
            Range.prototype.Clone = function () {
                return new Range(this.Min, this.Max);
            };

            Range.RandomNumber = function (range) {
                return Math.random() * (range.Max - range.Min) + range.Min;
            };

            Range.RandomTimeSpan = function (range) {
                return EndGate.TimeSpan.FromMilliseconds(Math.floor(Math.random() * (range.Max.Milliseconds - range.Min.Milliseconds + 1) + range.Min.Milliseconds));
            };
            return Range;
        })();
        Particles.Range = Range;
    })(EndGate.Particles || (EndGate.Particles = {}));
    var Particles = EndGate.Particles;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Linear = (function () {
                function Linear() {
                }
                Object.defineProperty(Linear, "EaseNone", {
                    get: function () {
                        return Linear._easeNone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Linear._easeNone = function (from, to, elapsed, duration) {
                    var change = to - from;

                    return change * elapsed.Milliseconds / duration.Milliseconds + from;
                };
                return Linear;
            })();
            Functions.Linear = Linear;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        var Tween = (function () {
            function Tween(from, to, duration, tweeningFunction) {
                this._from = from.Clone();
                this._to = to.Clone();
                this._current = this._from.Clone();
                this._duration = duration;
                this._elapsed = EndGate.TimeSpan.Zero;
                this._playing = false;
                this._onChange = new EndGate.EventHandler1();
                this._onComplete = new EndGate.EventHandler1();
                this._tweeningFunction = tweeningFunction;
            }
            Object.defineProperty(Tween.prototype, "OnChange", {
                get: function () {
                    return this._onChange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "OnComplete", {
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "From", {
                get: function () {
                    return this._from;
                },
                set: function (from) {
                    this._from = from;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "To", {
                get: function () {
                    return this._to;
                },
                set: function (to) {
                    this._to = to;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Current", {
                get: function () {
                    return this._current;
                },
                set: function (current) {
                    this._current = current;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Duration", {
                get: function () {
                    return this._duration;
                },
                set: function (duration) {
                    this._duration = duration;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Elapsed", {
                get: function () {
                    return this._elapsed.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "TweeningFunction", {
                get: function () {
                    return this._tweeningFunction;
                },
                set: function (fn) {
                    this._tweeningFunction = fn;
                },
                enumerable: true,
                configurable: true
            });

            Tween.prototype.IsPlaying = function () {
                return this._playing;
            };

            Tween.prototype.Play = function () {
                this._playing = true;
            };

            Tween.prototype.Pause = function () {
                this._playing = false;
            };

            Tween.prototype.Reset = function () {
                this._elapsed.Milliseconds = 0;
                this._current = this._from.Clone();
            };

            Tween.prototype.Stop = function () {
                this._playing = false;
                this.Reset();
            };

            Tween.prototype.Restart = function () {
                this.Reset();
                this.Play();
            };

            Tween.prototype.Reverse = function () {
                this._elapsed = EndGate.TimeSpan.Zero;
                this._to = this._from;
                this._from = this.Current.Clone();
            };

            Tween.prototype.Update = function (gameTime) {
                if (!this._playing) {
                    return;
                }

                this._elapsed = this._elapsed.Add(gameTime.Elapsed);

                if (this._elapsed.Milliseconds >= this._duration.Milliseconds) {
                    this._elapsed = this._duration.Clone();

                    this._current = this._to.Clone();
                    this._playing = false;

                    this._onChange.Trigger(this._current.Clone());
                    this._onComplete.Trigger(this);
                } else {
                    this._UpdateTween();
                    this._onChange.Trigger(this._current.Clone());
                }
            };

            Tween.prototype.Dispose = function () {
                this.Stop();
                this._onChange.Dispose();
                this._onComplete.Dispose();
            };

            Tween.prototype._UpdateTween = function () {
            };
            return Tween;
        })();
        Tweening.Tween = Tween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        var Vector2dTween = (function (_super) {
            __extends(Vector2dTween, _super);
            function Vector2dTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            Vector2dTween.prototype._UpdateTween = function () {
                this.Current = new EndGate.Vector2d(this.TweeningFunction(this.From.X, this.To.X, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Y, this.To.Y, this.Elapsed, this.Duration));
            };
            return Vector2dTween;
        })(Tweening.Tween);
        Tweening.Vector2dTween = Vector2dTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        var NumberTween = (function (_super) {
            __extends(NumberTween, _super);
            function NumberTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            NumberTween.prototype._UpdateTween = function () {
                this.Current = this.TweeningFunction(this.From, this.To, this.Elapsed, this.Duration);
            };
            return NumberTween;
        })(Tweening.Tween);
        Tweening.NumberTween = NumberTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Particles) {
        var Particle = (function () {
            function Particle(texture, fromLocation, toLocation, scale, opacity, rotation, rotationSpeed, lifetime, fadeInDuration, fadeOutDuration, movementFunction) {
                texture.Position = fromLocation;
                texture.Scale(scale);
                texture.Rotation = rotation;
                texture.Opacity = 0;

                this._texture = texture;
                this._rotationSpeed = rotationSpeed;
                this._alive = true;
                this._fadingOut = false;
                this._lifetime = lifetime;
                this._createdAt = new Date().getTime();
                this._onDeath = new EndGate.EventHandler1();
                this._fadeOutDuration = fadeOutDuration;
                this._fadeOutAt = lifetime.Milliseconds - fadeOutDuration.Milliseconds;
                this._locationTween = new EndGate.Tweening.Vector2dTween(texture.Position, toLocation, lifetime, movementFunction);
                this._fadeTween = new EndGate.Tweening.NumberTween(0, opacity * 100, fadeInDuration, EndGate.Tweening.Functions.Linear.EaseNone);

                this._locationTween.Play();
                this._fadeTween.Play();
            }
            Object.defineProperty(Particle.prototype, "Texture", {
                get: function () {
                    return this._texture;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Particle.prototype, "OnDeath", {
                get: function () {
                    return this._onDeath;
                },
                enumerable: true,
                configurable: true
            });

            Particle.prototype.IsAlive = function () {
                return this._alive;
            };

            Particle.prototype.Update = function (gameTime) {
                var aliveFor;

                if (this._alive) {
                    aliveFor = gameTime.Now.getTime() - this._createdAt;

                    if (aliveFor > this._lifetime.Milliseconds) {
                        this._alive = false;
                        this._onDeath.Trigger(this);
                    } else {
                        if (!this._fadingOut && aliveFor >= this._fadeOutAt) {
                            this._fadingOut = true;
                            this._fadeTween.From = this._texture.Opacity * 100;
                            this._fadeTween.To = 0;
                            this._fadeTween.Duration = this._fadeOutDuration;
                            this._fadeTween.Restart();
                        }

                        this._locationTween.Update(gameTime);
                        this._fadeTween.Update(gameTime);

                        this._texture.Rotation += gameTime.Elapsed.Seconds * this._rotationSpeed;
                        this._texture.Position = this._locationTween.Current;
                        this._texture.Opacity = this._fadeTween.Current / 100;
                    }
                }
            };
            return Particle;
        })();
        Particles.Particle = Particle;
    })(EndGate.Particles || (EndGate.Particles = {}));
    var Particles = EndGate.Particles;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Particles) {
        var Emitter = (function (_super) {
            __extends(Emitter, _super);
            function Emitter(x, y, emissionFunction) {
                var _this = this;
                _super.call(this, new EndGate.Vector2d(x, y));
                this.EmissionInterval = new Particles.Range(EndGate.TimeSpan.FromMilliseconds(30));
                this.EmissionDirection = new Particles.Range(0, Math.PI * 2);
                this.EmissionOutput = new Particles.Range(1);
                this.ParticleLifetime = new Particles.Range(EndGate.TimeSpan.FromSeconds(1), EndGate.TimeSpan.FromSeconds(3));
                this.ParticleSpeed = new Particles.Range(30, 100);
                this.ParticleScale = new Particles.Range(.75, 1.5);
                this.ParticleRotation = new Particles.Range(0, Math.PI * 2);
                this.ParticleRotationSpeed = new Particles.Range(0, Math.PI);
                this.ParticleOpacity = new Particles.Range(1);
                this.ParticleFadeInDuration = new Particles.Range(EndGate.TimeSpan.FromSeconds(.5));
                this.ParticleFadeOutDuration = new Particles.Range(EndGate.TimeSpan.FromSeconds(.5), EndGate.TimeSpan.FromSeconds(1));

                this._texturePool = new Array();
                this._particlePool = {};
                this._particleId = 0;
                this._emitting = false;
                this._particleRemover = function (particle) {
                    _this.RemoveChild(particle.Texture);
                    delete _this._particlePool[particle._id];
                };

                this.EmissionFunction = emissionFunction;
            }
            Emitter.prototype.IsEmitting = function () {
                return this._emitting;
            };

            Emitter.prototype.Start = function () {
                if (this._texturePool.length === 0) {
                    throw new Error("Cannot start Emitter without any textures added to it.");
                }

                this._emitting = true;
                this._lastEmit = new Date().getTime();
            };

            Emitter.prototype.Stop = function () {
                this._emitting = false;
            };

            Emitter.prototype.AddTexture = function (texture, weight) {
                if (typeof weight === "undefined") { weight = 1; }
                for (var i = 0; i < weight; i++) {
                    this._texturePool.push(texture);
                }
            };

            Emitter.prototype.RemoveTexture = function (texture) {
                for (var i = 0; i < this._texturePool.length; i++) {
                    if (this._texturePool[i] === texture) {
                        this._texturePool.splice(i--, 1);
                    }
                }
            };

            Emitter.prototype.Emit = function () {
                var particleCount = Particles.Range.RandomNumber(this.EmissionOutput), endLocation, emissionDirection, particleSpeed, particleLifeTime, particle, particles = new Array();

                for (var i = 0; i < particleCount; i++) {
                    particleLifeTime = Particles.Range.RandomTimeSpan(this.ParticleLifetime);
                    particleSpeed = Particles.Range.RandomNumber(this.ParticleSpeed);
                    emissionDirection = Particles.Range.RandomNumber(this.EmissionDirection);
                    endLocation = new EndGate.Vector2d(particleLifeTime.Seconds * particleSpeed, 0).RotateAround(EndGate.Vector2d.Zero, emissionDirection);

                    particle = new Particles.Particle(this.BuildTextureFromPool(), EndGate.Vector2d.Zero, endLocation, Particles.Range.RandomNumber(this.ParticleScale), Particles.Range.RandomNumber(this.ParticleOpacity), Particles.Range.RandomNumber(this.ParticleRotation), Particles.Range.RandomNumber(this.ParticleRotationSpeed), particleLifeTime, Particles.Range.RandomTimeSpan(this.ParticleFadeInDuration), Particles.Range.RandomTimeSpan(this.ParticleFadeOutDuration), this.EmissionFunction);

                    particle._id = this._particleId++;

                    this._particlePool[particle._id] = particle;

                    this.AddChild(particle.Texture);
                    particle.OnDeath.Bind(this._particleRemover);

                    particles.push(particle);
                }

                return particles;
            };

            Emitter.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);
                _super.prototype._EndDraw.call(this, context);
            };

            Emitter.prototype.Scale = function (scale) {
                throw new Error("Scale is not implemented for the Emitter class.");
            };

            Emitter.prototype.Update = function (gameTime) {
                var timeSinceEmit, emitCount, emissionRate;

                if (this._emitting) {
                    emissionRate = Particles.Range.RandomTimeSpan(this.EmissionInterval).Milliseconds;
                    if (emissionRate > 0) {
                        timeSinceEmit = gameTime.Now.getTime() - this._lastEmit;
                        emitCount = Math.floor(timeSinceEmit / emissionRate);

                        if (emitCount > 0) {
                            this._lastEmit = gameTime.Now.getTime();

                            for (var i = 0; i < emitCount; i++) {
                                this.Emit();
                            }
                        }
                    }

                    for (var particleId in this._particlePool) {
                        this._particlePool[particleId].Update(gameTime);
                    }
                }
            };

            Emitter.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingCircle(this.Position, this.ParticleSpeed.Max * this.ParticleLifetime.Max.Seconds);

                return bounds;
            };

            Emitter.prototype.Clone = function () {
                var clone = new Emitter(this.Position.X, this.Position.Y, this.EmissionFunction);

                for (var i = 0; i < this._texturePool.length; i++) {
                    clone.AddTexture(this._texturePool[i]);
                }

                clone.EmissionInterval = this.EmissionInterval.Clone();
                clone.EmissionDirection = this.EmissionDirection.Clone();
                clone.EmissionOutput = this.EmissionOutput.Clone();
                clone.ParticleLifetime = this.ParticleLifetime.Clone();
                clone.ParticleSpeed = this.ParticleSpeed.Clone();
                clone.ParticleRotation = this.ParticleRotation.Clone();
                clone.ParticleRotationSpeed = this.ParticleRotationSpeed.Clone();
                clone.ParticleFadeInDuration = this.ParticleFadeInDuration.Clone();
                clone.ParticleFadeOutDuration = this.ParticleFadeOutDuration.Clone();
                clone.ParticleScale = this.ParticleScale.Clone();
                clone.ParticleOpacity = this.ParticleOpacity.Clone();

                clone.Opacity = this.Opacity;
                clone.Rotation = this.Rotation;
                clone.Visible = this.Visible;
                clone.ZIndex = this.ZIndex;

                return clone;
            };

            Emitter.prototype.BuildTextureFromPool = function () {
                var textureIndex = Math.floor(Math.random() * this._texturePool.length);

                return this._texturePool[textureIndex].Clone();
            };
            return Emitter;
        })(EndGate.Graphics.Graphic2d);
        Particles.Emitter = Emitter;
    })(EndGate.Particles || (EndGate.Particles = {}));
    var Particles = EndGate.Particles;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        var ColorTween = (function (_super) {
            __extends(ColorTween, _super);
            function ColorTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            ColorTween.prototype._UpdateTween = function () {
                this.Current.R = this.TweeningFunction(this.From.R, this.To.R, this.Elapsed, this.Duration);
                this.Current.G = this.TweeningFunction(this.From.G, this.To.G, this.Elapsed, this.Duration);
                this.Current.B = this.TweeningFunction(this.From.B, this.To.B, this.Elapsed, this.Duration);
            };
            return ColorTween;
        })(Tweening.Tween);
        Tweening.ColorTween = ColorTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        var Size2dTween = (function (_super) {
            __extends(Size2dTween, _super);
            function Size2dTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            Size2dTween.prototype._UpdateTween = function () {
                this.Current = new EndGate.Size2d(this.TweeningFunction(this.From.Width, this.To.Width, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Height, this.To.Height, this.Elapsed, this.Duration));
            };
            return Size2dTween;
        })(Tweening.Tween);
        Tweening.Size2dTween = Size2dTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Back = (function () {
                function Back() {
                }
                Object.defineProperty(Back, "EaseIn", {
                    get: function () {
                        return Back._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Back, "EaseOut", {
                    get: function () {
                        return Back._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Back, "EaseInOut", {
                    get: function () {
                        return Back._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Back._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds - 1.70158) + from;
                };
                Back._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds + 1.70158) + 1) + from;
                };
                Back._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, constant = 1.70158;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * (elapsedMilliseconds * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds - constant)) + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds + constant) + 2) + from;
                };
                return Back;
            })();
            Functions.Back = Back;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Bounce = (function () {
                function Bounce() {
                }
                Object.defineProperty(Bounce, "EaseIn", {
                    get: function () {
                        return Bounce._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Bounce, "EaseOut", {
                    get: function () {
                        return Bounce._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Bounce, "EaseInOut", {
                    get: function () {
                        return Bounce._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Bounce._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from;

                    return change - Bounce.EaseOut(0, change, duration.Subtract(elapsed), duration) + from;
                };
                Bounce._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds) < (1 / 2.75)) {
                        return change * (7.5625 * elapsedMilliseconds * elapsedMilliseconds) + from;
                    } else if (elapsedMilliseconds < (2 / 2.75)) {
                        return change * (7.5625 * (elapsedMilliseconds -= (1.5 / 2.75)) * elapsedMilliseconds + .75) + from;
                    } else if (elapsedMilliseconds < (2.5 / 2.75)) {
                        return change * (7.5625 * (elapsedMilliseconds -= (2.25 / 2.75)) * elapsedMilliseconds + .9375) + from;
                    } else {
                        return change * (7.5625 * (elapsedMilliseconds -= (2.625 / 2.75)) * elapsedMilliseconds + .984375) + from;
                    }
                };
                Bounce._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from;

                    if (elapsed.Milliseconds < duration.Milliseconds / 2) {
                        return Bounce.EaseIn(0, change, elapsed.Multiply(2), duration) * 0.5 + from;
                    } else {
                        return Bounce.EaseOut(0, change, elapsed.Multiply(2).Subtract(duration), duration) * .5 + change * 0.5 + from;
                    }
                };
                return Bounce;
            })();
            Functions.Bounce = Bounce;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Circular = (function () {
                function Circular() {
                }
                Object.defineProperty(Circular, "EaseIn", {
                    get: function () {
                        return Circular._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Circular, "EaseOut", {
                    get: function () {
                        return Circular._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Circular, "EaseInOut", {
                    get: function () {
                        return Circular._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Circular._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * (Math.sqrt(1 - (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds) - 1) + from;
                };
                Circular._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * Math.sqrt(1 - (elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds) + from;
                };
                Circular._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return -change / 2 * (Math.sqrt(1 - elapsedMilliseconds * elapsedMilliseconds) - 1) + from;
                    }
                    return change / 2 * (Math.sqrt(1 - (elapsedMilliseconds -= 2) * elapsedMilliseconds) + 1) + from;
                };
                return Circular;
            })();
            Functions.Circular = Circular;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Cubic = (function () {
                function Cubic() {
                }
                Object.defineProperty(Cubic, "EaseIn", {
                    get: function () {
                        return Cubic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Cubic, "EaseOut", {
                    get: function () {
                        return Cubic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Cubic, "EaseInOut", {
                    get: function () {
                        return Cubic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Cubic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Cubic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
                };
                Cubic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
                };
                return Cubic;
            })();
            Functions.Cubic = Cubic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Elastic = (function () {
                function Elastic() {
                }
                Object.defineProperty(Elastic, "EaseIn", {
                    get: function () {
                        return Elastic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Elastic, "EaseOut", {
                    get: function () {
                        return Elastic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Elastic, "EaseInOut", {
                    get: function () {
                        return Elastic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Elastic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

                    if (elapsedMilliseconds === 0) {
                        return from;
                    }
                    if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                        return from + change;
                    }

                    timePartial = duration.Milliseconds * .3;
                    timePartialQuarter = timePartial / 4;

                    return -(change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
                };
                Elastic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

                    if (elapsedMilliseconds === 0) {
                        return from;
                    }

                    if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                        return from + change;
                    }

                    timePartial = duration.Milliseconds * .3;
                    timePartialQuarter = timePartial / 4;

                    return (change * Math.pow(2, -10 * elapsedMilliseconds) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) + change + from);
                };
                Elastic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

                    if (elapsedMilliseconds === 0) {
                        return from;
                    }

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) === 2) {
                        return from + change;
                    }

                    timePartial = duration.Milliseconds * (.3 * 1.5);
                    timePartialQuarter = timePartial / 4;

                    if (elapsedMilliseconds < 1) {
                        return -.5 * (change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
                    }
                    return (change * Math.pow(2, -10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) * .5 + change + from);
                };
                return Elastic;
            })();
            Functions.Elastic = Elastic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Exponential = (function () {
                function Exponential() {
                }
                Object.defineProperty(Exponential, "EaseIn", {
                    get: function () {
                        return Exponential._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Exponential, "EaseOut", {
                    get: function () {
                        return Exponential._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Exponential, "EaseInOut", {
                    get: function () {
                        return Exponential._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Exponential._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return (elapsedMilliseconds == 0) ? from : change * Math.pow(2, 10 * (elapsedMilliseconds / duration.Milliseconds - 1)) + from;
                };
                Exponential._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return (elapsedMilliseconds == duration.Milliseconds) ? from + change : change * (-Math.pow(2, -10 * elapsedMilliseconds / duration.Milliseconds) + 1) + from;
                };
                Exponential._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if (elapsedMilliseconds == 0) {
                        return from;
                    }
                    if (elapsedMilliseconds == duration.Milliseconds) {
                        return from + change;
                    }
                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * Math.pow(2, 10 * (elapsedMilliseconds - 1)) + from;
                    }
                    return change / 2 * (-Math.pow(2, -10 * --elapsedMilliseconds) + 2) + from;
                };
                return Exponential;
            })();
            Functions.Exponential = Exponential;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Quadratic = (function () {
                function Quadratic() {
                }
                Object.defineProperty(Quadratic, "EaseIn", {
                    get: function () {
                        return Quadratic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quadratic, "EaseOut", {
                    get: function () {
                        return Quadratic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quadratic, "EaseInOut", {
                    get: function () {
                        return Quadratic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quadratic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds + from;
                };
                Quadratic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * (elapsedMilliseconds /= duration.Milliseconds) * (elapsedMilliseconds - 2) + from;
                };
                Quadratic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds + from;
                    }

                    return -change / 2 * ((--elapsedMilliseconds) * (elapsedMilliseconds - 2) - 1) + from;
                };
                return Quadratic;
            })();
            Functions.Quadratic = Quadratic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Quartic = (function () {
                function Quartic() {
                }
                Object.defineProperty(Quartic, "EaseIn", {
                    get: function () {
                        return Quartic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quartic, "EaseOut", {
                    get: function () {
                        return Quartic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quartic, "EaseInOut", {
                    get: function () {
                        return Quartic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quartic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Quartic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 1) + from;
                };
                Quartic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return -change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 2) + from;
                };
                return Quartic;
            })();
            Functions.Quartic = Quartic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Quintic = (function () {
                function Quintic() {
                }
                Object.defineProperty(Quintic, "EaseIn", {
                    get: function () {
                        return Quintic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quintic, "EaseOut", {
                    get: function () {
                        return Quintic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quintic, "EaseInOut", {
                    get: function () {
                        return Quintic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quintic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Quintic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
                };
                Quintic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
                };
                return Quintic;
            })();
            Functions.Quintic = Quintic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Sinusoidal = (function () {
                function Sinusoidal() {
                }
                Object.defineProperty(Sinusoidal, "EaseIn", {
                    get: function () {
                        return Sinusoidal._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Sinusoidal, "EaseOut", {
                    get: function () {
                        return Sinusoidal._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Sinusoidal, "EaseInOut", {
                    get: function () {
                        return Sinusoidal._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Sinusoidal._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * Math.cos(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + change + from;
                };
                Sinusoidal._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * Math.sin(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + from;
                };
                Sinusoidal._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change / 2 * (Math.cos(Math.PI * elapsedMilliseconds / duration.Milliseconds) - 1) + from;
                };
                return Sinusoidal;
            })();
            Functions.Sinusoidal = Sinusoidal;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var EventHandler3 = (function () {
        function EventHandler3() {
            this._type = "EventHandler3";
            this._actions = [];
        }
        EventHandler3.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        EventHandler3.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        };

        EventHandler3.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        EventHandler3.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        EventHandler3.prototype.Trigger = function (val1, val2, val3) {
            var actions;

            if (this.HasBindings()) {
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i](val1, val2, val3);
                }
            }
        };

        EventHandler3.prototype.Dispose = function () {
            this._actions = [];
        };
        return EventHandler3;
    })();
    EndGate.EventHandler3 = EventHandler3;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=endgate-0.2.0-beta1.min.js.map
