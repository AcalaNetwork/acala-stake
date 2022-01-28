import React, { FC } from "react";
import { defaults } from "@polkadot/util-crypto/address/defaults";
import { formatAddress } from "../utils/formatAddress";

export interface AddressProps {
	address?: string;
	className?: string;
	nameClassName?: string;
	addressClassName?: string;
	mini?: boolean;
	ss58?: number;
	name?: string;
	showBoth?: boolean;
	spaceIcon?: any
}

export const Address: FC<AddressProps> = ({
	address,
	className,
	mini = true,
	name,
	ss58 = defaults.prefix,
	showBoth = false,
	nameClassName,
	addressClassName,
	spaceIcon
}) => {
	const _name = name ?? 'Unknow';
	const _address = address ? formatAddress(address, ss58, mini) : '';

	if(showBoth) {
		return <div className={className}><span className={nameClassName}>{_name}</span>{spaceIcon}<span className={addressClassName}>{_address}</span></div>
	} else {
		return <p className={className}>{name ? _name : _address}</p>
	}
};
