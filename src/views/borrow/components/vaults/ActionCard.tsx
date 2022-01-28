import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { TokenImage } from "../../../../components/TokenImage";
import { TokenName } from "../../../../components/TokenName";
import { formatNumber } from "../../../../utils/formatNumber";

const MintCard = () => {
  return (
    <Card className="w-[584px] h-full pt-36 pb-22">
      <div className="flex flex-col items-center justify-center pb-24 border-b border-eae9f0">
        <TokenImage wh={48} token={"AUSD"} />
        <div className="mt-16 text-24 leading-29 text-2e2d33 font-semibold w-full flex flex-center">
          {formatNumber(1524)}
          <TokenName className="ml-4" token={"AUSD"} />
        </div>
        <div className="mt-4 text-14 leading-20 text-7b7986 font-medium">
          ≈ US $6,325.95
        </div>
      </div>
      <div className="flex flex-center pt-18">
        <div className="flex-1 flex-center flex-col">
          <div className="text-14 leading-17 text-abaab9 font-medium">
            Can Pay Back
          </div>
          <div className="text-16 leading-20 text-494853 font-medium mt-8">
            1,524.9 aUSD
          </div>
        </div>
        <div className=" h-32 w-1 bg-eae9f0"></div>
        <div className="flex-1 flex-center flex-col">
          <div className="text-14 leading-17 text-abaab9 font-medium">
            Can Generate
          </div>
          <div className="text-16 leading-20 text-494853 font-medium mt-8">
            2,235.2 aUSD
          </div>
        </div>
      </div>
      <div className="flex justify-around pt-20">
        <Button
          size="sm"
          className="w-[238px] text-14 h-32 py-0 rounded-[12px]"
        >
          Repay
        </Button>
        <Button
          size="sm"
          className="w-[238px] text-14 h-32 py-0 rounded-[12px]"
        >
          Mint
        </Button>
      </div>
    </Card>
  );
};

const WithdrawCard = () => {
  return (
    <Card className="w-[584px] h-full pt-36 pb-22">
      <div className="flex flex-col items-center justify-center pb-24 border-b border-eae9f0">
        <TokenImage wh={48} token={"LDOT"} />
        <div className="mt-16 text-24 leading-29 text-2e2d33 font-semibold w-full flex flex-center">
          {formatNumber(1000)}
          <TokenName className="ml-4" token={"LDOT"} />
        </div>
        <div className="mt-4 text-14 leading-20 text-7b7986 font-medium">
        ≈ US $4,500 
        </div>
      </div>
      <div className="flex flex-center pt-18">
        <div className="flex-1 flex-center flex-col">
          <div className="text-14 leading-17 text-abaab9 font-medium">
          Required for Safety
          </div>
          <div className="text-16 leading-20 text-494853 font-medium mt-8">
          8.09 LDOT
          </div>
        </div>
        <div className=" h-32 w-1 bg-eae9f0"></div>
        <div className="flex-1 flex-center flex-col">
          <div className="text-14 leading-17 text-abaab9 font-medium">
          Able to Withdraw
          </div>
          <div className="text-16 leading-20 text-494853 font-medium mt-8">
          11,91 LDOT
          </div>
        </div>
      </div>
      <div className="flex justify-around pt-20">
        <Button
          size="sm"
          className="w-[238px] text-14 h-32 py-0 rounded-[12px]"
        >
          Deposit
        </Button>
        <Button
          size="sm"
          className="w-[238px] text-14 h-32 py-0 rounded-[12px]"
        >
          Withdraw
        </Button>
      </div>
    </Card>
  );
};

export const ActionCard = () => {
  return (
    <div className="flex flex-between h-[316px]">
      <MintCard />
      <WithdrawCard />
    </div>
  );
};
