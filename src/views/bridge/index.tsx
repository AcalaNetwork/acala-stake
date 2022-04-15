import React, { FC } from "react";
import { Card, StakeLayout } from "@components";
import { EnsureSDKReady } from "@sdk/components/EnsureSDKReady";
import { BridgeProvider } from "./components/BridgeContext";
import { TopNav } from "./TopNav";

export const Bridge: FC = () => {
  return (
    <StakeLayout>
      <EnsureSDKReady requires={['acala-wallet', 'karura-wallet', 'crosschain']}>
        <BridgeProvider>
          <TopNav />
          <div className="container mt-[39px]">
            <Card className="py-32 flex flex-center"
              variant="gradient-border">
              {/* {step == "create" && <BridgeConsole />}
              {step == "confirm" && <ConfirmConsole />}
              {step == "result" && <ResultConsile />} */}
            </Card>
          </div>
        </BridgeProvider>
      </EnsureSDKReady>
    </StakeLayout>
  );
};
