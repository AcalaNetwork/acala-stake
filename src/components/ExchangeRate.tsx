import { FixedPointNumber, Token } from '@acala-network/sdk-core';
import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { FormatBalance } from './FormatBalance';
import SwapIcon from '/public/icons/swap.svg';

interface ExchangeRateProps {
  token1: Token;
  token2: Token;
  balance1: FixedPointNumber;
  balance2: FixedPointNumber;
  className?: string;
}

export const ExchangeRate: FC<ExchangeRateProps> = memo(({ balance1, balance2, className, token1, token2 }) => {
  const [isForward, setIsForward] = useState<boolean>(true);

  const handleSwapDirection = useCallback(() => {
    setIsForward(!isForward);
  }, [isForward, setIsForward]);

  // const pairData = useMemo(() => {
  //   return isForward
  //     ? [
  //         { balance: 1, token: token1 },
  //         { balance: balance2.div(balance1), token: token2 },
  //       ]
  //     : [
  //         { balance: 1, token: token2 },
  //         { balance: balance1.div(balance2), token: token1 },
  //       ];
  // }, [balance1, balance2, token1, token2, isForward]);

  // return (
  //   <div className={`${className} flex items-center`}>
  //     <FormatBalance pair={pairData} pairSymbol='≈' />
  //     <div className='ml-6 cursor-pointer' onClick={handleSwapDirection}>
  //       <SwapIcon />
  //     </div>
  //   </div>
  // );
  return null;
});

ExchangeRate.displayName = 'ExchangeRate';
