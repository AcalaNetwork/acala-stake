import { FC } from "react";
import { FormatBalance } from "../../../components/FormatBalance";
import { FormatValue } from "../../../components/FormatValue";
import { TokenImage } from "../../../components/TokenImage";
import { TopBoard } from "../../../components/TopBoard";
import { useTotalStaking } from "../hook/useTotalStaking";

export const StakeTopBoard: FC<{ token: "KSM" | "DOT" }> = ({ token }) => {
  const { amount, value } = useTotalStaking(token);

  return (
    <TopBoard>
      <div className="flex flex-between min-h-126 text-24 leading-29 font-semibold">
        <div>Stake {token?.toUpperCase()}</div>
        <div className="flex">
          <TokenImage token={token} size={64} className=" mr-32" />
          <div className="flex flex-col">
            <div className="flex justify-start items-center gap-10"><FormatBalance balance={amount} human /> <span>{token}</span></div>
            <div className="text-20 text-7b7986 mt-12 font-medium">
              <FormatValue data={value} />
            </div>
          </div>
        </div>
      </div>
    </TopBoard>
  );
};
