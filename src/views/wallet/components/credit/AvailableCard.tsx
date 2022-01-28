import { useState } from "react";
import { Card } from "../../../../components/Card";
import EyeIcon from '/public/icons/eye.svg';
import WalletIcon from '/public/icons/wallet.svg';
import { formatNumber } from "../../../../utils/formatNumber";

export const AvailableCard = () => {
  const [available, setAvailable] = useState(51323.55);

  return <Card className="w-[413px]" shadow={1} variant="gradient-border">
    <div className="pt-17 pl-[33px] pr-[22px] pb-[26px]">
      <div className="w-full flex justify-end mb-2">
        <EyeIcon className='cursor-pointer'/>
      </div>
      <div className="flex items-center">
        <div className="w-64 h-64 border-d6d3de border rounded-circle flex flex-center bg-eae9f0">
          <WalletIcon />
        </div>
        <div className="ml-36">
          <div className="text-14 leading-17 text-7b7986 mb-12 font-medium">aUSD Credit Available</div>
          <div className="text-28 leading-34 font-semibold text-2e2d33">{`$${formatNumber(available)}`}</div>
        </div>
      </div>
    </div>
  </Card>
}