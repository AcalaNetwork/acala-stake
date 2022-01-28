import React, { useContext } from "react";
import { LiquidityProviderContext } from "../LiquidityContext";
import { AddLiquidityTab } from "./AddLiquidityTab";
import { WithdrawLiquidityTab } from "./WithdrawLiquidityTab";

export const LiquidityConsole = () => {
  const {tab, setTab} = useContext(LiquidityProviderContext);
  const activeClassName =
    "border-primary text-primary bg-primary bg-opacity-[0.08]";
  return (
    <div className="w-[520px] mx-auto">
      <div className="flex flex-center h-48 mx-auto text-16 leading-20 text-7b7986 font-medium">
        <div
          onClick={() => setTab(0)}
          className={`flex-1 cursor-pointer h-full flex-center rounded-l-12 border ${
            tab === 0 ? activeClassName : ""
          }`}
        >
          Add Liquidity
        </div>
        <div
          onClick={() => setTab(1)}
          className={`flex-1 cursor-pointer h-full flex-center rounded-r-12 border ${
            tab === 1 ? activeClassName : ""
          }`}
        >
          Withdraw Liquidity
        </div>
      </div>
      <div className="mt-28 text-13 leading-16 text-7b7986 font-medium">
        Select the pair
      </div>
      <div className="mt-8">
        {tab === 0 ? <AddLiquidityTab /> : <WithdrawLiquidityTab />}
      </div>
    </div>
  );
};
