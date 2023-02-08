const displayInput = document.querySelector("input[name='display']");
const buttons = document.querySelectorAll("input[type='button']");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const decimalPoint = document.querySelector(".decimal");
let allowDecimal = true;
const errorMessage = "Error";

function main() {
  buttonPress();
  keyPress();
}

function buttonPress() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let val = e.target.value;
      if (val === "AC") {
        allowDecimal = true;
        return (displayInput.value = "");
      } else if (val === "DE") {
        if (displayInput.value[displayInput.value.length - 1] == ".") {
          allowDecimal = true;
        }
        displayInput.value = displayInput.value.slice(0, -1);
      } else if (val === "=") {
        displayInput.value = eval(displayInput.value);
        errorHandler();
      } else if (val === ".") {
        checkForDecimal();
      } else {
        if (displayInput.value === "Error") {
          return (displayInput.value = val);
        } else {
          document.getElementById("btnEq").disabled = false;
          return (displayInput.value += val);
        }
      }
    });
  });
}

function errorHandler() {
  if (
    displayInput.value === "Infinity" ||
    displayInput.value === "NaN" ||
    displayInput.value === "Undefined" ||
    displayInput.value === "Error"
  ) {
    document.getElementById("btnEq").disabled = true;
    return (displayInput.value = "Error");
  }
}

function keyPress() {
  document.addEventListener("keydown", function (e) {
    let key = e.key;
    if (key >= "0" && key <= "9") {
      return (displayInput.value += key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      return (displayInput.value += key);
    } else if (key === ".") {
      checkForDecimal();
    } else if (key === "=") {
      displayInput.value = eval(displayInput.value);
      if (
        displayInput.value === "Infinity" ||
        displayInput.value === "NaN" ||
        displayInput.value === "Undefined"
      ) {
        return (displayInput.value = errorMessage);
      }
    } else if (key === "Delete" || key === "Backspace") {
      return (displayInput.value = displayInput.value.slice(0, -1));
    }
  });
}

const checkForDecimal = function () {
  if (allowDecimal) {
    displayInput.value += ".";
    allowDecimal = false;
  } else {
    if (displayInput.value.includes(".")) {
      let lastOperatorIndex = Math.max(
        displayInput.value.lastIndexOf("+"),
        displayInput.value.lastIndexOf("-"),
        displayInput.value.lastIndexOf("*"),
        displayInput.value.lastIndexOf("/")
      );
      if (lastOperatorIndex > displayInput.value.lastIndexOf(".")) {
        allowDecimal = true;
      }
    } else return;
  }
};

main();
