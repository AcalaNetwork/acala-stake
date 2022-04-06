import { ValidatorId } from "@acala-network/types/interfaces";
import { useState } from 'react';

import { Option } from '@polkadot/types';
import { Registration } from '@polkadot/types/interfaces';
import { useApi } from "../../../connector";
import { useSubscription } from "../../../hooks/useSubscription";

export const useValidatorDetail = (accountId: ValidatorId) => {
  const [data, setData] = useState<Option<Registration>>();
  const { api } = useApi();

  useSubscription(() => {
    if (!api || !api.query || !api.query.identity) return;

    // @ts-ignore TODO check if this still works IMPORTANT
    return api.query.identity.identityOf(convertAddress(accountId.toString(), 'kusama'))
      .subscribe({ next: setData });
  }, [accountId, api]);

  return data?.toHuman();
};