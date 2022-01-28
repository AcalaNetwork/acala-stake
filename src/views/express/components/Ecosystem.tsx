import { FC, ReactNode } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { Spacing } from "../../../components/Spacing";
import AcalaSwap from '/public/pages/express/acala-swap.svg';
import KaruraSwap from '/public/pages/express/karura-swap.svg';
import { TokenImage } from "../../../components/TokenImage";

interface ItemProps {
  title: string;
  desc: string;
  icon: ReactNode;
}

const Item: FC<ItemProps> = ({ title, desc, icon }) => {
  return (
    <Card className="mb-20 py-28 px-34 text-left leading-[24px]">
      <div className="w-64 h-64 flex flex-center">{icon}</div>
      <div className="mt-24 text-20 text-333 tracking-[1px] font-semibold">{title}</div>
      <div className="mt-12 text-16 text-4f4f4f font-medium">{desc}</div>
    </Card>
  );
};

export const Ecosystem = () => {
  return (
    <div className="text-center container">
      <div className="text-[34px] leading-[44px] tracking-[0.04em] text-2e2d33 font-bold mb-64">
        Ecosystem
      </div>
      <div className="grid grid-cols-3 gap-x-17 gap-y-32">
        <Item
          icon={<AcalaSwap />}
          title="Acala Swap"
          desc="Trade LDOT with other assets"
        />
        <Item
          icon={<TokenImage token={"AUSD"} size={64} />}
          title="Acala Dollar"
          desc="Use LDOT as collateral to borrow aUSD"
        />
        <Item
          icon={<AcalaSwap />}
          title="Tapio"
          desc="Trade stable assets efficiently"
        />
        <Item
          icon={<KaruraSwap />}
          title="Karura Swap"
          desc="Trade LKSM with other assets"
        />
        <Item
          icon={<TokenImage token={"KUSD"} size={64} />}
          title="Karura Dollar"
          desc="Use LKSM as collateral to borrow kUSD"
        />
        <Item
          icon={<TokenImage token={"TAI"} size={64} />}
          title="Taigo"
          desc="Trade stable assets efficiently"
        />
      </div>
      <Spacing h={20} />
      <Button variant="outline" className=" rounded-[41px] w-[183px] font-normal h-56">VIEW ALL</Button>
    </div>
  );
};
