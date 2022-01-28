import { FC } from "react";
import { Card } from "../../../../components/Card";
import { FormatBalance } from "../../../../components/FormatBalance";
import { FormatRatio } from "../../../../components/FormatRatio";
import { TokenName } from "../../../../components/TokenName";
import { useStakeBalance } from "../../hook/useStakeBalance";

export const BalanceCard: FC<{ token: "KSM" | "DOT" }> = ({ token }) => {
  const { available, staked, apy, liquidToken } = useStakeBalance(token);
  return (
    <Card
      variant="gradient-border"
      className="flex flex-between h-[150px] px-[119px] text-7b7986"
    >
      <div className="flex flex-col justify-start items-center">
        <div className="text-14 leading-17 mb-8">Available to Stake</div>
        <div className="text-28 leading-34 text-2e2d33 font-semibold text-center">
          {available ? <FormatBalance balance={available} human/> : '-'} {token}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <div className="text-14 leading-17 mb-8">Staked Amount</div>
        <div className="text-28 leading-34 text-2e2d33 font-semibold text-center">
          {staked ? <FormatBalance human balance={staked} /> : '-'} <TokenName token={liquidToken}/>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <div className="text-14 leading-17 mb-8">Current APY</div>
        <div className="flex flex-col items-center gap-y-10">
          <span>
            Est <span className="text-primary font-semibold text-24"><FormatRatio data={apy} /></span>
          </span>
          <span className="text-e40c5b font-semibold">
            +10% APR ACA airdrop
          </span>
        </div>
      </div>
    </Card>
  );
};
