import { Token } from "@acala-network/sdk-core";
import { FC, useMemo } from "react";
import { useBoolean, useMemoized } from "../../hooks";
import { TokenImage } from "../TokenImage";
import { Selector } from "./Selector";
import TriangleIcon from "/public/icons/triangle.svg";
import { CheckIcon } from "@heroicons/react/solid";

export interface ChainData {
  chainName: string;
  name: string;
  parachainId: number;
}

interface ChainSelectorProps {
  chains: ChainData[];
  value?: ChainData;
  onChange?: (value: ChainData) => void;
  className?: string;
}

const btnRender = (value: ChainData) => (
  <div className="flex flex-between h-full px-16">
    <div className="flex flex-center">
      <TokenImage token={value.chainName} />
      <span className="ml-12 font-medium text-14 leading-17 text-7b7986">
        {value.name}
      </span>
    </div>
    <TriangleIcon />
  </div>
);

const itemRender = (value: ChainData, selected: ChainData) => (
  <div className="py-12 px-8 rounded-8 flex flex-between hover:bg-fff">
    <div className="flex flex-center">
      <TokenImage token={value.chainName} />
      <span className="ml-8 font-medium text-16 leading-20 text-7b7986">
        {value.chainName}
      </span>
    </div>

    {selected && selected.chainName === value.chainName && (
      <CheckIcon
        className="h-[20px] w-[20px] text-primary"
        aria-hidden="true"
      />
    )}
  </div>
)

export const ChainSelector: FC<ChainSelectorProps> = ({
  chains,
  value,
  onChange,
  className,
}) => {
  const memChains = useMemoized(chains);
  const [focuse, , onFocuse, onBlur] = useBoolean();

  const items = useMemo(() => {
    return memChains.map((item) => {
      return {
        value: item,
        render: itemRender,
      };
    });
  }, [memChains, value]);

  return (
    <Selector
      rootClassName={className}
      value={value}
      items={items}
      render={btnRender}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
