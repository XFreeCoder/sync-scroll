import { Ratio } from "./ratio";

export type ScrollRatio = {
  verticalRatio: Ratio;
  horizontalRatio: Ratio;
};

export type ScrollHandler = (ratio: ScrollRatio) => void;

export interface ScrollableElement {
  scrollVertical: (ratio: Ratio) => void;
  scrollHorizontal: (ratio: Ratio) => void;
  registerScrollHandler: (handler: ScrollHandler) => void;
  unregisterScrollHandler: () => void;
}

export type SyncDirection = "vertical" | "horizontal" | "both";

export type SynchronizerOptions = {
  direction?: SyncDirection;
};
