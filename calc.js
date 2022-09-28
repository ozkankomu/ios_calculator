const keys1 = document.querySelector(".calc-body");
const screen = document.querySelector(".calc-screen");
const previosuScreen = document.querySelector("#oparator");

let firstValue1 = null;
let operator1 = null;
let displayValue1 = 0;
let ikinciSayiBekleniyor = false;

updateDisplay1();

function updateDisplay1() {
  screen.innerText = displayValue1;
}

keys1.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn")) return;
  const num1 = e.target;
  const value1 = num1.innerText;
  switch (value1) {
    case "+":
    case "-":
    case "x":
    case "÷":
    case "%":
    case "=":
      hesapla(value1);
      break;

    case "AC":
      clear1();
      break;

    case ".":
      inputDecimal1();
      break;

    case "±":
      minus();
      break;

    default:
      console.log("input");
      inputkey(num1.innerText);
  }
  updateDisplay1();
});

function inputkey(num1) {
  if (ikinciSayiBekleniyor) {
    console.log(ikinciSayiBekleniyor);
    displayValue1 = num1;
    ikinciSayiBekleniyor = false;
  } else {
    displayValue1 = displayValue1 === 0 ? num1 : displayValue1 + num1;
  }
}

function hesapla(nextoperator1) {
  const value1 = parseFloat(displayValue1);
  if (operator1 && ikinciSayiBekleniyor) {
    operator1 = nextoperator1;
    return;
  }
  if (firstValue1 === null) {
    firstValue1 = value1;
  } else if (operator1) {
    const result = calculate(firstValue1, value1, operator1);
    displayValue1 = `${parseFloat(result.toFixed(5))}`;
    firstValue1 = result;
    previosuScreen.innerText = `${parseFloat(result.toFixed(5))}`;
  }
  ikinciSayiBekleniyor = true;
  operator1 = nextoperator1;
}

function calculate(first, second, operator1) {
  if (operator1 === "+") {
    return first + second;
  } else if (operator1 === "-") {
    return first - second;
  } else if (operator1 === "x") {
    return first * second;
  } else if (operator1 === "÷") {
    return first / second;
  } else if (operator1 === "%") {
    return (first * second) / 100;
  }
  return second;
}

function clear1() {
  displayValue1 = 0;
  firstValue1 = null;
  previosuScreen.innerText = 0;
}

function inputDecimal1() {
  if (!displayValue1.includes(".")) {
    displayValue1 += ".";
  }
}

function minus() {
  if (firstValue1 == displayValue1) {
    displayValue1 = displayValue1 * -1;
    firstValue1 = displayValue1;
  } else {
    displayValue1 = displayValue1 * -1;
  }
}
