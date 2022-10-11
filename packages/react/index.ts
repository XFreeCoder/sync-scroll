import { Synchronizer, SynchronizerOptions } from "@sync-scroll/core";
import { useEffect } from "react";

export type UseSyncScrollOptions = {
  synchronizerOptions: SynchronizerOptions;
};

export function useSyncScroll({ synchronizerOptions }: UseSyncScrollOptions) {
  useEffect(() => {
    const synchronizer = new Synchronizer(synchronizerOptions);
    () => synchronizer.unbind();
  }, [synchronizerOptions]);
}
