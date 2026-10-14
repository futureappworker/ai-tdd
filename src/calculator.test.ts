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
});
