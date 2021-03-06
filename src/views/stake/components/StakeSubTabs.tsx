import { memo, useMemo } from 'react';
import { SubPageTabs, SubPageTabsProps } from '@components/SubPageTabs';
import { SDKNetwork } from '@sdk/types';

interface PageTabsProps {
  active: number;
  network: SDKNetwork;
}

export const StakeSubPageTabs = memo<PageTabsProps>(({ active, network }) => {
  const STAKE_TABS_CONFIGS: SubPageTabsProps['configs'] = useMemo(
    () => [
      {
        content: 'Stake',
        href: `/stake/${network}`,
      },
      {
        content: 'Unstake',
        href: `/stake/${network}/unstake`,
      },
      {
        content: 'My Stakes',
        href: `/stake/${network}/user`,
      },
    ],
    [network]
  );

  return <SubPageTabs active={active} className='mt-44' configs={STAKE_TABS_CONFIGS} />;
});
