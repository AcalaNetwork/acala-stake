import { FC, useCallback, useMemo } from 'react';
import { useBoolean, useMemoized } from '../../hooks';
import { Selector } from './Selector';
import TriangleIcon from '/public/icons/triangle.svg';
import { CheckIcon } from '@heroicons/react/solid';
import { memo } from 'react';
import clsx from 'clsx';
import Lock from '/public/icons/lock.svg';
import { FormatAddress } from '@components/FormatAddress';

export interface AddressInputSelectorItem {
  name?: string;
  value: string;
}

export interface AddressInputSelectorProps {
  addresses?: AddressInputSelectorItem[];
  ss58?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  listClassName?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const AddressInputSelector: FC<AddressInputSelectorProps> = memo(
  ({ addresses, value, onChange, className, placeholder, listClassName, disabled, ss58 }) => {
    const memAddresses = useMemoized(addresses || []);
    const { value: focuse, setTrue: onFocuse, setFalse: onBlur } = useBoolean(false);

    const btnRender = useCallback(
      (value: string) => {
        const target = memAddresses.find(item => item.value === value);

        return target ? (
          <div className='flex flex-between px-16 h-full'>
            <FormatAddress address={target.value} icon
              name={target.name} ss58={ss58} />
            {disabled ? <Lock /> : <TriangleIcon aria-hidden='true' />}
          </div>
        ) : placeholder ? (
          <div className='flex flex-between px-16 h-full'>
            <div className='flex items-center justify-start text-16 leading-20 text-grey-3 font-medium'>
              {placeholder}
            </div>
            {disabled ? <Lock /> : <TriangleIcon aria-hidden='true' />}
          </div>
        ) : null;
      },
      [disabled, memAddresses, placeholder, ss58]
    );

    const itemRender = useCallback((selected: string) => {
      return (value: AddressInputSelectorItem) => (
        <div className='py-12 px-8 rounded-8 flex flex-between hover:bg-fff'>
          <FormatAddress address={value.value} icon
            name={value.name} ss58={ss58} />

          {selected && selected === value.value && (
            <CheckIcon aria-hidden='true' className='h-[20px] w-[20px] text-primary' />
          )}
        </div>
      );
    }, [ss58]);

    const items = useMemo(() => {
      return memAddresses.map((item) => {
        return {
          value: item,
          render: itemRender(value),
        };
      });
    }, [itemRender, memAddresses, value]);

    const handleOnChange = useCallback((value: AddressInputSelectorItem) => {
      onChange && onChange(value.value);
    }, [onChange]);

    return (
      <Selector
        disabled={disabled}
        items={items}
        listClassName={listClassName}
        onBlur={onBlur}
        onChange={handleOnChange}
        onFocuse={onFocuse}
        render={btnRender}
        rootClassName={clsx(
          'relative h-56 bg-grey-666 border rounded-12 transition-all hover:border-primary',
          {
            'border-primary': focuse,
            'border-grey-66': !focuse
          },
          className
        )}
        value={value}
      />
    );
  }
);
