export class CountDownLatch {
  #count: number;
  get count() {
    return this.#count;
  }

  /**
   *@description Constructs a CountDownLatch initialized with the given count.
   **/
  constructor(count: number) {
    this.#count = count;
  }

  countdown = () => {
    this.#count--;
  };

  get locked() {
    return this.count > 0;
  };

  get released() {
    return this.locked === false;
  };
}
