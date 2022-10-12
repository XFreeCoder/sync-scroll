import React, { useContext } from "react";
import { Synchronizer } from "@sync-scroll/core";

const SYNCHRONIZER = new Synchronizer({});

export const SynchronizerContext = React.createContext(SYNCHRONIZER);

export type SynchronizerProviderProps = {
  synchronizer?: Synchronizer;
  children: React.ReactNode;
};

export const SynchronizerProvider = ({
  synchronizer = SYNCHRONIZER,
  children,
}: SynchronizerProviderProps) => {
  return (
    <SynchronizerContext.Provider value={synchronizer}>
      {children}
    </SynchronizerContext.Provider>
  );
};

export function useSynchronizer() {
  return useContext(SynchronizerContext);
}
