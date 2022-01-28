import React from "react";
import BridgeIcon from "/public/pages/home/bridge.svg";
import EarnIcon from "/public/pages/home/earn.svg";
import SwapIcon from "/public/pages/home/swap.svg";
import CreditIcon from "/public/pages/home/credit.svg";

export const PageIcons: React.FC = () => {
  return (
    <div className="flex flex-row justify-evenly gap-x-126 w-full">
      <a href="#" className="flex flex-col justify-between items-center">
        <BridgeIcon className="" />
        <div className="text-16 text-2e2d33">Asset Bridge</div>
      </a>
      <a href="#" className="flex flex-col justify-between items-center">
        <EarnIcon className="" />
        <div className="text-16 text-2e2d33">Earn Crypto</div>
      </a>
      <a href="/swap" className="flex flex-col justify-between items-center">
        <SwapIcon className="" />
        <div className="text-16 text-2e2d33">Swap Crypto</div>
      </a>
      <a href="#" className="flex flex-col justify-between items-center">
        <CreditIcon className="" />
        <div className="text-16 text-2e2d33">aUSD Credit</div>
      </a>
    </div>
  );
};
