import {
  ScrollableElement,
  ScrollHandler,
  ScrollRatio,
  SyncDirection,
  SynchronizerOptions,
} from "./types";

export class Synchronizer {
  private direction: SyncDirection;
  private handlers: Map<ScrollableElement, ScrollHandler>;
  private countLock: number;

  constructor({ direction = "vertical" }: SynchronizerOptions) {
    this.direction = direction;
    this.handlers = new Map();
    this.countLock = 0;
  }

  register(element: ScrollableElement) {
    const handler = (ratio: ScrollRatio) => {
      if (this.countLock === 0) {
        this.countLock = this.handlers.size - 1;
        [...this.handlers.keys()]
          .filter((ele) => ele !== element)
          .forEach((otherElement) => {
            if (this.direction === "vertical") {
              otherElement.scrollVertical(ratio.verticalRatio);
            } else if (this.direction === "horizontal") {
              otherElement.scrollHorizontal(ratio.horizontalRatio);
            } else {
              otherElement.scrollVertical(ratio.verticalRatio);
              otherElement.scrollHorizontal(ratio.horizontalRatio);
            }
          });
      } else {
        this.countLock = this.countLock - 1;
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
