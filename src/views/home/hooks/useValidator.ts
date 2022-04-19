import { useEffect, useState } from 'react';
import { ajax } from 'rxjs/ajax';
export interface Validator {
  bonded: string;
  bonded_nominators: string;
  bonded_owner: string;
  bonded_total: string;
  controller_account_display: unknown
  count_nominators: number;
  grandpa_vote: number;
  latest_mining: number;
  node_name: string;
  rank_validator: number;
  reward_account: string;
  reward_point: number;
  reward_pot_balance: string;
  session_key: string;
  stash_account_display: {
    address: string;
    display: string;
    parent: {
      display: string;
    }
  }
  validator_prefs_value: number;
}

export const useValidators = (row?: number, page?: number) => {
  const [data, setData] = useState<Validator[]>([]);

  useEffect(() => {
    ajax({
      body: {
        address: 'HTAeD1dokCVs9MwnC1q9s2a7d2kQ52TAjrxE1y5mj5MFLLA',
        page: page ?? 0,
        row: row ?? 25
      },
      method: 'post',
      url: 'https://kusama.webapi.subscan.io/api/scan/staking/voted'
    }).subscribe({
      next: (res) => {
        const list: Validator[] = (res.response as any).data.list || [];

        setData(list);
      }
    });
  }, [page, row]);

  return data;
};