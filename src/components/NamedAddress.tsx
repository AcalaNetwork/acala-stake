import React, { FC } from 'react';
import { defaults } from '@polkadot/util-crypto/address/defaults';
import { Address } from './Address';

interface AddressProps {
  address?: string;
  name?: string;
  className?: string;
  mini?: boolean;
  ss58?: number;
}

export const NamedAddress: FC<AddressProps> = ({
  address,
  className,
  name = 'unknown',
  mini = true,
  ss58 = defaults.prefix,
}) => (
  <div className={`${className} text-base`}>
    <p className='font-medium w-[240px] overflow-ellipsis	overflow-hidden'>{name}</p>
    <Address address={address} mini={mini} ss58={ss58} />
  </div>
);
