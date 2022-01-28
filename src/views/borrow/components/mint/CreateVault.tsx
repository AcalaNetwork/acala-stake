import { useContext, useState } from "react";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { NumInput } from "../../../../components/form/NumInput";
import { Step } from "../../../../components/Step";
import { TokenImage } from "../../../../components/TokenImage";
import { BorrowProviderContext } from "../../BorrowContext";
import {
  QuestionMarkCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

export const CreateOverview = () => {
  const { step, getActive, steps, setStep } = useContext(BorrowProviderContext);
  const [collateralAmount, setCollateral] = useState<string>();
  const [debitAmount, setDebit] = useState<string>();
  const [collateralToken, setCollateralToken] = useState<string>("LDOT");
  const [debitToken, setDebitToken] = useState<string>("AUSD");

  const handleClick = () => {
    setStep('confirm');
  }

  return (
    <Card variant="border" className="w-[630px] h-[560px] px-40 pt-36 pb-52">
      <Step active={getActive(step)} data={steps} />
      <div className="mt-52">
        <div className="text-14 leading-17 text-7b7986 font-medium">
          Collateral Amount
        </div>
        <div className="mt-8 h-58 w-full border border-645aff bg-f1f0f2 rounded-8 flex flex-between pr-20 py-14 focus-within:border-primary">
          <NumInput
            value={collateralAmount}
            onChange={(e) => setCollateral(e)}
            type="number"
            className="flex-1 border-none bg-transparent outline-none h-full text-20 leading-[24px] text-2e2d33 font-medium"
          />
          <div className="flex flex-center ml-8">
            <div className="text-14 leading-17 font-medium text-primary cursor-pointer">
              MAX
            </div>
            <TokenImage className="ml-17 mr-9" token={collateralToken} />
            <div className="text-16 leading-20 text-494853 font-medium">
              {collateralToken}
            </div>
          </div>
        </div>
        <div className="mt-8 text-14 leading-17 text-7b7986 font-medium">
          Amount available:{" "}
          <span className=" text-494853">1000 {collateralToken}</span>
        </div>
      </div>

      <div className="mt-32">
        <div className="text-14 leading-17 text-7b7986 font-medium">
          I want to mint
        </div>
        <div className="mt-8 h-58 w-full border border-645aff bg-f1f0f2 rounded-8 flex flex-between pr-20 py-14 focus-within:border-primary">
          <NumInput
            value={debitAmount}
            onChange={(e) => setDebit(e)}
            type="number"
            className="flex-1 border-none bg-transparent outline-none h-full text-20 leading-[24px] text-2e2d33 font-medium"
          />
          <div className="flex flex-center ml-8">
            <TokenImage className="ml-17 mr-9" token={debitToken} />
            <div className="text-16 leading-20 text-494853 font-medium">
              {debitToken}
            </div>
          </div>
        </div>
        <div className="mt-8 text-14 leading-17 text-7b7986 font-medium">
          Maximum available to mint:{" "}
          <span className=" text-494853">500 {debitToken}</span>
        </div>
        <div className="mt-8 text-14 leading-17 text-7b7986 font-medium">
          Minimum Required to mint:{" "}
          <span className=" text-494853">20 {debitToken}</span>
        </div>
      </div>

      <Button className="w-full mt-44" round="lg" onClick={() => handleClick()}>
        Next
      </Button>
    </Card>
  );
};

export const CreateInfo = () => {
  return (
    <Card variant="border" className="w-[470px] h-[560px] px-32 pt-32 pb-22">
      <div className="text-494853 w-full flex justify-between items-start">
        <div className="flex-[2]">
          <div className="text-16 leading-20 font-semibold">3%</div>
          <div className="flex items-center text-14 leading-17 mt-6">
            Stability Fee{" "}
            <QuestionMarkCircleIcon className="w-16 h-16 text-gray-400 cursor-pointer ml-4 mt-[-6px]" />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-16 leading-20 font-semibold">20%</div>
          <div className="text-14 leading-17 mt-6">Liquidation Fee</div>
        </div>
      </div>

      <div className="w-full h-[81px] mt-36 text-494853 bg-primary bg-opacity-5 rounded-16 flex flex-between">
        <div className="flex-1 flex-col flex-center">
          <div className="text-20 leading-[24px] text-primary font-semibold">
            $15
          </div>
          <div className="flex items-center mt-8 text-14 leading-17">
            Liquidation Price{" "}
            <QuestionMarkCircleIcon className="w-16 h-16 text-gray-400 cursor-pointer ml-4 mt-[-6px]" />
          </div>
        </div>
        <div className="flex-1 flex-col flex-center">
          <div className="text-20 leading-[24px] text-31c26b font-semibold">
            $45
          </div>
          <div className="mt-8 text-14 leading-17">Current Price</div>
        </div>
      </div>

      <div className="w-full h-[81px] mt-20 text-494853 bg-primary bg-opacity-5 rounded-16 flex flex-between">
        <div className="flex-1 flex-col flex-center">
          <div className="text-20 leading-[24px] text-primary font-semibold">
            $15
          </div>
          <div className="flex items-center mt-8 text-14 leading-17">
            Liquidation Ratio{" "}
            <QuestionMarkCircleIcon className="w-16 h-16 text-gray-400 cursor-pointer ml-4 mt-[-6px]" />
          </div>
        </div>
        <div className="flex-1 flex-col flex-center">
          <div className="text-20 leading-[24px] text-primary font-semibold">
            $170
          </div>
          <div className="mt-8 text-14 leading-17">
            Required Collateral Ratio
          </div>
        </div>
      </div>

      <div className="w-full h-[81px] mt-20 text-494853 bg-primary bg-opacity-5 rounded-16 flex flex-between">
        <div className="flex-1 flex-col flex-center">
          <div className="text-20 leading-[24px] text-primary font-semibold">
            $15
          </div>
          <div className="mt-8 text-14 leading-17">
            Current Locked
          </div>
        </div>
        <div className="flex-1 flex-col flex-center">
          <div className="text-20 leading-[24px] text-31c26b font-semibold">
            $45
          </div>
          <div className="flex items-center mt-8 text-14 leading-17">
            Current Ratio{" "}
            <QuestionMarkCircleIcon className="w-16 h-16 text-gray-400 cursor-pointer ml-4 mt-[-6px]" />
          </div>
        </div>
      </div>

      <div className="w-full mt-36 border border-opacity-50 border-primary bg-opacity-5 rounded-16 py-12 pl-14 pr-18 flex">
        <div>
          <InformationCircleIcon className="w-24 h-24 text-[#645aff]" />
        </div>
        <div className="ml-16 text-12 leading-20 tracking-[0.02em] text-494853">
          Required Collateral Ratio provides added protection against
          liquidation. You can only mint aUSD and withdraw deposited collateral
          when Current Ratio &gt; Required Collateral Ratio.
        </div>
      </div>
    </Card>
  );
};

export const CreateVault = () => {
  return (
    <>
      <div className="text-20 leading-[24px] text-494853 font-medium mt-32">
        Open LDOT Vault
      </div>
      <Card
        variant="gradient-border"
        className="mt-32 px-32 pb-32 pt-38"
      >
        <div className="flex flex-center">
          <CreateOverview />
          <div className="w-29"></div>
          <CreateInfo />
        </div>
      </Card>
    </>
  );
};
