export type CalculatorButton =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "+"
  | "-"
  | "*"
  | "/"
  | "="
  | "C"
  | ".";

type Operator = "+" | "-" | "*" | "/";

const OPERATORS = new Set<Operator>(["+", "-", "*", "/"]);
const DIGITS = new Set<CalculatorButton>([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]);

function isDigit(button: CalculatorButton): button is Exclude<CalculatorButton, Operator | "=" | "C" | "."> {
  return DIGITS.has(button);
}

function isOperator(button: CalculatorButton): button is Operator {
  return OPERATORS.has(button as Operator);
}

function applyOperator(a: number, b: number, op: Operator): number | null {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return null;
      }
      return a / b;
  }
}

function formatResult(value: number): string {
  const rounded = Math.round(value * 1e10) / 1e10;
  return String(rounded);
}

export class Calculator {
  private screen = "0";
  private accumulator: number | null = null;
  private pendingOperator: Operator | null = null;
  private waitingForOperand = false;
  private error = false;

  press(button: CalculatorButton): void {
    if (this.error) {
      if (button === "C") {
        this.reset();
      }
      return;
    }

    if (button === "C") {
      this.reset();
      return;
    }

    if (button === "=") {
      this.evaluate();
      return;
    }

    if (isOperator(button)) {
      this.pressOperator(button);
      return;
    }

    if (button === ".") {
      this.pressDecimal();
      return;
    }

    if (isDigit(button)) {
      this.pressDigit(button);
    }
  }

  display(): string {
    return this.screen;
  }

  private reset(): void {
    this.screen = "0";
    this.accumulator = null;
    this.pendingOperator = null;
    this.waitingForOperand = false;
    this.error = false;
  }

  private pressDigit(digit: string): void {
    if (this.waitingForOperand) {
      this.screen = digit;
      this.waitingForOperand = false;
      return;
    }

    if (this.screen === "0") {
      this.screen = digit;
      return;
    }

    this.screen += digit;
  }

  private pressDecimal(): void {
    if (this.waitingForOperand) {
      this.screen = "0.";
      this.waitingForOperand = false;
      return;
    }

    if (!this.screen.includes(".")) {
      this.screen += ".";
    }
  }

  private pressOperator(op: Operator): void {
    const current = Number.parseFloat(this.screen);

    if (this.accumulator !== null && this.pendingOperator !== null && !this.waitingForOperand) {
      const result = applyOperator(this.accumulator, current, this.pendingOperator);
      if (result === null) {
        this.showError();
        return;
      }
      this.accumulator = result;
      this.screen = formatResult(result);
    } else {
      this.accumulator = current;
    }

    this.pendingOperator = op;
    this.waitingForOperand = true;
  }

  private evaluate(): void {
    if (this.pendingOperator === null || this.accumulator === null) {
      return;
    }

    const current = Number.parseFloat(this.screen);
    const result = applyOperator(this.accumulator, current, this.pendingOperator);

    if (result === null) {
      this.showError();
      return;
    }

    this.screen = formatResult(result);
    this.accumulator = result;
    this.pendingOperator = null;
    this.waitingForOperand = true;
  }

  private showError(): void {
    this.screen = "Error";
    this.error = true;
    this.accumulator = null;
    this.pendingOperator = null;
    this.waitingForOperand = false;
  }
}
