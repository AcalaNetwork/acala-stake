import { useApi } from "../../../connector";
import { useSubscription } from "../../../hooks/useSubscription";
import { ValidatorId } from '@acala-network/types/interfaces';
import { useState } from "react";

export const useValidator = () => {
  const { api } = useApi('kusama');
  const [validators, setData] = useState<ValidatorId[]>([]);

  useSubscription(() => {
    return undefined;
    // return api.query.session.validators().subscribe({
    //   next: (data: any) => {
    //     setData(data.slice(0, 4));
    //   }
    // });
  }, [api]);

  return validators;
};