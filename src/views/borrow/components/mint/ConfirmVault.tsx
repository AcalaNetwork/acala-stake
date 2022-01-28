import { useContext } from "react";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { Step } from "../../../../components/Step";
import { BorrowProviderContext } from "../../BorrowContext";
import { CreateInfo } from "./CreateVault";

const ConfirmOverview = () => {
  const { step, getActive, steps, setStep } = useContext(BorrowProviderContext);

  const handlePreClick = () => {
    setStep('create');
  }

  const handleConfirmClick = () => {
    setStep('result');
  }

  return <Card variant="border" className="w-[630px] h-[560px] pl-52 pr-40 pt-36 pb-52">
    <Step active={getActive(step)} data={steps} />
    <div className="w-full px-29 py-16 border border-d6d3de rounded-16 mt-48 text-14 leading-17 text-494853">
      <div className="flex flex-between my-20">
        <div>Deposit Collateral</div>
        <div className="font-medium">100 DOT</div>
      </div>
      <div className="flex flex-between my-20">
        <div>Mint</div>
        <div className="font-medium">2000 aUSD</div>
      </div>
      <div className="flex flex-between my-20">
        <div>Current Ratio</div>
        <div className="font-medium">190%</div>
      </div>
      <div className="flex flex-between my-20">
        <div>Stability Fee</div>
        <div className="font-medium">3%</div>
      </div>
      <div className="flex flex-between my-20">
        <div>Liquidation Fee</div>
        <div className="font-medium">20%</div>
      </div>
      <div className="flex flex-between my-20">
        <div>Flexi Fee</div>
        <div className="font-medium">0.03 ACA</div>
      </div>
    </div>
    <div className="mt-34 flex flex-center">
      <Button className="w-full" round="lg" onClick={() => handlePreClick()}>Pre</Button>
      <div className="w-20"></div>
      <Button className="w-full" round="lg" onClick={() => handleConfirmClick()}>Confirm</Button>
    </div>
  </Card>;
};

export const ConfirmVault = () => {
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
          <ConfirmOverview />
          <div className="w-29"></div>
          <CreateInfo />
        </div>
      </Card>
    </>
  );
};
