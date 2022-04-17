import { ConnectedNetworks } from 'config';
import { useContext, useMemo } from 'react';
import { ConnectorContext } from '..';
import { SubstrateConnectorData } from '../types';

// we ensure that the connector data is always exists.
export const useApi = (network: ConnectedNetworks): SubstrateConnectorData => {
  const data = useContext(ConnectorContext);

  return useMemo(() => data.apis?.[network], [network, data]);
};
