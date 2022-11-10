import { CountDownLatch } from "./countdown-latch";
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
  private signal: CountDownLatch;

  constructor({ direction = "vertical" }: SynchronizerOptions) {
    this.direction = direction;
    this.handlers = new Map();
    this.signal = new CountDownLatch(0);
  }

  register = (element: ScrollableElement) => {
    const handler = (ratio: ScrollRatio) => {
      if (this.signal.released()) {
        this.signal = new CountDownLatch(this.handlers.size - 1);
        [...this.handlers.keys()]
          .filter((ele) => ele !== element)
          .forEach((otherElement) => {
            this._scrollTo(otherElement, ratio);
          });
      } else {
        this.signal.countdown();
      }
    };
    element.registerScrollHandler(handler);
    this.handlers.set(element, handler);
  };

  unregister = (element: ScrollableElement) => {
    element.unregisterScrollHandler();
    this.handlers.delete(element);
  };

  scrollTo = (ratio: ScrollRatio) => {
    this.signal = new CountDownLatch(this.handlers.size);
    [...this.handlers.keys()].forEach((element) =>
      this._scrollTo(element, ratio)
    );
  };

  private _scrollTo = (element: ScrollableElement, ratio: ScrollRatio) => {
    if (this.direction === "vertical") {
      element.scrollTo({ verticalRatio: ratio.verticalRatio });
    } else if (this.direction === "horizontal") {
      element.scrollTo({ horizontalRatio: ratio.horizontalRatio });
    } else {
      element.scrollTo({
        verticalRatio: ratio.verticalRatio,
        horizontalRatio: ratio.horizontalRatio,
      });
    }
  };
}
