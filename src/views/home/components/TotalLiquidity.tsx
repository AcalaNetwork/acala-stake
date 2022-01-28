import React from "react";

export const TotalLiquidity: React.FC = () => {
  return (
    <div
      className="w-screen min-h-126 bg-no-repeat bg-cover"
      style={{ backgroundImage: `url("/images/home-top-bg.svg")` }}
    >
      <div className="container pt-24 pm-38">
        <div className="text-center">
          <h1 className="text-20 font-medium text-white uppercase">
            Polkadot DeFi &amp; Liquidity Hub
          </h1>
          <div className="text-[36px] text-white font-semibold">
            $10,344,222,335
          </div>
        </div>
      </div>
    </div>
  );
};
