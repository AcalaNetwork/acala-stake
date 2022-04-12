import React, { FC } from "react";
import { polkadotIcon } from "@polkadot/ui-shared";
import type { Circle } from "@polkadot/ui-shared/icons/types";
import { memo } from "react";

interface AddressAvatarProps {
  address?: string;
  size?: number;
  theme?: string;
  className?: string;
}

/**
 * The renderCircle function and Identicon component are taken from 
 * https://github.com/polkadot-js/ui/blob/master/packages/react-identicon/src/icons/Polkadot.tsx
 * 
 * Due to compatability issues with NextJS, older versions of React, and potentially yarn
 * the packages could not be imported properly.
 */
const renderCircle = (
  { cx, cy, fill, r }: Circle,
  key: number
): React.ReactNode => {
  return <circle cx={cx}
    cy={cy}
    fill={fill}
    key={key}
    r={r} />;
};

const Identicon = memo<{ address: string; size: number; style: React.CSSProperties }>(({ address, size, style }) => {
  return (
    <svg
      className="m-2"
      height={size}
      id={address}
      name={address}
      style={style}
      viewBox="0 0 64 64"
      width={size}
    >
      {address && polkadotIcon(address, { isAlternative: false }).map(renderCircle)}
    </svg>
  );
});

export const AddressAvatar: FC<AddressAvatarProps> = memo(({
  address,
  className = "",
  size = 24,
}) => {
  return (
    <div
      className={`w-${size} h-${size} flex-center cursor-pointer rounded-full ${className} border-2 border-d6d3de`}
      onClick={() => navigator.clipboard.writeText(address)}
    >
      <Identicon
        address={address}
        size={size}
        style={{}}
      />
    </div>
  );
});
