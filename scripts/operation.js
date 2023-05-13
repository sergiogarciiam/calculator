function addOperation(button) {
  let screenText = null;
  const newContent = button.textContent;
  let operation = false;

  if (startingPoint) {
    screenText = document.createElement("p");
    screenText.classList.add("screenText");
    startingPoint = false;
  } else {
    screenText = document.querySelector(".screenText");
  }

  let actualContent = screenText.textContent;

  switch (newContent) {
    case "AC":
      cleanScreen();
      operation = true;
      startingPoint = true;
      break;

    case "c":
      screenText.textContent = "";
      break;

    case "del":
      screenText.textContent = actualContent.slice(0, -1);
      break;

    case "/":
    case "*":
    case "-":
    case "+":
      const regexEnd = /[+\-*/%]$/; // regex to match any of +, -, *, / or % at the end of the string

      if (newContent != "-" && actualContent === "") {
        screenText.textContent = actualContent;
      } else if (regexEnd.test(actualContent)) {
        screenText.textContent = actualContent.slice(0, -1) + newContent;
      } else if (testMaxSize()) {
        screenText.textContent += newContent;
      }
      break;

    case ".":
      const regexOperators = /(\d+(\.\d+)?)(?!.*\d)/g;
      const matches = screenText.textContent.match(regexOperators);
      const lastNumber = matches[matches.length - 1];

      if (lastNumber.includes(".") || screenText.textContent.endsWith(".")) {
        screenText.textContent = actualContent;
      } else if (testMaxSize()) {
        screenText.textContent += newContent;
      }
      break;

    case "=":
      if (screenText.textContent != "") {
        const result = evaluateExpression(actualContent);
        addResultToScreen(result);
        operation = true;
      }
      break;

    default:
      if (testMaxSize()) screenText.textContent += newContent;
      break;
  }

  if (!operation) {
    screen.appendChild(screenText);
  }
}

function addResultToScreen(result) {
  const screenText = document.querySelector(".screenText");
  const resultText = document.createElement("p");

  if (result == "inf") {
    warmUser();
  }

  screenText.classList.remove("screenText");

  if (result != "inf") {
    resultText.textContent = result;
  } else {
    resultText.textContent = "";
  }
  resultText.classList.add("screenText");
  screen.appendChild(resultText);
}

function testMaxSize() {
  const screenText = document.querySelector(".screenText");

  if (screenText == null || screenText.textContent.length != 15) {
    return true;
  } else {
    warmUser();
    return false;
  }
}

function warmUser() {
  const screenText = document.querySelector(".screenText");

  screenText.style.color = "red";

  setTimeout(() => {
    screenText.style.color = "#eee";
  }, 300);
}

function cleanScreen() {
  while (screen.firstChild) {
    screen.removeChild(screen.firstChild);
  }
}
