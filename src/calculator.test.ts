import { describe, expect, test } from "vitest";
import { Calculator } from "./calculator.js";

describe("Calculator", () => {
  test("new calculator shows zero on the display", () => {
    const calculator = new Calculator();

    expect(calculator.getDisplay()).toBe("0");
  });

  test("pressing a digit shows that digit on the display", () => {
    const calculator = new Calculator();

    calculator.press("7");

    expect(calculator.getDisplay()).toBe("7");
  });

  test("pressing another digit appends to the display", () => {
    const calculator = new Calculator();

    calculator.press("7");
    calculator.press("3");

    expect(calculator.getDisplay()).toBe("73");
  });

  test("pressing clear resets the display to zero", () => {
    const calculator = new Calculator();

    calculator.press("9");
    calculator.press("C");

    expect(calculator.getDisplay()).toBe("0");
  });

  test("pressing equals after addition shows the sum on the display", () => {
    const calculator = new Calculator();

    calculator.press("2");
    calculator.press("+");
    calculator.press("3");
    calculator.press("=");

    expect(calculator.getDisplay()).toBe("5");
  });

  test("pressing equals after subtraction shows the difference on the display", () => {
    const calculator = new Calculator();

    calculator.press("9");
    calculator.press("-");
    calculator.press("4");
    calculator.press("=");

    expect(calculator.getDisplay()).toBe("5");
  });

  test("pressing equals after multiplication shows the product on the display", () => {
    const calculator = new Calculator();

    calculator.press("6");
    calculator.press("*");
    calculator.press("7");
    calculator.press("=");

    expect(calculator.getDisplay()).toBe("42");
  });

  test("pressing equals after division shows the quotient on the display", () => {
    const calculator = new Calculator();

    calculator.press("8");
    calculator.press("/");
    calculator.press("2");
    calculator.press("=");

    expect(calculator.getDisplay()).toBe("4");
  });

  test("pressing another operator chains the pending calculation", () => {
    const calculator = new Calculator();

    calculator.press("2");
    calculator.press("+");
    calculator.press("3");
    calculator.press("+");
    calculator.press("4");
    calculator.press("=");

    expect(calculator.getDisplay()).toBe("9");
  });

  test("pressing an operator after equals continues from the result", () => {
    const calculator = new Calculator();

    calculator.press("2");
    calculator.press("+");
    calculator.press("3");
    calculator.press("=");
    calculator.press("+");
    calculator.press("2");
    calculator.press("=");

    expect(calculator.getDisplay()).toBe("7");
  });

  test("pressing decimal then digits shows a decimal number on the display", () => {
    const calculator = new Calculator();

    calculator.press("1");
    calculator.press(".");
    calculator.press("5");

    expect(calculator.getDisplay()).toBe("1.5");
  });

  test("pressing equals after dividing by zero shows error on the display", () => {
    const calculator = new Calculator();

    calculator.press("8");
    calculator.press("/");
    calculator.press("0");
    calculator.press("=");

    expect(calculator.getDisplay()).toBe("Error");
  });
});
