/*
 * https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
 */
function tryEvent() {
    const event = new Event('build');

    // Listen for the event.
    elem.addEventListener('build', function (e) { /* ... */ }, false);

    // Dispatch the event.
    elem.dispatchEvent(event);
}

// old way
function oldWay() {
    // Create the event.
    const event = document.createEvent('Event');

    // Define that the event name is 'build'.
    event.initEvent('build', true, true);

    // Listen for the event.
    elem.addEventListener('build', function (e) {
      // e.target matches elem
    }, false);

    // target can be any Element or other EventTarget.
    elem.dispatchEvent(event);


}