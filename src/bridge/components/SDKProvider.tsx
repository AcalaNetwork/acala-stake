import { Bridge } from '@polkawallet/bridge';
import { AcalaAdapter, KaruraAdapter} from '@polkawallet/bridge/build/adapters/acala';
import { PolkadotAdapter, KusamaAdapter } from '@polkawallet/bridge/build/adapters/polkadot';
import React, { FC, useMemo } from 'react';
import { SDKStore } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SDKContext = React.createContext<SDKStore>({} as any);

export const SDKProvider: FC = React.memo(({ children }) => {
  const bridge = useMemo(() => {
    return new Bridge({
      adapters: [
        new AcalaAdapter(),
        new KaruraAdapter(),
        new PolkadotAdapter(),
        new KusamaAdapter()
      ]
    });
  }, []);

  return (
    <SDKContext.Provider value={{ bridge }}>{children}</SDKContext.Provider>
  );
});

export const SDKConsumer = SDKContext.Consumer;
