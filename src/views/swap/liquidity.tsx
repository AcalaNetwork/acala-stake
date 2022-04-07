import React, { useContext } from "react";
import { Card } from "../../components/Card";
import { Layout } from "../../components/layout";
import { TopBoard } from "../../components/TopBoard";
import { AddLiquidityConfirmModal } from "../../modals/AddLiquidityConfirm";
import { LiquidityProviderContext, LiquidityProvider } from "./LiquidityContext";
import { LiquidityConsole } from "./components/LiquidityConsole";
import { LiquidityOverview } from "./components/LiquidityOverview";
import { LiquidityResultConsile } from "./components/LiquidityResultConsile";
import { SwapSubPageTabs } from "./components/SwapSubPageTabs";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";

const Inner = () => {
  const { step } = useContext(LiquidityProviderContext);

  return (
    <EnsureSDKReady requires={['acala-wallet', 'karura-wallet']}>
      <div className="container mt-32">
        <Card
          shadow={"none"}
          variant="gradient-border"
          className="py-40 flex flex-center"
        >
          {step === "create" ? <LiquidityConsole /> : null}
          {step === "result" ? <LiquidityResultConsile /> : null}
        </Card>
      </div>
    </EnsureSDKReady>
  );
};

export const Liquidity = () => {
  return (
    <LiquidityProvider>
      <Layout>
        <TopBoard>
          <LiquidityOverview />
        </TopBoard>
        <SwapSubPageTabs active={1} />
        <Inner />
        <AddLiquidityConfirmModal />
      </Layout>
    </LiquidityProvider>
  );
};
