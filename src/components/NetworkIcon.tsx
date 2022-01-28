import React from 'react';
import KusamaPink from '/public/network/kusama-pink.svg';
import PolkadotPink from '/public/network/polkadot-pink.svg';

type NetworkIconType = 'acala' | 'karura' | 'polkadot' | 'kusama';

export const NetworkIcon = React.memo<{ type: NetworkIconType } & Record<string, any>>(({ type, ...remained }) => {
  if (type === 'acala') return null;
  if (type === 'karura') return null;
  if (type === 'polkadot') return <PolkadotPink {...remained} />;
  if (type === 'kusama') return <KusamaPink {...remained} />;

  return null;
})