import { Ratio } from "./ratio";

export type ScrollRatio = {
  verticalRatio: Ratio;
  horizontalRatio: Ratio;
};

export type ScrollHandler = (radio: ScrollRatio) => void;

export interface ScrollElement {
  setVerticalRatio: (ratio: Ratio) => void;
  setHorizontalRatio: (ratio: Ratio) => void;
  registerScrollHandler: (handler: ScrollHandler) => void;
  unregisterScrollHandler: () => void;
}

export type SyncDirection = "vertical" | "horizontal" | "both";

export type SynchronizerOptions = {
  elements: Array<ScrollElement>;
  syncDirection?: SyncDirection;
  horizontalRatio?: number;
};
