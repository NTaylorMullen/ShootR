class Ability {
    public Active: bool;
    public ActivatedAt: number;

    constructor (public Name: string) {
        this.Active = false;
        this.ActivatedAt = null;
    }

    public Activate(): void {
        this.Active = true;
        this.ActivatedAt = new Date().getTime();
    }

    public Deactivate(): void {
        this.Active = false;
        this.ActivatedAt = null;
    }

    // Meant to be overriden
    public Update(now: Date): void { }
}