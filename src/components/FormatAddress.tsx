import { formatAddress } from "@utils";
import clsx from "clsx";
import { memo } from "react";
import { AddressAvatar } from "./AddressAvatar";
import { BaseComponentProps } from "./types";

interface FormatAddressProps extends BaseComponentProps {
  ss58?: string | number;
  address: string;
  name?: string;
  icon?: boolean;
}

export const FormatAddress = memo<FormatAddressProps>(({ icon, ss58, address, name, className }) => {
  const formatedAddress = formatAddress(address, ss58);

  return (
    <div className='flex w-full items-center'>
      {icon && (
        <AddressAvatar address={address} className="mr-8" />
      )}
      {name && <p className='text-grey-3 text-12 leading-14 max-w-[30%] overflow-hidden text-ellipsis'>{name} </p>}
      {name && <p className='text-grey-3 mx-4 text-12 leading-14'>-</p>}
      <p className={clsx("text-14 leading-17 text-grey-2", className)}>{formatedAddress}</p>
    </div>
  );
});