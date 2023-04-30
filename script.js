const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", addToScreen);
});

function addToScreen(e) {
  const screenText = document.createElement("p");
  screenText.textContent = e.target.textContent;
  screen.appendChild(screenText);
}
