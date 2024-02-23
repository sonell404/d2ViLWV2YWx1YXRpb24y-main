/*
 * Numeric Input Component
 *   HTML (initial state): <input type="text" class="c-numeric-input" />
 *
 *   Requirement:
 *
 *   - should only accept numeric value only such as: 1, 1.2, -5, or 1000
 *
 *   - if user enters leading zero, or .  when user moves focus away from the input, it should
 *     change to correct format:
 *       .1 ==> 0.1 and 01 => 1
 *
 *   - if user enter invalid character/value, HTML should change to this
 *       <input type="text" class="c-numeric-input c-numeric-input--error" />
 *       <span class="c-numeric-input__error-msg">invalid input</span>
 *
 *   - if user enter valid value and move focus away from the input HTML should change to this:
 *       <input type="text" class="c-numeric-input c-numeric-input--valid" />
 *
 *   - if user focus on the input or user clear value from the input,
 *     HTML should return to initial stage
 *
 * Lastly, please add some css for c-numeric-input--error and c-numeric-input--valid to show
 * red or green border to the input
 * */

const NumericInput = {
  // Function to initialize the component
  init: () => {
    document.querySelectorAll(".c-numeric-input").forEach((elem) => {
      // Add event listeners to input element
      elem.addEventListener("input", NumericInput.handleInput);
      elem.addEventListener("focus", NumericInput.handleFocus);
      elem.addEventListener("blur", NumericInput.handleBlur);
    });
  },

  // Function to handle input event
  handleInput: (event) => {
    const value = event.target.value.trim();

    // Check if the value is empty
    if (value === "") {
      NumericInput.resetElement(event);
    } else if (NumericInput.isValidInput(value)) {
      // Remove error state
      NumericInput.resetElement(event);
      // Add valid class to input element
      event.target.classList.add("c-numeric-input--valid");
    } else {
      // Set error state
      NumericInput.setErrorState(event);
    }
  },

  // Function to handle focus event
  handleFocus: () => {
    NumericInput.resetElement(event);
  },

  // Function to handle blur event
  handleBlur: (event) => {
    var value = event.target.value.trim();

    // Check if the value is valid
    if (NumericInput.isValidInput(value)) {
      // Check if the value has a leading zero
      if (
        value.startsWith("0") &&
        value.length > 1 &&
        value.indexOf(".") === -1
      ) {
        // Remove leading zeros
        value = String(parseFloat(value));
      }

      // Check if the value has a leading dot
      if (value.startsWith(".")) {
        // Add a leading zero
        value = "0" + value;
      }

      // Remove error state
      NumericInput.resetElement(event);
      // Update the input value
      event.target.value = value;

      // Add valid class to input element once the value is not empty, is valid, formatted, and the error message span is removed
      value !== ""
        ? event.target.classList.add("c-numeric-input--valid")
        : null;
    } else {
      NumericInput.setErrorState(event);
    }
  },

  /**
   * ------------------
   * UTITLITY FUNCTIONS
   * ------------------
   */
  // Valid input regex - allows for minus sign, digits, decimal point
  validInputRegex: /^-?\d*\.?\d*$/,

  // Function to check if input is valid
  isValidInput(value) {
    return this.validInputRegex.test(value);
  },

  // Function to set error state
  setErrorState(event) {
    const inputElement = event.target;
    // Add error classes to input element
    inputElement.classList.add("c-numeric-input--error");
    // Remove valid class from input element
    inputElement.classList.remove("c-numeric-input--valid");

    // Create error message span if one does not exist
    const errorSpan =
      document.querySelector(".c-numeric-input__error-msg") ||
      document.createElement("span");
    // Add class to error span
    errorSpan.classList.add("c-numeric-input__error-msg");
    // Add aria-label to error span
    errorSpan.setAttribute("aria-label", "invalid input");
    // Add aria-invalid to error span
    errorSpan.setAttribute("aria-invalid", "true");
    // Add error message to error span
    errorSpan.textContent = "invalid input";

    // Use insertAdjacentElement instead of insertAdjacentHTML due to better security
    // insertAdjacentHTML may allow for XSS attacks
    inputElement.insertAdjacentElement("afterend", errorSpan);
  },

  // Function to reset element
  resetElement(event) {
    const inputElement = event.target;
    // Remove error classes from input element
    inputElement.classList.remove("c-numeric-input--error");
    // Remove valid class from input element
    inputElement.classList.remove("c-numeric-input--valid");

    // Locate error span in document and remove
    document.querySelector(".c-numeric-input__error-msg")?.remove();
  },
};
document.addEventListener("DOMContentLoaded", NumericInput.init);

// default export
export default NumericInput;
