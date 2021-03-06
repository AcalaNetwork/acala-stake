import { memo, useCallback } from 'react';
import { Address } from '@components/Address';
import { Card } from '@components/Card';
import { Copy } from '@components/Copy';
import { useActiveAccount } from '@connector';
import { useBalanceDisplayType, useBalanceVisible, useModal, useOpenModal, useSetBalanceVisible } from '../../../state';
import { ModalType } from '@state/application/types';
import { formatNumber } from '@utils/formatNumber';
import ChangeIcon from '/public/icons/change.svg';
import CopyIcon from '/public/icons/copy.svg';
import EyeIcon from '/public/icons/eye.svg';
import EyeCloseIcon from '/public/icons/eye-close.svg';
import WalletIcon from '/public/icons/wallet.svg';
import { AddressAvatar } from '@components/AddressAvatar';
import { OverviewData } from '../hook/useAssetOverview';
import { BaseComponentProps, FormatValue } from '@components';
import clsx from 'clsx';

interface AssetProps extends BaseComponentProps {
  overview: OverviewData['overview']
}

export const Asset = memo<AssetProps>(({ overview, className }) => {
  const active = useActiveAccount();
  const { open: openSelectAccount } = useModal(ModalType.SelectAccount);
  const balanceVisible = useBalanceVisible();
  const change = useSetBalanceVisible();
  const toggle = useCallback(() => change(!balanceVisible), [change, balanceVisible]);

  if (!active) return null;

  return (
    <div className={clsx('flex gap-29 h-[157px]', className)}>
      <Card
        className='pl-32 pr-24 pt-20 flex-1'
        style={{
          backgroundImage: `url("/images/top-board-bg.svg")`,
          backgroundSize: 'cover',
        }}
        variant='border'
      >
        <div className='flex items-center justify-end cursor-pointer select-none' onClick={toggle}>
          {balanceVisible ? <EyeIcon /> : <EyeCloseIcon className='w-16 h-16' />}
          <p className='ml-8 text-grey-4 font-semibold text-11 leading-13'>Hide Balance</p>
        </div>
        <div className='flex items-center mt-15'>
          <WalletIcon className='mr-40' />
          <div className='flex flex-1 items-center'>
            <div className='flex-1'>
              <p className='font-medium text-14 leading-17 text-grey-3 mb-12'>Estimated Portfolio</p>
              <div className='text-grey-1 font-semibold text-32 leading-39'>
                <FormatValue data={overview?.value} visiable={balanceVisible} />
              </div>
            </div>
            <div className='flex-1 ml-20'>
              <p className='font-medium text-14 leading-17 text-grey-3 mb-12'>Est. Earning</p>
              <div className='text-grey-1 font-semibold text-32 leading-39'>
                <FormatValue data={overview?.estEarning} visiable={balanceVisible} />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card className='pl-32 pr-44 flex items-center' variant='gradient-border'>
        <div className='mr-34'>
          <AddressAvatar address={active.address} className='w-64 h-64'
            size={64} />
        </div>
        <div>
          <div className='text-333 text-20 leading-24 font-medium max-w-[180px] overflow-hidden overflow-ellipsis'>
            {active.name}
          </div>
          <Address address={active.address} className='mt-8 text-14 leading-17' />
          <div className='mt-[17px] flex text-13 text-primary cursor-pointer'>
            <div className='flex items-center' onClick={openSelectAccount}>
              <ChangeIcon />
              <span className='ml-8'>Change</span>
            </div>
            <div className='ml-34 flex items-center justify-start'>
              <CopyIcon />
              <Copy className='ml-8 w-48' displayText='Copy'
                successText='Copied' text={active.address} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});
