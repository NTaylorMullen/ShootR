/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="../Utilities/UtilityFunctions.ts" />

module ShootR {

    export class LatencyResolver {
        public static REQUEST_PING_EVERY: number = 5;
        public static PING_DATA_POINTS: number = 100;

        public Latency: string;

        private _tryCount: number;
        private _requestedAt: Date;
        private _pingData: Array<number>;

        constructor(serverAdapter: Server.ServerAdapter) {
            this._tryCount = 0;
            this._requestedAt = null;
            this._pingData = new Array<number>();
            this.Latency = "...";

            serverAdapter.OnPingRequest.Bind(() => {
                if (this._requestedAt) {
                    this.AddData(new Date().getTime() - this._requestedAt.getTime());
                    this._requestedAt = null;
                }
            });
        }

        public TryRequestPing(): boolean {
            if (++this._tryCount % LatencyResolver.REQUEST_PING_EVERY === 0) {
                this._requestedAt = new Date();

                return true;
            }

            return false;
        }

        private AddData(timeElapsed: number): void {
            if (this._pingData.length === LatencyResolver.PING_DATA_POINTS) {
                this._pingData.shift();
            }

            this._pingData.push(timeElapsed);

            this.UpdateLatency();
        }

        private UpdateLatency(): void {
            var validItemCount: number = 0,
                totalValue: number = 0,
                standardDeviation: number = StandardDeviation(this._pingData),
                baseAverage: number = Average(this._pingData);

            for (var i = 0; i < this._pingData.length; i++) {
                if (Math.abs(this._pingData[i] - baseAverage) <= standardDeviation) {
                    validItemCount++;
                    totalValue += this._pingData[i];
                }
            }

            if (validItemCount > 0) {
                this.Latency = Math.round(totalValue / validItemCount).toString() + "ms";
            }
        }
    }

}