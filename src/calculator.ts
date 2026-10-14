const OPERATORS = new Set(["+", "-", "*", "/"]);

export class Calculator {
  private display = "0";
  private accumulator: number | null = null;
  private pendingOperator: string | null = null;
  private freshEntry = false;
  private inError = false;

  getDisplay(): string {
    return this.display;
  }

  press(key: string): void {
    if (this.inError && key !== "C") {
      return;
    }

    if (key === "C") {
      this.reset();
      return;
    }

    if (key === "=") {
      this.applyPendingOperation();
      return;
    }

    if (OPERATORS.has(key)) {
      this.stageOperation(key);
      return;
    }

    if (key === ".") {
      this.enterDecimalPoint();
      return;
    }

    if (key >= "0" && key <= "9") {
      this.enterDigit(key);
    }
  }

  private reset(): void {
    this.display = "0";
    this.accumulator = null;
    this.pendingOperator = null;
    this.freshEntry = false;
    this.inError = false;
  }

  private stageOperation(operator: string): void {
    if (this.pendingOperator !== null && !this.freshEntry) {
      this.applyPendingOperation();
    }

    this.accumulator = Number(this.display);
    this.pendingOperator = operator;
    this.freshEntry = true;
  }

  private enterDigit(digit: string): void {
    if (this.freshEntry) {
      this.display = digit;
      this.freshEntry = false;
      return;
    }

    this.display = this.display === "0" ? digit : this.display + digit;
  }

  private enterDecimalPoint(): void {
    if (this.freshEntry) {
      this.display = "0.";
      this.freshEntry = false;
      return;
    }

    if (!this.display.includes(".")) {
      this.display += ".";
    }
  }

  private applyPendingOperation(): void {
    if (this.pendingOperator === null || this.accumulator === null) {
      return;
    }

    const current = Number(this.display);
    const result = this.compute(this.accumulator, this.pendingOperator, current);
    if (result === null) {
      this.showError();
      return;
    }

    this.display = String(result);
    this.accumulator = null;
    this.pendingOperator = null;
    this.freshEntry = true;
  }

  private compute(
    left: number,
    operator: string,
    right: number,
  ): number | null {
    switch (operator) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        if (right === 0) {
          return null;
        }
        return left / right;
      default:
        return null;
    }
  }

  private showError(): void {
    this.display = "Error";
    this.accumulator = null;
    this.pendingOperator = null;
    this.freshEntry = true;
    this.inError = true;
  }
}
