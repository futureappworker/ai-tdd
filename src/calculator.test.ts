import { describe, expect, test } from "vitest";
import { Calculator } from "./calculator.js";

describe("Calculator", () => {
  test("new calculator shows zero on the display", () => {
    const calculator = new Calculator();

    expect(calculator.getDisplay()).toBe("0");
  });
});
