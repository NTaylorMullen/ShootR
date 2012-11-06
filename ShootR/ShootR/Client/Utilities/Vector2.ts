class Vector2 {
    X: number;
    Y: number;

    constructor (X: number, Y: any) {
        if (!isNaN(X) && Y === false) {
            var radians = X * Math.PI / 180;
            this.X = Math.cos(radians);
            this.Y = Math.sin(radians);
        }
        else {
            this.X = X || 0;
            this.Y = Y || 0;
        }
    }

    public ToString(): string {
        return "( " + this.X + ", " + this.Y + " )";
    }

    public Length(): number {
        return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
    }

    public Abs(): Vector2 {
        return new Vector2(Math.abs(this.X), Math.abs(this.Y));
    }

    // To is a Vector2
    public DistanceTo(to: Vector2): number {
        return Math.sqrt(Math.pow(to.X - this.X, 2) + Math.pow(to.Y - this.Y, 2));
    }

    public AddV(to: Vector2): void {
        this.X += to.X;
        this.Y += to.Y;
    }

    public AddN(to: number): void {
        this.X += to;
        this.Y += to;
    }

    public MultiplyV(by: Vector2): void {
        this.X *= by.X;
        this.Y *= by.Y;
    }

    public MultiplyN(by: number): void {
        this.X *= by;
        this.Y *= by;
    }

    public SubtractV(from: Vector2): void {
        this.X -= from.X;
        this.Y -= from.Y;
    }

    public SubtractN(from: number): void {
        this.X -= from;
        this.Y -= from;
    }

    public DivideV(from: Vector2): void {
        this.X /= from.X;
        this.Y /= from.Y;
    }

    public DivideN(from: number): void {
        this.X /= from;
        this.Y /= from;
    }

    public ApplyFunction(fn: Function): void {
        this.X = fn(this.X);
        this.Y = fn(this.Y);
    }

    public ZeroOut(): void {
        this.X = 0;
        this.Y = 0;
    }

    static MultiplyV(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.X * v2.X, v1.Y * v2.Y);
    }

    static MultiplyN(v1: Vector2, num: number): Vector2 {
        return new Vector2(v1.X * num, v1.Y * num);
    }

    static AddV(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
    }

    static AddN(v1: Vector2, num: number): Vector2 {
        return new Vector2(v1.X + num, v1.Y + num);
    }

    static SubtractV(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
    }

    static SubtractVFromN(v1: Vector2, num: number): Vector2 {
        return new Vector2(v1.X - num, v1.Y - num);
    }

    static SubtractNFromV(num: number, v1: Vector2): Vector2 {
        return new Vector2(num - v1.X, num - v1.Y);
    }

    static DivideV(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.X / v2.X, v1.Y / v2.Y);
    }

    static DivideVByN(v1: Vector2, num: number): Vector2 {
        return new Vector2(v1.X / num, v1.Y / num);
    }

    static DivideNByV(num: number, v1: Vector2): Vector2 {
        return new Vector2(num / v1.X, num / v1.Y);
    }

    static Zero(): Vector2 {
        return new Vector2(0, 0);
    }
}