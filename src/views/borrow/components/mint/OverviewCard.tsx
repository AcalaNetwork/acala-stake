import { useContext, useState } from "react";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { TokenImage } from "../../../../components/TokenImage";
import { formatNumber } from "../../../../utils/formatNumber";
import { BorrowProviderContext } from "../../BorrowContext";

export const OverviewCard = () => {
  const { setStep } = useContext(BorrowProviderContext);
  const [token, setToken] = useState("LDOT");
  const [apy, setApy] = useState(13);
  const [total, setTotal] = useState(11000222);

  return (
    <div className="flex flex-center">
      <Card
        variant="gradient-border"
        className="pl-[35px] py-20 pr-[23px] h-[180px] flex-1"
      >
        <div className="flex flex-between">
          <div className="flex flex-col justify-center items-start">
            <div className="flex flex-center">
              <TokenImage wh={52} token={token} />
              <div className="ml-17">
                <span className="text-[20px] leading-[24px] text-494853 font-semibold">
                  {token}
                </span>
                <div className="mt-12 text-16 leading-[20px] text-7b7986 font-medium">
                  Liquid KSM
                </div>
              </div>
            </div>
            <div className="mt-[39px] text-16 leading-[20px] text-7b7986 font-medium">
              Total Collateral:
              <span className="ml-8 text-24 leading-29 text-494853 font-semibold tracking-[0.02em]">{`$${formatNumber(
                total
              )}`}</span>
            </div>
          </div>
          <div className="w-[187px] h-[139px] flex flex-center flex-col bg-primary bg-opacity-[0.08] rounded-[13px]">
            <div className="text-14 leading-17 text-8f8ab3 font-medium mb-12">
              Net APR
            </div>
            <div className="text-[48px] leading-[55px] text-primary font-bold tracking-[0.02em]">{`${apy}%`}</div>
          </div>
        </div>
      </Card>
      <div className="w-20"></div>
      <Card
        variant="gradient-border"
        className="h-[180px] flex flex-col justify-between items-center px-[27px] pt-36 pb-[26px] flex-1"
      >
        <div className="text-center text-16 leading-[24px] font-medium text-494853 max-w-[400px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget
          venenatis,
        </div>
        <div className="mt-28 flex flex-between w-full">
          <Button className="py-0 h-40 text-14 w-[160px]" size="sm" round="lg" onClick={() => setStep('create')}>
            Mint
          </Button>
          <Button className="py-0 h-40 text-14 w-[160px]" size="sm" round="lg">
            Trade
          </Button>
          <Button className="py-0 h-40 text-14 w-[160px]" size="sm" round="lg">
            Stake Liquidity
          </Button>
        </div>
      </Card>
    </div>
  );
};
