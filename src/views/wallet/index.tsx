import { memo } from "react";
import { StakeLayout } from "@components/layout";
import { Spacing } from "@components/Spacing";
import { EnsureSDKReady } from "@sdk/components/EnsureSDKReady";
import { Asset } from "./components/Asset";
import { Detail } from "./components/Detail";
import { useStakesCalculator } from "./hook/useStakesCalculator";

export const Wallet = memo(() => {
  const { result, total } = useStakesCalculator();

  return (
    <StakeLayout>
      <EnsureSDKReady
        requires={[
          "acala-wallet",
          "karura-wallet",
          "acala-homa",
          "karura-homa",
        ]}
      >
        <div className="w-[1040px] mx-auto">
          <Spacing h={40} />
          <Asset data={total} />
          <Spacing h={40} />
          <Detail data={result} />
        </div>
      </EnsureSDKReady>
    </StakeLayout>
  );
});
