import React, { useMemo } from 'react';
import { useExtension } from '@connector';
import { useModal } from '@state/application/hooks';
import { InjectedAccount } from '@polkadot/extension-inject/types';
import { Address, Selector, AddressAvatar, Modal, ModalHeader } from '@components';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import CopyIcon from '/public/icons/copy.svg';
import { Copy } from '../components/Copy';
import { memo } from 'react';
import { ModalType } from '@state/application/types';

const btnRender = (active: InjectedAccount) => {
  return (
    <div className='flex flex-between pl-24 pr-28 h-full w-full'>
      <div className='flex flex-center'>
        <AddressAvatar address={active?.address} className='w-40 h-40 bg-[#E5EBF1]'
          size={40} />
        <div className='ml-22'>
          <div className='text-20 leading-[24px] font-medium text-333 max-w-[320px] truncate'>{active?.name}</div>
          <Address address={active?.address} className='text-14 leading-17 text-grey-2 mt-8' />
        </div>
      </div>
      <ChevronDownIcon className='w-18 h-18' />
    </div>
  );
};

const ItemRender = (value: InjectedAccount, selected: InjectedAccount) => {
  return (
    <div className='py-12 px-8 rounded-8 flex justify-between hover:bg-fff'>
      <div className='flex w-[120px]'>
        <AddressAvatar address={value.address} className='w-20 h-20 bg-[#E5EBF1]'
          size={20} />
        <div className='ml-8 text-16 font-medium text-333 max-w-[100px] truncate'>{value.name}</div>
      </div>
      <div className='flex items-center gap-10 w-[150px]'>
        <Address address={value.address} className='text-14 leading-17 text-grey-2' />
        {selected && selected.address === value.address ? (
          <CheckIcon aria-hidden='true' className='h-[20px] w-[20px] text-primary' />
        ) : (
          <div className='h-[20px] w-[20px]'></div>
        )}
      </div>
    </div>
  );
};

export const SelectActiveAccount = memo(() => {
  const { visible, close } = useModal(ModalType.SelectAccount);
  const { injectedAccounts, active, setActive } = useExtension();

  const handleChange = (value: InjectedAccount) => {
    setActive(value);
  };

  const items = useMemo(() => {
    return injectedAccounts
      ? injectedAccounts.map((item) => {
        return {
          value: item,
          render: ItemRender,
        };
      })
      : [];
  }, [injectedAccounts]);

  return (
    <Modal
      contentClassName='pb-0'
      header={<ModalHeader onClose={close}>Choose Account</ModalHeader>}
      onClose={close}
      visible={visible}
    >
      <div className='px-40 pt-32 w-full'>
        <Selector
          items={items}
          listClassName='max-h-[420px] overflow-y-auto'
          onChange={handleChange}
          render={btnRender}
          rootClassName='border border-grey-5 rounded-16 h-[80px] relative'
          value={active}
        />
        <div className='mt-32 mb-32 text-primary text-14 leading-17 flex flex-row-reverse'>
          <div className='flex items-center justify-start gap-8'>
            <CopyIcon />
            <Copy displayText='Copy Address' successText='Copy Success'
              text={active?.address} />
          </div>
        </div>
      </div>
    </Modal>
  );
});
