import { Ratio } from "./ratio";
import { ScrollElement, ScrollHandler } from "./types";

export class DOMElement implements ScrollElement {
  private listener: EventListener | null = null;

  constructor(private element: HTMLElement) { }

  setVerticalRatio(ratio: Ratio) {
    this.element.scrollTop = ratio.value * this.element.scrollHeight;
  };

  setHorizontalRatio(ratio: Ratio) {
    this.element.scrollLeft = ratio.value * this.element.scrollWidth;
  };

  registerScrollHandler(handler: ScrollHandler) {
    this.listener = () => {
      const verticalRatio = new Ratio(this.element.scrollTop / this.element.scrollHeight);
      const horizontalRatio = new Ratio(this.element.scrollLeft / this.element.scrollWidth);
      handler({ verticalRatio, horizontalRatio });
    }
    this.element.addEventListener("scroll", this.listener);
  };

  unregisterScrollHandler() {
    if (this.listener !== null) {
      this.element.removeEventListener("scroll", this.listener);
      this.listener = null;
    }
  };
}
