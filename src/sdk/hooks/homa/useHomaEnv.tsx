import { HomaEnvironment } from "@acala-network/sdk/homa/types";
import { useState } from "react";
import { useHoma } from ".";
import { useSubscription } from "../../../hooks/useSubscription";
import { SDKNetwork } from "../../types";

export const useHomaEnv = (network: SDKNetwork) => {
  const homa = useHoma(network);
  const [data, setData] = useState<HomaEnvironment>();

  useSubscription(() => {
    if (!homa) return;

    return homa.subscribeEnv().subscribe({ next: setData });
  }, [homa]);
  return data;
};