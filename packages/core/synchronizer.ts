import { Ratio } from "./ratio";
import {
  ScrollElement,
  ScrollHandler,
  ScrollRatio,
  SyncDirection,
  SynchronizerOptions,
} from "./types";

export class Synchronizer {
  private elements: Array<ScrollElement>;
  private syncDirection: SyncDirection;
  private handlers: Map<ScrollElement, ScrollHandler>;

  constructor({ elements, syncDirection = "vertical" }: SynchronizerOptions) {
    this.elements = elements;
    this.syncDirection = syncDirection;
    this.handlers = this.buildHandlers();
    this.bind();
  }

  private buildHandlers(): Map<ScrollElement, ScrollHandler> {
    const handlers = new Map<ScrollElement, ScrollHandler>();

    this.elements.forEach((element) => {
      const handler: ScrollHandler = (ratio) => {
        const elements = this.elements.filter((ele) => ele !== element);
        elements.forEach((element) => {
          element.unregisterScrollHandler();
        });
        this.sync(elements, ratio);
        elements.forEach((element) => {
          element.registerScrollHandler(handlers.get(element)!);
        });
      };

      handlers.set(element, handler);
    });

    return handlers;
  }

  private sync(elements: Array<ScrollElement>, ratio: ScrollRatio) {
    elements.forEach((element) => {
      if (this.syncDirection === "vertical") {
        element.setVerticalRatio(ratio.verticalRatio);
      } else if (this.syncDirection === "horizontal") {
        element.setHorizontalRatio(ratio.horizontalRatio);
      } else {
        element.setVerticalRatio(ratio.verticalRatio);
        element.setHorizontalRatio(ratio.horizontalRatio);
      }
    });
  }

  private bind() {
    this.elements.forEach((element) => {
      element.registerScrollHandler(this.handlers.get(element)!);
    });
  }

  unbind() {
    this.elements.forEach((element) => {
      element.unregisterScrollHandler();
    });
  }

  scrollTo(ratio: ScrollRatio) {
    this.sync(this.elements, ratio);
  }
}
