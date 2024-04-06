let input = document.getElementById("input");
let reset_button = document.getElementById("reset_button");
let calculate_button = document.getElementById("calculate_button");
let calculate_sqrt_button = document.getElementById("calculate_sqrt_button");
let change_sign_button = document.getElementById("change_sign_button");
let calculation_preview = document.getElementById("calculation_preview");
let calculator_button = document.querySelectorAll(".calculator_button");
let input_value;
let click_sound = new Audio("./Assets/click-button-sound.wav");

// function to take input and display in input section of calculator
function entering_value(element) {
  click_sound.play();
  input_value = input.value;
  if (input.value === "0" && element.innerText === "0") {
    return;
  }
  // checking if an operator is already exists
  else if (
    input_value[input_value.length - 1] === "/" ||
    input_value[input_value.length - 1] === "*" ||
    input_value[input_value.length - 1] === "+" ||
    input_value[input_value.length - 1] === "-"
  ) {
    if (
      element.innerText === "/" ||
      element.innerText === "*" ||
      element.innerText === "+" ||
      element.innerText === "-"
    ) {
      input_value = input_value.slice(0, -1);
      input_value = input_value + element.innerText;
      input.value = input_value;
    } else {
      input_value = input_value + element.innerText;
      input.value = input_value;
    }
  } else if (element.innerText === "." && input.value === "0") {
    input.value = "0.";
  } else if (element.innerText === "." && input.value === "") {
    input.value = "0.";
  } else if (element.innerText === "/" && input.value === "0") {
    input.value = "0/";
  } else if (element.innerText === "*" && input.value === "0") {
    input.value = "0*";
  } else if (element.innerText === "-" && input.value === "0") {
    input.value = "0-";
  } else if (element.innerText === "+" && input.value === "0") {
    input.value = "0+";
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
  calculation_preview.innerText = eval(input.value);
}

input_value = input.value;

// adding some styling to button of calculator
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

// This function is delete the last element of string when user click back button
function delete_last_element() {
  click_sound.play();
  input_value = input.value;
  input_value = input_value.slice(0, -1);
  input.value = input_value;
  if (eval(input.value) === undefined) {
    calculation_preview.innerText = "";
  } else {
    calculation_preview.innerText = eval(input.value);
  }
}

// This function calculating the input expression or showing the result in input section
function calculate() {
  let expression = input.value;
  let result = eval(expression);
  input.value = result;
  click_sound.play();
  calculation_preview.innerText = "";
}

calculate_button.addEventListener("click", calculate);

// deleting the text of input (when AC button is clicked)
reset_button.addEventListener("click", () => {
  input.value = "0";
  input_value = 0;
  click_sound.play();
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

// The below code is calculate the square root when user click the sqrt button
calculate_sqrt_button.addEventListener("click", () => {
  input_value = input.value;
  let result = Math.sqrt(input_value);
  // result = result.toFixed(13);
  input.value = result;
  click_sound.play();
  calculation_preview.innerText = "";
});

// The below code change the sign of input (like- if negative then positive)
change_sign_button.addEventListener("click", () => {
  input_value = 0 - input.value;
  input.value = input_value;
  click_sound.play();
});
