import { FC } from "react";
import { SubPageTabs, SubPageTabsProps } from "../../../components/SubPageTabs";

interface PageTabsProps {
  active: number;
}

const SWAP_TABS_CONFIGS : SubPageTabsProps['configs'] = [
  {
    content: 'Swap',
    href: '/swap'
  },
  {
    content: 'Liquidity',
    href: '/swap/liquidity'
  },
  {
    content: 'Bootstrap',
    href: '/swap/bootstrap'
  },
  {
    content: 'My Share',
    href: '/swap/share'
  },
];

export const SwapSubPageTabs: FC<PageTabsProps> = ({ active }) => {
  return (
    <SubPageTabs
      className='mt-44'
      configs={SWAP_TABS_CONFIGS}
      active={active}
    />
  );
}