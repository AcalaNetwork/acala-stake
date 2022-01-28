import { useMemoized } from "../../hooks";
import { useCallQueue } from "./useCallQueue";

export const useTxTracker = (id: string) => {
  const queue = useCallQueue();

  return useMemoized(queue.find((item) => item.trackId === id));
};