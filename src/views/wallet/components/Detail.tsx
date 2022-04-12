import { FC, useContext } from "react";
import { DisplayContext } from "..";
import { Loading } from "../../../components/Loading";
import { Spacing } from "../../../components/Spacing";
import { StakeData } from "../hook/useStakesCalculator";
import { DisplaySelector } from "./DisplaySelector";
import { TokenCard } from "./TokenCard";

export const Detail: FC<{ data: StakeData[] }> = ({ data }) => {
  const { type, changeType } = useContext(DisplayContext);

  return (
    <>
      <DisplaySelector value={type} onChange={(e) => changeType(e)} />

      <Spacing h={40} />
      {data ? (
        data.map((item) => (
          <>
            <TokenCard {...item} type={type} />
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
