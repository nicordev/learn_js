function LongClickHandler(element, clickDuration, callback) {
    let startingTimestamp = undefined;

    this.onMouseDown = () => {
        startingTimestamp = Date.now();
    };

    this.onMouseUp = () => {
        let duration = Date.now() - startingTimestamp;

        if (duration >= clickDuration) {
            callback();
        }
    }

    element.addEventListener('mousedown', this.onMouseDown);
    element.addEventListener('mouseup', this.onMouseUp);
}