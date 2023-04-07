const state = {
  timerStarted: false,
  audio: new Audio(
    "https://www.freesoundslibrary.com/wp-content/uploads/2018/02/birds-chirping-sound-effect.mp3"
  ),
  timerButtonElement: undefined,
};

function playBirds() {
  state.audio.play();
}

function pauseBirds() {
  state.audio.pause();
}

function switchTimer() {
  if (state.timerStarted) {
    stopTimer();

    return;
  }

  startTimer();
}

function resetTimer() {
  state.timerStarted = false;
  setTimerButtonStart();
}

function readDuration() {
  const hours = document.body.querySelector("#hour").value;
  const minutes = document.body.querySelector("#minute").value;
  const seconds = document.body.querySelector("#second").value;

  return hours * 3600 + minutes * 60 + seconds;
}

function ring() {
  console.log("time is up.");
  playBirds();
  resetTimer();
}

function startTimer() {
  state.duration = readDuration();

  state.timerId = setTimeout(ring, state.duration * 1000);
  state.timerStarted = true;

  console.log("timer started", state);
}

function stopTimer() {
  clearTimeout(state.timerId);
  state.timerStarted = false;

  console.log("timer stopped", state);
}

function setTimerButtonStop() {
  state.timerButtonElement.textContent = "stop";
}

function setTimerButtonStart() {
  state.timerButtonElement.textContent = "start";
}

function switchTimerButton() {
  if (state.timerStarted) {
    setTimerButtonStop();

    return;
  }

  setTimerButtonStart();
}

function setDraggableElement(element, handleElement) {
  let isDown = false;
  let offset = [0, 0];

  if (!handleElement) {
    handleElement = element;
  }

  if (!["absolute", "relative"].includes(element.style.position)) {
    element.style.position = "absolute";
  }

  handleElement.addEventListener("mousedown", function (event) {
    if (event.button === 0) {
      isDown = true;
      offset = [
        element.offsetLeft - event.clientX,
        element.offsetTop - event.clientY,
      ];
    }
  });
  document.addEventListener("mouseup", function (event) {
    isDown = false;
  });
  document.addEventListener("mousemove", function (event) {
    event.preventDefault();
    if (isDown) {
      const x = event.clientX + offset[0];
      const y = event.clientY + offset[1];

      // avoid going outside the top left corner
      if (x >= 0) {
        element.style.left = x + "px";
      }

      if (y >= 0) {
        element.style.top = y + "px";
      }
    }
  });
}

function displayOverlay(elements) {
  const overlayElement = document.createElement("div");

  if (false === Array.isArray(elements)) {
    elements = [elements];
  }

  elements.forEach((element) => {
    overlayElement.appendChild(element);
  });
  overlayElement.classList.add("overlay");

  overlayElement.setAttribute(
    "style",
    `
        position: absolute;
        top: 0;
        left: 0;
        background-color: darkolivegreen;
        color: white;
        padding: 2em;
        z-index: 9999;
    `
  );

  setDraggableElement(overlayElement);

  overlayElement.addEventListener("dblclick", function (event) {
    this.remove();
  });

  document.body.appendChild(overlayElement);
}

function createTimerInput(id) {
  const inputElement = document.createElement("input");

  inputElement.setAttribute("id", id);
  inputElement.setAttribute("type", "number");
  inputElement.value = 0;

  return inputElement;
}

function createTimerButton(id, type, content, onClick) {
  const inputElement = document.createElement("button");

  inputElement.setAttribute("id", id);
  inputElement.setAttribute("type", type);

  if (typeof content !== "undefined") inputElement.textContent = content;
  if (typeof onClick !== "undefined")
    inputElement.addEventListener("click", onClick);

  return inputElement;
}

function initTimer() {
  const timerElement = document.createElement("form");

  ["hour", "minute", "second"].forEach((id) =>
    timerElement.appendChild(createTimerInput(id))
  );
  state.timerButtonElement = createTimerButton("timer-button", "submit");
  timerElement.appendChild(state.timerButtonElement);
  setTimerButtonStart();
  timerElement.appendChild(
    createTimerButton("timer-mute", "button", "mute", pauseBirds)
  );

  timerElement.addEventListener("submit", function (event) {
    event.preventDefault();
    switchTimer();
    switchTimerButton();
  });

  displayOverlay(timerElement);
}

initTimer();
