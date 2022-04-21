import { useActiveAccount } from "@connector";
import { useHistory } from "@sdk/hooks/history";
import { SDKNetwork } from "@sdk/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface HistoryProps {
  message: string;
  date: string;
  link: string
}

export const useHomaHistory = (network: SDKNetwork) => {
  const history = useHistory(network);
  const active = useActiveAccount();
  const [result, setResult] = useState<HistoryProps[]>([]);

  useEffect(() => {
    history.homa.getHistories({ address: active.address }).then(res => {
      const data = res.map(item => {
        return {
          message: item.message,
          date: dayjs(item.data.timestamp).format('YYYY-MM-DD HH:mm:ss'),
          link: item.resolveLinks.subscan,
        };
      });

      setResult(data);
    });
  }, [history, active]);

  return result;
};