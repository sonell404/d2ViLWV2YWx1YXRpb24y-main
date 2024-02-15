import { html, fixture, expect } from "@open-wc/testing";
// Import your NumericInput component
import NumericInput from "./numeric-input";

describe("Numeric Input Component", () => {
  let inputElement;

  beforeEach(() => {
    // Create a mock DOM with a single input element
    document.body.innerHTML = '<input type="text" class="c-numeric-input" />';
    // Initialize NumericInput component
    NumericInput.init();
    // Select the input element
    inputElement = document.querySelector(".c-numeric-input");
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = "";
  });

  // RESET TO INITIAL STATE FROM ERROR OR VALID STATES
  it("should reset element from error state when focused", async () => {
    // Set initial state to error
    inputElement.classList.add("c-numeric-input--error");
    // Trigger focus event
    inputElement.dispatchEvent(new Event("focus"));
    // Wait for component to update
    await inputElement.updateComplete;
    // Check if the error state is removed
    expect(inputElement.classList.contains("c-numeric-input--error")).to.be
      .false;
  });
  it("should reset element from valid state when focused", async () => {
    // Set initial state to error
    inputElement.classList.add("c-numeric-input--valid");
    // Trigger focus event
    inputElement.dispatchEvent(new Event("focus"));
    // Wait for component to update
    await inputElement.updateComplete;
    // Check if the error state is removed
    expect(inputElement.classList.contains("c-numeric-input--valid")).to.be
      .false;
  });

  // SET INPUT VALUE TO VALID FORMAT FROM LEADING DOT OR LEADING ZERO
  it("should change input value to valid format on blur", async () => {
    // Set input value to invalid format
    inputElement.value = ".1";
    // Trigger focus event
    inputElement.dispatchEvent(new Event("blur"));
    // Wait for component to update
    await inputElement.updateComplete;
    // Check if the value changes to valid format
    expect(inputElement.value).to.equal("0.1");
  });
  it("should change input value to valid format on blur", async () => {
    // Set input value to invalid format
    inputElement.value = "01";
    // Trigger focus event
    inputElement.dispatchEvent(new Event("blur"));
    // Wait for component to update
    await inputElement.updateComplete;
    // Check if the value changes to valid format
    expect(inputElement.value).to.equal("1");
  });

  // ADD ERROR STATE FOR INVALID INPUT
  it("should add error state for invalid input with alpha characters", async () => {
    // Set input value to invalid
    inputElement.value = "abc";
    // Trigger input event
    inputElement.dispatchEvent(new Event("input"));
    await inputElement.updateComplete; // Wait for component to update
    // Check if error state is added
    expect(inputElement.classList.contains("c-numeric-input--error")).to.be
      .true;
  });
  it("should add error state for invalid input with special characters", async () => {
    // Set input value to invalid
    inputElement.value = "-*";
    // Trigger input event
    inputElement.dispatchEvent(new Event("input"));
    await inputElement.updateComplete; // Wait for component to update
    // Check if error state is added
    expect(inputElement.classList.contains("c-numeric-input--error")).to.be
      .true;
  });

  // ADD VALID STATE FOR VALID INPUT
  it("should add valid state for valid input", async () => {
    // Set input value to valid
    inputElement.value = "123";
    // Trigger input event
    inputElement.dispatchEvent(new Event("input"));
    await inputElement.updateComplete; // Wait for component to update
    // Check if valid state is added
    expect(inputElement.classList.contains("c-numeric-input--valid")).to.be
      .true;
  });

  // RESET ELEMENT WHEN INPUT VALUE IS CLEARED
  it("should reset element when input value is cleared", async () => {
    // Set initial state to valid
    inputElement.classList.add("c-numeric-input--valid");
    // Clear input value
    inputElement.value = "";
    // Trigger input event
    inputElement.dispatchEvent(new Event("input"));
    await inputElement.updateComplete; // Wait for component to update
    // Check if the element is reset to initial state
    expect(inputElement.classList.contains("c-numeric-input--valid")).to.be
      .false;
  });
  it("should reset element when input value is cleared", async () => {
    // Set initial state to error
    inputElement.classList.add("c-numeric-input--error");
    // Clear input value
    inputElement.value = "";
    // Trigger input event
    inputElement.dispatchEvent(new Event("input"));
    await inputElement.updateComplete; // Wait for component to update
    // Check if the element is reset to initial state
    expect(inputElement.classList.contains("c-numeric-input--valid")).to.be
      .false;
  });
});
