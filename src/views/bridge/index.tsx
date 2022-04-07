import React, { FC, useContext } from "react";
import { Card } from "../../components/Card";
import { Layout } from "../../components/layout";
import { BridgeConfirmModal } from "../../modals/BridgeConfirm";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { BridgeConsole } from "./BridgeConsole";
import { BridgeProviderContext, BridgeProvider } from "./BridgeContext";
import { ConfirmConsole } from "./ConfirmConsole";
import { ResultConsile } from "./ResultConsile";
import { TopNav } from "./TopNav";

const Inner: FC = () => {
  const { step } = useContext(BridgeProviderContext);

  return (
    <>
      <TopNav />
      <div className="container mt-[39px]">
        <Card variant="gradient-border" className="py-32 flex flex-center">
          {step == "create" && <BridgeConsole />}
          {step == "confirm" && <ConfirmConsole />}
          {step == "result" && <ResultConsile />}
        </Card>
      </div>
      <BridgeConfirmModal />
    </>
  );
};

export const Bridge: FC = () => {
  return (
    <Layout>
      <EnsureSDKReady requires={['acala-wallet', 'karura-wallet']}>
        <BridgeProvider>
          <Inner />
        </BridgeProvider>
      </EnsureSDKReady>
    </Layout>
  );
};
