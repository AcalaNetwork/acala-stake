import { FC } from "react";
import { Loading } from "@components/Loading";
import { Spacing } from "@components/Spacing";
import { DisplaySelector } from "./DisplaySelector";
import { TokenCard } from "./TokenCard";
import { StakeData } from "../hook/useStakesCalculator";
import { useBalanceDisplayType, useSetBalanceDisplayType } from "@state";

export const Detail: FC<{ data: StakeData[] }> = ({ data }) => {
  const balanceDisplayType = useBalanceDisplayType();
  const setBalanceDisplayType = useSetBalanceDisplayType();

  return (
    <>
      <DisplaySelector
        onChange={(e) => setBalanceDisplayType(e)}
        value={balanceDisplayType}
      />
      <Spacing h={40} />
      {data ? (
        data.map((item) => (
          <>
            <TokenCard 
              {...item}
              type={balanceDisplayType}
            />
            <Spacing h={32} />
          </>
        ))
      ) : (
        <div className="w-full h-100 flex flex-center">
          <Loading />
        </div>
      )}
    </>
  );
};
