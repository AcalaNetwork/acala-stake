import { FC } from "react";
import { SubPageTabs, SubPageTabsProps } from "../../../components/SubPageTabs";

interface PageTabsProps {
  active: number;
}

const BORROW_TABS_CONFIGS : SubPageTabsProps['configs'] = [
  {
    content: 'Mint',
    href: '/borrow'
  },
  {
    content: 'My Vaults',
    href: '/borrow/vaults'
  },
  {
    content: 'Price Oracle',
    href: '/borrow/oracle'
  }
];

export const BorrowSubPageTabs: FC<PageTabsProps> = ({ active }) => {
  return (
    <SubPageTabs
      className='mt-44'
      configs={BORROW_TABS_CONFIGS}
      active={active}
    />
  );
}