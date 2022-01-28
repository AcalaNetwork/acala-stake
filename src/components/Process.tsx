import { FC, useMemo } from "react";

export const CircleProcess: FC<{ process: number }> = ({ process }) => {
  const formatPorcess = process >= 100 ? 100 : process;
  const leftDeg = useMemo(
    () => (formatPorcess <= 50 ? (formatPorcess / 100) * 360 + 225 : 45),
    [formatPorcess]
  );
  const rightDeg = useMemo(
    () => (formatPorcess > 50 ? (formatPorcess / 100) * 360 + 45 : 225),
    [formatPorcess]
  );

  return (
    <div className="relative w-44 h-44 flex flex-center">
      <div className="text-primary text-10 font-medium">{`${formatPorcess}%`}</div>
      <div className="w-44 h-44 absolute top-0 left-0 border-4 border-eae9f0 rounded-circle"></div>
      <div className="w-22 h-44 absolute top-0 left-0 overflow-hidden">
        <div
          className="w-44 h-44 border-4 border-transparent rounded-circle absolute top-0 left-0 border-b-primary border-l-primary"
          style={{ transform: `rotate(${leftDeg}deg)` }}
        ></div>
      </div>
      <div className="w-22 h-44 absolute top-0 left-22 overflow-hidden">
        <div
          className="w-44 h-44 border-4 border-transparent rounded-circle absolute top-0 right-0 border-t-primary border-r-primary"
          style={{ transform: `rotate(${rightDeg}deg)` }}
        ></div>
      </div>
    </div>
  );
};