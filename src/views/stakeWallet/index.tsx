import { createContext, useState } from "react";
import { StakeLayout } from "../../components/layout";
import { Spacing } from "../../components/Spacing";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { StakeTopBoard } from "../stake/components/StakeTopBoard";
import { Asset } from "./components/Asset";
import { Detail } from "./components/Detail";
import { useStakesCalculator } from "./hook/useStakesCalculator";

export const DisplayContext = createContext({} as unknown as any);

export const StakeWallet = () => {
  const [type, setType] = useState("USD");

  const changeType = (value: string) => setType(value);

  return (
    <DisplayContext.Provider
      value={{
        type,
        changeType,
      }}
    >
      <StakeLayout>
        <EnsureSDKReady
          requires={[
            "acala-wallet",
            "karura-wallet",
            "acala-homa",
            "karura-homa",
          ]}
        >
          <Inner />
        </EnsureSDKReady>
      </StakeLayout>
    </DisplayContext.Provider>
  );
};

export const Inner = () => {
  const { result, total } = useStakesCalculator();

  return (
    <div className="w-[1040px] mx-auto">
      <Spacing h={40} />
      <Asset data={total} />
      <Spacing h={40} />
      <Detail data={result} />
    </div>
  );
};
