import WalletIcon from "/public/icons/wallet.svg";
import EyeIcon from "/public/icons/eye.svg";
import { Button } from "../../../../components/Button";
import { formatNumber } from "../../../../utils/formatNumber";
import { useState } from "react";
import { Card } from "../../../../components/Card";

export const AssetCard = () => {
  const [total, setTotal] = useState<number | string>(121323.55);
  return (
    <Card
      className="p-32 bg-no-repeat bg-cover rounded-xl w-[611px]"
      style={{ backgroundImage: `url("/images/top-board-bg.svg")` }}
    >
      <div className="flex flex-between h-full">
        <div className="flex flex-center">
          <div className="w-64 h-64 border border-d6d3de rounded-circle bg-white flex flex-center">
            <WalletIcon />
          </div>
          <div className="flex-1 ml-40">
            <div className="flex items-center mb-[13px] cursor-pointer">
              <EyeIcon />
              <p className="ml-8 text-abaab9 font-semibold text-[11px] leading-[13px]">
                Hide Balance
              </p>
            </div>
            <p className="font-medium text-14 leading-17 text-7b7986 mb-12">
              Estimated Portfolio Value
            </p>
            <div className="text-2e2d33 font-semibold text-[32px] leading-[39px]">
              {`$${formatNumber(total)}`}
            </div>
          </div>
        </div>
        <div className="flex items-end flex-col">
          <Button className="w-[180px] mb-24" size="sm">
            Buy Crypto
          </Button>
          <Button className="w-[180px] px-0" size="sm" variant="outline">
            Bridge Crypto
          </Button>
        </div>
      </div>
    </Card>
  );
};
