import { Token } from '@acala-network/sdk-core';
import { FC, useCallback, useMemo } from 'react';
import { useBoolean, useMemoized } from '../../hooks';
import { TokenImage, TokenSize } from '../TokenImage';
import { TokenName } from '../TokenName';
import { Selector } from './Selector';
import TriangleIcon from '/public/icons/triangle.svg';
import { CheckIcon } from '@heroicons/react/solid';
import { memo } from 'react';
import clsx from 'clsx';
import Lock from '/public/icons/lock.svg';

interface TokenSelectorProps {
  tokens: Token[];
  value?: Token;
  onChange?: (value: Token) => void;
  tokenSize?: TokenSize;
  className?: string;
  listClassName?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const TokenSelector: FC<TokenSelectorProps> = memo(
  ({ tokens, value, tokenSize, onChange, className, placeholder, listClassName, disabled }) => {
    const memTokens = useMemoized(tokens);
    const { value: focuse, setTrue: onFocuse, setFalse: onBlur } = useBoolean();

    const btnRender = useCallback(
      (value: Token) => {
        return value ? (
          <div className='flex flex-between px-16 h-full'>
            <div className='flex flex-center'>
              <TokenImage size={tokenSize} token={value} />
              <TokenName className='ml-8 leading-20 text-16 font-medium text-grey-2' token={value} />
            </div>
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
      [tokenSize, disabled, placeholder]
    );

    const itemRender = useCallback((selected: Token) => {
      return (value: Token) => (
        <div className='py-12 px-8 rounded-8 flex flex-between hover:bg-fff'>
          <div className='flex flex-center'>
            <TokenImage size='sm' token={value} />
            <TokenName className='ml-8 font-medium text-16 leading-20 text-grey-3' token={value} />
          </div>

          {selected && selected.name === value.name && (
            <CheckIcon aria-hidden='true' className='h-[20px] w-[20px] text-primary' />
          )}
        </div>
      );
    }, []);

    const items = useMemo(() => {
      return memTokens.map((item) => {
        return {
          value: item,
          render: itemRender(value),
        };
      });
    }, [itemRender, memTokens, value]);

    return (
      <Selector
        disabled={disabled}
        items={items}
        listClassName={listClassName}
        onBlur={onBlur}
        onChange={onChange}
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
