import { useContext } from "react";
import { StakeLayout } from "../../components/layout";
import { Spacing } from "../../components/Spacing";
import { UnstakeConfirmModal } from "../../modals/UnstakeConfirm";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { BalanceCard } from "./components/stake/BalanceCard";
import {
  StakeProvider,
  StakeProviderContext,
} from "./components/stake/StakeContext";
import { StakeSubPageTabs } from "./components/StakeSubTabs";
import { StakeTopBoard } from "./components/StakeTopBoard";
import { UnStakeCard } from "./components/unstake";

export const Inner = () => {
  const { connect, activeToken } = useContext(StakeProviderContext);
  return (
    <StakeLayout>
      <StakeTopBoard token={activeToken} />
      <StakeSubPageTabs active={1} token={activeToken} />
      <div className="container">
        {connect && (
          <>
            <Spacing h={47} />
            <BalanceCard token={activeToken}/>
          </>
        )}
      </div>
      <Spacing h={40} />
      <UnStakeCard token={activeToken} />
    </StakeLayout>
  );
};

export const UnStake = () => {
  return (
    <EnsureSDKReady requires={['acala-wallet', 'karura-wallet', 'acala-homa', 'karura-homa']}>
      <Inner />
      <UnstakeConfirmModal />
    </EnsureSDKReady>
  );
};
