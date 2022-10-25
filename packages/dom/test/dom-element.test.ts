import { Ratio } from "@sync-scroll/core";
import { DOMElement } from "../dom-element";

let element: HTMLElement;
let domElement: DOMElement;

beforeEach(() => {
  const elementId = "scrollable-element";
  document.body.innerHTML =
    `<div id=${elementId} style="height: 200px; width: 200px; overflow: auto">` +
    '<div style="height: 2000px; width: 2000px"></div>' +
    "</div>";
  element = document.getElementById(elementId);
  domElement = new DOMElement(element);

  Object.defineProperty(element, "scrollTo", {
    value: ({ left, top }: ScrollToOptions) => {
      element.scrollLeft = left;
      element.scrollTop = top;
    },
  });
});

/**
 * can't test, because jsdom is not a visual browser
 * https://github.com/jsdom/jsdom#pretending-to-be-a-visual-browser
 **/
describe.skip("dom-element", () => {
  test("scrollTo", async () => {
    domElement.scrollTo({
      verticalRatio: new Ratio(0.8),
      horizontalRatio: new Ratio(1.0),
    });

    expect(element.scrollTop).toBe(200);
    expect(element.scrollLeft).toBe(200);
  });
});
