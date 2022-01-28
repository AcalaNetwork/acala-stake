import { FC, useContext } from "react";
import { Button } from "../../../components/Button";
import { LiquidityProviderContext } from "../LiquidityContext";
import SuccessIcon from '/public/images/result-success.svg';

export const LiquidityResultConsile: FC = () => {
  const { setStep } = useContext(LiquidityProviderContext);
  return (
    <div className="w-[630px] pt-[40px] pb-[65px] flex flex-center flex-col">
      <SuccessIcon className='w-[202px] h-[139px]' />
      <div className="mt-[81px] leading-[24px] text-24 text-494853 font-semibold">
        Transaction Completed!
      </div>
      <div className="mt-24 text-primary text-16 leading-[19.5px] font-medium">
        View Transaction
      </div>
      <div className="mt-56">
        <Button
          round="lg"
          size="sm"
          className="w-[200px] h-48"
          onClick={() => setStep("create")}
        >
          Done
        </Button>
        <Button
          variant="text"
          round="lg"
          size="sm"
          className="w-[200px] h-48 ml-36 border border-primary"
          onClick={() => setStep("create")}
        >
          View my LP share
        </Button>
      </div>
    </div>
  );
};
