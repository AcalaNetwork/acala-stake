import { useActiveAccount } from '@connector';
import React from 'react';
import { memo } from 'react';
import Logo from './Logo';
import { Menu } from './Menu';
import { Setting } from './Setting';
import { Wallet } from './Wallet';
import styles from './Header.module.css';
import { FlexibleFeeModal } from 'modals/FlexibleFee';
import { EnsureSDKReady } from '@sdk/components/EnsureSDKReady';

export const Header = memo(() => {
  const active = useActiveAccount();

  return (
    <header className='h-64 w-full bg-opacity-70 sticky top-0 z-10'>
      <div className='container flex flex-row items-center h-full relative z-10'>
        <Logo />
        <div className='flex-1 ml-52'>
          <Menu />
        </div>
        <div className='flex items-center'>
          <Wallet className='mr-32' />
          <EnsureSDKReady loading={null} requires={['acala-wallet', 'karura-wallet']}>
            {
              active && (
                <>
                  <Setting />
                  <FlexibleFeeModal />
                </>
              )
            }

          </EnsureSDKReady>
        </div>
      </div>
      <div className={styles['header-bg']} />
    </header>
  );
});
