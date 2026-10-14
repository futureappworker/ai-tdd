import { describe, expect, test } from "vitest";
import { Calculator } from "./calculator.js";

describe("Calculator", () => {
  test("new calculator shows zero on the display", () => {
    // Arrange
    const calculator = new Calculator();

    // Act
    const display = calculator.display();

    // Assert
    expect(display).toBe("0");
  });

  test("pressing a digit shows that digit on the display", () => {
    // Arrange
    const calculator = new Calculator();

    // Act
    calculator.press("7");

    // Assert
    expect(calculator.display()).toBe("7");
  });

  test("pressing another digit appends to the display", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("7");

    // Act
    calculator.press("2");

    // Assert
    expect(calculator.display()).toBe("72");
  });

  test("pressing clear resets the display to zero", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("9");

    // Act
    calculator.press("C");

    // Assert
    expect(calculator.display()).toBe("0");
  });

  test("pressing equals after addition shows the sum on the display", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("3");
    calculator.press("+");
    calculator.press("4");

    // Act
    calculator.press("=");

    // Assert
    expect(calculator.display()).toBe("7");
  });

  test("pressing equals after subtraction shows the difference on the display", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("9");
    calculator.press("-");
    calculator.press("4");

    // Act
    calculator.press("=");

    // Assert
    expect(calculator.display()).toBe("5");
  });

  test("pressing equals after multiplication shows the product on the display", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("6");
    calculator.press("*");
    calculator.press("7");

    // Act
    calculator.press("=");

    // Assert
    expect(calculator.display()).toBe("42");
  });

  test("pressing equals after division shows the quotient on the display", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("8");
    calculator.press("/");
    calculator.press("2");

    // Act
    calculator.press("=");

    // Assert
    expect(calculator.display()).toBe("4");
  });

  test("pressing another operator chains the pending calculation", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("3");
    calculator.press("+");
    calculator.press("4");
    calculator.press("+");

    // Act
    calculator.press("2");

    // Assert
    expect(calculator.display()).toBe("2");
  });

  test("pressing an operator after equals continues from the result", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("2");
    calculator.press("+");
    calculator.press("3");
    calculator.press("=");
    calculator.press("+");

    // Act
    calculator.press("4");
    calculator.press("=");

    // Assert
    expect(calculator.display()).toBe("9");
  });

  test("pressing decimal then digits shows a decimal number on the display", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press(".");

    // Act
    calculator.press("5");

    // Assert
    expect(calculator.display()).toBe("0.5");
  });

  test("pressing equals after dividing by zero shows error on the display", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("8");
    calculator.press("/");
    calculator.press("0");

    // Act
    calculator.press("=");

    // Assert
    expect(calculator.display()).toBe("Error");
  });

  test("pressing clear during a pending operation starts a fresh calculation", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("3");
    calculator.press("+");
    calculator.press("4");

    // Act
    calculator.press("C");
    calculator.press("1");

    // Assert
    expect(calculator.display()).toBe("1");
  });

  test("pressing equals after adding decimal numbers shows the sum", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("1");
    calculator.press(".");
    calculator.press("5");
    calculator.press("+");
    calculator.press("2");
    calculator.press(".");

    // Act
    calculator.press("5");
    calculator.press("=");

    // Assert
    expect(calculator.display()).toBe("4");
  });

  test("pressing equals after subtraction can show a negative result", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("3");
    calculator.press("-");
    calculator.press("5");

    // Act
    calculator.press("=");

    // Assert
    expect(calculator.display()).toBe("-2");
  });

  test("pressing clear after error restores normal input", () => {
    // Arrange
    const calculator = new Calculator();
    calculator.press("1");
    calculator.press("/");
    calculator.press("0");
    calculator.press("=");
    calculator.press("C");

    // Act
    calculator.press("8");

    // Assert
    expect(calculator.display()).toBe("8");
  });
});
