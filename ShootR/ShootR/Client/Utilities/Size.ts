class Size {
    public Width: number;
    public Height: number;

    constructor (width: number, height?: number) {
        this.Width = width;

        if (height) {
            this.Height = height;
        }
        else {
            this.Height = width;
        }
    }

    public Half(): Size {
        return new Size(.5 * this.Width, .5 * this.Height);
    }
}