import { FC, useContext } from "react";
import { Button } from "../../components/Button";
import { BridgeProviderContext } from "./BridgeContext";
import SuccessIcon from '/public/images/result-success.svg';

export const ResultConsile: FC = () => {
  const { setStep } = useContext(BridgeProviderContext)
  return <div className="w-[630px] pt-[40px] pb-[65px] flex flex-center flex-col">
    <SuccessIcon className='w-[200px] h-[139px]' />
    <div className="mt-[41px] leading-[24px] text-24 text-494853 font-semibold">Transaction Completed!</div>
    <div className='mt-24 text-primary text-16 leading-[19.5px] font-medium'>View Transaction</div>
    <Button round='lg' size='sm' className="w-[200px] h-48 mt-[53px]" onClick={() => setStep('create')}>Done</Button>
  </div>
}