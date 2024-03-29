import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useBoolean } from '@hooks';

type MenuItem = PropsWithChildren<{
  link:
    | string
    | {
        path: string;
        label: string;
      }[];
  matchPattern?: string
}>;

const MenuItem: FC<MenuItem> = memo(({ matchPattern, children, link }) => {
  const { asPath } = useRouter();
  const isActive = useMemo(() => {
    if (matchPattern && new RegExp(matchPattern).test(asPath)) {
      return true;
    }

    return typeof link === 'string' ? asPath === link : link.map((i) => i.path).includes(asPath);
  }, [asPath, link, matchPattern]);
  const { value: openStatus, setTrue: open, setFalse: close } = useBoolean(false, 200);

  return (
    <li
      className={clsx(
        'w-[120px] flex-shrink-0 flex-grow-0 py-8 px-36 rounded-12 text-base font-medium cursor-pointer relative',
        isActive ? 'bg-grey-200 text-grey-1' : 'text-grey-3'
      )}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      {typeof link === 'string' ? (
        <Link href={link}>
          <a>{children}</a>
        </Link>
      ) : (
        <>
          {children}
          <Transition
            enter='transition-opacity duration-75'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            show={openStatus}
            unmount={false}
          >
            <div className='absolute top-48 left-0 bg-white rounded-8 shadow-2 overflow-hidden'>
              {link.map((item) => (
                <div className={`w-[128px] text-cente hover:bg-gray-200`} key={item.path}>
                  <Link href={item.path}>
                    <a className={clsx('block px-16 py-12', { 'text-grey-2': asPath === item.path })}>{item.label}</a>
                  </Link>
                </div>
              ))}
            </div>
          </Transition>
        </>
      )}
    </li>
  );
});

export const Menu = memo(() => {
  return (
    <ul className='flex flex-row'>
      <MenuItem link='/'>Bridge</MenuItem>
    </ul>
  );
});
