import { useActiveAccount } from '@connector';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';
import { memo } from 'react';
import { useExtension } from '@connector/hooks/useExtension';
import { useSS58 } from '@connector/hooks/useSS58';
import { ConnectStatus } from '@connector/types';
import { ModalType, useModal } from '@state';
import { Address } from '../Address';
import { AddressAvatar } from '../AddressAvatar';

interface WalletProps {
  className?: string;
  isConnected?: boolean;
}

const ConnectBtn: FC<{ className: string }> = memo(({ className }) => {
  const { open } = useModal(ModalType.ConnectExtension);

  return (
    <div
      className={`whitespace-nowrap font-medium text-base text-primary ${className} pt-8 pb-8 pl-16 pr-16 `}
      onClick={open}
    >
      Connect to a wallet
    </div>
  );
});

const Connected: FC<Omit<WalletProps, 'isConnected'>> = memo(({ className }) => {
  const ss58 = useSS58();
  const active = useActiveAccount();
  const { open: openSelectAccountModal } = useModal(ModalType.SelectAccount);

  if (!active) return null;

  return (
    <div className={`flex items-stretch font-medium ${className}`}>
      <div
        className='flex-center text-16 leading-20 pl-16 pr-8 py-8 text-primary border-r-2 border-grey-66 underline'
      >
        Wallet
      </div>
      <div className='flex-center text-16 text-grey-2 leading-17 pl-8 pr-16 py-8' onClick={openSelectAccountModal}>
        <Address
          address={active.address}
          className='w-[100px] overflow-hidden overflow-ellipsis'
          name={active.name}
          ss58={ss58}
        />
        <AddressAvatar address={active.address} />
      </div>
    </div>
  );
});

export const Wallet: FC<WalletProps> = memo(({ className }) => {
  const rootClassName = `cursor-pointer h-38 bg-grey-666 rounded-12 border border-grey-66 ${className}`;
  const extension = useExtension();
  const isConnected = extension.status === ConnectStatus.ready;

  if (isConnected) {
    return <Connected className={rootClassName} />;
  }

  return <ConnectBtn className={rootClassName} />;
});
