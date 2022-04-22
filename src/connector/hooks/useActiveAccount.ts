import { useContext } from 'react';
import { ConnectorContext } from '..';
import { InjectedAccount } from '@polkadot/extension-inject/types';

export const useActiveAccount = (): InjectedAccount | undefined => {
  const data = useContext(ConnectorContext);

  return data.extension?.active;
};
