import { FC, useState } from "react";
import { Card } from "../../../../components/Card";
import { formatNumber } from "../../../../utils/formatNumber";

export const TokenOverviewCard = () => {
  return (
    <div className="flex flex-between flex-wrap mt-20">
      <Card
        variant="gradient-border"
        className="w-[380px] h-[114px] pt-24 pl-68 mb-32"
      >
        <div className="text-16 leading-20 text-494853 mb-16">
          Liquidation Price
        </div>
        <div className="text-24 leading-29 text-primary font-semibold">{`$${formatNumber(
          15
        )}`}</div>
      </Card>

      <Card
        variant="gradient-border"
        className="w-[380px] h-[114px] pt-24 pl-68 mb-32"
      >
        <div className="text-16 leading-20 text-494853 mb-16">
          Liquidation Ratio
        </div>
        <div className="text-24 leading-29 text-primary font-semibold">{`${formatNumber(
          150
        )}%`}</div>
      </Card>
      <Card
        variant="gradient-border"
        className="w-[380px] h-[114px] pt-24 pl-68 mb-32"
      >
        <div className="text-16 leading-20 text-494853 mb-16">
          Required Collateral Ratio
        </div>
        <div className="text-24 leading-29 text-primary font-semibold">{`${formatNumber(
          160
        )}%`}</div>
      </Card>
      <Card
        variant="gradient-border"
        className="w-[380px] h-[114px] pt-24 pl-68 mb-32"
      >
        <div className="text-16 leading-20 text-494853 mb-16">
          Current Price
        </div>
        <div className="text-24 leading-29 text-31c26b font-semibold">{`$${formatNumber(
          15
        )}`}</div>
      </Card>
      <Card
        variant="gradient-border"
        className="w-[380px] h-[114px] pt-24 pl-68 mb-32"
      >
        <div className="text-16 leading-20 text-494853 mb-16">
          Current Ratio
        </div>
        <div className="text-24 leading-29 text-31c26b font-semibold">{`${formatNumber(
          180
        )}%`}</div>
      </Card>
      <Card
        variant="gradient-border"
        className="w-[380px] h-[114px] pt-24 pl-68 mb-32"
      >
        <div className="text-16 leading-20 text-494853 mb-16">
        Collateral Locked
        </div>
        <div className="text-24 leading-29 text-primary font-semibold">
          {`${formatNumber(100)}`} {"LDOT"}
        </div>
      </Card>
    </div>
  );
};
