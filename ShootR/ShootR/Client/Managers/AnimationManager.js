var AnimationManager = (function () {
    function AnimationManager() {
        this._animations = [];
        this._animationCount = 0;
    }
    AnimationManager.prototype.Add = function (animation) {
        this._animations.push(animation);
        this._animationCount++;
    };

    AnimationManager.prototype.Remove = function (index) {
        this._animations.splice(index, 1);
        this._animationCount--;
    };

    AnimationManager.prototype.Update = function () {
        for (var i = 0; i < this._animationCount; i++) {
            if (!this._animations[i].Destroyed) {
                this._animations[i].Draw();
            } else {
                this.Remove(i--);
            }
        }
    };
    return AnimationManager;
})();
//# sourceMappingURL=AnimationManager.js.map
