// Grab elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// Helper: sanitize display text
const formatOutput = (str) => str.replace(/×/g, "*").replace(/÷/g, "/");

// Main click handler
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const { key, operator, action } = btn.dataset;

    // 1) Number or dot
    if (key) {
      display.value = display.value === "0" ? key : display.value + key;
      return;
    }

    // 2) Operator
    if (operator) {
      display.value += ` ${operator} `;
      return;
    }

    // 3) Special actions
    switch (action) {
      case "clear":
        display.value = "";
        break;
      case "delete":
        display.value = display.value.slice(0, -1);
        break;
      case "percent":
        if (display.value) display.value = eval(formatOutput(display.value)) / 100;
        break;
      case "equals":
        try {
          display.value = eval(formatOutput(display.value));
        } catch {
          display.value = "Error";
        }
        break;
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const allowedKeys = "0123456789.+-*/%";
  if (allowedKeys.includes(e.key)) {
    e.preventDefault();
    display.value += e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    try {
      display.value = eval(formatOutput(display.value));
    } catch {
      display.value = "Error";
    }
  }
  if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
  if (e.key === "Escape") {
    display.value = "";
  }
});
