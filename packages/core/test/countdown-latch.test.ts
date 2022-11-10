import { CountDownLatch } from "../countdown-latch";

describe("countdown-latch", () => {
  test("getter", () => {
    const latch = new CountDownLatch(5);
    expect(latch.count).toEqual(5);
  });

  test("coundown", () => {
    const latch = new CountDownLatch(5);
    latch.countdown();
    expect(latch.count).toEqual(4);
  });

  test("should locked when count > 0", () => {
    const latch = new CountDownLatch(5);
    expect(latch.locked()).toEqual(true);
  });

  test("should released when count = 0", () => {
    const count = 5;
    const latch = new CountDownLatch(count);
    for (let index = 0; index < count; index++) {
      latch.countdown();
    }
    expect(latch.released()).toEqual(true);
  });
});
