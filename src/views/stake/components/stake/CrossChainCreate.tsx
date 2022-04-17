import { FC, useContext } from 'react';
import { ChainSelector, FormPanel } from '@components/form';
import { StakeProviderContext } from './StakeContext';
import SwapIcon from '/public/pages/bridge/swap-btn.svg';
import LockIcon from '/public/icons/lock.svg';
import { NumInput } from '@components/form/NumInput';
import { Address } from '@components/Address';
import { Button } from '@components/Button';
import { TokenImage } from '@components/TokenImage';
import { TokenName } from '@components/TokenName';
import { useActiveAccount } from '../../../../connector';

export const CrossChainCreate: FC<{ token: 'KSM' | 'DOT' }> = ({ token }) => {
  const { setStep, bridgeAmount, setBridgeAmount, fromChains, toChains, selectFromChain, selectToChain } =
    useContext(StakeProviderContext);
  const { name, address } = useActiveAccount();

  const handleClick = () => {
    setStep('wallet-confirm');
  };

  const handleLockClick = () => {
    console.log('handleLockClick');
  };

  return (
    <div className='border border-eae9f0 rounded-[24px] w-[630px] mx-auto pt-34 pb-40 px-56'>
      <FormPanel className='mb-[28px]' label={`Assets`}>
        <div className='h-56 border border-eae9f0 rounded-8 bg-f1f0f2'>
          <div className='flex flex-between px-[16px] h-full'>
            <div className='flex flex-center'>
              <TokenImage token={token} />
              <TokenName token={token} className='ml-8 leading-20 text-16 font-medium text-494853' />
            </div>
            <LockIcon className='cursor-pointer' />
          </div>
        </div>
      </FormPanel>
      <FormPanel className='mb-[28px]'>
        <div className='flex flex-center w-full'>
          <FormPanel className='flex-1' label={'From'}>
            <ChainSelector
              className='relative h-72 border border-eae9f0 rounded-8'
              value={selectFromChain}
              chains={fromChains}
            />
          </FormPanel>
          <div className='flex mx-[18px] mt-[25px]'>
            <SwapIcon />
          </div>
          <FormPanel className='flex-1' label={'To'}>
            <ChainSelector
              className='relative h-72 border border-eae9f0 rounded-8'
              value={selectToChain}
              chains={toChains}
            />
          </FormPanel>
        </div>
      </FormPanel>
      <FormPanel
        className='mb-[28px]'
        label={
          <div className='flex flex-between font-medium'>
            <span>Amount</span>
            <span>
              Available: <span className=' text-494853'>20,000 DOT</span>
            </span>
          </div>
        }
      >
        <div className='bg-f1f0f2 rounded-[8px] text-2e2d33 border focus-within:border-primary'>
          <NumInput
            className='font-4 font-semibold h-[60px] w-full'
            value={bridgeAmount}
            onChange={(e) => setBridgeAmount(e)}
          />
        </div>
      </FormPanel>
      <FormPanel className='mb-[36px]' label={'Destination'}>
        <div className='flex flex-between w-full bg-f1f0f2 h-56 border border-eae9f0 rounded-[12px] p-16'>
          <div className='flex flex-center'>
            <Address
              name={name}
              address={address}
              showBoth
              spaceIcon='-'
              nameClassName='ml-8 mr-4 text-[12px] text-grey-3 leading-15 font-medium'
              addressClassName='ml-4 text-[14px] leading-17px tracking-[1.6px] font-normal'
            />
          </div>
          <LockIcon className='cursor-pointer' onClick={() => handleLockClick()} />
        </div>
      </FormPanel>
      <FormPanel>
        <div className='flex gap-20'>
          <Button
            size='sm'
            className='flex-1 h-48 font-medium text-16'
            round='lg'
            variant='outline'
            onClick={() => setStep('wallet-overview')}
          >
            Back
          </Button>
          <Button size='sm' className='flex-1 h-48 font-medium text-16' round='lg' onClick={handleClick}>
            Next
          </Button>
        </div>
      </FormPanel>
    </div>
  );
};
