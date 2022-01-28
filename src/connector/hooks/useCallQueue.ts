import { useContext } from "react"
import { ConnectorContext } from ".."

export const useCallQueue = () => {
  const { callQueue } = useContext(ConnectorContext);

  return callQueue;
}