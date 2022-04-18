import { BaseComponentProps, ChainSelector, FormPanel } from '@components';
import SwapIcon from '/public/pages/bridge/swap-btn.svg';
import { memo } from 'react';
import clsx from 'clsx';
import { BridgeRouter } from '../hooks/useBridgeRouterSelector';

type BridgeRouterSelectorProps = BaseComponentProps & BridgeRouter & {
  disabled?: boolean;
  swap?: boolean; 
};

export const BridgeRouterSelector = memo<BridgeRouterSelectorProps>(({
  className,
  fromChains,
  toChains,
  fromChain,
  toChain,
  onToggle,
  onFromChainChange,
  onToChainChange,
  swap = true,
  disabled = false
}) => {
  return (
    <div className={clsx('flex items-center  w-full', className)}>
      <FormPanel className='flex-1' label={'From'}>
        <ChainSelector
          chains={fromChains}
          className='h-72'
          disabled={disabled}
          onChange={onFromChainChange}
          value={fromChain}
        />
      </FormPanel>
      { swap ? (
        <SwapIcon className='mt-18 mx-18 cursor-pointer' onClick={onToggle} />
      ) : (
        <div className='mx-18 w-[13.45px]' />
      ) }
      <FormPanel className='flex-1' label={'To'}>
        <ChainSelector
          chains={toChains}
          className='h-72'
          disabled={disabled}
          onChange={onToChainChange}
          value={toChain}
        />
      </FormPanel>
    </div>
  );
});
