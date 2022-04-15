import { memo } from "react";
import { useRouter } from "next/router";
import { SDKNetwork } from "@sdk/types";
import { useActiveAccount } from "@connector";
import { StakeLayout, Card } from "@components";
import { EnsureSDKReady } from "@sdk/components/EnsureSDKReady";
import { StakeStep } from "./components/stake/StekeStep";
import { StakeConsole } from "./components/stake/StakeConsole";
import { BalanceOverview } from "./components/BalanceOverview";
import { StakeProvider } from "./components/stake/StakeProvider";
import { StakeSubPageTabs } from "./components/StakeSubTabs";
import { StakeTopBoard } from "./components/StakeTopBoard";
import { UserGuide } from "./components/stake/UserGuide";
import { FAQ } from "./components/stake/FAQ";

export const Stake = memo(() => {
  const router = useRouter();
  const network = router.query.network as SDKNetwork;
  const active = useActiveAccount();

  return (
    <StakeLayout>
      <EnsureSDKReady
        requires={[
          'crosschain',
          'acala-homa',
          'karura-homa',
          'acala-wallet',
          'karura-wallet'
        ]}
      >
        <StakeTopBoard network={network} />
        <StakeSubPageTabs active={0} network={network}
        />
        <div className="container">
          {
            active && <BalanceOverview className='mt-47'
              network={network} />
          }
          <StakeProvider network={network}>
            <Card className="mt-36 pt-40 pb-38">
              <StakeStep />
              <StakeConsole />
            </Card>
          </StakeProvider>
          <UserGuide className="mt-36" />
          <FAQ className="mt-31" />
        </div>
      </EnsureSDKReady>
    </StakeLayout>
  );
});
