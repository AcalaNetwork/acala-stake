import { MaybeCurrency } from "@acala-network/sdk-core";
import { FC, useState } from "react";
import { formatNumber } from "../../../../utils/formatNumber";

interface AssertProps {
  title: string;
  value: number;
  token: MaybeCurrency;
}

export const AssetCard: FC<AssertProps> = ({title, value, token}) => {
  return (
    <div
      className="bg-no-repeat bg-cover w-[388px] h-[121px] rounded-[24px] pt-32 pl-[62px]"
      style={{ backgroundImage: `url("/images/top-board-bg.svg")`, boxShadow: "5px 5px 15px rgba(35, 34, 49, 0.08), 1px 1px 1px rgba(100, 90, 255, 0.05)" }}
    >
      <div className="text-16 leading-20 text-grey-3 font-medium mb-11">{title}</div>
      <div className="flex items-end justify-start">
        <span className="text-24 leading-29 text-2e2d33 font-semibold">≈{formatNumber(value)}</span>
        <span className="ml-4 text-18 leading-[22px] text-494853 opacity-60 font-medium">{token}</span>
      </div>
    </div>
  );
};

export const VaultOverviewCard = () => {
  const [asset, setAsset] = useState<AssertProps[]>([
    { token: "sUSD", title: "Available Credit", value: 100300.25 },
    { token: "sUSD", title: "Total Debt Amount", value: 100300.25 },
    { token: "sUSD", title: "Total Collateral Amount", value: 100300.25 },
  ]);

  return (
    <div className="flex flex-between">
      {asset.map((item, i) => (
        <AssetCard {...item} key={i} />
      ))}
    </div>
  );
};
