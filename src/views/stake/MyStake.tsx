import { StakeLayout } from "@components/layout";
import { Spacing } from "@components/Spacing";
import { useRouter } from "next/router";
import { memo } from "react";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { TabsCard } from "./components/my-stake/TabsCard";
import { StakingOverview } from "./components/my-stake/StakingOverview";
import { StakeSubPageTabs } from "./components/StakeSubTabs";
import { StakeTopBoard } from "./components/StakeTopBoard";

export const MyStake = memo(() => {
  const router = useRouter();
  const network = router.query.network as SDKNetwork;

  return (
    <StakeLayout>
      <EnsureSDKReady requires={['acala-homa', 'karura-homa', 'acala-wallet', 'karura-wallet']}>
        <StakeTopBoard network={network} />
        <StakeSubPageTabs active={2} network={network} />
        <div className="container">
          <Spacing h={40} />
          <StakingOverview network={network} />
        </div>
      </EnsureSDKReady>
    </StakeLayout>
  );
});
