import { FC } from 'react';
import { useBoolean } from '@hooks';
import Triangle from '/public/icons/triangle.svg';
import clsx from 'clsx';

export interface WrapInfoProps {
  title: string;
  content: string;
}

export const WrapInfo: FC<WrapInfoProps> = ({ title, content }) => {
  const { value: isOpen, toggle: open } = useBoolean(false);

  return (
    <div>
      <div className='flex flex-between h-72 border-t border-grey-66 cursor-pointer' onClick={open}>
        <div className=' ml-12 text-17 leading-16 text-grey-2 font-medium'>{title}</div>
        <Triangle
          className={clsx('transition-transform duration-100', {
            '-rotate-180': isOpen,
          })}
        />
      </div>
      {isOpen && <div className='ml-24 text-14 pb-24'>{content}</div>}
    </div>
  );
};
