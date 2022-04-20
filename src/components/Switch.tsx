import { memo } from 'react';
import { Switch as HSwitch } from '@headlessui/react';
import { BaseComponentProps } from './types';
import clsx from 'clsx';

interface SwitchProps extends BaseComponentProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Switch = memo<SwitchProps>(({ value, onChange }) => {
  return (
    <HSwitch
      checked={value}
      className={clsx(
        'relative inline-flex items-center h-18 rounded-full w-36 ease-in-out duration-[200ms]',
        value ? 'bg-primary' : 'bg-gray-200'
      )}
      onChange={onChange}
    >
      <span
        className={clsx(
          'inline-block w-16 h-16 transform bg-white rounded-full ease-in-out duration-[200ms]',
          value ? 'translate-x-[19px]' : 'translate-x-[1px]'
        )}
      />
    </HSwitch>
  );
});
