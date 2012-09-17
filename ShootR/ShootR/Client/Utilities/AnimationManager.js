function AnimationManager() {
    var that = this;
    var animations = [];
    var animationCount = 0;
    
    that.Add = function(animation) {
        animations.push(animation);
        animationCount++;
    }

    that.Remove = function(index) {
        animations.splice(index,1);
        animationCount--;
    }

    that.Update = function (gameTime) {
        for (var i = 0; i < animationCount; i++) {
            if (!animations[i].Destroyed) {
                animations[i].Draw();
            }
            else {
                that.Remove(i--);
            }
        }
    }
}