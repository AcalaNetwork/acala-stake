import { BaseComponentProps, ChainSelector, FormPanel } from "@components";
import SwapIcon from "/public/pages/bridge/swap-btn.svg";
import { memo } from "react";
import { useCrossChain } from "@sdk/hooks/crosschain/useCrossChian";
import { Chain } from "@acala-network/sdk/cross-chain/types";
import { useCrossChainRouterSelector } from "../hooks/useCrossChainRouterSelector";

interface CrossChainRouterSelectorProps extends BaseComponentProps {
  token: string;
  fromChain: Chain;
  toChain: Chain;
}

export const CrossChainRouterSelector = memo<CrossChainRouterSelectorProps>(({ token, className }) => {
  const {
    fromChains,
    toChains,
    fromChain,
    toChain
  } = useCrossChainRouterSelector({ token });

  return (
    <FormPanel className="mb-[28px]">
      <div className="flex flex-center w-full">
        <FormPanel className="flex-1"
          label={"From"}>
          <ChainSelector
            chains={fromChains}
            className="relative h-72 border border-eae9f0 rounded-8"
            value={formChain}
          />
        </FormPanel>
        <div className="flex mx-[18px] mt-[25px]">
          <SwapIcon />
        </div>
        <FormPanel className="flex-1"
          label={"To"}>
          <ChainSelector
            chains={toChains}
            className="relative h-72 border border-eae9f0 rounded-8"
            value={toChain}
          />
        </FormPanel>
      </div>
    </FormPanel>
  );
});