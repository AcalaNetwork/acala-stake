import { Card } from '@components';
import { SDKNetwork } from '@sdk/types';
import { Fragment } from 'react';
import { memo, createElement } from 'react';
import { BridgeProvider } from './BridgeProvider';
import { BridgeStepsController } from './BridgeStepsController';

interface BridegConsoleProps {
  network: SDKNetwork;
  onBakcInForm?: () => void;
  card?: boolean;
}

export const BridgeConsole = memo<BridegConsoleProps>(({ network, card = true, onBakcInForm }) => {
  // eslint-disable-next-line react/no-children-prop
  return createElement(card ? Card : Fragment, {
    className: 'py-32 flex flex-center',
    variant: 'gradient-border',
    children: (
      <BridgeProvider network={network} onBackInForm={onBakcInForm}>
        <BridgeStepsController />
      </BridgeProvider>
    )
  });
});
