import { Button, LinkButton } from "@components";
import { useCallback } from "react";
import { memo } from "react";
import { useBridge } from "../hooks/useBridger";
import { BridgeSteps } from "../types";
import SuccessIcon from '/public/images/result-success.svg';

export const BridgeSuccess = memo(() => {
  const { setStep, onComplated } = useBridge();

  const handleClick = useCallback(() => {
    if (onComplated) {
      onComplated();
    } else {
      setStep(BridgeSteps.FORM);
    }
  }, [onComplated, setStep]);

  return (
    <div className="flex flex-col items-center">
      <SuccessIcon />
      <p className="text-grey-2 text-24 leading-24 mt-34">Transaction Completed!</p>
      <LinkButton color='primary' variant='text'>
        View Transaction
      </LinkButton>
      <Button className='mt-44 w-[200px]' color="primary"
        onClick={handleClick}>
        Done
      </Button>
    </div>
  );
});