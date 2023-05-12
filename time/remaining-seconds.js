(function () {
    function countRemainingSeconds(
        durationInSeconds,
        callbackOnSecond = console.log
    ) {
        // start countdown
        const intervalId = setInterval(function () {
            --durationInSeconds;
            callbackOnSecond(durationInSeconds);
        }, 1000);

        // stop counting
        setTimeout(function () {
            clearInterval(intervalId);
        }, durationInSeconds * 1000 + 900);

        // first time
        callbackOnSecond(durationInSeconds);
    }

    countRemainingSeconds(5);
})();
