function LatencyResolver(connection) {
    var that = this,
        pingCount = 0,
        deltas = [],
        CST = new ClientServerTime(),
        requestedPingAt = false;

    that.SampleSize = 10; // We want X samples before calculating correct delta time
    that.Latency = "Calculating...";

    function CalculateDeltaTime(sentAt, serverTime) {
        var currentTime = new Date().getTime(),
            latency = that.CalculateLatencySince(sentAt);

        return (currentTime - serverTime + latency);
    }

    function PushPingResults(sentAt, result) {
        deltas.push(CalculateDeltaTime(sentAt, result));
    }

    that.RequestedPingBack = function () {
        if (!requestedPingAt) {
            requestedPingAt = new Date().getTime();
        }
    }

    that.ServerPingBack = function () {
        if (requestedPingAt) {
            that.Latency = that.CalculateLatencySince(requestedPingAt) + " ms";
            requestedPingAt = false;
        }
    }

    that.ResolveFromAcknowledgement = function (sentAt, serverAcknowledgedAt) {
        PushPingResults(sentAt, serverAcknowledgedAt);

        if (deltas.length === that.SampleSize) {
            CST.Delta = that.GenerateDeltaTime();
            deltas = [];
        }
    }

    that.CalculateLatencySince = function (sentAt) {
        return (new Date().getTime() - sentAt) / 2
    }

    that.Resolve = function (callback) {
        deltas = [];
        // Do an initial ping (this clears the network/readies the tunnel).
        connection.ping().done(GetDelta);

        function GetDelta() {
            // Calculate delta time
            var sentAt = new Date().getTime();
            connection.ping().done(function (result) {
                PushPingResults(sentAt, CST.GetServerTime(new Date(result).getTime()));

                if (++pingCount < that.SampleSize) {
                    GetDelta();
                }
                else if (pingCount === 1) {
                    CST.Delta = deltas[0];
                }
                else { // Latency Resolving complete
                    CST.Delta = that.GenerateDeltaTime();
                    deltas = [];
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
}