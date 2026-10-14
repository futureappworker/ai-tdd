export class Calculator {
  private display = "0";

  getDisplay(): string {
    return this.display;
  }

  press(key: string): void {
    if (key === "C") {
      this.display = "0";
      return;
    }

    if (key >= "0" && key <= "9") {
      this.display = this.display === "0" ? key : this.display + key;
    }
  }
}
