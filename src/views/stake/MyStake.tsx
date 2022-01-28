import { useContext } from "react";
import { StakeLayout } from "../../components/layout";
import { Spacing } from "../../components/Spacing";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { TabsCard } from "./components/mystake/TabsCard";
import { TotalStake } from "./components/mystake/TotalStake";
import { StakeProviderContext } from "./components/stake/StakeContext";
import { StakeSubPageTabs } from "./components/StakeSubTabs";
import { StakeTopBoard } from "./components/StakeTopBoard";

export const MyStake = () => {
  const { activeToken } = useContext(StakeProviderContext);
  return (
    <EnsureSDKReady requires={['acala-homa', 'karura-homa', 'acala-wallet', 'karura-wallet']}>
      <StakeLayout>
        <StakeTopBoard token={activeToken} />
        <StakeSubPageTabs active={2} token={activeToken}/>
        <div className="container">
          <Spacing h={40} />
          <TotalStake token={activeToken} />
          <Spacing h={40} />
          <TabsCard />
        </div>
      </StakeLayout>
    </EnsureSDKReady>
  );
};
