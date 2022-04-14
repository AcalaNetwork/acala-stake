import { Card } from "../../../components/Card";

export const BootstrapOverview = () => {
  return (
    <div className="container">
      <Card
        variant="gradient-border"
        className="mt-32 py-20 flex flex-center flex-col"
      >
        <div className="text-20 leading-[24px] text-494853 font-medium">
          Trade Instantly & Pool Liquidity to Earn
        </div>
        <div className="mt-20 mb-4 text-16 leading-20 text-grey-3 font-medium">
          Trading Liquidity
        </div>
        <div className="text-28 leading-34 text-2e2d33 font-semibold">
          {" "}
          $1,344,222,335
        </div>
      </Card>
    </div>
  );
};
