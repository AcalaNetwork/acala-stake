import { useContext } from 'react';
import { ConnectorContext } from '..';
import { ExtensionConnectorData } from '../types';

export const useExtension = (): ExtensionConnectorData => {
  const data = useContext(ConnectorContext);

  return data.extension;
};
