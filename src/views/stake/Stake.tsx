import { useContext, useMemo } from "react";
import { StakeLayout } from "@components/layout";
import { Spacing } from "@components/Spacing";
import { BalanceCard } from "./components/stake/BalanceCard";
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
import { Ecosystem } from "../express/components/Ecosystem";
import { BridgeServer } from "./components/stake/BridgeServer";
import { Wraps } from "./components/stake/Wraps";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";

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

export const Stake = () => {
  const { step, connect, activeToken } = useContext(StakeProviderContext);

  const subPageTab = useMemo(() => {
    if (
      step === "wallet-overview" ||
      step === "wallet-confirm" ||
      step === "wallet-create"
    ) {
      return 1;
    } else if (step === "stake-create") {
      return 2;
    } else if (step === "stake-confirm") {
      return 3;
    } else if (step === "stake-result") {
      return 4;
    } else {
      return 1;
    }
  }, [step]);

  return (
    <EnsureSDKReady requires={['acala-homa', 'karura-homa', 'acala-wallet', 'karura-wallet']}>
      <StakeLayout>
        <StakeTopBoard token={activeToken} />
        <StakeSubPageTabs active={0} token={activeToken} />
        <div className="container">
          {connect && (
            <>
              <Spacing h={47} />
              <BalanceCard token={activeToken} />
            </>
          )}
          <Spacing h={40} />
          <Card variant="gradient-border" className="pt-40 pb-[111px]">
            <div className="w-[630px] mx-auto">
              <Step active={subPageTab} data={stepData} />
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
        </div>
      </StakeLayout>
    </EnsureSDKReady>
  );
};
