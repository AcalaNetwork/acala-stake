import { StakeLayout } from "@components/layout";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { StakeTopBoard } from "./components/StakeTopBoard";
import { UnstakeConsole } from "./components/unstake/UnstakeConsole";
import { useRouter } from "next/router";
import { SDKNetwork } from "@sdk/types";
import { Spacing } from "@components";
import { StakeSubPageTabs } from "./components/StakeSubTabs";


export const UnStake = () => {
  const router = useRouter();
  const network = router.query.network as SDKNetwork;

  return (
    <StakeLayout>
      <EnsureSDKReady requires={[
        'acala-wallet',
        'karura-wallet',
        'acala-homa',
        'karura-homa'
      ]}>
        <StakeTopBoard network={network} />
        <StakeSubPageTabs active={1} network={network} />
        <div className="container">
          <Spacing h={47} />
          <UnstakeConsole network={network} />
        </div>
      </EnsureSDKReady>
    </StakeLayout>
  );
};
