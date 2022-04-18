import { FC, useCallback, useMemo } from 'react';
import { useMemoized } from '../../hooks';
import { Selector } from './Selector';
import TriangleIcon from '/public/icons/triangle.svg';
import { CheckIcon } from '@heroicons/react/solid';
import { ChainImage } from '@components/ChainImage';
import clsx from 'clsx';

export interface ChainData {
  value: string;
  display: string;
}

interface ChainSelectorProps {
  chains: ChainData[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const selectedRounder = (disabled: boolean, chain?: ChainData) => () => (
  <div className='flex flex-between h-full px-16'>
    <div className='flex flex-center'>
      <ChainImage chain={chain?.value} />
      <span className='ml-12 font-medium text-14 leading-17 text-grey-2'>{chain?.display}</span>
    </div>
    {disabled ? <div/> : <TriangleIcon />}
  </div>
);

const itemRender = (chain: ChainData, selected: string) => (
  <div className='py-12 px-8 rounded-8 flex flex-between hover:bg-grey-66'>
    <div className='flex flex-center'>
      <ChainImage chain={chain.value} />
      <span className='ml-8 font-medium text-16 leading-20 text-grey-3'>{chain.display}</span>
    </div>

    {selected && selected === chain.value && (
      <CheckIcon aria-hidden='true' className='h-[20px] w-[20px] text-primary' />
    )}
  </div>
);

export const ChainSelector: FC<ChainSelectorProps> = ({ disabled, chains, value, onChange, className }) => {
  const memChains = useMemoized(chains);

  const items = useMemo(() => {
    return memChains.map((item) => {
      return {
        value: item,
        render: itemRender,
      };
    });
  }, [memChains]);

  const selected = useMemo(() => {
    return memChains.find((item) => item.value === value);
  }, [memChains, value]);

  const handleOnChange = useCallback((data: ChainData) => {
    onChange && onChange(data.value);
  }, [onChange]);

  return <Selector
    disabled={disabled}
    items={items}
    onChange={handleOnChange}
    render={selectedRounder(disabled, selected)}
    rootClassName={clsx('h-56 relative border border-1 border-grey-5 bg-white rounded-8', className)}
    value={value}
  />;
};
