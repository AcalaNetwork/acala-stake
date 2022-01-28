import { FC } from "react";
import { SubPageTabs, SubPageTabsProps } from "../../../components/SubPageTabs";

interface PageTabsProps {
  active: number;
}

const WALLET_TABS_CONFIGS : SubPageTabsProps['configs'] = [
  {
    content: 'Overview',
    href: '/wallet'
  },
  {
    content: 'Spot',
    href: '/wallet/spot'
  },
  {
    content: 'Earn',
    href: '/wallet/earn'
  },
  {
    content: 'aUSD credit',
    href: '/wallet/credit'
  },
];

export const WalletSubPageTabs: FC<PageTabsProps> = ({ active }) => {
  return (
    <SubPageTabs
      className='mt-44'
      configs={WALLET_TABS_CONFIGS}
      active={active}
    />
  );
}