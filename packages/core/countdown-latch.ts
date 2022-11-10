export class CountDownLatch {
  private _count: number;
  get count() {
    return this._count;
  }

  /**
   *@description Constructs a CountDownLatch initialized with the given count.
   **/
  constructor(count: number) {
    this._count = count;
  }

  countdown = () => {
    this._count--;
  };

  locked = () => {
    return this.count > 0;
  };

  released = () => {
    return this.locked() === false;
  };
}
