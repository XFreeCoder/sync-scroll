import {
  ScrollableElement,
  ScrollHandler,
  ScrollRatio,
  SyncDirection,
  SynchronizerOptions,
} from "./types";

export class Synchronizer {
  private readonly direction: SyncDirection;
  private handlers: Map<ScrollableElement, ScrollHandler>;
  private countDownLatch: number;

  constructor({ direction = "vertical" }: SynchronizerOptions) {
    this.direction = direction;
    this.handlers = new Map();
    this.countDownLatch = 0;
  }

  register(element: ScrollableElement) {
    const handler = (ratio: ScrollRatio) => {
      if (this.countDownLatch === 0) {
        this.countDownLatch = this.handlers.size - 1;
        [...this.handlers.keys()]
          .filter((ele) => ele !== element)
          .forEach((otherElement) => {
            if (this.direction === "vertical") {
              otherElement.scrollTo({ verticalRatio: ratio.verticalRatio });
            } else if (this.direction === "horizontal") {
              otherElement.scrollTo({ horizontalRatio: ratio.horizontalRatio });
            } else {
              otherElement.scrollTo({
                verticalRatio: ratio.verticalRatio,
                horizontalRatio: ratio.horizontalRatio,
              });
            }
          });
      } else {
        this.countDownLatch = this.countDownLatch - 1;
      }
    };
    element.registerScrollHandler(handler);
    this.handlers.set(element, handler);
  }

  unregister(element: ScrollableElement) {
    element.unregisterScrollHandler();
    this.handlers.delete(element);
  }
}
