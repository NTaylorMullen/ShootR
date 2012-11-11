class AnimationManager {
    private _animations: any[];
    private _animationCount: number;

    constructor () {
        this._animations = [];
        this._animationCount = 0;
    }

    public Add(animation: any): void {
        this._animations.push(animation);
        this._animationCount++;
    }

    public Remove(index: number): void {
        this._animations.splice(index, 1);
        this._animationCount--;
    }

    public Update(): void {
        for (var i = 0; i < this._animationCount; i++) {
            if (!this._animations[i].Destroyed) {
                this._animations[i].Draw();
            }
            else {
                this.Remove(i--);
            }
        }
    }
}