const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");
let startingPoint = true;

document.addEventListener("keydown", addKeyboardEvents);
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    addOperation(button);
  });
});

function addKeyboardEvents(e) {
  var key = e.key;

  if (key === "Enter") {
    key = "=";
  } else if (key === "Backspace") {
    key = "Back";
  } else if (key === "Escape") {
    key = "AC";
  }

  buttons.forEach((button) => {
    if (button.textContent === key) {
      button.classList.add("button-active");

      setTimeout(() => {
        button.classList.remove("button-active");
      }, 200);

      addOperation(button);
      return;
    }
  });
}

function addOperation(button) {
  let screenText = null;
  if (startingPoint) {
    screenText = document.createElement("p");
    screenText.classList.add("screenText");
    startingPoint = false;
  } else {
    screenText = document.querySelector(".screenText");
  }

  let actualContent = screenText.textContent;
  const newContent = button.textContent;
  let operation = false;

  switch (newContent) {
    case "AC":
      cleanScreen();
      operation = true;
      startingPoint = true;
      break;

    case "Back":
      screenText.textContent = actualContent.slice(0, -1);
      break;

    case "%":
    case "/":
    case "*":
    case "-":
    case "+":
      const regex = /[+\-*/%]$/; // regex to match any of +, -, *, / or % at the end of the string

      if (regex.test(actualContent)) {
        screenText.textContent = actualContent.slice(0, -1) + newContent;
      } else {
        screenText.textContent += newContent;
      }
      break;

    case ".":
      if (actualContent.includes(".")) {
        screenText.textContent = actualContent;
      } else {
        screenText.textContent += newContent;
      }

      break;

    case "=":
      const result = evaluateExpression(actualContent);
      addResultToScreen(result);
      operation = true;
      break;

    default:
      screenText.textContent += newContent;
      break;
  }
  if (!operation) {
    screen.appendChild(screenText);
  }
}

function cleanScreen() {
  while (screen.firstChild) {
    screen.removeChild(screen.firstChild);
  }
}

function addResultToScreen(result) {
  const screenText = document.querySelector(".screenText");
  const resultText = document.createElement("p");

  screenText.classList.remove("screenText");

  resultText.textContent = result;
  resultText.classList.add("screenText");
  screen.appendChild(resultText);
}
