(function () {
    function countElapsedSeconds(until) {
        const endedAt = Date.now();

        const getElapsedSeconds = (fromTimestamp) => {
            return Number(((Date.now() - fromTimestamp) / 1000).toFixed(0));
        }

        // start counting
        const intervalId = setInterval(function () {
            console.log(getElapsedSeconds(endedAt));
        }, 1000);

        // stop counting
        setTimeout(function () {
            clearInterval(intervalId);
        }, until * 1000 + 900);

        // first message
        console.log(`counting until ${until} seconds`)
    }

    countElapsedSeconds(5)
})();
