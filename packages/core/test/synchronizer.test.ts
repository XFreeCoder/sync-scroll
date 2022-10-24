import { Ratio } from "../ratio";
import { Synchronizer } from "../synchronizer";
import { ScrollableElement, ScrollHandler, ScrollRatio } from "../types";

class FakeElement implements ScrollableElement {
  ratio: ScrollRatio;
  handler: ScrollHandler | null;

  constructor() {
    const verticalRatio = new Ratio();
    const horizontalRatio = new Ratio();
    this.ratio = { verticalRatio, horizontalRatio };
    this.handler = null;
  }

  scrollTo(ratio: ScrollRatio) {
    const { verticalRatio, horizontalRatio } = ratio;
    this.ratio = {
      verticalRatio: verticalRatio ?? this.ratio.verticalRatio,
      horizontalRatio: horizontalRatio ?? this.ratio.horizontalRatio,
    };
    this.handler?.(this.ratio);
  }

  registerScrollHandler(handler: ScrollHandler) {
    this.handler = handler;
  }

  unregisterScrollHandler() {
    this.handler = null;
  }
}

describe("synchronizer", () => {
  test("sync scroll vertical", () => {
    const synchronizer = new Synchronizer({ direction: "vertical" });
    const elementA = new FakeElement();
    const elementB = new FakeElement();
    synchronizer.register(elementA);
    synchronizer.register(elementB);

    elementA.scrollTo({
      horizontalRatio: new Ratio(0.2),
      verticalRatio: new Ratio(0.3),
    });

    expect(elementB.ratio.verticalRatio.value === 0.2);
    expect(elementB.ratio.horizontalRatio.value === 0);
  });

  test("sync scroll horizontal", () => {
    const synchronizer = new Synchronizer({ direction: "horizontal" });
    const elementA = new FakeElement();
    const elementB = new FakeElement();
    synchronizer.register(elementA);
    synchronizer.register(elementB);

    elementA.scrollTo({
      horizontalRatio: new Ratio(0.2),
      verticalRatio: new Ratio(0.3),
    });

    expect(elementB.ratio.verticalRatio.value === 0);
    expect(elementB.ratio.horizontalRatio.value === 0.3);
  });

  test("sync scroll both", () => {
    const synchronizer = new Synchronizer({ direction: "both" });
    const elementA = new FakeElement();
    const elementB = new FakeElement();
    synchronizer.register(elementA);
    synchronizer.register(elementB);

    elementA.scrollTo({
      horizontalRatio: new Ratio(0.2),
      verticalRatio: new Ratio(0.3),
    });

    expect(elementB.ratio.verticalRatio.value === 0.2);
    expect(elementB.ratio.horizontalRatio.value === 0.3);
  });

  test("unregister", () => {
    const synchronizer = new Synchronizer({});
    const elementA = new FakeElement();
    const elementB = new FakeElement();
    synchronizer.register(elementA);
    synchronizer.register(elementB);

    elementA.scrollTo({ verticalRatio: new Ratio(0.2) });
    expect(elementB.ratio.verticalRatio.value === 0.2);

    synchronizer.unregister(elementB);

    elementA.scrollTo({ verticalRatio: new Ratio(0.6) });
    expect(elementB.ratio.verticalRatio.value === 0.2);
  });
});
