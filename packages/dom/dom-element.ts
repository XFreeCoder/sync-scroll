import { Ratio, ScrollableElement, ScrollHandler } from "@sync-scroll/core";

export class DOMElement implements ScrollableElement {
  private listener: EventListener | null = null;

  constructor(private element: Element) {}

  private getScrollableHeight() {
    return this.element.scrollHeight - this.element.clientHeight;
  }

  private getScrollableWidth() {
    return this.element.scrollWidth - this.element.clientWidth;
  }

  scrollVertical(ratio: Ratio) {
    this.element.scrollTop = ratio.value * this.getScrollableHeight();
  }

  scrollHorizontal(ratio: Ratio) {
    this.element.scrollLeft = ratio.value * this.getScrollableWidth();
  }

  registerScrollHandler(handler: ScrollHandler) {
    this.listener = () => {
      const verticalRatio = new Ratio(
        this.element.scrollTop / this.getScrollableHeight()
      );
      const horizontalRatio = new Ratio(
        this.element.scrollLeft / this.getScrollableWidth()
      );
      handler({ verticalRatio, horizontalRatio });
    };
    this.element.addEventListener("scroll", this.listener);
  }

  unregisterScrollHandler() {
    if (this.listener !== null) {
      this.element.removeEventListener("scroll", this.listener);
      this.listener = null;
    }
  }
}
