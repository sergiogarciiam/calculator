const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", addToScreen);
});

function addToScreen(e) {
  const screenText = createScreenText(e);
  screen.appendChild(screenText);
}

function addToScreen(e) {
  if (screen.hasChildNodes()) {
    addOperation(e);
  } else {
    const screenText = document.createElement("p");
    screenText.classList.add("screenText");
    screenText.textContent = e.target.textContent;
    screen.appendChild(screenText);
  }
}

function addOperation(e) {
  const screenText = document.querySelector(".screenText");
  let actualContent = screenText.textContent;
  const newContent = e.target.textContent;
  let operation = false;

  switch (newContent) {
    case "AC":
      cleanScreen();
      operation = true;
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
