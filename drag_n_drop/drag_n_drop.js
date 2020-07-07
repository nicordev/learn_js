function dragover(event) {
    event.preventDefault();
}

function dragenter(event) {
    event.preventDefault();
}

function drop() {
    this.append(box);
}

const box = document.getElementsByClassName("box")[0];
const containers = document.getElementsByClassName("holder");

containers.map((container) => {
    container.addEventListener("dragover", dragover);
    container.addEventListener("dragenter", dragenter);
    container.addEventListener("drop", drop);
});
