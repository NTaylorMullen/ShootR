var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var StationaryMovementController = (function (_super) {
    __extends(StationaryMovementController, _super);
    function StationaryMovementController(position) {
        _super.call(this, position, 0, 0);
    }
    StationaryMovementController.prototype.UpdateMovementController = function (data) {
    };
    return StationaryMovementController;
})(MovementController);
//@ sourceMappingURL=StationaryMovementController.js.map
