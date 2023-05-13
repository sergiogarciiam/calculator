function evaluateExpression(expression) {
  const tokens = getTokens(expression);
  let result = getResult(tokens);
  result = controlDecimals(result);
  return result;
}

function getTokens(expression) {
  let tokens = [];
  let currentToken = "";

  for (let index = 0; index < expression.length; index++) {
    if (!isOperator(expression[index])) {
      currentToken += expression[index];
    } else {
      tokens.push(currentToken);
      tokens.push(expression[index]);
      currentToken = "";
    }
  }

  tokens.push(currentToken);
  return tokens;
}

function getResult(tokens) {
  if (tokens.length === 1) {
    return tokens[0];
  }

  for (let index = 0; index < tokens.length; index++) {
    if (tokens[index] === "*" || tokens[index] === "/") {
      let token = calculate(
        tokens[index - 1],
        tokens[index + 1],
        tokens[index]
      );

      if (token === "inf") {
        return token;
      }

      tokens.splice(index - 1, 3, token);

      return getResult(tokens);
    }
  }

  for (let index = 0; index < tokens.length; index++) {
    if (tokens[index] === "+" || tokens[index] === "-") {
      let token = calculate(
        tokens[index - 1],
        tokens[index + 1],
        tokens[index]
      );

      tokens.splice(index - 1, 3, token);

      return getResult(tokens);
    }
  }
}

function controlDecimals(result) {
  result = result.toString();
  if (result.includes(".")) {
    const numbers = result.split(".");
    if (numbers[1].length > 2) {
      result = parseFloat(result).toFixed(2);
    }
  }

  return result;
}

function calculate(operand1, operand2, operator) {
  switch (operator) {
    case "*":
      return operand1 * operand2;
    case "/":
      if (operand2 === "0") {
        return "inf";
      } else {
        return operand1 / operand2;
      }
    case "+":
      return +operand1 + +operand2;
    case "-":
      return operand1 - operand2;
    default:
      return "";
  }
}

function isOperator(char) {
  return char === "*" || char === "/" || char === "+" || char === "-";
}
