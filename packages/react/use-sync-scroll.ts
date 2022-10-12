import { Synchronizer, ScrollableElement } from "@sync-scroll/core";
import { DOMElement } from "@sync-scroll/dom";
import { useCallback, useRef } from "react";

export type UseSyncScrollOptions = {
  synchronizer: Synchronizer;
};

export function useSyncScroll({ synchronizer }: UseSyncScrollOptions) {
  const scrollElementRef = useRef<ScrollableElement | null>(null);

  const elementRef = useCallback(
    (element: Element | null) => {
      if (element !== null) {
        const scrollElement = new DOMElement(element);
        synchronizer.register(scrollElement);
        scrollElementRef.current = scrollElement;
      } else {
        if (scrollElementRef.current !== null) {
          synchronizer.unregister(scrollElementRef.current);
          scrollElementRef.current = null;
        }
      }
    },
    [synchronizer]
  );

  return elementRef;
}
