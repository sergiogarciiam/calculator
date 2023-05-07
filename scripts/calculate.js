function evaluateExpression(expression) {
  const tokens = tokenizeExpression(expression);
  const syntaxTree = parseExpression(tokens);
  const result = evaluateSyntaxTree(syntaxTree);
  return result;
}

function tokenizeExpression(expression) {
  const tokens = [];
  let currentToken = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (/\d/.test(char)) {
      currentToken += char;
    } else if (/[\+\-\*\/%()\s]/.test(char)) {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = "";
      }
      tokens.push(char);
    }
  }

  if (currentToken) {
    tokens.push(currentToken);
  }

  return tokens;
}

function parseExpression(tokens) {
  let syntaxTree = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (/\d/.test(token)) {
      syntaxTree.push(parseFloat(token));
    } else if (/[\+\-\*\/%]/.test(token)) {
      syntaxTree.push(token);
    } else if (/\(/.test(token)) {
      let subTree = [];
      let count = 1;
      i++;

      while (count > 0) {
        const subToken = tokens[i];
        if (/\(/.test(subToken)) {
          count++;
        } else if (/\)/.test(subToken)) {
          count--;
        }
        if (count > 0) {
          subTree.push(subToken);
        }
        i++;
      }

      i--;
      syntaxTree.push(parseExpression(subTree));
    }
  }

  return syntaxTree;
}

function evaluateSyntaxTree(syntaxTree) {
  let result = 0.0;
  let operator = "+";

  for (let i = 0; i < syntaxTree.length; i++) {
    const node = syntaxTree[i];

    if (Array.isArray(node)) {
      nodeResult = evaluateSyntaxTree(node);
    } else if (typeof node === "number") {
      nodeResult = node;
    } else {
      operator = node;
      continue;
    }

    switch (operator) {
      case "+":
        result += nodeResult;
        break;
      case "-":
        result -= nodeResult;
        break;
      case "*":
        result *= nodeResult;
        break;
      case "/":
        if (nodeResult === 0) {
          warmUser();
          return 0;
        }
        result /= nodeResult;
        break;
      case "%":
        if (nodeResult === 0) {
          warmUser();
          return 0;
        }
        result *= nodeResult / 100;
        break;
    }
  }

  return result;
}
