import { Synchronizer, DOMElement, ScrollElement } from "@sync-scroll/core";
import { useCallback, useRef } from "react";

export type UseSyncScrollOptions = {
  synchronizer: Synchronizer;
};

export function useSyncScroll({ synchronizer }: UseSyncScrollOptions) {
  const scrollElementRef = useRef<ScrollElement | null>(null);

  const elementRef = useCallback(
    (element) => {
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
