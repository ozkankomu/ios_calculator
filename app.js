//!  calculator      //

const currentDisplay = document.querySelector(".current-display");
const previousDisplay = document.querySelector(".previous-display");
const keys = document.querySelector(".numbers");
let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
  currentDisplay.innerText = displayValue;
}

keys.addEventListener("click", (e) => {
  const element = e.target;
  if (!element.classList.contains("button")) return;

  const value = element.innerText;
  console.log(value);

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
    case "%":
      handleOperator(value);
      break;

    case "±":
      eksi();
      break;

    case ".":
      inputDecimal();
      break;
    case "AC":
      clear();
      break;
    default:
      inputNumber(element.innerText);
  }
  updateDisplay();

  // if (element.classList.contains("function")) {
  //   return;
  // }

  // console.log("number", element.innerText);
});

//!  //////////   functions  ////// ///////

function inputNumber(num) {
  if (waitingForSecondValue) {
    previousDisplay.innerText = displayValue;
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function clear() {
  displayValue = "0";
  firstValue = "0";
  previousDisplay.innerText = "0";
}

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }
  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = `${parseFloat(result.toFixed(5))}`;
    firstValue = result;
  }
  waitingForSecondValue = true;
  operator = nextOperator;
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "/") {
    return first / second;
  } else if (operator === "%") {
    return (first * second) / 100;
  }
  return second;
}

function eksi() {
  if (firstValue == displayValue) {
    displayValue = displayValue * -1;
    firstValue = displayValue;
  } else {
    displayValue = displayValue * -1;
  }
}
//!   clock    section   ///////

// DOM Elements
let hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const displayEl = document.querySelector(".display");
const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");

// Set up the time
const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  if (currentHour > 12) {
    currentHour -= 12;
  }

  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, "0");
};
setInterval(updateTime, 1000);
updateTime();
