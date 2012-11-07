/// <reference path="../Collidable/Collidable.ts" />
/// <reference path="../Utilities/GameTime.ts" />

class Powerup extends Collidable{
    constructor (properties: any) {
        super();

        this.UpdateProperties(properties);
    }

    public Update (gameTime: GameTime): void {
    }

    public Destroy (): void {
        this.Visible = false;
    }
}
