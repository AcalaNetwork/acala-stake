import { useContext, useMemo } from "react";
import { StakeLayout } from "@components/layout";
import { Spacing } from "@components/Spacing";
import { BalanceOverview } from "./components/BalanceOverview";
import { CrossChainConfirm } from "./components/stake/CrossChainConfirm";
import { CrossChainCreate } from "./components/stake/CrossChainCreate";
import { StakeProviderContext } from "./components/stake/StakeContext";
import { CrossChainConnect } from "./components/stake/CrossChainConnect";
import { StakeSubPageTabs } from "./components/StakeSubTabs";
import { StakeTopBoard } from "./components/StakeTopBoard";
import { StakeCreate } from "./components/stake/StakeCreate";
import { StakeConfirm } from "./components/stake/StakeConfirm";
import { StakeResult } from "./components/stake/StakeResult";
import { Step } from "@components/Step";
import { Card } from "@components/Card";
import { Ecosystem } from "../home/components/Ecosystem";
import { BridgeServer, UserGuide } from "./components/stake/UserGuide";
import { FAQ, Wraps } from "./components/stake/FAQ";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { useRouter } from "next/router";
import { SDKNetwork } from "@sdk/types";
import { useHomaConts } from "@sdk/hooks/homa";
import { memo } from "react";
import { useActiveAccount } from "@connector";

const stepData = [
  {
    id: 1,
    desc: "DOT Balance",
  },
  {
    id: 2,
    desc: "Stake",
  },
  {
    id: 3,
    desc: "Confirmation",
  },
];

export const Stake = memo(() => {
  const router = useRouter();
  const network = router.query.network as SDKNetwork;
  const active = useActiveAccount();

  // const { step, connect } = useContext(StakeProviderContext);

  // const subPageTab = useMemo(() => {
  //   if (
  //     step === "wallet-overview" ||
  //     step === "wallet-confirm" ||
  //     step === "wallet-create"
  //   ) {
  //     return 1;
  //   } else if (step === "stake-create") {
  //     return 2;
  //   } else if (step === "stake-confirm") {
  //     return 3;
  //   } else if (step === "stake-result") {
  //     return 4;
  //   } 
  //   return 1;
    
  // }, [step]);

  return (
    <StakeLayout>
      <EnsureSDKReady
        requires={[
          'acala-homa',
          'karura-homa',
          'acala-wallet',
          'karura-wallet'
        ]}
      >
        <StakeTopBoard network={network} />
        <StakeSubPageTabs
          active={0}
          network={network}
        />
        <div className="container">
          {
            active && <BalanceOverview className='mt-47'
              network={network} />
          }
          <Card className="mt-36 pt-40 pb-38">

          </Card>
          <UserGuide className="mt-36" />
          <FAQ className="mt-31" />
        </div>
        {/* <div className="container">
          {connect && (
            <>
            </>
          )}
          <Spacing h={40} />
          <Card className="pt-40 pb-[111px]"
            variant="gradient-border">
            <div className="w-[630px] mx-auto">
              <Step active={subPageTab}
                data={stepData} />
            </div>
            <Spacing h={44} />
            {step === "wallet-overview" ? <CrossChainConnect /> : null}
            {step === "wallet-create" ? <CrossChainCreate token={activeToken} /> : null}
            {step === "wallet-confirm" ? <CrossChainConfirm token={activeToken} /> : null}
            {step === "stake-create" ? <StakeCreate /> : null}
            {step === "stake-confirm" ? <StakeConfirm /> : null}
            {step === "stake-result" ? <StakeResult /> : null}
          </Card>
          {step === "wallet-create" || step === "wallet-confirm" ? (
            <BridgeServer />
          ) : null}
          {step !== "wallet-overview" && step !== "stake-result" ? (
            <Wraps />
          ) : null}
          {step === "stake-result" ? (
            <>
              <Spacing h={17} />
              <Ecosystem />
            </>
          ) : null}
        </div> */}
      </EnsureSDKReady>
    </StakeLayout>
  );
});
