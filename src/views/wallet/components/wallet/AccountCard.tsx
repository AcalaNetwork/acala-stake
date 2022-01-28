import { Address } from "../../../../components/Address";
import { Card } from "../../../../components/Card";
import { Copy } from "../../../../components/Copy";
import { useActiveAccount } from "../../../../connector/hooks/useActiveAccount";
import ChangeIcon from '/public/icons/change.svg';
import CopyIcon from '/public/icons/copy.svg';
import DollarIcon from '/public/pages/wallet/dollar.svg';
import { FC } from "react";
import { FormatValue } from "../../../../components/FormatValue";

interface BalanceProps {
  icon?: string;
  text: string;
  balance: string | number;
}

const BalanceCard: FC<BalanceProps> = ({ text, balance, icon }) => {
  return (
    <Card className="min-w-[200px] px-24 py-26 rounded-xl border border-eae9f0 bg-[rgba(100,90,255,0.08)] ml-22" shadow={'none'} >
      <DollarIcon />
      <div className="mt-16 text-14 font-medium leading-17px text-7b7986">
        {text}
      </div>
      <div className="mt-8 text-20 font-semibold leading-24 text-494853">
        <FormatValue data={balance} prefix='$' />
      </div>
    </Card>
  );
};

export const AccountCard = () => {
  const data = useActiveAccount();

  return (
    <Card
      variant="gradient-border"
      className="flex flex-between h-[197px] pt-24 pr-[37px] pb-22 pl-54"
    >
      <div>
        <div className="mt-12 text-333 text-20 leading-24 font-medium">
          {data?.name}
        </div>
        <Address address={data?.address} className='mt-8 text-14 leading-17'/>
        <div className="mt-[17px] flex text-13 text-primary">
          <div className="flex items-center">
            <ChangeIcon />
            <span className="ml-8">Change</span>
          </div>
          <div className="ml-34 flex items-center">
            <CopyIcon />
            <Copy
              className="ml-8"
              text={'address'}
              displayText="Copy"
              successText="Copied"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <BalanceCard text="Spot Banlance" balance={20300.55} />
        <BalanceCard text="Earn Banlance" balance={20300.55} />
        <BalanceCard text="aUSD Banlance" balance={20300.55} />
      </div>
    </Card>
  );
};
