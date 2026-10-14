export class Calculator {
  private display = "0";

  getDisplay(): string {
    return this.display;
  }

  press(key: string): void {
    if (key >= "0" && key <= "9") {
      this.display = key;
    }
  }
}
