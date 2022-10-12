import {
  ScrollElement,
  ScrollHandler,
  ScrollRatio,
  SyncDirection,
  SynchronizerOptions,
} from "./types";

export class Synchronizer {
  private syncDirection: SyncDirection;
  private handlers: Map<ScrollElement, ScrollHandler>;
  private countLock: number;

  constructor({ syncDirection = "vertical" }: SynchronizerOptions) {
    this.syncDirection = syncDirection;
    this.handlers = new Map();
    this.countLock = 0;
  }

  register(element: ScrollElement) {
    const handler = (ratio: ScrollRatio) => {
      if (this.countLock === 0) {
        this.countLock = this.handlers.size - 1;
        [...this.handlers.keys()]
          .filter((ele) => ele !== element)
          .forEach((otherElement) => {
            if (this.syncDirection === "vertical") {
              otherElement.setVerticalRatio(ratio.verticalRatio);
            } else if (this.syncDirection === "horizontal") {
              otherElement.setHorizontalRatio(ratio.horizontalRatio);
            } else {
              otherElement.setVerticalRatio(ratio.verticalRatio);
              otherElement.setHorizontalRatio(ratio.horizontalRatio);
            }
          });
      } else {
        this.countLock = this.countLock - 1;
      }
    };
    element.registerScrollHandler(handler);
    this.handlers.set(element, handler);
  }

  unregister(element: ScrollElement) {
    element.unregisterScrollHandler();
    this.handlers.delete(element);
  }
}
