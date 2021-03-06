import React from 'react';
import { memo } from 'react';
import { ModalType, useModal } from '@state';
import { Popover } from '../Popover';
import SettingIcon from '/public/icons/setting.svg';

export const Setting = memo(() => {
  const { open } = useModal(ModalType.FlexibleFee);

  return (
    <Popover
      content={
        <div className='cursor-pointer w-[200px] text-14'>
          <div
            className='px-30 py-10 hover:bg-gray-400 hover:text-fff rounded-8 duration-75'
            onClick={open}
          >
            Flexible Fee
          </div>
        </div>
      }
      location='down'
    >
      <SettingIcon />
    </Popover>
  );
});
