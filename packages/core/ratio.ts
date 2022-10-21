export class Ratio {
  private _value = 0;
  get value() {
    return this._value;
  }
  set value(ratio: number) {
    try {
      this.verifyRatio(ratio);
      this._value = ratio;
    } catch (error) {
      throw error;
    }
  }

  constructor(ratio = 0) {
    this.value = ratio;
  }

  private verifyRatio(ratio: number) {
    if (ratio < 0 || ratio > 1) {
      throw `ratio should be [0, 1], but current ratio is ${ratio}.`;
    }
  }
}
