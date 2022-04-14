import { InformationCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { FC } from "react";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { FormatBalance } from "@components/FormatBalance";
import { FormatRatio } from "@components/FormatRatio";
import { FormatValue } from "@components/FormatValue";
import { Popover } from "@components/Popover";
import { Spacing } from "@components/Spacing";
import { useMyStake } from "../../hook/useMyStakes";

export const TotalStake: FC<{ token: "KSM" | "DOT" }> = ({ token }) => {
  const { totalAmount, totalValue, earningAmount, earningValue, apy, airdrop } =
    useMyStake(token);
  return (
    <Card variant="gradient-border" className="px-60 pt-56 pb-32 mx-auto">
      <div className="flex justify-around items-center text-494853 h-[156px] bg-primary bg-opacity-5 border border-eae9f0 rounded-16">
        <div className="flex flex-col items-center">
          <div className="text-20 leading-[24px] font-semibold flex gap-10">
            <FormatBalance balance={totalAmount} human /> {token}
          </div>
          <div className="text-14 leading-17 my-12 text-grey-3 font-medium">
            <FormatValue data={totalValue} />
          </div>
          <div className="text-14 leading-17 mb-8 flex">
            Total Staked
            <Popover
              className="text-14 font-normal"
              content={
                <div className="w-[240px]">
                  Free Balance + Used as Collateral
                </div>
              }
            >
              <InformationCircleIcon className="w-18 h-18 text-[#828282]" />
            </Popover>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-20 leading-[24px] font-semibold flex gap-10">
            <FormatBalance balance={earningAmount} human /> {token}
          </div>
          <div className="text-14 leading-17 my-12 text-grey-3 font-medium">
            <FormatValue data={earningValue} />
          </div>
          <div className="text-14 leading-17 mb-8 flex">
            Est. Earning
            <Popover
              className="text-14 font-normal"
              content={
                <div className="w-[180px]">
                  (Free Balance + Used as Collateral) * 24h LDOT earning
                </div>
              }
            >
              <InformationCircleIcon className="w-18 h-18 text-[#828282]" />
            </Popover>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-24 leading-[29px] font-semibold text-primary mb-16">
            <FormatRatio data={apy} />
          </div>
          <div className="text-14 leading-17">Est. APY</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-20 leading-[24px] font-semibold">*** ACA</div>
          <div className="text-14 leading-17 my-12 text-grey-3 font-medium">
            *****
          </div>
          <div className="text-14 leading-17 mb-8">Airdrop</div>
        </div>
      </div>
      <Spacing h={33} />
      <div className="flex flex-center gap-[97px]">
        <Button size="sm" className="w-[200px]">
          <Link href={`/stake/${token.toLowerCase()}`}>Stake More</Link>
        </Button>
        <Button size="sm" className="w-[200px]">
          <Link href={`/stake/${token.toLowerCase()}/unstake`}>Unstake</Link>
        </Button>
        <Button size="sm" className="w-[200px]">
          Claim Airdrop
        </Button>
      </div>
    </Card>
  );
};
