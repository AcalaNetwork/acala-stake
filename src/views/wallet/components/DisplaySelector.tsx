import React, { memo } from 'react';
import { SwitchSelector, SwitchSelectorItem } from '@components/SwitchSelector';
import { BalanceDisplayType } from '@state/application/types';

interface DisplaySwitchSelectorProps {
  onChange?: (type: BalanceDisplayType) => void;
  value?: BalanceDisplayType;
}

export const DisplaySelector = memo<DisplaySwitchSelectorProps>(({ onChange, value }) => {
  return (
    <SwitchSelector onChange={onChange} value={value}>
      <SwitchSelectorItem value='USD'>USD</SwitchSelectorItem>
      <SwitchSelectorItem value='AMOUNT'>Token</SwitchSelectorItem>
    </SwitchSelector>
  );
});
