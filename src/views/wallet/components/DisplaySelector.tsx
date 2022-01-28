import React, { FC } from "react";
import { SwitchSelector, SwitchSelectorItem } from "../../../components/SwitchSelector";

interface DisplaySwitchSelectorProps {
	onChange?:  React.Dispatch<React.SetStateAction<any>> | ((tab: string) => void) 
	value?: string;
}

export const DisplaySelector: FC<DisplaySwitchSelectorProps> = ({ onChange, value }) => {
	return (
    <SwitchSelector value={value} onChange={onChange}>
      <SwitchSelectorItem value='USD'>USD</SwitchSelectorItem>
      <SwitchSelectorItem value='TOKEN'>Token</SwitchSelectorItem>
    </SwitchSelector>
	);
};
