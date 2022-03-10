(function () {
    'use strict';

    function waitForMerge(refreshDelayInSeconds = 60, countdownDelayInSeconds = 10) {
        const isMerged = () => {
            return 0 < document.body.querySelectorAll('.status-box-mr-merged').length;
        };

        setTimeout(() => {
            if (false === isMerged()) {
                window.location.reload();
            }
        }, refreshDelayInSeconds * 1000);

        // Countdown for fun
        setInterval(() => {
            refreshDelayInSeconds -= countdownDelayInSeconds;
            console.info('I will refresh the page in ' + refreshDelayInSeconds + ' seconds.');
        }, countdownDelayInSeconds * 1000);

        console.log('Wait for merge activated, will refresh in ' + refreshDelayInSeconds + ' seconds');
    }

    waitForMerge(5 * 60);
})();