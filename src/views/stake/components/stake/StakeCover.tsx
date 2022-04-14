import { memo, useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Card, Button, Spacing, BaseComponentProps, FormatBalance } from "@components";
import { useActiveAccount } from "@connector";
import { useHomaConts } from "@sdk/hooks/homa";
import { getNetworkName } from "@utils/network";
import { getTokenName } from '@utils/token';
import { useNetworkInfos } from "@sdk/hooks/wallet/useNetworkInfo";
import { StakeSteps, useStakeContext } from "./StakeProvider";
import { useCrossChain } from "@sdk/hooks/crosschain/useCrossChian";
import { ConnectedNetworks } from "config";
import { CrossChainRouter } from "@acala-network/sdk/cross-chain/types";
import { useMemo } from "react";
import { Token } from "@acala-network/sdk-core";
import { useCrossChainBalance } from "@sdk/hooks/crosschain/useCrossChainBalance";

interface StakingTokenBalanceProps extends BaseComponentProps {
  available: boolean
  network: ConnectedNetworks;
  token: Token
}

const StakingTokenBalance = memo<StakingTokenBalanceProps>(({ available, className, network, token }) => {
  const tokenName = getTokenName(token);
  const balance = useCrossChainBalance(network, token.symbol);

  console.log(network, available);

  return (
    <div className={clsx("flex flex-between text-16 leading-20 text-grey-2", {
      'font-semibold': available 
    }, className)}>
      <div>{tokenName} Balance on {network} {available && '(Available to Stake)'}</div>
      <div className="font-semibold">
        <FormatBalance
          balance={balance}
          placeholder="-"
        />{' '}
        {tokenName}
      </div>
    </div>
  );
});

function getAllAvailableNetworks (routers: CrossChainRouter[]): ConnectedNetworks[] {
  const network = new Set();

  routers.forEach((i) => {
    network.add(i.from.id);
    network.add(i.to.id);
  });

  return Array.from(network) as ConnectedNetworks[];
}

export const StakeCover = memo<BaseComponentProps>(({ className }) => {
  const { network, hooks } = useStakeContext();
  const conts = useHomaConts(network);
  const active = useActiveAccount();
  const setStep = hooks.useSetStep();
  const crossChain = useCrossChain();
  const stakingToken = conts.stakingToken;
  const stakingTokenName = getTokenName(stakingToken);
  const toStake = useCallback(() => setStep(StakeSteps.STAKE), [setStep]);
  const toBridge = useCallback(() => setStep(StakeSteps.BRIDGE), [setStep]);

  const availableNetworks = useMemo(() => {
    const routers = crossChain.router.getRouters({ token: conts.stakingToken.symbol });

    return getAllAvailableNetworks(routers);
  }, [conts.stakingToken.symbol, crossChain.router]);

  return (
    <Card
      className={clsx("py-40 px-56", className)}
      variant="border"
    >
      {
        availableNetworks.map((data, i) => (
          <StakingTokenBalance
            available={data === 'karura' || data === 'acala'}
            className={i === 0 ? 'font-semibold' : 'mt-26'}
            key={`crosschain-balance-${i}`}
            network={data}
            token={stakingToken}
          />
        ))
      }
      {active ? (
        <div className="flex gap-30 text-16 mt-57">
          <Button
            className="flex-1 h-48"
            onClick={toBridge}
            size="sm"
          >
            Bring {stakingTokenName} to Acala
          </Button>
          <Button
            className="flex-1 h-48"
            onClick={toStake}
            size="sm"
            variant="outline"
          >
            Stake
          </Button>
        </div>
      ) : (
        <div className="flex flex-center flex-col">
          <Button className="w-full h-48 text-16"
            size="sm">
            Connect Wallet
          </Button>
          <Spacing h={16} />
          <div className="text-14 leading-17 font-medium text-grey-3">
            Remo more on wallet guide{" "}
            <Link href="http://www.google.com">
              <span className="text-primary border-b border-primary cursor-pointer">
                Here
              </span>
            </Link>
            .
          </div>
        </div>
      )}
    </Card>
  );
});
