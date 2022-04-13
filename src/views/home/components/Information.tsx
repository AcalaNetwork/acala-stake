import { FC, ReactNode } from "react";
import { Spacing } from "../../../components/Spacing";

import Stake1 from "/public/pages/express/stake-1.svg";
import Stake2 from "/public/pages/express/stake-2.svg";
import Stake3 from "/public/pages/express/stake-3.svg";

interface InfoItemProps {
  title: string;
  desc: string;
  icon?: ReactNode;
}

const InfoItem: FC<InfoItemProps> = ({ title, desc, icon }) => {
  return (
    <div className="max-w-[30%]">
      <div className="flex flex-center mb-36">{icon}</div>
      <div className="text-20 leading-[24px] tracking-[1.6px] font-bold text-494853">{title}</div>
      <Spacing h={20} />
      <div className="text-16 leading-[28px] text-[#828282] font-medium">{desc}</div>
    </div>
  );
};

export const Information = () => {
  return (
    <div className="container text-center">
      <div className="text-[32px] leading-[39px] text-2e2d33 font-bold">
        Why Liquid Staking with Acala?
      </div>
      <Spacing h={120} />
      <div className="flex flex-between px-40">
        <InfoItem
          desc="Acala Liquid Staking offers sustainable and consistent staking rewards. It aims to democratize premium staking service accessible to everyone."
          icon={<Stake1 />}
          title="Long Term Yield"
        />
        <InfoItem
          desc="Acala Liquid Staking is a non-custodial protocol that allows you to stake and earn in a couple of clicks, with option to unstake without the wait."
          icon={<Stake2 />}
          title="Simple & Secure"
        />
        <InfoItem
          desc="Stake DOT/KSM to earn immediately, and receive liquid asset (LDOT/LKSM) ready to trade, take out loans, provide liquidity etc. to grow your balance."
          icon={<Stake3 />}
          title="Earn & Grow Balance"
        />
      </div>
    </div>
  );
};
