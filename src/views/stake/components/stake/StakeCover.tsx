import { memo, useCallback } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Card, Button, Spacing, BaseComponentProps, FormatBalance } from '@components';
import { useActiveAccount } from '@connector';
import { getTokenName } from '@utils/token';
import { useStake } from './StakeProvider';
import { useCrossChain } from '@sdk/hooks/crosschain/useCrossChain';
import { ConnectedNetworks } from 'config';
import { CrossChainRouter } from '@acala-network/sdk/cross-chain/types';
import { useMemo } from 'react';
import { Token } from '@acala-network/sdk-core';
import { useCrossChainBalance } from '@sdk/hooks/crosschain/useCrossChainBalance';
import { StakeSteps } from '@views/stake/types';

interface StakingTokenBalanceProps extends BaseComponentProps {
  available: boolean;
  network: ConnectedNetworks;
  token: Token;
}

const StakingTokenBalance = memo<StakingTokenBalanceProps>(({ available, className, network, token }) => {
  const tokenName = getTokenName(token);
  const balance = useCrossChainBalance(network, token.symbol);

  return (
    <div
      className={clsx(
        'flex flex-between text-16 leading-20 text-grey-2',
        {
          'font-semibold': available,
        },
        className
      )}
    >
      <div>
        {tokenName} Balance on {network} {available && '(Available to Stake)'}
      </div>
      <div className='font-semibold'>
        <FormatBalance balance={balance} placeholder='-' /> {tokenName}
      </div>
    </div>
  );
});

function getAllAvailableNetworks(routers: CrossChainRouter[]): ConnectedNetworks[] {
  const network = new Set();

  routers.forEach((i) => {
    network.add(i.from.id);
    network.add(i.to.id);
  });

  return Array.from(network) as ConnectedNetworks[];
}

export const StakeCover = memo<BaseComponentProps>(({ className }) => {
  const { setStep, stakingToken } = useStake();
  const active = useActiveAccount();
  const crossChain = useCrossChain();
  const stakingTokenName = getTokenName(stakingToken);
  const toStake = useCallback(() => setStep(StakeSteps.FORM), [setStep]);
  const toBridge = useCallback(() => setStep(StakeSteps.BRIDGE), [setStep]);

  const availableNetworks = useMemo(() => {
    const routers = crossChain.router.getRouters({
      token: stakingToken.symbol,
    });

    return getAllAvailableNetworks(routers);
  }, [crossChain.router, stakingToken.symbol]);

  return (
    <Card className={clsx('py-40 px-56', className)} variant='border'>
      {availableNetworks.map((data, i) => (
        <StakingTokenBalance
          available={data === 'karura' || data === 'acala'}
          className={i === 0 ? 'font-semibold' : 'mt-26'}
          key={`crosschain-balance-${i}`}
          network={data}
          token={stakingToken}
        />
      ))}
      {active ? (
        <div className='flex gap-30 text-16 mt-57'>
          <Button className='flex-1 h-48' onClick={toBridge}
            size='sm'>
            Bring {stakingTokenName} to Acala
          </Button>
          <Button className='flex-1 h-48' onClick={toStake}
            size='sm' variant='outline'>
            Stake
          </Button>
        </div>
      ) : (
        <div className='flex flex-center flex-col'>
          <Button className='w-full h-48 text-16' size='sm'>
            Connect Wallet
          </Button>
          <Spacing h={16} />
          <div className='text-14 leading-17 font-medium text-grey-3'>
            Remo more on wallet guide{' '}
            <Link href='http://www.google.com' passHref>
              <span className='text-primary border-b border-primary cursor-pointer'>Here</span>
            </Link>
            .
          </div>
        </div>
      )}
    </Card>
  );
});
