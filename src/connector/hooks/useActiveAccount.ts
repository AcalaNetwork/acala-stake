import { useContext } from 'react';
import { ConnectorContext } from '..';

export const useActiveAccount = () => {
  const data = useContext(ConnectorContext);

  return data.extension?.active;
};
