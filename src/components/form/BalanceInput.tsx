import React, { FC, useCallback } from 'react';
import { Token } from '@acala-network/sdk-core';
import { NumInput, NumInputProps } from './NumInput';
import { Button } from '../Button';
import { TokenImage } from '../TokenImage';
import { TokenName } from '../TokenName';
import { useBoolean } from '@hooks';
import clsx from 'clsx';

export interface BalanceInputProps extends Omit<NumInputProps, 'value' | 'onChange'> {
  value?: string | number;
  currency?: Token;
  onChange?: (value: string | number) => void;
  onMax?: () => void;
}

export const BalanceInput: FC<BalanceInputProps> = ({ currency, value, onMax, onChange, ...rest }) => {
  const onNumChange = useCallback(
    (userInput: string) => {
      if (!onChange) return;

      onChange(userInput);
    },
    [onChange]
  );
  const { value: focused, setTrue: setFocused, setFalse: setUnFocused } = useBoolean(false);

  return (
    <div className={
      clsx(
        'relative flex items-stretch border  h-60 rounded-8 bg-grey-666 hover:border-primary transition-all',
        {
          'border-primary': focused,
          'border-grey-66': !focused
        }
      )
    }>
      <NumInput onBlur={setUnFocused} onChange={onNumChange}
        onFocus={setFocused}
        placeholder='0.0'
        value={value}
        {...rest}
      />
      {onMax ? (
        <Button className='font-medium pr-16' color='primary'
          onClick={onMax}
          variant='text'>
          Max
        </Button>
      ) : null}
      {currency ? (
        <div className='flex-center pl-10 pr-16 text-16 font-medium text-494853'>
          <TokenImage token={currency} />
          <TokenName className='ml-4' token={currency} />
        </div>
      ) : null}
    </div>
  );
};
