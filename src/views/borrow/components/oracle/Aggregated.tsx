import { MaybeCurrency } from "@acala-network/sdk-core";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { FC, useMemo, useState } from "react";
import { Card } from "../../../../components/Card";

interface AggregatedProps {
  token: MaybeCurrency;
  trend: number;
  price: number;
  timestep: string;
}

export const AggregatedItem: FC<AggregatedProps> = ({
  token,
  trend,
  price,
  timestep,
}) => {
  const color = useMemo(() => trend > 0 ? 'text-red-500' : 'text-31c26b', [trend]);
  return <Card className="border w-[200px] border-d6d3de rounded-24 pt-24 pb-22 pl-22 pr-18">
    <div className="flex flex-between w-full">
      <div className="text-16 leading-20 text-[#b1b0bc] font-medium">{token}</div>
      <div className={`flex flex-center ${color}`}>
        {trend > 0 ? <ArrowUpIcon className="w-14 h-14" /> : <ArrowDownIcon className="w-14 h-14"/>}
        <span className="text-16 leading-20">{`${trend > 0 ? +trend : trend}%`}</span>
      </div>
    </div>
    <div className="mt-20 text-24 leading-29 text-494853 font-semibold">
      {`$${price}`}
    </div>
    <div className="mt-18 text-14 leading-17 text-[#828282]">
      {timestep}
    </div>
  </Card>
};

export const Aggregated = () => {
  const [data, setData] = useState<AggregatedProps[]>([
    { token: "DOT", trend: 11.7, price: 32.6, timestep: "2 minutes age" },
  ]);

  return (
    <>
      <div className="text-20 leading-[24px] text-494853 font-medium">Aggregated</div>
      <div className="flex items-center justify-start mt-24">
        {data.map((item, i) => (
          <div className="mr-10">
            <AggregatedItem {...item} key={i} />
          </div>
        ))}
      </div>
    </>
  );
};
