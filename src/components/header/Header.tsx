import React from 'react';
import { memo } from 'react';
import Logo from './Logo';
import { Menu } from './Menu';
import { Wallet } from './Wallet';
import styles from './Header.module.css';

export const Header = memo(() => {
  return (
    <header className='h-64 w-full bg-opacity-70 sticky top-0 z-10'>
      <div className='container flex flex-row items-center h-full relative z-10'>
        <Logo />
        <div className='flex-1 ml-52'>
          <Menu />
        </div>
        <div className='flex items-center'>
          <Wallet />
        </div>
      </div>
      <div className={styles['header-bg']} />
    </header>
  );
});
