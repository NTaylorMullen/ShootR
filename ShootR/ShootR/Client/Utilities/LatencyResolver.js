function LatencyResolver(connection) {
    var that = this,
        pingCount = 0,
        deltas = [],
        CST = GAME_GLOBALS.ClientServerTime = new ClientServerTime();

    that.SampleSize = 10; // We want X samples before calculating correct delta time

    function CalculateDeltaTime(sentAt, result) {
        var ServerTime = CST.GetServerTime(new Date(result).getTime()),
            currentTime = new Date().getTime(),
            latency = (currentTime - sentAt) / 2;

        return (currentTime - ServerTime + latency);
    }

    function PushPingResults(sentAt, result) {
        deltas.push(CalculateDeltaTime(sentAt, result));
    }

    that.Resolve = function (callback) {
        // Do an initial ping (this clears the network/readies the tunnel).
        connection.ping().done(GetDelta);

        function GetDelta() {
            // Calculate delta time
            var sentAt = new Date().getTime();
            connection.ping().done(function (result) {
                PushPingResults(sentAt, result);

                if (++pingCount < that.SampleSize) {
                    GetDelta();
                }
                else if (pingCount === 1) {
                    CST.Delta = deltas[0];
                }
                else { // Latency Resolving complete
                    CST.Delta = that.GenerateDeltaTime();
                    callback();
                }
            });
        }
    }

    that.GenerateDeltaTime = function () {        
        deltas.sort();

        var standardDeviation = StandardDeviation(deltas),
            median = deltas[Math.floor(deltas.length / 2)];

        // Remove items 1 standard deviation away from the median
        for (var i = 0; i < deltas.length; i++) {
            // Check if the value is at least one standard deviation away from the median
            if (Math.abs(deltas[i] - median) >= standardDeviation) {
                deltas.splice(i--, 1);
            }
        }

        return Math.round(Average(deltas));
    }

    that.AutoResolveLatency = function() {
    }
}