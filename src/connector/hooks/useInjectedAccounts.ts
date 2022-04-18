import { useContext } from 'react';
import { ConnectorContext } from '..';

export const useInjectedAccounts = () => {
  const data = useContext(ConnectorContext);

  return data.extension.injectedAccounts;
};
