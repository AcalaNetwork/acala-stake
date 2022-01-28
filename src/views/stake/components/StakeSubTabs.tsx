import { FC, useMemo } from "react";
import { SubPageTabs, SubPageTabsProps } from "../../../components/SubPageTabs";

interface PageTabsProps {
  active: number;
  token: 'KSM' | 'DOT'
}



export const StakeSubPageTabs: FC<PageTabsProps> = ({ active, token }) => {
  const STAKE_TABS_CONFIGS : SubPageTabsProps['configs'] = useMemo(() => [
    {
      content: 'Stake',
      href: `/stake/${token?.toLowerCase()}`
    },{
      content: 'Unstake',
      href: `/stake/${token?.toLowerCase()}/unstake`
    },{
      content: 'My Stakes',
      href: `/stake/${token?.toLowerCase()}/mystake`
    },
  ], [token]);

  return (
    <SubPageTabs
      className='mt-44'
      configs={STAKE_TABS_CONFIGS}
      active={active}
    />
  );
}