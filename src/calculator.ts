export class Calculator {
  private display = "0";
  private accumulator: number | null = null;
  private pendingOperator: string | null = null;
  private freshEntry = false;

  getDisplay(): string {
    return this.display;
  }

  press(key: string): void {
    if (key === "C") {
      this.reset();
      return;
    }

    if (key === "=") {
      this.applyPendingOperation();
      return;
    }

    if (key === "+" || key === "-" || key === "*" || key === "/") {
      this.stageOperation(key);
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
  }

  private stageOperation(operator: string): void {
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

  private applyPendingOperation(): void {
    if (this.pendingOperator === null || this.accumulator === null) {
      return;
    }

    const current = Number(this.display);
    let result: number;
    switch (this.pendingOperator) {
      case "+":
        result = this.accumulator + current;
        break;
      case "-":
        result = this.accumulator - current;
        break;
      case "*":
        result = this.accumulator * current;
        break;
      case "/":
        result = this.accumulator / current;
        break;
      default:
        return;
    }
    this.display = String(result);
    this.accumulator = null;
    this.pendingOperator = null;
    this.freshEntry = true;
  }
}
