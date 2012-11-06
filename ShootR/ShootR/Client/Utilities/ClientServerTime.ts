class ClientServerTime {
    public Delta: number;

    constructor () {
        this.Delta = 0;
    }

    public GetServerTime(serverTime: number): number {
        return serverTime + this.Delta;
    }

    public ToServerTime(time: number): number {
        return time - this.Delta;
    }
}