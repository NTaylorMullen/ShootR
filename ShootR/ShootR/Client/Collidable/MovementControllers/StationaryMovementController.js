/// <reference path="MovementController.ts" />
/// <reference path="../../Utilities/Vector2.ts" />
/// <reference path="../../Interfaces/PayloadDefinitions.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StationaryMovementController = (function (_super) {
    __extends(StationaryMovementController, _super);
    function StationaryMovementController(position) {
        _super.call(this, position, 0, 0);
    }
    StationaryMovementController.prototype.UpdateMovementController = function (data) {
        // Empty so we don't waste execution time updating the movement controller
    };
    return StationaryMovementController;
})(MovementController);
//# sourceMappingURL=StationaryMovementController.js.map
