
function showNotification(title, options, onCloseCallback, onClickCallback) {
    const notification = new Notification(title, options);

    if (onCloseCallback) {
        notification.onclose = onCloseCallback;
    }

    if (onClickCallback) {
        notification.onclick = onClickCallback;
    }

    return notification;
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

showNotification(
    'hello world!',
    {},
    (event) => console.log(event),
    (event) => console.log(event),
)
