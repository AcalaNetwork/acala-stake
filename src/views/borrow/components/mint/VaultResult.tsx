import { FC, useContext } from "react";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { BorrowProviderContext } from "../../BorrowContext";

export const VaultResult: FC = () => {
  const { setStep } = useContext(BorrowProviderContext)
  return <Card className="w-full mt-44 pt-44 pb-64 flex flex-center flex-col">
    <div className='w-[291px] h-[184px] bg-gray-100 rounded-[52px] leading-[184px] text-center'> null</div>
    <div className="mt-[41px] leading-[24px] text-24 text-494853 font-semibold">Transaction Completed!</div>
    <div className='mt-24 text-primary text-16 leading-[19.5px] font-medium'>See Transaction Here</div>
    <Button round='lg' size='sm' className="w-[200px] h-48 mt-[53px]" onClick={() => setStep('overview')}>Done</Button>
  </Card>
}