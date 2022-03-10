
function showNotification(title, options) {
    return new Notification(title, options);
}

function removeNotification(notification) {
    notification.close();
}

function countUsingNotifications(title, options, max) {
    var notification = new Notification(title, options);
    var i = 0;

    var intervalId = setInterval(function () {
        notification.close();

        if (i >= max) {
            clearInterval(intervalId);

            return;
        }

        notification = new Notification(title + ' ' + ++i, options);
    }, 1000);
}
