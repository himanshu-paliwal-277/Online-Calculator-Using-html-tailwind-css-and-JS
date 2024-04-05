let input = document.getElementById("input");
let reset_button = document.getElementById("reset_button");
let calculate_button = document.getElementById("calculate_button");
let calculate_sqrt_button = document.getElementById("calculate_sqrt_button");
let change_sign_button = document.getElementById("change_sign_button");
let calculator_button = document.querySelectorAll(".calculator_button");
let input_value;

function entering_value(element) {
  input_value = input.value;
  if (input.value === "0" && element.innerText === "0") {
    return;
  } else if (element.innerText === "." && input.value === "0") {
    input.value = "0.";
  } else if (element.innerText === "." && input.value === "") {
    input.value = "0.";
  }
  //   prevent extra / (divide)
  else if (element.innerText === "/" && input.value === "0") {
    input.value = "0/";
  } else if (
    element.innerText === "/" &&
    input_value[input_value.length - 1] === "/"
  ) {
    input.value = input_value + "";
  }
  //   prevent extra * (multiply)
  else if (element.innerText === "*" && input.value === "0") {
    input.value = "0*";
  } else if (
    element.innerText === "*" &&
    input_value[input_value.length - 1] === "*"
  ) {
    input.value = input_value + "";
  }
  //   prevent extra - (minus)
  else if (element.innerText === "-" && input.value === "0") {
    input.value = "0-";
  } else if (
    element.innerText === "-" &&
    input_value[input_value.length - 1] === "-"
  ) {
    input.value = input_value + "";
  }
  //   prevent extra + (plus)
  else if (element.innerText === "+" && input.value === "0") {
    input.value = "0+";
  } else if (
    element.innerText === "+" &&
    input_value[input_value.length - 1] === "+"
  ) {
    input.value = input_value + "";
  } else if (input.value === "0") {
    input.value = "";
    let current_value = element.innerText;
    input_value = input.value;
    input.value = input_value + current_value;
  } else {
    let current_value = element.innerText;
    input_value = input.value;
    input.value = input_value + current_value;
  }
}

input_value = input.value;

calculator_button.forEach((element) => {
  element.classList.add("bg-gray-700");
  element.classList.add("rounded");
  element.classList.add("hover:bg-gray-600");
  element.classList.add("active:bg-gray-700");
  element.classList.add("w-full");
  element.classList.add("h-full");
  element.classList.add("flex");
  element.classList.add("justify-center");
  element.classList.add("items-center");
});

// calculating the input expression
function calculate() {
  let expression = input.value;
  let result = eval(expression);
  input.value = result;
}
calculate_button.addEventListener("click", calculate);

// deleting the text of input
reset_button.addEventListener("click", () => {
  input.value = "0";
  input_value = 0;
});

// preveting the character input
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculate();
  }
  if (
    [46, 8, 9, 27, 13, 110, 190, 187, 189].indexOf(event.keyCode) !== -1 ||
    (event.keyCode === 65 &&
      (event.ctrlKey === true || event.metaKey === true)) ||
    (event.keyCode === 67 &&
      (event.ctrlKey === true || event.metaKey === true)) ||
    (event.keyCode === 88 &&
      (event.ctrlKey === true || event.metaKey === true)) ||
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    return;
  }
  // Ensure that it is a number, an operator, and stop the keypress for others
  if (
    (event.shiftKey && [187, 189].indexOf(event.keyCode) === -1) ||
    (!event.shiftKey &&
      (event.keyCode < 48 || event.keyCode > 57) &&
      (event.keyCode < 96 || event.keyCode > 105) &&
      [106, 107, 109, 111, 189, 187].indexOf(event.keyCode) === -1)
  ) {
    // *, +, -, /, -, =
    event.preventDefault();
  }
});

input.addEventListener("click", () => {
  input.value = "";
});

// calculate_sqrt_button
calculate_sqrt_button.addEventListener("click", () => {
  input_value = input.value;
  let result = Math.sqrt(input_value);
  // result = result.toFixed(13);
  input.value = result;
});

// change_sign_button
change_sign_button.addEventListener("click", () => {
  input_value = 0 - input.value;
  input.value = input_value;
});
