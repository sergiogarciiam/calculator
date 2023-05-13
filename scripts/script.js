// GLOBAL VARIABLES
const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");
let startingPoint = true;

// SET UP
setUp();

function setUp() {
  addButtonsEvents();
  document.addEventListener("keydown", addKeyboardEvents);
}

// FUNCTIONS
function addButtonsEvents() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      addOperation(button);
    });
  });
}

function addKeyboardEvents(e) {
  var key = e.key;

  const keyMappings = {
    Enter: "=",
    Backspace: "del",
    Escape: "AC",
  };

  if (key in keyMappings) {
    key = keyMappings[key];
  }

  activeButtons(key);
}

function activeButtons(key) {
  buttons.forEach((button) => {
    if (button.textContent === key) {
      button.classList.add("button-active");

      setTimeout(() => {
        button.classList.remove("button-active");
      }, 300);

      addOperation(button);
      return;
    }
  });
}
