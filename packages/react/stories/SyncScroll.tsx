import { SyncDirection, Synchronizer } from "@sync-scroll/core";
import { useMemo } from "react";
import { SynchronizerProvider, useSynchronizer } from "../synchronizer-context";
import { useSyncScroll } from "../use-sync-scroll";

const COLORS = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#795548",
  "#607D8B",
];

function getRandomColor(colors = COLORS) {
  const length = colors.length;
  const random = Math.round(Math.random() * (length - 1));
  return colors[random];
}

const Cell = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: 8,
        background: `linear-gradient(90deg, ${getRandomColor()}, ${getRandomColor()})`,
      }}
    ></div>
  );
};

const Block = ({
  cellHeight,
  cellWidth,
  height = 480,
  width = 500,
}: {
  cellHeight: number;
  cellWidth: number;
  height?: number;
  width?: number;
}) => {
  const synchronizer = useSynchronizer();
  const ref = useSyncScroll({ synchronizer });
  const rows = Math.ceil(height / cellHeight) * 2;
  const cols = Math.ceil(width / cellWidth) * 2;

  return (
    <div
      ref={ref}
      style={{
        overflow: "auto",
        width: 500,
        height: 480,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, ${cellHeight}px)`,
          gridTemplateColumns: `repeat(${cols}, ${cellWidth}px)`,
          gap: 10,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => (
          <Cell key={`id_${index}`} />
        ))}
      </div>
    </div>
  );
};

export interface Props {
  direction: SyncDirection;
}

const SyncScroll = ({ direction }: Props) => {
  const synchronizer = useMemo(() => {
    return new Synchronizer({ direction });
  }, [direction]);

  return (
    <SynchronizerProvider synchronizer={synchronizer}>
      <div
        style={{
          height: "80vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Block cellWidth={48} cellHeight={24} />
        <Block cellWidth={120} cellHeight={48} />
      </div>
    </SynchronizerProvider>
  );
};

export default SyncScroll;
