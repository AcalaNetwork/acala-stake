import React, { memo } from 'react';
import { SwitchSelector, SwitchSelectorItem } from '@components/SwitchSelector';
import { BaseComponentProps } from '@components';
import { useBalanceDisplayType } from '@state';

type DisplaySwitchSelectorProps = BaseComponentProps

export const DisplaySelector = memo<DisplaySwitchSelectorProps>(({ className }) => {
  const { type, update } = useBalanceDisplayType();

  return (
    <SwitchSelector className={className} onChange={update}
      value={type}>
      <SwitchSelectorItem value='USD'>USD</SwitchSelectorItem>
      <SwitchSelectorItem value='AMOUNT'>Token</SwitchSelectorItem>
    </SwitchSelector>
  );
});
